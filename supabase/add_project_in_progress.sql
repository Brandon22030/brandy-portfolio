-- Ajoute le statut « projet en chantier » aux projets.
-- À exécuter une fois dans le SQL Editor de Supabase (réexécutable sans risque).

alter table public.projects add column if not exists in_progress boolean not null default false;
