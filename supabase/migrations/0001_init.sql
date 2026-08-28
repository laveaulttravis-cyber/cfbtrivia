-- CFB Trivia -- Phase 1 schema (Daily Drive accounts, friends-only leaderboard).
-- Classic Solo/VS is intentionally client-only and has no tables here.
--
-- Tables are created first, in full, before any RLS policy is added. Several
-- policies below reference other tables in a subquery (e.g. profiles reads
-- friendships), and CREATE POLICY resolves those table references
-- immediately -- so every table this file touches has to exist before the
-- first policy is created, not just before it's used at query time.

-- ---------------------------------------------------------------------------
-- schools
-- ---------------------------------------------------------------------------
create table if not exists public.schools (
  id text primary key,
  name text not null,
  color_hex text not null
);

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

-- ---------------------------------------------------------------------------
-- daily_questions -- one shared, server-published row per calendar date.
-- ---------------------------------------------------------------------------
create table if not exists public.daily_questions (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  question_set jsonb not null,
  created_at timestamptz not null default now()
);

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

create index if not exists daily_results_user_date_idx
  on public.daily_results (user_id, date desc);

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

-- ---------------------------------------------------------------------------
-- Row Level Security -- every table above now exists, so policies that
-- reference each other (profiles <-> friendships, daily_results <->
-- friendships) can be created in any order from here on.
-- ---------------------------------------------------------------------------
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.daily_questions enable row level security;
alter table public.daily_results enable row level security;
alter table public.friendships enable row level security;

drop policy if exists "schools are publicly readable" on public.schools;
create policy "schools are publicly readable"
  on public.schools for select
  to anon, authenticated
  using (true);

-- You can always see your own profile. You can also see a friend's profile
-- (needed to render their name/school on the friends leaderboard). Everyone
-- else's profile -- including their email -- stays hidden; the invite flow
-- goes through the get_profile_by_invite_code() function below instead of a
-- direct table read, so a code can be resolved without a friendship existing
-- yet.
drop policy if exists "read own or friend profile" on public.profiles;
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

drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- No select policy on daily_questions for anon/authenticated on purpose: the
-- set (which embeds correct answers) is only ever read by server code using
-- the service-role key, via GET /api/daily/today.

-- Read your own results, or a friend's (for the friends leaderboard).
drop policy if exists "read own or friend daily_results" on public.daily_results;
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

