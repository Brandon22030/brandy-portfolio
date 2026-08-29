"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, PenTool, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/data";
import { projectGradient } from "@/lib/palette";

export default function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project | null;
  index: number;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  const hasLinks = project && (project.liveUrl || project.githubUrl || project.figmaUrl);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-panel-border bg-background-elevated shadow-[0_32px_80px_-24px_rgba(17,18,20,0.4)] sm:max-h-[70vh] sm:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 rounded-full bg-background-elevated/90 p-2 text-foreground shadow-[0_4px_12px_rgba(17,18,20,0.15)] transition-transform hover:scale-105"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-[42%]">
              {project.imageUrl ? (
                <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0" style={{ backgroundImage: projectGradient(index) }} />
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="text-balance font-display text-2xl font-bold text-foreground">{project.name}</h3>

              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              {hasLinks ? (
                <div className="mt-6 flex flex-wrap gap-4 border-t border-panel-border pt-5 text-sm">
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
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
