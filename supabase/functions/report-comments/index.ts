import { createHandler } from './handler.mjs';

Deno.serve(createHandler({
    enabled: Deno.env.get('COMMENTS_ENABLED') === 'true',
    supabaseUrl: Deno.env.get('SUPABASE_URL'),
    serviceKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
    allowedOrigins: Deno.env.get('COMMENTS_ALLOWED_ORIGINS'),
    rateSalt: Deno.env.get('COMMENTS_RATE_SALT'),
}));
