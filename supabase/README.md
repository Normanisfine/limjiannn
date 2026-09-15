# Research comments: one-time setup

The website remains a static GitHub Pages site. Supabase hosts the comments database and one public Edge Function. Visitors use **Name / role** and **Comment**; nobody needs to sign in to comment or reply. Only you need a Supabase account to administer it.

## Current deployment · 2026-09-15

**Comments are disabled at the user's request.** The website hides all discussions through `src/app/update/d817cfe2/comments-config.ts`, and the hosted function rejects reads and writes unless `COMMENTS_ENABLED=true`. Existing database records and implementation are retained.

To re-enable later, set the Supabase function secret `COMMENTS_ENABLED=true`, set `commentsEnabled = true` in the website's configuration file, and rebuild/deploy the website. Keep both disabled until explicitly requested.

- Project: [report comments](https://supabase.com/dashboard/project/scktzntpxzqcixqlpzdj), linked to this repository locally.
- Database: schema and function verified against the local migration; migration `202609150001` recorded as applied. **Do not run the initial SQL again on this project.**
- Function: `report-comments` deployed with `COMMENTS_ENABLED=false`; comment access is disabled.
- Public URL: `https://scktzntpxzqcixqlpzdj.supabase.co/functions/v1/report-comments`.
- Allowed website origins: `https://limjiannn.com`, `http://limjiannn.com`, `http://localhost:3000`, and `http://127.0.0.1:3000`.
- Local `.env.local` is configured. The Pages workflow also supplies this URL by default; no GitHub variable is required. A repository variable can override it later.
- The website's report route still needs to be published through the normal GitHub Pages deployment. The backend is already deployed independently.

The instructions below document setup and recovery. Skip completed steps for the current project.

## 1. Create the project and tables

1. Open the [comments project](https://supabase.com/dashboard/project/scktzntpxzqcixqlpzdj). The designated project reference is `scktzntpxzqcixqlpzdj`.
2. Open **SQL Editor → New query**. Paste and run [`migrations/202609150001_report_comments.sql`](migrations/202609150001_report_comments.sql) once. It creates the tables, access restrictions, initial blueprint/report threads, and submission function.
3. Keep the project reference `scktzntpxzqcixqlpzdj` for the deployment commands below.

Run the migration only once. If using the CLI for future database migrations, first record this manually applied migration with `npx supabase migration repair 202609150001 --status applied` after linking your project.

## 2. Deploy the comment function

Run these commands from the website repository using Node.js 22 or newer:

```bash
npx supabase login
npx supabase link --project-ref scktzntpxzqcixqlpzdj
```

In the dashboard's **Edge Functions → Secrets**, add:

- `COMMENTS_ALLOWED_ORIGINS`: the exact website origin, e.g. `https://normanisfine.github.io`. Use your actual domain if different. No trailing slash or URL path. For local previews, also add `http://localhost:3000`, separated by a comma.
- `COMMENTS_RATE_SALT`: a random secret. Generate one with `openssl rand -hex 32`. Keep it only in Supabase secrets; do not paste it into this repository or the chat.

Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` automatically in hosted Edge Functions. The service key stays on the server; it must never appear in a `NEXT_PUBLIC_*` variable or GitHub Pages artifact.

Deploy:

```bash
npx supabase functions deploy report-comments --project-ref scktzntpxzqcixqlpzdj
```

The checked-in `config.toml` disables JWT verification for this function, so guest submissions work without a login. The function validates requests and enforces write limits through the database. Its URL will be:

```text
https://scktzntpxzqcixqlpzdj.supabase.co/functions/v1/report-comments
```

## 3. Connect the website

The workflow already uses this project's public function URL. To override it for a different deployment, open GitHub **Settings → Secrets and variables → Actions → Variables** and add a repository variable:

```text
NEXT_PUBLIC_COMMENTS_URL=https://scktzntpxzqcixqlpzdj.supabase.co/functions/v1/report-comments
```

The Pages workflow passes the override (or its configured default) into the build. Trigger **Deploy to GitHub Pages** again after changing it. Static exports read this value at build time.

For a local preview, copy `.env.example` to `.env.local`, set the same public function URL, then build and preview:

```bash
npm run build
npm run preview
```

Add the preview origin to `COMMENTS_ALLOWED_ORIGINS` if you use it. When the URL is unset, the page honestly says comments are not available yet and does not pretend to save anything.

## 4. Verify the live connection

1. Open `/update/d817cfe2` and expand the latest report's **Comments & replies**.
2. Submit a short test comment with one **Name / role** field.
3. Click **Reply**, enter your name / role and answer, then post it. It appears beneath the original comment. Other readers can reply there too.
4. Open the comment's **Link** in a fresh browser tab. The correct discussion should open and scroll to that comment. Replies also link back to the original comment.
5. Reload the page: both entries must persist. Post in the blueprint and confirm it has a separate discussion.
6. In Supabase's Table Editor, mark test entries `hidden = true` to remove their text from public display.

## Future reports

The page automatically adds a comment component for every entry in `updates/index.ts`. Keep each exported `reportId` stable. The blueprint always uses `blueprint`; editing its content keeps its discussion.

For each new report, register its ID in Supabase SQL Editor (or a new migration), using the actual dates:

```sql
insert into public.report_comment_threads (id, title)
values ('d817cfe2:report-2026-09-28', '2026-09-15 - 2026-09-28')
on conflict (id) do nothing;
```

No function redeployment is needed when adding a thread. Changing an existing thread ID disconnects its comments from the page, so preserve IDs through reorganizations and date-title edits.

## Replies, moderation, and persistence

- Each original comment has a flat list of replies. Use the original comment's **Reply** button to continue that discussion; there is one indentation level for fast reading. Names and roles are self-declared, including yours—there are no verified author badges.
- Comments are plain text. HTML is displayed as text. URLs pasted into the body are also plain text; the built-in **Link** and **Original comment** controls provide discussion links.
- Readers with the URL can read and post. The token URL and origin allowlist do not authenticate lab membership.
- In Supabase Table Editor, filter `report_comments` by `thread_id`. Set `hidden = true` to replace an entry with a tombstone while preserving its replies and links. There are no public edit/delete endpoints. To erase its stored text too, replace `author` and `body` with `Removed` while keeping the row and its IDs.
- Submissions are limited to 5 per minute and 30 per hour per daily salted IP fingerprint, plus 200 per hour across the site. People on a shared network share the per-address limit. These are basic abuse controls, not a full bot defense; add a server-verified CAPTCHA if unsolicited traffic becomes an issue.
- Rate-limit buckets older than one day are removed on the next successful submission. Raw IP addresses are not stored in our tables; hosting-provider logs are governed separately.
- The browser only remembers the last submitted name / role. Comments live in Supabase and survive reloads, new devices, and website deployments. Keep the project active and retain periodic database exports/backups; do not delete the project when redeploying the site.

## Checks and troubleshooting

```bash
npm run test:comments
npm run lint -- src/app/update/d817cfe2 supabase/functions/report-comments/handler.mjs
npm run build
```

The tests run the SQL migration in an embedded PostgreSQL engine and exercise the HTTP handler. They cover persistence, reply isolation, deduplicated retries, access restrictions, moderation, pagination, and rate limits. A hosted Supabase smoke test from step 4 is still needed after deployment.

- **Comments are not available yet:** set the public URL and rebuild the website.
- **401 / invalid JWT:** deploy from this repository so `verify_jwt = false` is applied.
- **403 / CORS error:** check the exact browser origin against `COMMENTS_ALLOWED_ORIGINS`.
- **Invalid discussion or parent:** register the report ID; replies must point to an existing visible original comment in that same thread.
- **503:** check that the migration ran and the function's server-side environment is configured. Inspect Supabase function logs; never expose the service key while debugging.

References: [Supabase Edge Functions](https://supabase.com/docs/guides/functions), [function configuration](https://supabase.com/docs/guides/functions/function-configuration), [server-side secrets](https://supabase.com/docs/guides/functions/secrets).