drop policy if exists "read own friendships" on public.friendships;
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
  ('arkansas', 'Arkansas', '#9D2235'),
  ('auburn', 'Auburn', '#0C2340'),
  ('florida', 'Florida', '#0021A5'),
  ('georgia', 'Georgia', '#BA0C2F'),
  ('kentucky', 'Kentucky', '#0033A0'),
  ('lsu', 'LSU', '#461D7C'),
  ('mississippi-state', 'Mississippi State', '#660000'),
  ('missouri', 'Missouri', '#F1B82D'),
  ('ole-miss', 'Ole Miss', '#14213D'),
  ('oklahoma', 'Oklahoma', '#841617'),
  ('south-carolina', 'South Carolina', '#73000A'),
  ('tennessee', 'Tennessee', '#FF8200'),
  ('texas', 'Texas', '#BF5700'),
  ('texas-am', 'Texas A&M', '#500000'),
  ('vanderbilt', 'Vanderbilt', '#866D4B'),
  ('illinois', 'Illinois', '#E84A27'),
  ('indiana', 'Indiana', '#990000'),
  ('iowa', 'Iowa', '#FFCD00'),
  ('maryland', 'Maryland', '#E03A3E'),
  ('michigan', 'Michigan', '#00274C'),
  ('michigan-state', 'Michigan State', '#18453B'),
  ('minnesota', 'Minnesota', '#7A0019'),
  ('nebraska', 'Nebraska', '#E41C38'),
  ('northwestern', 'Northwestern', '#4E2A84'),
  ('ohio-state', 'Ohio State', '#BB0000'),
  ('oregon', 'Oregon', '#154733'),
  ('penn-state', 'Penn State', '#041E42'),
  ('purdue', 'Purdue', '#CEB888'),
  ('rutgers', 'Rutgers', '#CC0033'),
  ('ucla', 'UCLA', '#2D68C4'),
  ('usc', 'USC', '#990000'),
  ('washington', 'Washington', '#4B2E83'),
  ('wisconsin', 'Wisconsin', '#C5050C'),
  ('boston-college', 'Boston College', '#98002E'),
  ('california', 'California', '#003262'),
  ('clemson', 'Clemson', '#F56600'),
  ('duke', 'Duke', '#00539B'),
  ('florida-state', 'Florida State', '#782F40'),
  ('georgia-tech', 'Georgia Tech', '#B3A369'),
  ('louisville', 'Louisville', '#AD0000'),
  ('miami', 'Miami', '#F47321'),
  ('nc-state', 'NC State', '#CC0000'),
  ('north-carolina', 'North Carolina', '#7BAFD4'),
  ('pittsburgh', 'Pittsburgh', '#003594'),
  ('smu', 'SMU', '#C8102E'),
  ('stanford', 'Stanford', '#8C1515'),
  ('syracuse', 'Syracuse', '#F76900'),
  ('virginia', 'Virginia', '#232D4B'),
  ('virginia-tech', 'Virginia Tech', '#630031'),
  ('wake-forest', 'Wake Forest', '#9E7E38'),
  ('arizona', 'Arizona', '#CC0033'),
  ('arizona-state', 'Arizona State', '#8C1D40'),
  ('baylor', 'Baylor', '#154734'),
  ('byu', 'BYU', '#002E5D'),
  ('cincinnati', 'Cincinnati', '#E00122'),
  ('colorado', 'Colorado', '#CFB87C'),
  ('houston', 'Houston', '#C8102E'),
  ('iowa-state', 'Iowa State', '#C8102E'),
  ('kansas', 'Kansas', '#0051BA'),
  ('kansas-state', 'Kansas State', '#512888'),
  ('oklahoma-state', 'Oklahoma State', '#FF7300'),
  ('tcu', 'TCU', '#4D1979'),
  ('texas-tech', 'Texas Tech', '#CC0000'),
  ('ucf', 'UCF', '#000000'),
  ('utah', 'Utah', '#CC0000'),
  ('west-virginia', 'West Virginia', '#EAAA00'),
  ('army', 'Army', '#000000'),
  ('charlotte', 'Charlotte', '#046A38'),
  ('east-carolina', 'East Carolina', '#592A8A'),
  ('florida-atlantic', 'Florida Atlantic', '#003366'),
  ('memphis', 'Memphis', '#003087'),
  ('navy', 'Navy', '#00205B'),
  ('north-texas', 'North Texas', '#00853E'),
  ('rice', 'Rice', '#00205B'),
  ('south-florida', 'South Florida', '#006747'),
  ('temple', 'Temple', '#9D2235'),
  ('tulane', 'Tulane', '#006747'),
  ('tulsa', 'Tulsa', '#002D72'),
  ('uab', 'UAB', '#1E6B52'),
  ('utsa', 'UTSA', '#0C2340'),
  ('delaware', 'Delaware', '#00539F'),
  ('missouri-state', 'Missouri State', '#821229'),
  ('jacksonville-state', 'Jacksonville State', '#B0161A'),
  ('kennesaw-state', 'Kennesaw State', '#000000'),
  ('liberty', 'Liberty', '#002D62'),
  ('louisiana-tech', 'Louisiana Tech', '#003087'),
  ('middle-tennessee', 'Middle Tennessee', '#0066CC'),
  ('new-mexico-state', 'New Mexico State', '#8C2434'),
  ('sam-houston', 'Sam Houston', '#F26D22'),
  ('utep', 'UTEP', '#FF8200'),
  ('western-kentucky', 'Western Kentucky', '#B70A22'),
  ('akron', 'Akron', '#00285E'),
  ('ball-state', 'Ball State', '#BA0C2F'),
  ('bowling-green', 'Bowling Green', '#4F2C1D'),
  ('buffalo', 'Buffalo', '#005BBB'),
  ('central-michigan', 'Central Michigan', '#6A0032'),
  ('eastern-michigan', 'Eastern Michigan', '#00694E'),
  ('kent-state', 'Kent State', '#002664'),
  ('miami-oh', 'Miami (OH)', '#C41230'),
  ('northern-illinois', 'Northern Illinois', '#BA0C2F'),
  ('ohio', 'Ohio', '#00694E'),
  ('toledo', 'Toledo', '#003E7E'),
  ('western-michigan', 'Western Michigan', '#492F24'),
  ('air-force', 'Air Force', '#003087'),
  ('hawaii', 'Hawaii', '#024731'),
  ('nevada', 'Nevada', '#003366'),
  ('new-mexico', 'New Mexico', '#BA0C2F'),
  ('san-jose-state', 'San Jose State', '#0055A2'),
  ('unlv', 'UNLV', '#CF0A2C'),
  ('wyoming', 'Wyoming', '#492F24'),
  ('boise-state', 'Boise State', '#0033A0'),
  ('colorado-state', 'Colorado State', '#1E4D2B'),
  ('fresno-state', 'Fresno State', '#DB0032'),
  ('oregon-state', 'Oregon State', '#DC4405'),
  ('san-diego-state', 'San Diego State', '#A6192E'),
  ('utah-state', 'Utah State', '#0F2439'),
  ('washington-state', 'Washington State', '#981E32'),
  ('app-state', 'Appalachian State', '#000000'),
  ('arkansas-state', 'Arkansas State', '#CC092F'),
  ('coastal-carolina', 'Coastal Carolina', '#006F71'),
  ('georgia-southern', 'Georgia Southern', '#041E42'),
  ('georgia-state', 'Georgia State', '#0039A6'),
  ('james-madison', 'James Madison', '#450084'),
  ('louisiana', 'Louisiana', '#CE181E'),
  ('louisiana-monroe', 'Louisiana-Monroe', '#8B2331'),
  ('marshall', 'Marshall', '#00B140'),
  ('old-dominion', 'Old Dominion', '#003057'),
  ('south-alabama', 'South Alabama', '#00205B'),
  ('southern-miss', 'Southern Miss', '#FFAB00'),
  ('texas-state', 'Texas State', '#501214'),
  ('troy', 'Troy', '#8A0303'),
  ('notre-dame', 'Notre Dame', '#0C2340'),
  ('uconn', 'UConn', '#000E2F'),
  ('umass', 'UMass', '#881C1C')
on conflict (id) do nothing;
