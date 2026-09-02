import type { ReactNode } from "react";
import { FadeIn } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:px-6">
      <FadeIn>
        <p className="font-mono text-sm tracking-widest text-accent uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-balance text-foreground/80">{description}</p>
        ) : null}
      </FadeIn>
      <div className="mt-12">{children}</div>
    </section>
  );
}
