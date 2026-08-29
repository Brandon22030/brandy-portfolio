import { Mail } from "lucide-react";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Discutons de votre projet"
      description="Disponible pour des missions front-end, data ou full remote."
    >
      <GlassCard className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">{profile.name}</p>
          <p className="mt-1 text-muted">{profile.location}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-mono text-sm font-medium text-[#04121a] transition-transform hover:scale-[1.03]"
          >
            <Mail size={16} />
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-panel-border px-5 py-3 font-mono text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-panel-border px-5 py-3 font-mono text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </GlassCard>
    </Section>
  );
}
