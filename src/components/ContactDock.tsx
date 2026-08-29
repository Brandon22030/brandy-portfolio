"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Plus } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/lib/data";

const links = [
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: profile.github, label: "GitHub", icon: GithubIcon },
  { href: profile.linkedin, label: "LinkedIn", icon: LinkedinIcon },
];

export default function ContactDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1 rounded-2xl border border-panel-border bg-background-elevated p-2 shadow-[0_16px_40px_-16px_rgba(17,18,20,0.3)]"
          >
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-xl px-3 py-2 font-mono text-sm text-foreground/80 transition-colors hover:bg-background hover:text-accent"
                onClick={() => setOpen(false)}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer le contact" : "Me contacter"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_12px_28px_-10px_rgba(67,56,202,0.6)] transition-transform hover:scale-105"
      >
        <motion.span animate={{ rotate: open ? 135 : 0 }} transition={{ duration: 0.2 }}>
          <Plus size={22} />
        </motion.span>
      </button>
    </div>
  );
}
