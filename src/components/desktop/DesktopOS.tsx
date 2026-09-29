"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Dock from "./Dock";
import FolderGlyph from "./FolderGlyph";
import MenuBar, { LogoLabel, type Menu } from "./MenuBar";
import OSWindow, { type WindowState } from "./OSWindow";
import { useMediaQuery } from "./hooks";
import {
  AboutPage,
  ContactPage,
  EducationPage,
  ExperiencePage,
  HomePage,
  ProjectPage,
  ProjectsPage,
  SkillsPage,
} from "./pages";
import { SECTIONS, sectionMeta, tabId, type PortfolioData, type SectionId, type Tab, type TabRef } from "./types";

const FIRST_TAB: Tab = { kind: "section", section: "about", id: "section:about" };

export default function DesktopOS({ data, onShutdown }: { data: PortfolioData; onShutdown: () => void }) {
  const [tabs, setTabs] = useState<Tab[]>([FIRST_TAB]);
  const [activeId, setActiveId] = useState(FIRST_TAB.id);
  const [windowState, setWindowState] = useState<WindowState | "closed">("open");
  const [maximized, setMaximized] = useState(false);
  const compact = useMediaQuery("(max-width: 767px)");
  const desktopRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((t) => t.id === activeId);

  function projectName(slug: string) {
    return data.projects.find((p) => p.slug === slug)?.name ?? slug;
  }

  function titleOf(tab: Tab) {
    if (tab.kind === "home") return "Nouvel onglet";
    if (tab.kind === "section") return sectionMeta(tab.section).label;
    return projectName(tab.slug);
  }

  function open(ref: TabRef) {
    const id = tabId(ref);
    const current = windowState === "closed" ? [] : tabs;
    setTabs(current.some((t) => t.id === id) ? current : [...current, { ...ref, id }]);
    setActiveId(id);
    setWindowState("open");
  }

  function closeTab(id: string) {
    const index = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    if (next.length === 0) {
      closeWindow();
      return;
    }
    setTabs(next);
    if (activeId === id) setActiveId(next[Math.max(0, index - 1)].id);
  }

  function closeWindow() {
    setWindowState("closed");
    setTabs([]);
  }

  const running = new Set<SectionId>(
    windowState === "closed"
      ? []
      : tabs.flatMap((t) => (t.kind === "section" ? [t.section] : t.kind === "project" ? ["projects" as const] : [])),
  );

  const breadcrumb = !activeTab
    ? ["Brandy OS"]
    : activeTab.kind === "project"
      ? ["Brandy OS", "Projets", projectName(activeTab.slug)]
      : ["Brandy OS", titleOf(activeTab)];

  const menus: Menu[] = [
    {
      id: "logo",
      label: <LogoLabel />,
      ariaLabel: "Menu Brandy OS",
      items: [
        { kind: "action", label: "À propos de Brandy OS", onSelect: () => open({ kind: "section", section: "about" }) },
        { kind: "separator" },
        { kind: "action", label: "Éteindre…", onSelect: onShutdown },
      ],
    },
    {
      id: "app",
      label: activeTab ? titleOf(activeTab) : "Finder",
      bold: true,
      items: [
        { kind: "action", label: "Nouvel onglet", onSelect: () => open({ kind: "home" }) },
        {
          kind: "action",
          label: "Fermer l'onglet",
          disabled: !activeTab,
          onSelect: () => activeTab && closeTab(activeTab.id),
        },
      ],
    },
    {
      id: "go",
      label: "Aller",
      items: SECTIONS.map((s) => ({
        kind: "action" as const,
        label: `${s.number}  ${s.label}`,
        onSelect: () => open({ kind: "section", section: s.id }),
      })),
    },
    {
      id: "window",
      label: "Fenêtre",
      desktopOnly: true,
      items: [
        { kind: "action", label: "Réduire", disabled: windowState !== "open", onSelect: () => setWindowState("minimized") },
        {
          kind: "action",
          label: maximized ? "Rétablir la taille" : "Agrandir",
          disabled: windowState !== "open",
          onSelect: () => setMaximized((m) => !m),
        },
        { kind: "separator" },
        { kind: "action", label: "Tout fermer", disabled: windowState === "closed", onSelect: closeWindow },
      ],
    },
    {
      id: "help",
      label: "Aide",
      desktopOnly: true,
      items: [
        { kind: "action", label: "Contacter Brandon", onSelect: () => open({ kind: "section", section: "contact" }) },
        { kind: "action", label: "Sommaire", onSelect: () => open({ kind: "home" }) },
      ],
    },
  ];

  return (
    <div className="os-wallpaper flex h-full w-full flex-col overflow-hidden text-os-cream">
      <MenuBar menus={menus} />

      <div ref={desktopRef} className="relative min-h-0 flex-1" style={{ perspective: 1400 }}>
        <WelcomeNote />

        {/* desktop icons */}
        <div className="absolute right-3 top-3 z-10 hidden flex-col gap-1 md:flex">
          <DesktopIcon label="Brandon.png" onOpen={() => open({ kind: "section", section: "about" })}>
            <div className="relative h-14 w-11">
              <Image src="/images/brandon-sticker.png" alt="" fill unoptimized className="object-contain" />
            </div>
          </DesktopIcon>
          {SECTIONS.filter((s) => s.id !== "about").map((section) => (
            <DesktopIcon key={section.id} label={section.label} onOpen={() => open({ kind: "section", section: section.id })}>
              <FolderGlyph className="w-14" tint={section.tint} />
            </DesktopIcon>
          ))}
        </div>

        <AnimatePresence>
          {windowState !== "closed" && activeTab ? (
            <OSWindow
              key="window"
              state={windowState}
              maximized={maximized}
              compact={compact}
              constraintsRef={desktopRef}
              tabs={tabs}
              activeId={activeId}
              breadcrumb={breadcrumb}
              titleOf={titleOf}
              onSelectTab={setActiveId}
              onCloseTab={closeTab}
              onNewTab={() => open({ kind: "home" })}
              onClose={closeWindow}
              onMinimize={() => setWindowState("minimized")}
              onToggleMaximize={() => setMaximized((m) => !m)}
            >
              <TabContent tab={activeTab} data={data} open={open} />
            </OSWindow>
          ) : null}
        </AnimatePresence>

        <Dock
          running={running}
          github={data.profile.github}
          linkedin={data.profile.linkedin}
          onOpen={(section) => open({ kind: "section", section })}
        />
      </div>
    </div>
  );
}

