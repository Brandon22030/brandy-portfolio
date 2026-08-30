export type Stat = { value: string; label: string };

export const profile = {
  name: "Brandon Medehou",
  role: "Développeur Fullstack",
  tagline: "React / Next.js · Python · AWS & CI/CD",
  location: "Cotonou, Bénin · Mobile / full remote",
  email: "brandonmedehou2203@gmail.com",
  github: "https://github.com/Brandon22030",
  linkedin: "https://linkedin.com/in/brandon-medehou",
  photo: "/images/brandon.jpg",
  summary:
    "Développeur fullstack avec 2 ans d'expérience et plus de 4 applications web livrées en production en React, Next.js et JavaScript. Je couvre la chaîne complète : cadrage du besoin, développement des interfaces, APIs et modules back-end en Python, puis déploiement et hébergement sur AWS avec pipelines CI/CD automatisées. J'assure aussi le support de production, habitué au travail en équipe agile (daily, revues de code).",
  aboutDescription:
    "Un profil qui couvre toute la chaîne : interfaces, APIs, données et déploiement, du cadrage à la mise en production.",
  stats: [
    { value: "2+", label: "Ans d'expérience" },
    { value: "4+", label: "Apps en production" },
    { value: "Fullstack", label: "Stack" },
  ] as Stat[],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "ADELABS",
    role: "Développeur Fullstack & Odoo",
    period: "juin 2025 — août 2026",
    location: "Cotonou, Bénin",
    highlights: [
      "Conçu et livré 4+ applications web en production en React / Next.js / JavaScript (ES6+) : composants implémentés à partir de maquettes Figma, stylés en SASS/SCSS (architecture BEM) pour sa flexibilité, architecture en composants réutilisables, responsivité et compatibilité navigateurs.",
      "Construit la chaîne d'hébergement AWS de bout en bout : bucket S3, distribution CloudFront rattachée au bucket, utilisateur IAM dédié et raccordement à un nom de domaine personnalisé.",
      "Mis en place les pipelines CI/CD sous GitLab CI (.gitlab-ci.yml) : chaque livraison en production déclenche automatiquement l'exécution des tests puis le déploiement.",
      "Développé des modules back-end en Python (Odoo, périmètre comptable) manipulant de gros volumes sur PostgreSQL : exports FEC multi-formats, pièces comptables, inventaires reconstitués à date et déclarations de TVA.",
      "Intégré et validé des APIs REST avec Postman avant branchement (codes HTTP, formats de réponse, cas d'erreur) et mis en place une route POST sur AWS API Gateway pour centraliser le traitement des formulaires.",
      "Assuré le support de production : diagnostic, reproduction et correction d'incidents applicatifs et d'anomalies de données, en lien direct avec les utilisateurs métier.",
      "Travaillé en équipe agile : daily quotidiens, revues de code régulières avec le lead technique et encadrement d'un stagiaire sur un mois.",
      "Optimisé les performances et les Core Web Vitals (LCP, CLS) via le rendu SSR/SSG et l'optimisation des images ; mis en œuvre le SEO technique des sites livrés.",
    ],
  },
  {
    company: "Société Générale Bénin",
    role: "Stagiaire Développeur Web",
    period: "nov. 2024 — mars 2025",
    location: "Cotonou, Bénin",
    highlights: ["Stage au sein de la direction informatique d'un grand groupe bancaire."],
  },
  {
    company: "Vertim Coders",
    role: "Stagiaire Développeur Web",
    period: "janv. 2024 — avr. 2024",
    location: "Tankpè, Bénin",
    highlights: [
      "Intégré des interfaces Vue.js à partir de maquettes en respectant les contraintes d'ergonomie, et mis en ligne des sites WordPress pour les clients de l'agence.",
    ],
  },
  {
    company: "Freelance — BRANDYBEN",
    role: "Développeur & Designer indépendant",
    period: "2023 — 2024",
    location: "Cotonou, Bénin",
    highlights: [
      "Conception de maquettes sous Figma, création d'identités visuelles et de logos, développement de sites, thèmes et extensions WordPress sur mesure — du besoin client à la livraison.",
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Front-end",
    items: [
      "JavaScript moderne (ES6+)",
      "React.js",
      "Next.js",
      "Vue.js",
      "HTML5 sémantique",
      "CSS3 / SCSS (BEM)",
      "Tailwind CSS",
      "Responsive & compatibilité navigateurs",
    ],
  },
  {
    category: "Back-end & APIs",
    items: [
      "Python (modules Odoo)",
      "Node.js",
      "NestJS",
      "Express.js",
      "PHP (WordPress)",
      "APIs REST (Postman)",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (S3, CloudFront, IAM, API Gateway)", "GitLab CI", "Docker", "Git / GitHub"],
  },
  {
    category: "Données",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Modélisation & agrégation", "Exports & restitution"],
  },
  {
    category: "Qualité & méthodes",
    items: [
      "Agile (daily, revues de code)",
      "Recette & mise en production",
      "Support & correction d'anomalies",
      "Core Web Vitals (LCP, CLS)",
      "SSR/SSG",
      "Mentorat",
    ],
  },
  {
    category: "Design, CMS & mobile",
    items: [
      "Figma",
      "SEO technique (JSON-LD, Metadata API, Open Graph)",
      "Strapi",
      "WordPress / WooCommerce",
      "React Native",
      "Expo",
      "Flutter",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  intro?: string;
  features?: string[];
  category?: string;
  client?: string;
  date?: string;
  stack: string[];
  imageUrl?: string;
  galleryUrls?: string[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "lokata",
    name: "Lokata",
    description:
      "Plateforme de location de matériel informatique, menée seul du cahier des charges au produit : modèle économique, modélisation des données, parcours utilisateur, authentification et spécification technique d'un agent de sécurité poste client (isolation de session, licences hors ligne signées Ed25519).",
    stack: ["Next.js", "JavaScript", "Supabase"],
  },
  {
    slug: "veille-et-experimentation-continues",
    name: "Veille et expérimentation continues",
    description:
      "Intégration d'APIs de modèles de langage dans des applications web et mobile, exploration de Three.js / React Three Fiber pour le rendu 3D temps réel sur le web.",
    stack: ["LLM APIs", "Three.js", "React Three Fiber"],
  },
  {
    slug: "la-cite-du-rancard",
    name: "La Cité Du Rancard",
    description:
      "Plateforme de gestion d'événements et de réseautage social pour organiser et promouvoir des événements à Cotonou, Bénin : vente de billets, réservation de stands, gestion de partenaires et matchmaking entre participants.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase", "Cloudinary", "Moneroo"],
    liveUrl: "https://www.lacitedurancard.com/",
  },
  {
    slug: "fairy-dust-portfolio",
    name: "Fairy Dust Portfolio",
    description:
      "Site portfolio professionnel pour une assistante virtuelle, présentée sous le nom 'La Petite Fée de l'Assistance Virtuelle'.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    liveUrl: "https://stevie-alyda.netlify.app/",
  },
  {
    slug: "benin-culture-360",
    name: "Benin Culture 360",
    description: "Application web interactive pour explorer et découvrir la riche culture béninoise.",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase"],
    liveUrl: "https://benin-culture-360.pages.dev/",
    githubUrl: "https://github.com/Brandon22030/benin-culture-360",
  },
  {
    slug: "bloghub",
    name: "BlogHub",
    description:
      "Plateforme de blogging moderne construite avec un backend NestJS et un frontend Next.js.",
    stack: ["NestJS", "Next.js", "MongoDB", "Prisma", "TailwindCSS", "TypeScript"],
    liveUrl: "https://bloghub-vdm6.onrender.com/",
    githubUrl: "https://github.com/Brandon22030/BlogHub",
    figmaUrl: "https://www.figma.com/design/xrWs7bMQsRRWRAmKUu7JuP/Blog-Hub?node-id=0-1&t=QHQJrF0wZm3ipHvR-1",
  },
  {
    slug: "festivalis",
    name: "Festivalis",
    description: "Plateforme d'événements communautaires conçue spécifiquement pour le Bénin.",
    stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/Festivalis",
  },
  {
    slug: "heritagegourmet",
    name: "HeritageGourmet",
    description: "Application web dédiée à la préservation et au partage des recettes familiales.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "TailwindCSS"],
    githubUrl: "https://github.com/brandy-the-dev/heritage-gourmet",
  },
  {
    slug: "trello-wordpress",
    name: "Trello WordPress",
    description:
      "Ajout et affichage de tâches avec Vue.js et Pinia, en s'appuyant sur l'API REST de WordPress.",
    stack: ["Vue.js", "Pinia", "TailwindCSS", "WordPress REST API"],
    githubUrl: "https://github.com/Brandon22030/Trello-WordPress",
  },
  {
    slug: "yowl",
    name: "YOWL",
    description: "Application permettant de commenter tout ce qui se passe sur Internet.",
    stack: ["Vue.js", "Pinia", "TailwindCSS", "Laravel", "MySQL", "Docker"],
    githubUrl: "https://github.com/Brandon22030/yowl",
  },
  {
    slug: "lavotech",
    name: "LavoTech",
    description:
      "Plateforme de services de pressing en ligne : réservation, suivi de commande en temps réel et approche écologique.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/lavoTech",
  },
  {
    slug: "sgama",
    name: "SGAMA",
    description:
      "Système de Gestion d'Atelier Mécanique Automobile : rendez-vous, véhicules, interventions et relation client.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/SGAMA",
  },
  {
    slug: "robogenius-lab",
    name: "RoboGenius Lab",
    description:
      "Plateforme éducative pour l'apprentissage de la robotique : parcours personnalisés, simulateur interactif et ressources pédagogiques.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/RoboGenius-Lab",
  },
];

export type EducationItem = {
  title: string;
  school: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    title: "Certification Développeur Fullstack",
    school: "Coding Academy by EPITECH · Cotonou, Bénin",
    period: "juin 2024 — juin 2025",
  },
  {
    title: "Licence 3 d'Anglais (Bac+3)",
    school: "Faculté des Lettres, Langues et Arts de Calavi (FLLAC) · Abomey-Calavi, Bénin",
    period: "2021 — 2024",
  },
  {
    title: "Certificat en Compétences Numériques Fondamentales",
    school: "ECOLE229 · Cotonou, Bénin",
    period: "2023 — 2024",
  },
];

export const languages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "Avancé (Licence 3 d'Anglais)" },
] as const;

export type Client = {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};

// No static clients yet — the "Mes clients" section only renders once
// clients are added via the admin panel (see src/lib/clients.ts).
export const clients: Client[] = [];

export const navLinks = [
  { href: "#about", label: "À propos" },
  { href: "#experience", label: "Expérience" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#education", label: "Formation" },
  { href: "#contact", label: "Contact" },
] as const;
