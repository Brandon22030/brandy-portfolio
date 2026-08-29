-- À exécuter une fois dans le SQL editor de ton projet Supabase
-- (dashboard.supabase.com → ton projet → SQL Editor → New query).

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  stack text[] not null default '{}',
  image_url text,
  live_url text,
  github_url text,
  figma_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Safe to re-run even if `projects` already existed before `image_url` was added.
alter table public.projects add column if not exists image_url text;

alter table public.projects enable row level security;

-- Lecture publique : la page portfolio doit pouvoir lire les projets sans être connectée.
create policy "Public can read projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Écriture réservée à un utilisateur connecté (l'unique compte admin, créé
-- manuellement dans Authentication → Users, pas d'inscription publique).
create policy "Authenticated users can insert projects"
  on public.projects
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete projects"
  on public.projects
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- profile (singleton — always a single row with id = 1)
-- ---------------------------------------------------------------------

create table if not exists public.profile (
  id integer primary key default 1,
  name text not null,
  role text not null,
  tagline text not null,
  location text not null,
  email text not null,
  github_url text not null,
  linkedin_url text not null,
  summary text not null,
  about_description text not null,
  stats jsonb not null default '[]',
  updated_at timestamptz not null default now(),
  constraint profile_singleton check (id = 1)
);

alter table public.profile enable row level security;

create policy "Public can read profile"
  on public.profile for select to anon, authenticated using (true);

create policy "Authenticated users can update profile"
  on public.profile for update to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------
-- experience
-- ---------------------------------------------------------------------

create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null,
  location text not null,
  highlights text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.experience enable row level security;

create policy "Public can read experience"
  on public.experience for select to anon, authenticated using (true);

create policy "Authenticated users can insert experience"
  on public.experience for insert to authenticated with check (true);

create policy "Authenticated users can update experience"
  on public.experience for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete experience"
  on public.experience for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- skill_groups
-- ---------------------------------------------------------------------

create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.skill_groups enable row level security;

create policy "Public can read skill_groups"
  on public.skill_groups for select to anon, authenticated using (true);

create policy "Authenticated users can insert skill_groups"
  on public.skill_groups for insert to authenticated with check (true);

create policy "Authenticated users can update skill_groups"
  on public.skill_groups for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete skill_groups"
  on public.skill_groups for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- education
-- ---------------------------------------------------------------------

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  school text not null,
  period text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.education enable row level security;

create policy "Public can read education"
  on public.education for select to anon, authenticated using (true);

create policy "Authenticated users can insert education"
  on public.education for insert to authenticated with check (true);

create policy "Authenticated users can update education"
  on public.education for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete education"
  on public.education for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- clients (logo bar / "Mes clients" section)
-- ---------------------------------------------------------------------

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  website_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

create policy "Public can read clients"
  on public.clients for select to anon, authenticated using (true);

create policy "Authenticated users can insert clients"
  on public.clients for insert to authenticated with check (true);

create policy "Authenticated users can update clients"
  on public.clients for update to authenticated using (true) with check (true);

create policy "Authenticated users can delete clients"
  on public.clients for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- storage (project cover images + client logos)
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can read media"
  on storage.objects for select to anon, authenticated using (bucket_id = 'media');

create policy "Authenticated users can upload media"
  on storage.objects for insert to authenticated with check (bucket_id = 'media');

create policy "Authenticated users can update media"
  on storage.objects for update to authenticated using (bucket_id = 'media');

create policy "Authenticated users can delete media"
  on storage.objects for delete to authenticated using (bucket_id = 'media');
