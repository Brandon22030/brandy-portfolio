"use client";

import type { CSSProperties, PointerEvent, ReactNode, RefObject } from "react";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "motion/react";
import { ChevronRight, Maximize2, Minimize2, Minus, Plus, X } from "lucide-react";
import { tabIcon } from "./sectionIcons";
import type { Tab } from "./types";

export type WindowState = "open" | "minimized";

const NORMAL: CSSProperties = {
  left: "max(1rem, calc((100% - 7.5rem - min(1080px, 100% - 10rem)) / 2))",
  top: "1.25rem",
  width: "min(1080px, 100% - 10rem)",
  height: "calc(100% - 8rem)",
};

const MAXIMIZED: CSSProperties = { left: "0.5rem", top: "0.5rem", width: "calc(100% - 1rem)", height: "calc(100% - 6.25rem)" };

const COMPACT: CSSProperties = { left: 0, top: 0, width: "100%", height: "calc(100% - 4.75rem)" };

export default function OSWindow({
  state,
  maximized,
  compact,
  constraintsRef,
  tabs,
  activeId,
  breadcrumb,
  titleOf,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onClose,
  onMinimize,
  onToggleMaximize,
  children,
}: {
  state: WindowState;
  maximized: boolean;
  compact: boolean;
  constraintsRef: RefObject<HTMLDivElement | null>;
  tabs: Tab[];
  activeId: string;
  breadcrumb: string[];
  titleOf: (tab: Tab) => string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  children: ReactNode;
}) {
  const controls = useDragControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const fixed = maximized || compact;
  const geometry = compact ? COMPACT : maximized ? MAXIMIZED : NORMAL;

  function toggleMaximize() {
    if (compact) return;
    x.set(0);
    y.set(0);
    onToggleMaximize();
  }

  function startDrag(event: PointerEvent) {
    if (fixed || (event.target as HTMLElement).closest("button")) return;
    controls.start(event);
  }

  return (
    <motion.section
      layout
      aria-label="Fenêtre Brandy OS"
      drag={!fixed}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={constraintsRef}
      initial={{ opacity: 0, scale: 0.9, rotateX: 12 }}
      animate={
        state === "minimized"
          ? { opacity: 0, scale: 0.2, rotateX: 0, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }
          : { opacity: 1, scale: 1, rotateX: 0 }
      }
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      style={{
        ...geometry,
        x,
        y,
        transformPerspective: 1400,
        transformOrigin: "50% 100%",
        pointerEvents: state === "minimized" ? "none" : "auto",
      }}
      className={`absolute z-30 flex flex-col overflow-hidden border border-white/10 bg-[#141416]/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl ${
        compact ? "rounded-none" : "rounded-xl"
      }`}
    >
      {/* title bar: traffic lights + tabs */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={toggleMaximize}
        className={`flex h-11 shrink-0 items-center gap-3 border-b border-white/10 bg-black/30 pl-4 pr-2 ${fixed ? "" : "cursor-grab active:cursor-grabbing"}`}
      >
        <div className="group/lights flex shrink-0 items-center gap-2">
          <TrafficLight color="#ff5f57" label="Fermer la fenêtre" onClick={onClose}>
            <X size={8} strokeWidth={3} />
          </TrafficLight>
          <TrafficLight color="#febc2e" label="Réduire la fenêtre" onClick={onMinimize}>
            <Minus size={8} strokeWidth={3} />
          </TrafficLight>
          <TrafficLight color="#28c840" label="Agrandir la fenêtre" onClick={toggleMaximize} disabled={compact}>
            {maximized ? <Minimize2 size={7} strokeWidth={3} /> : <Maximize2 size={7} strokeWidth={3} />}
          </TrafficLight>
        </div>

        <div role="tablist" className="os-scroll flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          <AnimatePresence initial={false}>
            {tabs.map((tab) => {
              const Icon = tabIcon(tab);
              const active = tab.id === activeId;
              return (
                <motion.div
                  key={tab.id}
                  layout="position"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className={`group/tab flex h-8 min-w-0 max-w-[200px] shrink-0 items-center rounded-lg transition-colors ${
                    active ? "bg-white/10 text-os-cream" : "text-os-sand hover:bg-white/5 hover:text-os-cream"
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectTab(tab.id)}
                    className="flex min-w-0 flex-1 items-center gap-2 py-1 pl-3 pr-1 text-left"
                  >
                    <Icon size={13} className="shrink-0" />
                    <span className="truncate text-[12.5px]">{titleOf(tab)}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Fermer l'onglet ${titleOf(tab)}`}
                    onClick={() => onCloseTab(tab.id)}
                    className={`mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-white/15 ${
                      active ? "opacity-70" : "opacity-0 group-hover/tab:opacity-70"
                    }`}
                  >
                    <X size={11} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <button
            type="button"
            aria-label="Nouvel onglet"
            onClick={onNewTab}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-os-sand hover:bg-white/10 hover:text-os-cream"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* path bar */}
      <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-white/5 px-4 font-mono text-[11px] text-os-sand">
        {breadcrumb.map((part, i) => (
          <span key={`${part}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? <ChevronRight size={11} className="opacity-50" /> : null}
            <span className={i === breadcrumb.length - 1 ? "text-os-cream" : ""}>{part}</span>
          </span>
        ))}
      </div>

      <div className="os-screen os-scroll relative min-h-0 flex-1 overflow-y-auto [container-type:inline-size]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function TrafficLight({
  color,
  label,
  onClick,
  disabled,
  children,
}: {
  color: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-3 w-3 items-center justify-center rounded-full text-black/60 disabled:opacity-40"
      style={{ background: color }}
    >
      <span className="opacity-0 transition-opacity group-hover/lights:opacity-100">{children}</span>
    </button>
  );
}
