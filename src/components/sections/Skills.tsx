import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Compétences"
      title="Une boîte à outils front-end & data"
      description="De l'interface React à la donnée PostgreSQL, en passant par la performance et le SEO technique."
    >
      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <RevealItem key={group.category}>
            <GlassCard className="h-full">
              <h3 className="font-display text-base font-semibold text-foreground">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </GlassCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
