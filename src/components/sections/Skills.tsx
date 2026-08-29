import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getSkillGroups } from "@/lib/skills";

export default async function Skills() {
  const skills = await getSkillGroups();

  return (
    <Section
      id="skills"
      eyebrow="Compétences"
      title="Une boîte à outils fullstack"
      description="De l'interface React au déploiement AWS, en passant par la donnée, la qualité et le mobile."
    >
      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <RevealItem key={group.category}>
            <Card className="h-full">
              <h3 className="font-display text-base font-semibold text-foreground">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
