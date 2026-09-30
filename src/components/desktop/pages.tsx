"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Construction, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { languages, type Project } from "@/lib/data";
import { projectGradient } from "@/lib/palette";
import FolderGlyph from "./FolderGlyph";
import { SECTIONS, sectionMeta, type PortfolioData, type SectionId, type TabRef } from "./types";

type PageProps = { data: PortfolioData; open: (ref: TabRef) => void };

function PageHeader({ section, title, aside }: { section: SectionId; title: ReactNode; aside?: ReactNode }) {
  const meta = sectionMeta(section);
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: meta.tint }}>
          {meta.number} — {meta.label}
        </p>
        <h1 className="mt-3 font-poster text-[clamp(52px,10cqw,128px)] font-semibold uppercase leading-[0.84] text-os-cream">
          {title}
        </h1>
      </div>
      {aside ? <div className="font-mono text-xs uppercase tracking-[0.2em] text-os-sand">{aside}</div> : null}
    </header>
  );
}

function Pill({ children, tint }: { children: ReactNode; tint?: string }) {
  return (
    <span
      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-os-cream/85"
      style={tint ? { borderColor: `${tint}55`, color: tint } : undefined}
    >
      {children}
    </span>
  );
}

function ActionButton({
  children,
  onClick,
  href,
  variant = "solid",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "ghost";
}) {
  const className =
    variant === "solid"
      ? "inline-flex items-center gap-2 rounded-full bg-os-orange px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-white transition-transform hover:-translate-y-0.5 max-md:px-6 max-md:py-3.5"
      : "inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-os-cream transition-colors hover:bg-white/10 max-md:px-6 max-md:py-3.5";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */

export function HomePage({ data, open }: PageProps) {
  return (
    <div className="flex min-h-full flex-col px-6 py-10 sm:px-12">
      <p className="text-center font-mono text-xs uppercase tracking-[0.35em] text-os-sand">Brandy OS · Nouvel onglet</p>
      <h1 className="mt-4 text-center font-poster-inline text-[clamp(64px,14cqw,180px)] uppercase leading-[0.85] text-os-cream">
        Sommaire
      </h1>
      <div className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-3 gap-y-10 sm:grid-cols-6">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => open({ kind: "section", section: section.id })}
            className="group flex flex-col items-center gap-2"
          >
            <span
              className="font-poster text-[clamp(44px,7cqw,76px)] font-semibold leading-none transition-transform group-hover:-translate-y-1"
              style={{ color: section.tint }}
            >
              {section.number}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-os-sand group-hover:text-os-cream">
              {section.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-16 w-full max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">Récemment ouverts</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {data.projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} onOpen={() => open({ kind: "project", slug: project.slug })} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function AboutPage({ data, open }: PageProps) {
  const { profile, skills } = data;
  const [first, ...rest] = profile.name.split(" ");
  const favourites = skills.flatMap((group) => group.items).slice(0, 8);
  const statTints = ["#c6ef3a", "#f6c332", "#f26b1d"];

  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,300px)_1fr]">
        <div className="relative mx-auto w-full max-w-[300px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-os-panel">
            <Image src={profile.photo} alt={profile.name} fill unoptimized className="object-cover" priority />
          </div>
          <div className="absolute -bottom-8 -right-8 h-32 w-20 rotate-6 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] sm:h-40 sm:w-24">
            <Image src="/images/brandon-sticker.png" alt="" fill unoptimized className="object-contain" />
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-os-yellow">01 — Introduction</p>
          <h1 className="mt-3 font-poster text-[clamp(56px,10cqw,136px)] font-semibold uppercase leading-[0.84] text-os-cream">
            {first}
            <br />
            <span className="text-os-orange">{rest.join(" ")}</span>
          </h1>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.15em] text-os-cream/85">
            {profile.role} <span className="text-os-sand">· {profile.tagline}</span>
          </p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-os-sand">{profile.summary}</p>

          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4">
            {profile.stats.map((stat, i) => (
              <div key={stat.label} className="border-l border-white/10 pl-4">
                <dt className="font-poster text-[clamp(32px,5cqw,56px)] font-semibold leading-none" style={{ color: statTints[i % 3] }}>
                  {stat.value}
                </dt>
                <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-os-sand">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
        <InfoBlock title="Contact">
          <a href={`mailto:${profile.email}`} className="block break-all text-os-cream hover:text-os-orange">
            {profile.email}
          </a>
          <p className="mt-2 flex items-center gap-2 text-os-sand">
            <MapPin size={14} /> {profile.location}
          </p>
        </InfoBlock>
        <InfoBlock title="Réseaux">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-os-cream hover:text-os-orange">
            <GithubIcon size={16} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-2 text-os-cream hover:text-os-orange">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
        </InfoBlock>
        <InfoBlock title="Outils favoris">
          <div className="flex flex-wrap gap-1.5">
            {favourites.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        </InfoBlock>
      </div>

      {data.clients.length > 0 ? (
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">Ils m&apos;ont fait confiance</p>
          <div className="flex flex-wrap items-center gap-3">
            {data.clients.map((client) => {
              const logo = (
                <span className="relative flex h-14 w-32 items-center justify-center rounded-xl bg-os-cream/95 p-3">
                  <Image src={client.logoUrl} alt={client.name} width={110} height={40} className="h-full w-auto object-contain" />
                </span>
              );
              return client.websiteUrl ? (
                <a key={client.name} href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="transition-transform hover:-translate-y-0.5">
                  {logo}
                </a>
              ) : (
                <span key={client.name}>{logo}</span>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex flex-wrap gap-3">
        <ActionButton onClick={() => open({ kind: "section", section: "projects" })}>
          Voir mes projets <ArrowRight size={14} />
        </ActionButton>
        <ActionButton variant="ghost" onClick={() => open({ kind: "section", section: "contact" })}>
          Me contacter
        </ActionButton>
      </div>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="text-sm">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">{title}</p>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Diagonal caution tape laid across a project visual, for projects still being built. */
function ConstructionTape({ large = false }: { large?: boolean }) {
  const label = "EN CHANTIER · BIENTÔT DISPO · ";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className={`absolute -inset-x-10 flex -rotate-[8deg] flex-col shadow-[0_8px_24px_rgba(0,0,0,0.45)] ${large ? "h-20" : "h-11"}`}>
        <div className={`hazard-stripes ${large ? "h-3" : "h-1.5"}`} />
        <div className="flex flex-1 items-center overflow-hidden whitespace-nowrap bg-os-yellow">
          <span className={`font-poster font-bold tracking-wide text-[#141416] ${large ? "text-3xl" : "text-lg"}`}>
            {label.repeat(8)}
          </span>
        </div>
        <div className={`hazard-stripes ${large ? "h-3" : "h-1.5"}`} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex flex-col overflow-hidden rounded-xl border bg-white/[0.03] text-left transition-all hover:-translate-y-1 hover:bg-white/[0.06] ${
        project.inProgress ? "border-os-yellow/40 hover:border-os-yellow" : "border-white/10 hover:border-os-orange/60"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden" style={project.imageUrl ? undefined : { background: projectGradient(index) }}>
        <div className={`absolute inset-0 ${project.inProgress ? "brightness-[0.55] grayscale-[0.7]" : ""}`}>
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 320px, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FolderGlyph className="w-1/4 opacity-90" tint="#f1e9d6" />
            </div>
          )}
        </div>
        {project.inProgress ? <ConstructionTape /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="flex items-center gap-2 font-poster text-2xl font-semibold uppercase leading-none text-os-cream">
          {project.name}
          {project.inProgress ? <Construction size={18} className="shrink-0 text-os-yellow" aria-label="En chantier" /> : null}
        </p>
        <p className="line-clamp-1 font-mono text-[11px] text-os-sand">
          {project.category ? `${project.category} · ` : ""}
          {project.stack.slice(0, 3).join(" · ")}
        </p>
      </div>
    </button>
  );
}

export function ProjectsPage({ data, open }: PageProps) {
  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <PageHeader section="projects" title="Projets" aside={`${data.projects.length} éléments`} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} onOpen={() => open({ kind: "project", slug: project.slug })} />
        ))}
      </div>
    </div>
  );
}

export function ProjectPage({ data, slug }: { data: PortfolioData; slug: string }) {
  const index = data.projects.findIndex((p) => p.slug === slug);
  const project = data.projects[index];
  if (!project) {
    return <p className="p-12 font-mono text-sm text-os-sand">Ce projet n&apos;existe plus.</p>;
  }

  const meta = [project.category, project.client, project.date].filter(Boolean);
  const links = [
    project.liveUrl && { href: project.liveUrl, label: "Voir le site" },
    project.githubUrl && { href: project.githubUrl, label: "GitHub" },
    project.figmaUrl && { href: project.figmaUrl, label: "Figma" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      {meta.length > 0 ? (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-os-orange">{meta.join(" · ")}</p>
      ) : null}
      <h1 className="mt-3 font-poster text-[clamp(48px,9cqw,120px)] font-semibold uppercase leading-[0.84] text-os-cream">
        {project.name}
      </h1>
      <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-os-sand">{project.description}</p>

      {project.inProgress ? (
        <div className="mt-8 overflow-hidden rounded-xl border border-os-yellow/50">
          <div className="hazard-stripes h-2" />
          <div className="flex items-center gap-4 bg-os-yellow/10 px-5 py-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-os-yellow text-[#141416]">
              <Construction size={22} />
            </span>
            <div>
              <p className="font-poster text-2xl font-bold uppercase leading-none text-os-yellow">Projet en chantier</p>
              <p className="mt-1.5 text-sm text-os-cream/80">
                Je travaille dessus en ce moment : il n&apos;est pas encore disponible, mais ça arrive bientôt.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-white/10"
        style={project.imageUrl ? undefined : { background: projectGradient(Math.max(index, 0)) }}
      >
        <div className={`absolute inset-0 ${project.inProgress ? "brightness-[0.55] grayscale-[0.7]" : ""}`}>
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt={project.name} fill sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="font-poster text-[clamp(40px,8cqw,110px)] font-semibold uppercase text-white/90">{project.name}</p>
            </div>
          )}
        </div>
        {project.inProgress ? <ConstructionTape large /> : null}
      </div>

      {project.galleryUrls && project.galleryUrls.length > 0 ? (
        <div className="os-scroll mt-3 flex gap-3 overflow-x-auto pb-2">
          {project.galleryUrls.map((url, i) => (
            <div key={url} className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-white/10">
              <Image src={url} alt={`${project.name} — photo ${i + 2}`} fill sizes="176px" className="object-cover" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-8">
          {project.intro ? <p className="whitespace-pre-line text-[15px] leading-relaxed text-os-cream/85">{project.intro}</p> : null}
          {project.features && project.features.length > 0 ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">Fonctionnalités</p>
              <ul className="mt-4 space-y-2.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[15px] text-os-cream/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-os-lime" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">Stack</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Pill key={tech}>{tech}</Pill>
              ))}
            </div>
          </div>
          {links.length > 0 ? (
            <div className="flex flex-col gap-2">
              {links.map((link, i) => (
                <ActionButton key={link.href} href={link.href} variant={i === 0 ? "solid" : "ghost"}>
                  {link.label} <ArrowUpRight size={14} />
                </ActionButton>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ExperiencePage({ data }: PageProps) {
  const tints = ["#c6ef3a", "#f6c332", "#f26b1d", "#8fd3ff"];
  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <PageHeader section="experience" title="Expérience" aside={`${data.experience.length} postes`} />
      <ol className="mt-4">
        {data.experience.map((exp, i) => (
          <li key={`${exp.company}-${exp.period}`} className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[110px_1fr]">
            <span className="font-poster text-[64px] font-semibold leading-none" style={{ color: tints[i % tints.length] }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-poster text-[clamp(28px,4cqw,40px)] font-semibold uppercase leading-none text-os-cream">{exp.role}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-os-sand">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <Pill>{exp.period}</Pill>
              </div>
              <ul className="mt-5 space-y-2.5">
                {exp.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[14.5px] leading-relaxed text-os-cream/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tints[i % tints.length] }} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function SkillsPage({ data }: PageProps) {
  const tints = ["#f26b1d", "#c6ef3a", "#f6c332", "#8fd3ff", "#e7c4e8", "#f1e9d6"];
  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <PageHeader section="skills" title="Compétences" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.skills.map((group, i) => (
          <div key={group.category} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-poster text-3xl font-semibold uppercase leading-none text-os-cream">{group.category}</p>
              <span className="font-poster text-2xl font-semibold" style={{ color: tints[i % tints.length] }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EducationPage({ data }: PageProps) {
  return (
    <div className="px-6 py-8 sm:px-12 sm:py-12">
      <PageHeader section="education" title="Formation" />
      <ol className="mt-4">
        {data.education.map((item) => (
          <li key={item.title} className="grid gap-2 border-b border-white/10 py-7 sm:grid-cols-[1fr_auto] sm:gap-6">
            <div>
              <p className="font-poster text-[clamp(26px,3.6cqw,36px)] font-semibold uppercase leading-none text-os-cream">{item.title}</p>
              <p className="mt-2 text-sm text-os-sand">{item.school}</p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#e7c4e8] sm:pt-1">{item.period}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-os-sand">Langues</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {languages.map((language) => (
          <div key={language.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
            <p className="font-poster text-2xl font-semibold uppercase text-os-cream">{language.name}</p>
            <p className="mt-1 text-sm text-os-sand">{language.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function ContactPage({ data }: PageProps) {
  const { profile } = data;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({ subject: subject || "Prise de contact", body: message });
    window.location.href = `mailto:${profile.email}?${params.toString().replace(/\+/g, "%20")}`;
  }

  const field =
    "w-full bg-transparent text-sm text-os-cream placeholder:text-os-sand/60 outline-none";

  return (
    <div className="grid gap-10 px-6 py-8 sm:px-12 sm:py-12 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-os-cream">06 — Contact</p>
        <h1 className="mt-3 font-poster text-[clamp(52px,9cqw,120px)] font-semibold uppercase leading-[0.84] text-os-cream">
          Travaillons
          <br />
          <span className="text-os-lime">ensemble.</span>
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-os-sand">
          Un projet, une mission ou juste une question ? Écris-moi, je réponds rapidement.
        </p>
        <div className="mt-8 space-y-3 text-sm">
          <a href={`mailto:${profile.email}`} className="block break-all text-os-cream hover:text-os-orange">
            {profile.email}
          </a>
          <div className="flex gap-4">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-os-sand hover:text-os-cream">
              <GithubIcon size={16} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-os-sand hover:text-os-cream">
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#101012] shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-os-sand">Nouveau message</span>
        </div>
        <label className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
          <span className="w-12 font-mono text-[11px] uppercase text-os-sand">À</span>
          <span className="truncate text-sm text-os-cream">{profile.email}</span>
        </label>
        <label className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
          <span className="w-12 font-mono text-[11px] uppercase text-os-sand">Objet</span>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Nouveau projet" className={field} />
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={9}
          placeholder="Bonjour Brandon, ..."
          className={`${field} flex-1 resize-none px-5 py-4 leading-relaxed`}
        />
        <div className="flex justify-end border-t border-white/10 px-4 py-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-os-orange px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-white max-md:px-6 max-md:py-3.5"
          >
            Envoyer <Send size={13} />
          </button>
        </div>
      </form>
    </div>
  );
}
