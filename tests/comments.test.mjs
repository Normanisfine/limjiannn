import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createHandler } from '../supabase/functions/report-comments/handler.mjs';
import { createDatabase } from './comments-fixture.mjs';

const origin = 'https://research.example';
const url = 'https://project.supabase.co/functions/v1/report-comments';
const thread = 'd817cfe2:report-2026-09-14';
const config = { enabled: true, supabaseUrl: 'https://project.supabase.co', serviceKey: 'server-only-test-secret', allowedOrigins: origin, rateSalt: 'test-salt' };
let db, handler;
before(async () => {
    const fixture = await createDatabase();
    db = fixture.db;
    handler = createHandler(config, fixture.transport);
});
beforeEach(async () => { await db.exec('truncate public.report_comments, public.report_comment_rate_limits restart identity;'); });
after(async () => { await db?.close(); });
const payload = (changes = {}) => ({ id: randomUUID(), thread, author: 'Lingjie / PI', body: 'What explains the difference?', ...changes });
const post = (data, ip = '192.0.2.1') => handler(new Request(url, {
    method: 'POST', headers: { origin, 'content-type': 'application/json', 'x-forwarded-for': ip }, body: JSON.stringify(data),
}));
const get = (target = thread, after = 0) => handler(new Request(`${url}?thread=${encodeURIComponent(target)}&after=${encodeURIComponent(after)}`, { headers: { origin } }));

test('stores guest comments and linked answers separately for blueprint and each report', async () => {
    const question = payload();
    assert.equal((await post(question)).status, 200);
    const answer = payload({ parentId: question.id, author: 'Mingjian / researcher', body: 'I will test this with a matched control.' });
    assert.equal((await post(answer)).status, 200);
    assert.equal((await post(payload({ thread: 'd817cfe2:blueprint', body: 'Prioritize the controlled comparison.' }))).status, 200);
    const report = await (await get()).json();
    assert.equal(report.comments.length, 2);
    assert.equal(report.comments[1].parent_id, question.id);
    assert.equal((await (await get('d817cfe2:blueprint')).json()).comments.length, 1);
    assert.equal((await (await get()).json()).comments[0].body, question.body);
});

test('retries are idempotent and cannot overwrite a previous submission', async () => {
    const data = payload();
    assert.equal((await post(data)).status, 200);
    assert.equal((await post(data)).status, 200);
    assert.equal((await (await get()).json()).comments.length, 1);
    assert.equal((await post({ ...data, body: 'Overwrite' })).status, 409);
});

test('rejects cross-report replies, unknown parents, reply-to-reply, and unregistered threads', async () => {
    const root = payload();
    await post(root);
    assert.equal((await post(payload({ thread: 'd817cfe2:blueprint', parentId: root.id }))).status, 400);
    assert.equal((await post(payload({ parentId: randomUUID() }))).status, 400);
    assert.equal((await post(payload({ thread: 'd817cfe2:report-2026-09-28' }))).status, 400);
    const answer = payload({ parentId: root.id });
    await post(answer);
    assert.equal((await post(payload({ parentId: answer.id }))).status, 400);
});

test('validates fields, oversized bodies, honeypots, types, and content type before storing', async () => {
    for (const data of [null, [], payload({ author: '  ' }), payload({ body: ' ' }), payload({ author: 'a'.repeat(101) }),
        payload({ body: 'b'.repeat(4001) }), payload({ body: 'b'.repeat(20001) }), payload({ website: 'spam' }),
        payload({ author: 'Name\nRole' }), payload({ parentId: 3 }), payload({ thread: 'another-space:blueprint' })]) {
        assert.equal((await post(data)).status, 400);
    }
    const response = await handler(new Request(url, { method: 'POST', headers: { origin }, body: 'x' }));
    assert.equal(response.status, 415);
    assert.equal((await (await get()).json()).comments.length, 0);
});

test('limits writes atomically and keeps retries available after hitting a rate limit', async () => {
    const inputs = Array.from({ length: 6 }, () => payload());
    const statuses = await Promise.all(inputs.map(async input => (await post(input)).status));
    assert.equal(statuses.filter(status => status === 200).length, 5);
    assert.equal(statuses.filter(status => status === 429).length, 1);
    const saved = inputs[statuses.indexOf(200)];
    assert.equal((await post(saved)).status, 200);
    assert.equal((await post(payload(), '192.0.2.2')).status, 200);
});

