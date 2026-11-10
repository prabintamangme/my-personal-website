# LEARNINGEVERGROW

A responsive portfolio, publishing platform, learning library, newsletter landing page, contact system, and secure content administration area for Prabin Tamang.

## Stack

- TypeScript, React 19, Next.js 16, and Vinext for server rendering on Cloudflare Workers.
- Cloudflare D1 with a Drizzle schema for content, admin access, enquiries, subscribers, services, lessons, and settings.
- Cloudflare R2 for PDFs and images.
- Platform-managed Sign in with ChatGPT for administrator identity. No password is hardcoded or stored by this project.
- Zod validation on public and administrative mutations.

The local preview uses Wrangler’s D1/R2 emulation. Demonstration content is kept in `lib/site-data.ts` for development only; production public lists omit it so unfinished material is not launched.

## Local setup

Requirements: Node.js 22.13 or newer and pnpm/npm.

1. Install dependencies: `pnpm install` (or `npm ci`).
2. Copy `.env.example` to `.env.local`; do not commit secrets.
3. Build once so Vinext emits the local Worker configuration: `pnpm build`.
4. Apply the migrations to local D1:

   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_learningevergrow.sql`

   `node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_subscriber_preferences.sql`

5. Start development: `pnpm dev`.
6. Visit `/signin-with-chatgpt?return_to=/admin/setup` in local development. The starter provides a local-only mock identity. Claim the first administrator, then open `/admin`.

Without the migrations, contact storage, subscriber preferences, and admin setup correctly report that storage is unavailable.

## Publishing content

1. Sign in and open `/admin`.
2. Create a draft with a title, URL slug, summary, body, type, topic, author, and tags.
3. For another author’s work, choose “Curated external work” and add the original author, source, URL, attribution type, and permissions note. Use a summary and outbound link unless full-text permission is confirmed.
4. Optionally upload a PDF or image (PDF/JPEG/PNG/WebP, maximum 8 MB).
5. Keep the workflow set to “Save as draft” until reviewed; switch to “Publish” to make it public.
6. Edit, preview, unpublish, or delete real records from the content table.

The first version uses safe plain-text authoring with `##` for section headings and `>` for quotations. It renders text as React nodes rather than accepting arbitrary HTML.

## Profile, services, and lessons

The About page contains only the biography supplied for Prabin. Draft service ideas in `lib/site-data.ts` are never represented as active offerings; the Services page queries only confirmed, published database records. The schema also includes learning-path and lesson tables for future verified resources.

## Contact

Contact submissions receive client and server validation, a honeypot, minimum-fill-time check, and D1-backed rate limit. Success appears only after D1 confirms storage. Records are never publicly exposed. Configure a strong `RATE_LIMIT_SALT` in production.

## Newsletter

Signup stays disabled until `NEWSLETTER_PROVIDER_URL`, `NEWSLETTER_PROVIDER_TOKEN`, and `NEWSLETTER_PROVIDER_VERIFY_URL` are configured. The adapter requests `doubleOptIn: true`; the confirmation page shows a completed subscription only after the provider verifies its receipt. Pending subscribers can retry without duplicate records, while active subscribers regain access to the configured guide. The provider must send confirmation and guide links, support unsubscribe links, and return `{ confirmed: true, email }` from its verification endpoint.

The free-PDF offer is hidden until both `NEXT_PUBLIC_FREE_PDF_TITLE` and `NEXT_PUBLIC_FREE_PDF_URL` point to the real resource. Phone messaging consent remains hidden unless `NEXT_PUBLIC_PHONE_UPDATES_AVAILABLE=true` and `MESSAGING_PROVIDER_URL` is also configured. A phone number is never required for email updates.

## Production storage and deployment

The tracked `.openai/hosting.json` declares D1 as `DB` and R2 as `BUCKET`. The Sites deployment workflow provisions and binds these resources, applies tracked migrations, builds the Worker, and uploads the source archive. Configure runtime secrets in the Sites control plane—not in source—and set `NEXT_PUBLIC_SITE_URL` to the final canonical URL.

Before public launch:

- Add real publications and confirm every date, author, source, and permission statement.
- Configure a newsletter provider and update Privacy.
- Confirm each draft service before publishing it.
- Add a CV only when the real file is available.
- Run production build, browser, keyboard, and responsive QA.

## Security notes

- The first-admin endpoint works only for a platform-authenticated identity and only while no admin row exists.
- Every admin mutation checks identity and database membership server-side.
- Upload type and size are validated server-side and files are served with `nosniff`.
- Admin and API paths are excluded from search indexing.
- Secrets stay server-side and are documented by name only.

## Current limitations

- The CMS fully manages core publication records and media. Dedicated editor screens for secondary models (services, learning paths, lessons, settings) are the next increment.
- Contact enquiries are counted in the dashboard but do not yet have a full inbox/status UI.
- Newsletter delivery and double opt-in are delegated to the configured provider; this review build has no provider credentials or PDF file.
- No public deployment was attempted because this version is intentionally prepared for review first.
