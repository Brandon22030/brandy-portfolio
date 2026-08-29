import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { getProfile } from "@/lib/about";

export default async function About() {
  const profile = await getProfile();

  return (
    <Section
      id="about"
      eyebrow="À propos"
      title="De l'interface au déploiement, toute la chaîne"
      description={profile.aboutDescription}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {profile.stats.map((stat) => (
          <Card key={stat.label}>
            <p className="font-display text-3xl font-semibold text-accent">{stat.value}</p>
            <p className="mt-2 font-mono text-sm text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-balance leading-relaxed text-foreground/85">
        {profile.summary}
      </p>
    </Section>
  );
}
