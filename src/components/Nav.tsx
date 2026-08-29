"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background px-6 pt-4 sm:px-8">
      <nav
        className={clsx(
          "mx-auto flex max-w-5xl items-center justify-between gap-5 rounded-full border border-panel-border bg-background-elevated px-4 py-3 transition-shadow",
          scrolled ? "shadow-[0_8px_24px_-12px_rgba(17,18,20,0.18)]" : "shadow-[0_2px_10px_-6px_rgba(17,18,20,0.08)]",
        )}
      >
        <a
          href="#top"
          className="shrink-0 whitespace-nowrap px-1 font-display text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          Brandy The <span className="text-accent">Dev</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={clsx(
                  "whitespace-nowrap font-mono text-xs transition-colors hover:text-accent",
                  active === link.href ? "text-accent" : "text-muted",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden shrink-0 rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white transition-transform hover:scale-[1.03] md:inline-block"
        >
          Me contacter
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-full p-1.5 text-foreground md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <ul className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl border border-panel-border bg-background-elevated p-3 shadow-[0_16px_40px_-20px_rgba(17,18,20,0.25)] md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-3 py-2 font-mono text-sm text-muted transition-colors hover:bg-background hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