test('hourly and global caps work independently of the per-minute cap', async () => {
    // One accepted request establishes the hashed bucket; move it to the hourly cap.
    await post(payload());
    await db.exec("update public.report_comment_rate_limits set requests = 30 where bucket like 'hour:%';");
    assert.equal((await post(payload())).status, 429);
    await db.exec("update public.report_comment_rate_limits set requests = 200 where bucket = 'global';");
    assert.equal((await post(payload(), '192.0.2.99')).status, 429);
});

test('hidden comments become tombstones, preserving their replies and links', async () => {
    const root = payload();
    await post(root);
    await post(payload({ parentId: root.id, body: 'Answer retained.' }));
    await db.query('update public.report_comments set hidden=true where id=$1', [root.id]);
    const comments = (await (await get()).json()).comments;
    assert.equal(comments[0].author, 'Removed comment');
    assert.equal(comments[0].body, 'This comment was removed.');
    assert.equal(comments[1].body, 'Answer retained.');
    assert.equal((await post(payload({ parentId: root.id }))).status, 400);
    assert.equal((await (await post(root)).json()).comment.body, 'This comment was removed.');
});

test('paginates without omissions and preserves plain text without server diagnostics', async () => {
    for (let i = 0; i < 102; i++) {
        await db.query('insert into public.report_comments(id,thread_id,author,body) values ($1,$2,$3,$4)',
            [randomUUID(), thread, 'Reader', i === 0 ? '<script>alert(1)</script>\nSecond line' : `Comment ${i}`]);
    }
    const page1 = await (await get()).json();
    const page2 = await (await get(thread, page1.next)).json();
    assert.equal(page1.comments.length, 100);
    assert.equal(page2.comments.length, 2);
    assert.equal(page2.next, null);
    assert.equal(new Set([...page1.comments, ...page2.comments].map(c => c.id)).size, 102);
    assert.equal(page1.comments[0].body, '<script>alert(1)</script>\nSecond line');
    assert.deepEqual(Object.keys(page1.comments[0]).sort(), ['author', 'body', 'created_at', 'hidden', 'id', 'parent_id', 'sequence']);
});

test('anonymous and authenticated database clients cannot bypass the HTTP function', async () => {
    for (const role of ['anon', 'authenticated']) {
        await db.exec(`set role ${role}`);
        try {
            await assert.rejects(db.query('select * from public.report_comments'), /permission denied/);
            await assert.rejects(db.query("insert into public.report_comments(id,thread_id,author,body) values ($1,$2,'x','x')", [randomUUID(), thread]), /permission denied/);
            await assert.rejects(db.query('select public.submit_report_comment($1,$2,null,$3,$4,$5)', [randomUUID(), thread, 'x', 'x', 'a'.repeat(64)]), /permission denied/);
        } finally { await db.exec('reset role'); }
    }
    await db.exec('set role service_role');
    try {
        const result = await db.query('select public.submit_report_comment($1,$2,null,$3,$4,$5) as saved', [randomUUID(), thread, 'Reader', 'Works through service role.', 'b'.repeat(64)]);
        assert.equal(result.rows[0].saved.author, 'Reader');
    } finally { await db.exec('reset role'); }
});

test('fails closed on missing config, disallowed origins, malformed cursors and upstream failure', async () => {
    assert.equal((await createHandler({})(new Request(url))).status, 503);
    assert.equal((await handler(new Request(url))).status, 403);
    assert.equal((await handler(new Request(url, { headers: { origin: 'https://other.example' } }))).status, 403);
    assert.equal((await handler(new Request(url, { method: 'DELETE', headers: { origin } }))).status, 405);
    const preflight = await handler(new Request(url, { method: 'OPTIONS', headers: { origin } }));
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get('access-control-allow-origin'), origin);
    assert.equal((await get(thread, '1&select=*')).status, 400);
    const broken = createHandler(config, async () => { throw new Error(config.serviceKey); });
    const response = await broken(new Request(`${url}?thread=${thread}`, { headers: { origin } }));
    assert.equal(response.status, 503);
    assert.ok(!(await response.text()).includes(config.serviceKey));
});

test('disabled comments reject reads and writes without accessing the database', async () => {
    let accessed = false;
    const disabled = createHandler({ ...config, enabled: false }, async () => { accessed = true; throw new Error('Must not reach the database'); });
    for (const method of ['GET', 'POST', 'OPTIONS']) {
        const response = await disabled(new Request(url, { method, headers: { origin } }));
        assert.equal(response.status, 503);
        assert.equal((await response.json()).error, 'Comments are currently disabled.');
    }
    assert.equal(accessed, false);
});
