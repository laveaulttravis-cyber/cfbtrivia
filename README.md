# Stump the Saturday -- CFB Trivia

Phase 1 build per `cfb_trivia_claude_code_brief.md`: Next.js (App Router) +
Supabase, ported from the `cfb_trivia_unified_app.jsx` mockup.

## What's here

- **Sign-up gate before playing.** Every route except `/login`, `/auth/callback`,
  and `/invite/*` requires a signed-in session (enforced in `middleware.ts`).
  Sign-in is email magic-link (no password) via Supabase Auth -- that email is
  what lands in `auth.users`/`profiles.email` for remarketing. Right after
  first sign-in, `/onboarding` requires picking a favorite school before the
  app unlocks (`profiles.school_id`).
- **Daily Drive**, rebuilt against real endpoints: `GET /api/daily/today`
  publishes (once, server-side, seeded by date) and returns the shared daily
  set; `POST /api/daily/submit` grades it authoritatively and computes the
  streak server-side. Both use the service-role client (`lib/supabase/admin.ts`)
  so a client can't forge a score or a streak by calling Supabase directly.
- **Friends system + challenge sharing.** Every profile gets a short invite
  code at onboarding. `/friends` shows your invite link, a "redeem a friend's
  code" box, and a friends-only leaderboard of today's Daily Drive scores.
  The Daily Drive results screen has a "Share & Challenge a Friend" button
  (Web Share API with clipboard fallback) that includes your invite link, so
  sending your score doubles as a friend invite. Opening someone's invite
  link (`/invite/[code]`) previews who sent it and adds the friendship on
  accept.
- **Classic Solo/VS** (`/classic`) is ported unmodified from the mockup:
  fully client-side, no network calls, never touches the leaderboard --
  exactly per the brief's scope.

## Data model

See `supabase/migrations/0001_init.sql`. Matches the brief's rough schema,
with `profiles` in place of `users` (Supabase reserves `auth.users`) and an
added `invite_code` column + `friendships`/invite RPCs for the challenge
flow. RLS notes:

- `daily_questions` has no client-facing select policy -- the answer key is
  only ever read server-side (`ensureDailySet`) via the service-role client.
- `daily_results` has no client-facing insert policy -- rows are only
  written by `POST /api/daily/submit`, so a score/streak can't be written
  directly from the browser.
- `friendships` has no client-facing insert policy either -- both directions
  of a friendship are written atomically by the `redeem_invite_code()`
  Postgres function (`security definer`), which also validates the code and
  rejects self-adds.

## Getting it running

1. Create a Supabase project, then run `supabase/migrations/0001_init.sql`
   against it (SQL editor, or `supabase db push` if you use the CLI).
2. Copy `.env.example` to `.env.local` and fill in your project's URL, anon
   key, and service role key (Settings -> API in the Supabase dashboard).
   In the Supabase Auth settings, make sure "Confirm email" magic-link
   redirect allows `http://localhost:3000/auth/callback` (and your deployed
   URL's `/auth/callback` once you have one).
3. `npm install`
4. `npm run dev`

## Known follow-ups

- `npm audit` currently flags Next.js/PostCSS advisories that are only fixed
  in Next 16, which is a breaking major-version jump out of scope for this
  pass -- worth revisiting before a real launch.
- Daily Drive sends the correct answers to the client alongside the
  questions (for instant per-question feedback during play, matching the
  mockup's UX) and only trusts its own server-side re-grading for the score
  that gets stored. That's an acceptable trade for a casual trivia game, but
  if stricter anti-cheat ever matters, the fix is grading one question at a
  time against the server instead.
- The friends leaderboard only shows *today's* Daily Drive score. An
  all-time or weekly view would need a small aggregation query against
  `daily_results`, deliberately left out to keep this pass scoped to the
  brief.
- Global/school-vs-school leaderboards and payments/sponsorship are
  explicitly out of Phase 1 scope per the brief.
