import { ExternalLink, PenTool } from "lucide-react";
import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projets"
      title="Projets"
      description="Conçus et développés en autonomie, du cahier des charges au produit."
    >
      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <RevealItem key={project.name}>
            <GlassCard className="flex h-full flex-col">
              <h3 className="font-display text-xl font-semibold text-foreground">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {project.liveUrl || project.githubUrl || project.figmaUrl ? (
                <div className="mt-5 flex flex-wrap gap-3 pt-1 text-sm">
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
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
