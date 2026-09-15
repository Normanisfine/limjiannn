const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const THREAD = /^d817cfe2:(blueprint|report-\d{4}-\d{2}-\d{2})$/;
const MAX_BYTES = 20000;

async function readBody(request) {
    if (!request.body) throw new Error('Invalid request');
    const reader = request.body.getReader();
    let size = 0;
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) {
            await reader.cancel();
            throw new Error('Request too large');
        }
        chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder().decode(bytes));
}

function publicComment(row) {
    return {
        id: row.id, parent_id: row.parent_id, sequence: row.sequence,
        author: row.hidden ? 'Removed comment' : row.author,
        body: row.hidden ? 'This comment was removed.' : row.body,
        created_at: row.created_at, hidden: row.hidden,
    };
}

// Dependency injection lets the public endpoint be tested without a live project.
export function createHandler(config, fetcher = fetch) {
    const origins = (config.allowedOrigins || '').split(',').map(v => v.trim()).filter(Boolean);
    return async function handler(request) {
        const origin = request.headers.get('origin');
        const headers = {
            'Content-Type': 'application/json', 'Cache-Control': 'no-store',
            'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff',
        };
        if (origin && origins.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
        const respond = (status, data) => new Response(JSON.stringify(data), { status, headers });
        if (config.enabled !== true) return respond(503, { error: 'Comments are currently disabled.' });
        if (!config.supabaseUrl || !config.serviceKey || !config.rateSalt || !origins.length) {
            return respond(503, { error: 'Comments are not available yet. Please try again later.' });
        }
        // CORS is a browser boundary, not authentication; the discussion is intentionally unlisted.
        if (!origin || !origins.includes(origin)) return respond(403, { error: 'This site is not allowed.' });
        if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: {
            ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400',
        } });
        if (!['GET', 'POST'].includes(request.method)) return respond(405, { error: 'Method not allowed.' });
        const database = async (path, options = {}) => {
            const response = await fetcher(`${config.supabaseUrl}/rest/v1/${path}`, {
                ...options, signal: AbortSignal.timeout(10000), headers: {
                    apikey: config.serviceKey, Authorization: `Bearer ${config.serviceKey}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            return { ok: response.ok, data };
        };
        try {
            if (request.method === 'GET') {
                const url = new URL(request.url);
                const thread = url.searchParams.get('thread') || '';
                const after = url.searchParams.get('after') || '0';
                if (!THREAD.test(thread) || !/^\d{1,15}$/.test(after)) return respond(400, { error: 'Invalid discussion.' });
                const query = new URLSearchParams({
                    select: 'id,parent_id,sequence,author,body,created_at,hidden',
                    thread_id: `eq.${thread}`, sequence: `gt.${after}`, order: 'sequence.asc', limit: '101',
                });
                const result = await database(`report_comments?${query}`);
                if (!result.ok) return respond(503, { error: 'Could not load comments. Please try again.' });
                const rows = result.data.slice(0, 100);
                return respond(200, { comments: rows.map(publicComment), next: result.data.length > 100 ? rows.at(-1).sequence : null });
            }
            if (!request.headers.get('content-type')?.startsWith('application/json')) {
                return respond(415, { error: 'Send a JSON request.' });
            }
            let input;
            try { input = await readBody(request); }
            catch { return respond(400, { error: 'Invalid or oversized comment.' }); }
            if (!input || typeof input !== 'object' || Array.isArray(input)) return respond(400, { error: 'Invalid comment.' });
            const { id, thread, parentId = null, website = '' } = input;
            const author = typeof input.author === 'string' ? input.author.trim() : '';
            const body = typeof input.body === 'string' ? input.body.trim() : '';
            if (typeof website !== 'string' || website !== '') return respond(400, { error: 'Could not submit this comment.' });
            if (typeof id !== 'string' || !UUID.test(id) || typeof thread !== 'string' || !THREAD.test(thread)
                || (parentId !== null && (typeof parentId !== 'string' || !UUID.test(parentId)))
                || !author || author.length > 100 || /[\r\n\u0000-\u001f]/.test(author)
                || !body || body.length > 4000 || body.includes('\u0000')) {
                return respond(400, { error: 'Enter a name / role (up to 100 characters) and a comment (up to 4,000 characters).' });
            }
            // Supabase's gateway forwards client IPs. Store only a salted daily hash in short-lived rate buckets.
            const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
            const bytes = new TextEncoder().encode(`${config.rateSalt}:${new Date().toISOString().slice(0, 10)}:${ip}`);
            const digest = await crypto.subtle.digest('SHA-256', bytes);
            const fingerprint = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
            const result = await database('rpc/submit_report_comment', {
                method: 'POST', body: JSON.stringify({
                    p_id: id, p_thread: thread, p_parent: parentId,
                    p_author: author, p_body: body, p_fingerprint: fingerprint,
                }),
            });
            if (!result.ok) {
                const code = result.data.code;
                if (code === 'P0429') return respond(429, { error: 'Too many comments in a short time. Please try again later.' });
                if (code === 'P0400' || code === '23503') return respond(400, { error: 'This discussion or parent comment is unavailable. Refresh and try again.' });
                if (code === 'P0409') return respond(409, { error: 'This submission has already been used. Refresh before posting another comment.' });
                return respond(503, { error: 'Could not save your comment. Your text is still here; please retry.' });
            }
            return respond(200, { comment: publicComment(result.data) });
        } catch {
            // Never send database diagnostics or secrets to visitors.
            return respond(503, { error: 'Comments are temporarily unavailable. Please try again.' });
        }
    };
}
