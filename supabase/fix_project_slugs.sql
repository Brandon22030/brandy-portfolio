-- Refines the auto-generated slugs (from schema.sql's fallback backfill) to
-- properly handle accents, matching the app's own slugify() exactly.
-- Safe to re-run.

update public.projects set slug = 'lokata' where name = 'Lokata';
update public.projects set slug = 'veille-et-experimentation-continues' where name in ('Veille et expérimentation continues', 'Intégration d''IA générative');
update public.projects set slug = 'la-cite-du-rancard' where name = 'La Cité Du Rancard';
update public.projects set slug = 'fairy-dust-portfolio' where name = 'Fairy Dust Portfolio';
update public.projects set slug = 'benin-culture-360' where name = 'Benin Culture 360';
update public.projects set slug = 'bloghub' where name = 'BlogHub';
update public.projects set slug = 'festivalis' where name = 'Festivalis';
update public.projects set slug = 'heritagegourmet' where name = 'HeritageGourmet';
update public.projects set slug = 'trello-wordpress' where name = 'Trello WordPress';
update public.projects set slug = 'yowl' where name = 'YOWL';
update public.projects set slug = 'lavotech' where name = 'LavoTech';
update public.projects set slug = 'sgama' where name = 'SGAMA';
update public.projects set slug = 'robogenius-lab' where name = 'RoboGenius Lab';
