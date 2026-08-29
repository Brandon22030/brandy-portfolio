export type Stat = { value: string; label: string };

export const profile = {
  name: "Brandon Daniel Medehou",
  role: "Développeur Front-End & Data",
  tagline: "React / Next.js · Python & APIs",
  location: "Cotonou, Bénin · Mobile / full remote",
  email: "brandonmedehou2203@gmail.com",
  github: "https://github.com/Brandon22030",
  linkedin: "https://linkedin.com/in/brandon-medehou",
  photo: "/images/brandon.jpg",
  summary:
    "Développeur front-end avec 2 ans d'expérience professionnelle et plus de 4 applications web livrées en production (Next.js, React, TypeScript). Je construis aussi les APIs Python et les modèles de données qui alimentent ces interfaces : modules comptables Odoo manipulant de gros volumes sur PostgreSQL, route d'API centralisée sur AWS API Gateway, dashboard d'analyse de données bancaires à la Société Générale Bénin. Attaché à la performance (Core Web Vitals), à la qualité du rendu et à la lisibilité des données restituées. Fort intérêt pour l'IA appliquée aux produits.",
  aboutDescription:
    "Un profil qui relie l'interface et la donnée : je construis les écrans, mais aussi les APIs et les modèles qui les nourrissent.",
  stats: [
    { value: "2+", label: "Ans d'expérience" },
    { value: "4+", label: "Apps en production" },
    { value: "Front-end & Data", label: "Stack" },
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
    role: "Développeur Front-End & Odoo",
    period: "juin 2025 — août 2026",
    location: "Cotonou, Bénin",
    highlights: [
      "Développé des modules et APIs Python (Odoo) dans le périmètre comptable : extraction et restitution de gros volumes de données sur PostgreSQL — exports FEC multi-formats, reconstitution d'inventaires à date, déclarations de TVA.",
      "Mis en place une route POST sur AWS API Gateway pour centraliser et fiabiliser le traitement des formulaires web de plusieurs sites livrés.",
      "Conçu et livré 4+ applications web en production avec Next.js et Strapi : interfaces React/TypeScript, modélisation des contenus et intégration d'APIs REST.",
      "Optimisé la performance et les Core Web Vitals (LCP, CLS) via le choix du mode de rendu SSR/SSG et l'optimisation des images.",
      "Testé et validé les APIs REST avec Postman avant intégration : codes HTTP, formats de réponse et gestion des cas d'erreur.",
      "Diagnostiqué et corrigé des incidents applicatifs et anomalies de données en production sur PostgreSQL/Odoo, en collaboration directe avec les utilisateurs métier.",
      "Mis en œuvre le SEO technique des sites livrés : JSON-LD/Schema.org, Metadata API de Next.js, Open Graph, balises canoniques, sitemap.xml et robots.txt.",
    ],
  },
  {
    company: "Société Générale Bénin",
    role: "Stagiaire Développeur Web",
    period: "nov. 2024 — mars 2025",
    location: "Cotonou, Bénin",
    highlights: [
      "Développé un dashboard interactif d'analyse de données bancaires : agrégation des données, rapports détaillés et visualisations dynamiques conçus avec et pour les équipes métier.",
    ],
  },
  {
    company: "Vertim Coders",
    role: "Stagiaire Développeur Web",
    period: "janv. 2024 — avr. 2024",
    location: "Tankpè, Bénin",
    highlights: [
      "Intégré des interfaces Vue.js à partir de maquettes en respectant les contraintes d'ergonomie, et mis en ligne des sites WordPress (PHP) pour les clients de l'agence.",
    ],
  },
  {
    company: "Freelance",
    role: "Développeur & Designer indépendant",
    period: "2023 — 2024",
    location: "Cotonou, Bénin",
    highlights: [
      "Développement de sites, thèmes et extensions WordPress sur mesure (PHP) pour différents clients.",
      "Conception de maquettes d'interfaces sous Figma, création d'identités visuelles et de supports graphiques.",
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Front-end & UI",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Vue.js",
      "Tailwind CSS",
      "HTML sémantique",
      "CSS/SCSS",
      "Figma",
    ],
  },
  {
    category: "Back-end & APIs",
    items: [
      "Python (modules et routes Odoo)",
      "Node.js",
      "NestJS",
      "Express.js",
      "PHP (WordPress)",
      "APIs REST (Postman)",
    ],
  },
  {
    category: "Données",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Modélisation & agrégation", "Exports & dashboards"],
  },
  {
    category: "Performance & qualité",
    items: ["Core Web Vitals (LCP, CLS)", "SSR/SSG", "Optimisation d'images", "Diagnostic prod"],
  },
  {
    category: "Cloud & outils",
    items: ["AWS API Gateway", "Docker", "Git / GitHub", "PageSpeed Insights", "Google Search Console"],
  },
  {
    category: "SEO technique",
    items: ["JSON-LD / Schema.org", "Metadata API Next.js", "Open Graph", "sitemap.xml", "robots.txt"],
  },
];

