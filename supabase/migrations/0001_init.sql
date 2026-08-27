-- CFB Trivia -- Phase 1 schema (Daily Drive accounts, friends-only leaderboard).
-- Classic Solo/VS is intentionally client-only and has no tables here.

-- ---------------------------------------------------------------------------
-- schools
-- ---------------------------------------------------------------------------
create table if not exists public.schools (
  id text primary key,
  name text not null,
  color_hex text not null
);

alter table public.schools enable row level security;

create policy "schools are publicly readable"
  on public.schools for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- profiles ("users" in the brief's data model -- named profiles to avoid
-- colliding with Supabase's own auth.users table, and to follow convention:
-- one row per auth.users, same primary key).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text not null,
  school_id text references public.schools (id),
  invite_code text not null unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- You can always see your own profile. You can also see a friend's profile
-- (needed to render their name/school on the friends leaderboard). Everyone
-- else's profile -- including their email -- stays hidden; the invite flow
-- goes through the get_profile_by_invite_code() function below instead of a
-- direct table read, so a code can be resolved without a friendship existing
-- yet.
create policy "read own or friend profile"
  on public.profiles for select
  to authenticated
  using (
    id = auth.uid()
    or exists (
      select 1 from public.friendships f
      where f.user_id = auth.uid() and f.friend_user_id = profiles.id
    )
  );

create policy "insert own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- daily_questions -- one shared, server-published row per calendar date.
-- No select policy is defined for anon/authenticated on purpose: the set
-- (which embeds correct answers) is only ever read by server code using the
-- service-role key, via GET /api/daily/today.
-- ---------------------------------------------------------------------------
create table if not exists public.daily_questions (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  question_set jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.daily_questions enable row level security;

-- ---------------------------------------------------------------------------
-- daily_results
-- ---------------------------------------------------------------------------
create table if not exists public.daily_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  date date not null,
  score integer not null,
  correct_flags jsonb not null,
  bonus_wager integer not null,
  bonus_correct boolean not null,
  streak_at_time integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

alter table public.daily_results enable row level security;

create index if not exists daily_results_user_date_idx
  on public.daily_results (user_id, date desc);

-- Read your own results, or a friend's (for the friends leaderboard).
create policy "read own or friend daily_results"
  on public.daily_results for select
  to authenticated
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.friendships f
      where f.user_id = auth.uid() and f.friend_user_id = daily_results.user_id
    )
  );

-- No insert/update/delete policy: rows are written exclusively by the
-- POST /api/daily/submit route using the service-role key, so a client can't
-- write an arbitrary score or backdate a streak by calling supabase-js
-- directly from the browser.

-- ---------------------------------------------------------------------------
-- friendships -- simple mutual-add model: adding a friend inserts both
-- directions (user_id, friend_user_id) and (friend_user_id, user_id) so the
-- relationship can always be read from "my side" alone.
-- ---------------------------------------------------------------------------
create table if not exists public.friendships (
  user_id uuid not null references public.profiles (id) on delete cascade,
  friend_user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'accepted',
  created_at timestamptz not null default now(),
  primary key (user_id, friend_user_id),
  check (user_id <> friend_user_id)
);

alter table public.friendships enable row level security;

create policy "read own friendships"
  on public.friendships for select
  to authenticated
  using (user_id = auth.uid() or friend_user_id = auth.uid());

-- No insert policy: friendships are only ever created by
-- redeem_invite_code() below, which runs as the table owner (security
-- definer) and writes both directions of the pair atomically. A client
-- can't insert an arbitrary friendship edge directly.

-- ---------------------------------------------------------------------------
-- Invite code lookup: lets someone resolve a friend's invite code to a
-- display name + school *before* a friendship exists (profiles select policy
-- above would otherwise hide it). security definer + a narrow return type
-- keeps this from leaking email or anything else off the profiles row.
-- ---------------------------------------------------------------------------
create or replace function public.get_profile_by_invite_code(code text)
returns table (display_name text, school_id text)
language sql
security definer
set search_path = public
as $$
  select display_name, school_id
  from public.profiles
  where invite_code = code;
$$;

revoke all on function public.get_profile_by_invite_code(text) from public;
grant execute on function public.get_profile_by_invite_code(text) to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Redeem an invite code: looks up the code, validates it, and inserts both
-- directions of the friendship edge in one transaction. security definer
-- (owned by the migration role, which owns these tables) is what lets this
-- write to friendships despite there being no insert policy for clients.
-- auth.uid() still resolves to the calling user's id inside the function --
-- security definer changes the executing role for privilege checks, not the
-- JWT claims a request carries -- so this can't be used to friend two other
-- accounts on someone's behalf.
-- ---------------------------------------------------------------------------
create or replace function public.redeem_invite_code(code text)
returns table (friend_display_name text, friend_school_id text)
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  friend_id uuid;
  friend_name text;
  friend_school text;
begin
  if me is null then
    raise exception 'not_authenticated';
  end if;

  select id, display_name, school_id into friend_id, friend_name, friend_school
  from public.profiles
  where invite_code = upper(trim(code));

  if friend_id is null then
    raise exception 'invalid_code';
  end if;

  if friend_id = me then
    raise exception 'cannot_add_self';
  end if;

  insert into public.friendships (user_id, friend_user_id)
  values (me, friend_id)
  on conflict do nothing;

  insert into public.friendships (user_id, friend_user_id)
  values (friend_id, me)
  on conflict do nothing;

  return query select friend_name, friend_school;
end;
$$;

revoke all on function public.redeem_invite_code(text) from public;
grant execute on function public.redeem_invite_code(text) to authenticated;

-- ---------------------------------------------------------------------------
-- Seed schools (kept in sync with lib/schools.ts).
-- ---------------------------------------------------------------------------
insert into public.schools (id, name, color_hex) values
  ('alabama', 'Alabama', '#9E1B32'),
  ('michigan', 'Michigan', '#00274C'),
  ('georgia', 'Georgia', '#BA0C2F'),
  ('ohio-state', 'Ohio State', '#BB0000'),
  ('texas', 'Texas', '#BF5700'),
  ('oklahoma', 'Oklahoma', '#841617'),
  ('usc', 'USC', '#990000'),
  ('notre-dame', 'Notre Dame', '#0C2340'),
  ('clemson', 'Clemson', '#F56600'),
  ('lsu', 'LSU', '#461D7C'),
  ('penn-state', 'Penn State', '#041E42'),
  ('texas-am', 'Texas A&M', '#500000'),
  ('florida-state', 'Florida State', '#782F40'),
  ('utsa', 'UTSA', '#0C2340')
on conflict (id) do nothing;
