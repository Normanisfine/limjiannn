'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './comments.module.css';

type Comment = {
    id: string; parent_id: string | null; sequence: number;
    author: string; body: string; created_at: string; hidden: boolean;
};
type Page = { comments: Comment[]; next: number | null };
const endpoint = process.env.NEXT_PUBLIC_COMMENTS_URL?.trim();
const authorStorage = 'lingjie-report-comment-name';

function mergeComments(previous: Comment[], incoming: Comment[]) {
    return [...new Map([...previous, ...incoming].map(comment => [comment.id, comment])).values()]
        .sort((a, b) => a.sequence - b.sequence);
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, { ...options, cache: 'no-store', signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Comments are temporarily unavailable. Please try again.');
    return data;
}

export default function CommentThread({ threadId, title }: { threadId: string; title: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [next, setNext] = useState<number | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [replyTo, setReplyTo] = useState<Comment | null>(null);
    const [sending, setSending] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [notice, setNotice] = useState('');
    const [ready, setReady] = useState(false);
    const panel = useRef<HTMLDetailsElement>(null);
    const composer = useRef<HTMLTextAreaElement>(null);
    const loadingRef = useRef(false);
    const loadedRef = useRef(false);
    const sendingRef = useRef(false);
    const honeypot = useRef<HTMLInputElement>(null);
    // Keep the UUID across retries when the server may have saved a timed-out request.
    const pending = useRef<{ signature: string; id: string } | null>(null);
    const thread = `d817cfe2:${threadId}`;
    const prefix = `comment-${threadId}-`;
    const formId = `${threadId}-comment-form`;

    const load = useCallback(async (after = 0, target?: string) => {
        if (!endpoint || loadingRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        setLoadError('');
        try {
            let cursor = after;
            let found = false;
            do {
                const url = new URL(endpoint);
                url.searchParams.set('thread', thread);
                url.searchParams.set('after', String(cursor));
                const page = await request<Page>(url.toString());
                setComments(previous => mergeComments(previous, page.comments));
                setNext(page.next);
                setLoaded(true);
                loadedRef.current = true;
                found = !!target && page.comments.some(comment => `${prefix}${comment.id}` === target);
                if (!target || found || page.next === null) break;
                cursor = page.next;
            } while (true);
            if (target && found) requestAnimationFrame(() => {
                document.getElementById(target)?.scrollIntoView({ block: 'center' });
                document.getElementById(target)?.focus({ preventScroll: true });
            });
            if (target && !found) setLoadError('This linked comment could not be found. It may have been deleted.');
        } catch (error) {
            setLoadError(error instanceof Error ? error.message : 'Could not load comments. Please retry.');
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, [prefix, thread]);

    useEffect(() => {
        const revealLinkedComment = () => {
            const hash = window.location.hash.slice(1);
            if (!hash.startsWith(prefix) && hash !== `${threadId}-comments`) return;
            // Open both the comment disclosure and, for blueprint links, its enclosing disclosure.
            let element: HTMLElement | null = panel.current;
            while (element) {
                if (element instanceof HTMLDetailsElement) element.open = true;
                element = element.parentElement;
            }
            const existing = document.getElementById(hash);
            if (existing && hash.startsWith(prefix)) existing.scrollIntoView({ block: 'center' });
            else void load(0, hash.startsWith(prefix) ? hash : undefined);
        };
        // Run after hydration; form labels and saved identity are local to this browser.
        const timer = window.setTimeout(() => {
            setReady(true);
            try { setAuthor(localStorage.getItem(authorStorage) || ''); } catch { /* Storage may be disabled. */ }
            revealLinkedComment();
        }, 0);
        window.addEventListener('hashchange', revealLinkedComment);
        return () => { window.clearTimeout(timer); window.removeEventListener('hashchange', revealLinkedComment); };
    }, [load, prefix, threadId]);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!endpoint || sendingRef.current) return;
        const payload = { thread, author: author.trim(), body: body.trim(), parentId: replyTo?.id || null };
        if (!payload.author || !payload.body) { setSubmitError('Please enter your name / role and comment.'); return; }
        const signature = JSON.stringify(payload);
        if (pending.current?.signature !== signature) pending.current = { signature, id: crypto.randomUUID() };
        sendingRef.current = true;
        setSending(true);
        setSubmitError('');
        setNotice('');
        try {
            const result = await request<{ comment: Comment }>(endpoint, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payload, id: pending.current.id, website: honeypot.current?.value || '' }),
            });
            setComments(previous => mergeComments(previous, [result.comment]));
            setBody('');
            setReplyTo(null);
            setNotice(payload.parentId ? 'Reply posted.' : 'Comment posted.');
            pending.current = null;
            try { localStorage.setItem(authorStorage, payload.author); } catch { /* Posting works without storage. */ }
            requestAnimationFrame(() => {
                const element = document.getElementById(`${prefix}${result.comment.id}`);
                element?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                element?.focus({ preventScroll: true });
            });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Could not save your comment. Please retry.');
        } finally {
            sendingRef.current = false;
            setSending(false);
        }
    }

    function reply(comment: Comment) {
        setReplyTo(comment);
        setNotice('');
        setSubmitError('');
        composer.current?.focus();
        composer.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    function commentCard(comment: Comment, isReply = false) {
        return <article id={`${prefix}${comment.id}`} tabIndex={-1} className={styles.comment} key={comment.id}>
            <header className={styles.meta}>
                <strong>{comment.author}</strong>
                <a href={`#${prefix}${comment.id}`} aria-label={`Link to ${isReply ? 'reply' : 'comment'} by ${comment.author}`}>
                    <time dateTime={comment.created_at}>{new Date(comment.created_at).toLocaleString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
                    })}</time> · Link
                </a>
            </header>
            {isReply && <a className={styles.parentLink} href={`#${prefix}${comment.parent_id}`}>↳ Original comment</a>}
            <p className={styles.text}>{comment.body}</p>
            {!isReply && !comment.hidden && <button type="button" disabled={sending} onClick={() => reply(comment)} className={styles.textButton}>Reply</button>}
        </article>;
    }

    return <details ref={panel} id={`${threadId}-comments`} className={styles.thread}
        onToggle={event => { if (event.currentTarget.open && !loadedRef.current) void load(); }}>
        <summary><span>Comments & replies</span><span className={styles.hint}>{loaded ? `${comments.length}${next !== null ? '+' : ''}` : 'Join the discussion'}</span></summary>
        <div className={styles.content}>
            <p className={styles.intro}>Feedback on {title}. Just your name / role and a comment—no login.</p>
            {!endpoint ? <p className={styles.status}>Comments will be available here once setup is complete.</p> : <>
                <noscript><p className={styles.status}>Enable JavaScript to load comments and post a reply.</p></noscript>
                <div className={styles.actions}>
                    <a href={`#${threadId}-comments`}>Discussion link</a>
                    <button className={styles.textButton} type="button" disabled={loading} onClick={() => void load()}>Refresh comments</button>
                </div>
                {loading && <p role="status" className={styles.status}>Loading comments…</p>}
                {loadError && <div role="alert" className={styles.error}>{loadError} <button type="button" className={styles.textButton} disabled={loading} onClick={() => void load()}>Retry loading</button></div>}
                {loaded && comments.length === 0 && <p className={styles.status}>No comments yet. Start the discussion.</p>}
                <div aria-label={`Comments on ${title}`}>
                    {comments.filter(comment => !comment.parent_id).map(comment => <div key={comment.id} className={styles.conversation}>
                        {commentCard(comment)}
                        <div className={styles.replies}>
                            {comments.filter(reply => reply.parent_id === comment.id).map(reply => commentCard(reply, true))}
                        </div>
                    </div>)}
                </div>
                {next !== null && <button type="button" className={styles.textButton} disabled={loading} onClick={() => void load(next)}>Load more comments</button>}
                <form id={formId} className={styles.form} onSubmit={submit} aria-label={`Leave feedback on ${title}`}>
                    <div className={styles.formHeading}>
                        <strong>{replyTo ? `Reply to ${replyTo.author}` : 'Leave a comment'}</strong>
                        {replyTo && <button type="button" disabled={sending} className={styles.textButton} onClick={() => setReplyTo(null)}>Cancel reply</button>}
                    </div>
                    {replyTo && <blockquote className={styles.quote}>{replyTo.body.slice(0, 180)}{replyTo.body.length > 180 ? '…' : ''}</blockquote>}
                    <label htmlFor={`${formId}-author`}>Name / role</label>
                    <input id={`${formId}-author`} name="author" autoComplete="name" placeholder="e.g. Mingjian / researcher" required maxLength={100} value={author} onChange={event => setAuthor(event.target.value)} disabled={!ready || sending} />
                    <label htmlFor={`${formId}-body`}>{replyTo ? 'Reply' : 'Comment'}</label>
                    <textarea ref={composer} id={`${formId}-body`} name="body" rows={4} required maxLength={4000} value={body} onChange={event => setBody(event.target.value)} disabled={!ready || sending} />
                    <div className={styles.trap} aria-hidden="true"><label>Leave this blank<input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" /></label></div>
                    <div className={styles.formFooter}>
                        <span className={styles.hint}>Names / roles are self-declared.</span>
                        <button className={styles.submit} type="submit" disabled={!ready || sending}>{sending ? 'Posting…' : replyTo ? 'Post reply' : 'Post comment'}</button>
                    </div>
                    {submitError && <p role="alert" className={styles.error}>{submitError} Your text has been kept.</p>}
                    <p role="status" className={styles.status}>{notice}</p>
                </form>
            </>}
        </div>
    </details>;
}
