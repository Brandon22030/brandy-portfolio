"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SECTION_ICONS } from "./sectionIcons";
import { SECTIONS, type SectionId } from "./types";

const BASE = 50;
const PEAK = 78;
const RANGE = 150;

export default function Dock({
  running,
  github,
  linkedin,
  onOpen,
}: {
  running: Set<SectionId>;
  github: string;
  linkedin: string;
  onOpen: (section: SectionId) => void;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav aria-label="Dock" className="pointer-events-none absolute inset-x-0 bottom-2 z-50 flex justify-center px-2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex max-w-full items-end gap-2 rounded-[22px] border border-white/15 bg-white/10 px-2.5 pb-2 pt-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl max-sm:gap-1.5 max-sm:overflow-x-auto max-sm:[scrollbar-width:none]"
      >
        {SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.id];
          return (
            <DockItem
              key={section.id}
              mouseX={mouseX}
              label={section.label}
              running={running.has(section.id)}
              onClick={() => onOpen(section.id)}
              background={`linear-gradient(160deg, ${section.tint}, color-mix(in oklab, ${section.tint} 55%, #000))`}
            >
              {section.id === "about" ? (
                <Image src="/images/brandon-sticker.png" alt="" fill sizes="80px" className="object-contain p-[8%]" />
              ) : (
                <Icon className="h-[46%] w-[46%] text-[#141416]" strokeWidth={2} />
              )}
            </DockItem>
          );
        })}

        <span className="mx-1 h-10 w-px self-center bg-white/20" />

        <DockItem mouseX={mouseX} label="GitHub" href={github} background="linear-gradient(160deg,#3a3a3f,#141416)">
          <span className="text-os-cream [&_svg]:h-[22px] [&_svg]:w-[22px]">
            <GithubIcon />
          </span>
        </DockItem>
        <DockItem mouseX={mouseX} label="LinkedIn" href={linkedin} background="linear-gradient(160deg,#2f7dd1,#0b4f96)">
          <span className="text-white [&_svg]:h-[22px] [&_svg]:w-[22px]">
            <LinkedinIcon />
          </span>
        </DockItem>
      </motion.div>
    </nav>
  );
}

function DockItem({
  mouseX,
  label,
  background,
  running,
  onClick,
  href,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  background: string;
  running?: boolean;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const box = ref.current?.getBoundingClientRect();
    return box ? x - box.left - box.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(distance, [-RANGE, 0, RANGE], [BASE, PEAK, BASE]), {
    stiffness: 400,
    damping: 28,
    mass: 0.2,
  });

  const tile = (
    <motion.div
      ref={ref}
      style={{ width: size, height: size, background }}
      className="relative flex items-center justify-center overflow-hidden rounded-[24%] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_14px_rgba(0,0,0,0.35)] max-sm:!h-11 max-sm:!w-11"
    >
      {children}
    </motion.div>
  );

  const content = (
    <>
      <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#141416]/90 px-2.5 py-1 font-mono text-[11px] text-os-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        {label}
      </span>
      {tile}
      <span className={`mt-1 h-1 w-1 rounded-full ${running ? "bg-os-cream" : "bg-transparent"}`} />
    </>
  );

  const className = "group relative flex shrink-0 flex-col items-center";

  if (href) {
    return (
      <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      {content}
    </button>
  );
}