function TabContent({ tab, data, open }: { tab: Tab; data: PortfolioData; open: (ref: TabRef) => void }) {
  if (tab.kind === "home") return <HomePage data={data} open={open} />;
  if (tab.kind === "project") return <ProjectPage data={data} slug={tab.slug} />;
  const pages = {
    about: AboutPage,
    projects: ProjectsPage,
    experience: ExperiencePage,
    skills: SkillsPage,
    education: EducationPage,
    contact: ContactPage,
  } as const;
  const Page = pages[tab.section];
  return <Page data={data} open={open} />;
}

function DesktopIcon({ label, onOpen, children }: { label: string; onOpen: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-[88px] flex-col items-center gap-1 rounded-lg p-1.5 focus-visible:bg-white/10 focus-visible:outline-none"
    >
      <span className="flex h-14 items-center justify-center transition-transform group-hover:-translate-y-0.5 group-active:scale-95">
        {children}
      </span>
      <span className="rounded px-1.5 text-center text-[12px] leading-tight text-os-cream [text-shadow:0_1px_3px_rgba(0,0,0,0.8)] group-focus-visible:bg-os-orange">
        {label}
      </span>
    </button>
  );
}

function WelcomeNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 160, damping: 16 }}
      className="absolute left-6 top-6 z-0 hidden w-60 bg-os-yellow p-5 text-[#141416] shadow-[0_18px_40px_rgba(0,0,0,0.45)] lg:block"
    >
      <p className="font-poster text-3xl font-bold uppercase leading-none">Bienvenue !</p>
      <p className="mt-3 text-[13px] leading-snug">
        Tu es sur mon Mac. Ouvre les dossiers à droite ou passe par le dock : chaque dossier s&apos;ouvre dans un
        onglet.
      </p>
      <p className="mt-3 text-right font-poster text-xl font-semibold">— Brandon</p>
    </motion.div>
  );
}
