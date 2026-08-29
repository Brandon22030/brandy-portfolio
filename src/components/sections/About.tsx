import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import { profile } from "@/lib/data";

const stats = [
  { label: "Ans d'expérience", value: "2+" },
  { label: "Apps en production", value: "4+" },
  { label: "Stack", value: "Front-end & Data" },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="À propos"
      title="Du rendu React aux données qui l'alimentent"
      description="Un profil qui relie l'interface et la donnée : je construis les écrans, mais aussi les APIs et les modèles qui les nourrissent."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <GlassCard key={stat.label}>
            <p className="font-display text-3xl font-semibold text-accent">{stat.value}</p>
            <p className="mt-2 font-mono text-sm text-muted">{stat.label}</p>
          </GlassCard>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-balance leading-relaxed text-foreground/85">
        {profile.summary}
      </p>
    </Section>
  );
}
