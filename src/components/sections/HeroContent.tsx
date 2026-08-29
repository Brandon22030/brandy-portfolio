"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import type { Profile } from "@/lib/about";

export default function HeroContent({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-32 pt-12 sm:px-10"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-panel-border bg-background-elevated px-3 py-1.5 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {profile.location}
          </span>

          <h1 className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-muted">Des interfaces soignées,</span>
            <br />
            <span className="text-foreground">du concept au déploiement.</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-foreground/80">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="rounded-full border border-panel-border px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Me contacter
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5 text-muted">
            <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-accent">
              <Mail size={20} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
              <GithubIcon size={20} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
              <LinkedinIcon size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-accent/25 to-accent-2/25 blur-2xl" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-panel-border bg-background-elevated">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-cover"
              priority
            />
          </div>
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-panel-border bg-background-elevated px-4 py-2 font-mono text-xs font-medium text-foreground shadow-[0_8px_24px_-12px_rgba(17,18,20,0.25)]">
            {profile.role}
          </span>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Défiler vers la section suivante"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
