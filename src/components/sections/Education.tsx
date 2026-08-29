import Section from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { education, languages } from "@/lib/data";

export default function Education() {
  return (
    <Section id="education" eyebrow="Formation" title="Formation & langues">
      <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr]">
        <RevealGroup className="space-y-4">
          {education.map((item) => (
            <RevealItem key={item.title}>
              <GlassCard>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                  <span className="font-mono text-xs text-accent">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.school}</p>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup>
          <RevealItem>
            <GlassCard>
              <h3 className="font-display text-base font-semibold text-foreground">Langues</h3>
              <div className="mt-4 space-y-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-sm text-foreground/85">{lang.name}</span>
                    <Badge>{lang.level}</Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
