import Image from "next/image";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/data";
import { projectGradient } from "@/lib/palette";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2">
      {projects.map((project, index) => (
        <RevealItem key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-panel-border bg-background-elevated text-left shadow-[0_1px_2px_rgba(17,18,20,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(17,18,20,0.25)]"
          >
            <div className="relative flex aspect-[16/9] items-end overflow-hidden p-6">
              {project.imageUrl ? (
                <>
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0" style={{ backgroundImage: projectGradient(index) }} />
              )}
              <h3 className="relative text-balance font-display text-2xl font-bold text-white drop-shadow-sm">
                {project.name}
              </h3>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <span className="mt-5 font-mono text-xs text-accent">Voir les détails →</span>
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
