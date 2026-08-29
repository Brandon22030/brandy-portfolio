-- Reprend profile/experience/skills/education déjà présents dans src/lib/data.ts.
-- Pour une base neuve uniquement : experience/skill_groups/education seront dupliqués
-- si ces tables contiennent déjà des lignes — utilise plutôt supabase/sync_fullstack_cv.sql
-- pour mettre à jour une base existante sans dupliquer. profile utilise UPSERT (sûr à rejouer).

-- profile (singleton row, id = 1)
insert into public.profile (id, name, role, tagline, location, email, github_url, linkedin_url, summary, about_description, stats) values (1, 'Brandon Medehou', 'Développeur Fullstack', 'React / Next.js · Python · AWS & CI/CD', 'Cotonou, Bénin · Mobile / full remote', 'brandonmedehou2203@gmail.com', 'https://github.com/Brandon22030', 'https://linkedin.com/in/brandon-medehou', 'Développeur fullstack avec 2 ans d''expérience et plus de 4 applications web livrées en production en React, Next.js et JavaScript. Je couvre la chaîne complète : cadrage du besoin, développement des interfaces, APIs et modules back-end en Python, puis déploiement et hébergement sur AWS avec pipelines CI/CD automatisées. J''assure aussi le support de production, habitué au travail en équipe agile (daily, revues de code).', 'Un profil qui couvre toute la chaîne : interfaces, APIs, données et déploiement, du cadrage à la mise en production.', '[{"value":"2+","label":"Ans d''expérience"},{"value":"4+","label":"Apps en production"},{"value":"Fullstack","label":"Stack"}]'::jsonb)
  on conflict (id) do update set
    name = excluded.name,
    role = excluded.role,
    tagline = excluded.tagline,
    location = excluded.location,
    email = excluded.email,
    github_url = excluded.github_url,
    linkedin_url = excluded.linkedin_url,
    summary = excluded.summary,
    about_description = excluded.about_description,
    stats = excluded.stats;

-- experience
insert into public.experience (company, role, period, location, highlights, sort_order) values ('ADELABS', 'Développeur Fullstack & Odoo', 'juin 2025 — août 2026', 'Cotonou, Bénin', array['Conçu et livré 4+ applications web en production en React / Next.js / JavaScript (ES6+) : composants implémentés à partir de maquettes Figma, architecture en composants réutilisables, responsivité et compatibilité navigateurs.', 'Construit la chaîne d''hébergement AWS de bout en bout : bucket S3, distribution CloudFront rattachée au bucket, utilisateur IAM dédié et raccordement à un nom de domaine personnalisé.', 'Mis en place les pipelines CI/CD sous GitLab CI (.gitlab-ci.yml) : chaque livraison en production déclenche automatiquement l''exécution des tests puis le déploiement.', 'Développé des modules back-end en Python (Odoo, périmètre comptable) manipulant de gros volumes sur PostgreSQL : exports FEC multi-formats, pièces comptables, inventaires reconstitués à date et déclarations de TVA.', 'Intégré et validé des APIs REST avec Postman avant branchement (codes HTTP, formats de réponse, cas d''erreur) et mis en place une route POST sur AWS API Gateway pour centraliser le traitement des formulaires.', 'Assuré le support de production : diagnostic, reproduction et correction d''incidents applicatifs et d''anomalies de données, en lien direct avec les utilisateurs métier.', 'Travaillé en équipe agile : daily quotidiens, revues de code régulières avec le lead technique et encadrement d''un stagiaire sur un mois.', 'Optimisé les performances et les Core Web Vitals (LCP, CLS) via le rendu SSR/SSG et l''optimisation des images ; mis en œuvre le SEO technique des sites livrés.'], 0);
insert into public.experience (company, role, period, location, highlights, sort_order) values ('Société Générale Bénin', 'Stagiaire Développeur Web', 'nov. 2024 — mars 2025', 'Cotonou, Bénin', array['Stage au sein de la direction informatique d''un grand groupe bancaire.'], 1);
insert into public.experience (company, role, period, location, highlights, sort_order) values ('Vertim Coders', 'Stagiaire Développeur Web', 'janv. 2024 — avr. 2024', 'Tankpè, Bénin', array['Intégré des interfaces Vue.js à partir de maquettes en respectant les contraintes d''ergonomie, et mis en ligne des sites WordPress pour les clients de l''agence.'], 2);
insert into public.experience (company, role, period, location, highlights, sort_order) values ('Freelance — BRANDYBEN', 'Développeur & Designer indépendant', '2023 — 2024', 'Cotonou, Bénin', array['Conception de maquettes sous Figma, création d''identités visuelles et de logos, développement de sites, thèmes et extensions WordPress sur mesure — du besoin client à la livraison.'], 3);

-- skill_groups
insert into public.skill_groups (category, items, sort_order) values ('Front-end', array['JavaScript moderne (ES6+)', 'React.js', 'Next.js', 'Vue.js', 'HTML5 sémantique', 'CSS3 / SCSS (BEM)', 'Tailwind CSS', 'Responsive & compatibilité navigateurs'], 0);
insert into public.skill_groups (category, items, sort_order) values ('Back-end & APIs', array['Python (modules Odoo)', 'Node.js', 'NestJS', 'Express.js', 'PHP (WordPress)', 'APIs REST (Postman)'], 1);
insert into public.skill_groups (category, items, sort_order) values ('Cloud & DevOps', array['AWS (S3, CloudFront, IAM, API Gateway)', 'GitLab CI', 'Docker', 'Git / GitHub'], 2);
insert into public.skill_groups (category, items, sort_order) values ('Données', array['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Modélisation & agrégation', 'Exports & restitution'], 3);
insert into public.skill_groups (category, items, sort_order) values ('Qualité & méthodes', array['Agile (daily, revues de code)', 'Recette & mise en production', 'Support & correction d''anomalies', 'Core Web Vitals (LCP, CLS)', 'SSR/SSG', 'Mentorat'], 4);
insert into public.skill_groups (category, items, sort_order) values ('Design, CMS & mobile', array['Figma', 'SEO technique (JSON-LD, Metadata API, Open Graph)', 'Strapi', 'WordPress / WooCommerce', 'React Native', 'Expo', 'Flutter'], 5);

-- education
insert into public.education (title, school, period, sort_order) values ('Certification Développeur Fullstack', 'Coding Academy by EPITECH · Cotonou, Bénin', 'juin 2024 — juin 2025', 0);
insert into public.education (title, school, period, sort_order) values ('Licence 3 d''Anglais (Bac+3)', 'Faculté des Lettres, Langues et Arts de Calavi (FLLAC) · Abomey-Calavi, Bénin', '2021 — 2024', 1);
insert into public.education (title, school, period, sort_order) values ('Certificat en Compétences Numériques Fondamentales', 'ECOLE229 · Cotonou, Bénin', '2023 — 2024', 2);
