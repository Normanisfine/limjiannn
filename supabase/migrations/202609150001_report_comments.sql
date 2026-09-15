begin;

create table public.report_comment_threads (
    id text primary key,
    title text not null
);
insert into public.report_comment_threads (id, title) values
    ('d817cfe2:blueprint', 'Research blueprint'),
    ('d817cfe2:report-2026-09-14', '2026-09-08 - 2026-09-14');

create table public.report_comments (
    id uuid primary key,
    sequence bigint generated always as identity unique,
    thread_id text not null references public.report_comment_threads(id),
    parent_id uuid,
    author text not null check (char_length(btrim(author)) between 1 and 100),
    body text not null check (char_length(btrim(body)) between 1 and 4000),
    created_at timestamptz not null default now(),
    hidden boolean not null default false,
    unique (id, thread_id),
    foreign key (parent_id, thread_id) references public.report_comments(id, thread_id),
    check (parent_id is distinct from id)
);
create index report_comments_thread_order on public.report_comments(thread_id, sequence);

create table public.report_comment_rate_limits (
    bucket text not null,
    window_start timestamptz not null,
    requests integer not null,
    primary key (bucket, window_start)
);

alter table public.report_comment_threads enable row level security;
alter table public.report_comments enable row level security;
alter table public.report_comment_rate_limits enable row level security;
revoke all on public.report_comment_threads, public.report_comments, public.report_comment_rate_limits from public, anon, authenticated;
revoke all on sequence public.report_comments_sequence_seq from public, anon, authenticated;
grant all on public.report_comment_threads, public.report_comments, public.report_comment_rate_limits to service_role;
grant usage, select on sequence public.report_comments_sequence_seq to service_role;

-- Invoked only by the Edge Function with its server-side credential.
-- A global transaction lock makes both rate limiting and retry deduplication atomic.
create function public.submit_report_comment(
    p_id uuid, p_thread text, p_parent uuid, p_author text, p_body text, p_fingerprint text
) returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
    existing public.report_comments;
    saved public.report_comments;
    minute_start timestamptz := date_trunc('minute', now());
    hour_start timestamptz := date_trunc('hour', now());
    current_count integer;
begin
    perform pg_advisory_xact_lock(817, 20260915);
    select * into existing from public.report_comments where id = p_id;
    if found then
        if existing.thread_id = p_thread and existing.parent_id is not distinct from p_parent
           and existing.author = p_author and existing.body = p_body then
            return to_jsonb(existing);
        end if;
        raise exception using errcode = 'P0409', message = 'Submission ID already used';
    end if;
    if p_fingerprint is null or p_fingerprint !~ '^[0-9a-f]{64}$'
       or not exists (select 1 from public.report_comment_threads where id = p_thread) then
        raise exception using errcode = 'P0400', message = 'Invalid discussion';
    end if;
    -- One reply level: replies stay with their original comment and cannot cross reports.
    if p_parent is not null and not exists (
        select 1 from public.report_comments
        where id = p_parent and thread_id = p_thread and parent_id is null and not hidden
    ) then
        raise exception using errcode = 'P0400', message = 'Invalid parent comment';
    end if;

    delete from public.report_comment_rate_limits where window_start < now() - interval '1 day';
    insert into public.report_comment_rate_limits values ('minute:' || p_fingerprint, minute_start, 1)
    on conflict (bucket, window_start) do update set requests = public.report_comment_rate_limits.requests + 1
    returning requests into current_count;
    if current_count > 5 then
        raise exception using errcode = 'P0429', message = 'Please wait before commenting again';
    end if;
    insert into public.report_comment_rate_limits values ('hour:' || p_fingerprint, hour_start, 1)
    on conflict (bucket, window_start) do update set requests = public.report_comment_rate_limits.requests + 1
    returning requests into current_count;
    if current_count > 30 then
        raise exception using errcode = 'P0429', message = 'Hourly limit reached';
    end if;
    -- Caps total writes even if a client changes its address or forwarding headers.
    insert into public.report_comment_rate_limits values ('global', hour_start, 1)
    on conflict (bucket, window_start) do update set requests = public.report_comment_rate_limits.requests + 1
    returning requests into current_count;
    if current_count > 200 then
        raise exception using errcode = 'P0429', message = 'Discussion is busy; try again later';
    end if;
    insert into public.report_comments (id, thread_id, parent_id, author, body)
    values (p_id, p_thread, p_parent, p_author, p_body) returning * into saved;
    return to_jsonb(saved);
end;
$$;
revoke all on function public.submit_report_comment(uuid, text, uuid, text, text, text) from public, anon, authenticated;
grant execute on function public.submit_report_comment(uuid, text, uuid, text, text, text) to service_role;

commit;