export type Project = {
  name: string;
  description: string;
  stack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
};

export const projects: Project[] = [
  {
    name: "Lokata",
    description:
      "Plateforme de location de matériel informatique, conçue et développée seul, du cahier des charges au produit : modélisation des données, authentification, et spécification d'un agent de sécurité poste client (isolation de session, signature Ed25519).",
    stack: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    name: "Intégration d'IA générative",
    description:
      "Intégration d'APIs de modèles de langage dans des applications personnelles (planification quotidienne, génération de contenus), avec traitement des réponses structurées et gestion des erreurs côté back-end.",
    stack: ["LLM APIs", "Node.js", "Réponses structurées"],
  },
  {
    name: "La Cité Du Rancard",
    description:
      "Plateforme de gestion d'événements et de réseautage social pour organiser et promouvoir des événements à Cotonou, Bénin : vente de billets, réservation de stands, gestion de partenaires et matchmaking entre participants.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase", "Cloudinary", "Moneroo"],
    liveUrl: "https://www.lacitedurancard.com/",
  },
  {
    name: "Fairy Dust Portfolio",
    description:
      "Site portfolio professionnel pour une assistante virtuelle, présentée sous le nom 'La Petite Fée de l'Assistance Virtuelle'.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    liveUrl: "https://stevie-alyda.netlify.app/",
  },
  {
    name: "Benin Culture 360",
    description: "Application web interactive pour explorer et découvrir la riche culture béninoise.",
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase"],
    liveUrl: "https://benin-culture-360.pages.dev/",
    githubUrl: "https://github.com/Brandon22030/benin-culture-360",
  },
  {
    name: "BlogHub",
    description:
      "Plateforme de blogging moderne construite avec un backend NestJS et un frontend Next.js.",
    stack: ["NestJS", "Next.js", "MongoDB", "Prisma", "TailwindCSS", "TypeScript"],
    liveUrl: "https://bloghub-vdm6.onrender.com/",
    githubUrl: "https://github.com/Brandon22030/BlogHub",
    figmaUrl: "https://www.figma.com/design/xrWs7bMQsRRWRAmKUu7JuP/Blog-Hub?node-id=0-1&t=QHQJrF0wZm3ipHvR-1",
  },
  {
    name: "Festivalis",
    description: "Plateforme d'événements communautaires conçue spécifiquement pour le Bénin.",
    stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/Festivalis",
  },
  {
    name: "HeritageGourmet",
    description: "Application web dédiée à la préservation et au partage des recettes familiales.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "TailwindCSS"],
    githubUrl: "https://github.com/brandy-the-dev/heritage-gourmet",
  },
  {
    name: "Trello WordPress",
    description:
      "Ajout et affichage de tâches avec Vue.js et Pinia, en s'appuyant sur l'API REST de WordPress.",
    stack: ["Vue.js", "Pinia", "TailwindCSS", "WordPress REST API"],
    githubUrl: "https://github.com/Brandon22030/Trello-WordPress",
  },
  {
    name: "YOWL",
    description: "Application permettant de commenter tout ce qui se passe sur Internet.",
    stack: ["Vue.js", "Pinia", "TailwindCSS", "Laravel", "MySQL", "Docker"],
    githubUrl: "https://github.com/Brandon22030/yowl",
  },
  {
    name: "LavoTech",
    description:
      "Plateforme de services de pressing en ligne : réservation, suivi de commande en temps réel et approche écologique.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/lavoTech",
  },
  {
    name: "SGAMA",
    description:
      "Système de Gestion d'Atelier Mécanique Automobile : rendez-vous, véhicules, interventions et relation client.",
    stack: ["React", "TypeScript", "TailwindCSS", "Vite", "Supabase"],
    githubUrl: "https://github.com/Brandon22030/SGAMA",
  },
  {
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
    title: "Licence 3 d'Anglais",
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
