import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PenTool } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import Badge from "@/components/ui/Badge";
import Footer from "@/components/Footer";
import type { Project } from "@/lib/data";
import { projectGradient } from "@/lib/palette";

export default function ProjectDetail({ project, index }: { project: Project; index: number }) {
  const hasLinks = project.liveUrl || project.githubUrl || project.figmaUrl;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-panel-border bg-background px-6 py-5 sm:px-10">
        <Link href="/" className="font-display text-sm font-semibold tracking-tight text-foreground">
          Brandy The <span className="text-accent">Dev</span>
        </Link>
        <Link
          href="/#projects"
          className="rounded-full border border-panel-border bg-background-elevated px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-accent/50 hover:text-accent"
        >
          ← Retour aux projets
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
        <div>
          {project.category ? (
            <span className="inline-flex rounded-full border border-panel-border bg-background-elevated px-3 py-1.5 font-mono text-xs text-muted">
              {project.category}
            </span>
          ) : null}
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 max-w-xl text-balance leading-relaxed text-foreground/80">{project.description}</p>
          {project.client || project.date ? (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
              {project.client ? (
                <div>
                  <span className="block text-foreground/50">Client</span>
                  {project.client}
                </div>
              ) : null}
              {project.date ? (
                <div>
                  <span className="block text-foreground/50">Date</span>
                  {project.date}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-panel-border">
          {project.imageUrl ? (
            <Image src={project.imageUrl} alt={project.name} fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0" style={{ backgroundImage: projectGradient(index) }} />
          )}
        </div>

        {project.galleryUrls && project.galleryUrls.length > 0 ? (
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {project.galleryUrls.map((url, i) => (
              <div
                key={url}
                className="relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-panel-border sm:h-36 sm:w-56"
              >
                <Image
                  src={url}
                  alt={`${project.name} — photo ${i + 2}`}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        {project.intro ? (
          <section className="mt-20 border-t border-panel-border pt-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Le projet</p>
            <p className="mt-4 max-w-2xl text-balance leading-relaxed text-foreground text-lg">
              {project.intro}
            </p>
          </section>
        ) : null}

        {project.features && project.features.length > 0 ? (
          <section className="mt-20 border-t border-panel-border pt-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">Fonctionnalités</p>
            <ul className="mt-6 max-w-2xl space-y-4">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-base leading-relaxed text-foreground/85">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-20 border-t border-panel-border pt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Stack technique</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          {hasLinks ? (
            <div className="mt-8 flex flex-wrap gap-4 border-t border-panel-border pt-6 text-sm">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-foreground"
                >
                  <ExternalLink size={15} />
                  Voir le site
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                >
                  <GithubIcon size={15} />
                  Code source
                </a>
              ) : null}
              {project.figmaUrl ? (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                >
                  <PenTool size={15} />
                  Design
                </a>
              ) : null}
            </div>
          ) : null}

          <Link
            href="/#projects"
            className="mt-10 inline-block rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            ← Tous les projets
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
