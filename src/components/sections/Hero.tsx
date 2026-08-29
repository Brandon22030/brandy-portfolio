"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-32 sm:px-8">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-sm tracking-widest text-accent uppercase">
            {profile.location}
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight text-foreground sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-balance font-display text-xl text-foreground/80 sm:text-2xl">
            {profile.role} <span className="text-muted">·</span>{" "}
            <span className="text-accent-2">{profile.tagline}</span>
          </p>
          <p className="mt-6 max-w-xl text-balance leading-relaxed text-foreground/90">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-[#04121a] transition-transform hover:scale-[1.03]"
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative shrink-0"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/30 to-accent-2/30 blur-2xl" />
          <div className="relative h-36 w-36 overflow-hidden rounded-[1.75rem] border border-panel-border sm:h-48 sm:w-48">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          </div>
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
