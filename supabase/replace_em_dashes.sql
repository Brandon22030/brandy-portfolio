-- Remplace les tirets cadratins « — » par des tirets « - » dans tout le contenu du portfolio.
-- À exécuter dans le SQL Editor de Supabase. Réexécutable sans risque.

create or replace function pg_temp.dash(value text) returns text
language sql immutable as $$ select replace(value, '—', '-') $$;

create or replace function pg_temp.dash(value text[]) returns text[]
language sql immutable as $$
  select array_agg(pg_temp.dash(item) order by position)
  from unnest(value) with ordinality as t(item, position)
$$;

update public.profile set
  name = pg_temp.dash(name),
  role = pg_temp.dash(role),
  tagline = pg_temp.dash(tagline),
  location = pg_temp.dash(location),
  summary = pg_temp.dash(summary),
  about_description = pg_temp.dash(about_description),
  stats = pg_temp.dash(stats::text)::jsonb;

update public.experience set
  company = pg_temp.dash(company),
  role = pg_temp.dash(role),
  period = pg_temp.dash(period),
  location = pg_temp.dash(location),
  highlights = pg_temp.dash(highlights);

update public.skill_groups set
  category = pg_temp.dash(category),
  items = pg_temp.dash(items);

update public.education set
  title = pg_temp.dash(title),
  school = pg_temp.dash(school),
  period = pg_temp.dash(period);

update public.projects set
  name = pg_temp.dash(name),
  description = pg_temp.dash(description),
  intro = pg_temp.dash(intro),
  features = pg_temp.dash(features),
  category = pg_temp.dash(category),
  client = pg_temp.dash(client),
  project_date = pg_temp.dash(project_date),
  stack = pg_temp.dash(stack);

update public.clients set
  name = pg_temp.dash(name);
