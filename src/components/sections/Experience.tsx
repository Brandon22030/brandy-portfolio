import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import { getExperience } from "@/lib/experience";

export default async function Experience() {
  const experience = await getExperience();

  return (
    <Section
      id="experience"
      eyebrow="Parcours"
      title="Expérience professionnelle"
      description="Du développement WordPress freelance aux applications fullstack en production, avec hébergement AWS et pipelines CI/CD."
    >
      <RevealGroup className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-panel-border sm:before:left-[15px]">
        {experience.map((exp) => (
          <RevealItem key={exp.company} className="relative pl-10 sm:pl-12">
            <span className="absolute left-0 top-2 h-[22px] w-[22px] rounded-full border border-accent/50 bg-background-elevated sm:h-[30px] sm:w-[30px]" />
            <span className="absolute left-[7px] top-[13px] h-2 w-2 rounded-full bg-accent sm:left-[11px] sm:top-[17px]" />
            <Card>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {exp.role} <span className="text-muted">— {exp.company}</span>
                </h3>
                <span className="font-mono text-xs text-accent">{exp.period}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">{exp.location}</p>
              <ul className="mt-4 space-y-2">
                {exp.highlights.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
