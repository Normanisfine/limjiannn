import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';

// Real PostgreSQL semantics, with only the Supabase REST transport replaced locally.
export async function createDatabase() {
    const db = new PGlite();
    await db.exec('create role anon; create role authenticated; create role service_role bypassrls;');
    await db.exec(await readFile(new URL('../supabase/migrations/202609150001_report_comments.sql', import.meta.url), 'utf8'));
    const transport = async (url, options = {}) => {
        try {
            const path = new URL(url);
            let data;
            if (path.pathname.endsWith('/rpc/submit_report_comment')) {
                const p = JSON.parse(options.body);
                const result = await db.query('select public.submit_report_comment($1,$2,$3,$4,$5,$6) as comment',
                    [p.p_id, p.p_thread, p.p_parent, p.p_author, p.p_body, p.p_fingerprint]);
                data = result.rows[0].comment;
            } else {
                const thread = path.searchParams.get('thread_id').slice(3);
                const after = path.searchParams.get('sequence').slice(3);
                data = (await db.query('select id,parent_id,sequence,author,body,created_at,hidden from public.report_comments where thread_id=$1 and sequence>$2 order by sequence asc limit 101', [thread, after])).rows;
            }
            return Response.json(data);
        } catch (error) {
            return Response.json({ code: error.code, message: error.message }, { status: 400 });
        }
    };
    return { db, transport };
}
