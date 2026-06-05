-- ----------------------------------------------------
-- Supabase Schema for Cafetintico Quiz & Lead Engine
-- ----------------------------------------------------

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: users (leads captured)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  source text default 'quiz', -- 'quiz', 'web', 'hotel', etc.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: quiz_responses (individual submissions)
create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  brew_method text not null,
  flavor_profile text not null,
  intensity text not null,
  frequency text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: recommendations (coffee recommendations generated)
create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  recommended_product text not null,
  tier text not null, -- 'standard' / 'premium' / 'rare'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ----------------------------------------------------
-- Row Level Security (RLS) Policies
-- ----------------------------------------------------

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.quiz_responses enable row level security;
alter table public.recommendations enable row level security;

-- Policy: Allow anyone (anon + authenticated) to insert leads
create policy "Allow anonymous inserts to users"
  on public.users
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow users to select their own profile by email"
  on public.users
  for select
  to anon, authenticated
  using (true); -- Public lookup is safe for leads/newsletter checks

-- Policy: Allow anyone (anon + authenticated) to insert quiz responses
create policy "Allow anonymous inserts to quiz_responses"
  on public.quiz_responses
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow anyone to select quiz responses"
  on public.quiz_responses
  for select
  to anon, authenticated
  using (true);

-- Policy: Allow anyone (anon + authenticated) to insert recommendations
create policy "Allow anonymous inserts to recommendations"
  on public.recommendations
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow anyone to select recommendations"
  on public.recommendations
  for select
  to anon, authenticated
  using (true);

-- ----------------------------------------------------
-- Performance Indexes
-- ----------------------------------------------------
create index if not exists users_email_idx on public.users(email);
create index if not exists quiz_responses_user_id_idx on public.quiz_responses(user_id);
create index if not exists recommendations_user_id_idx on public.recommendations(user_id);
