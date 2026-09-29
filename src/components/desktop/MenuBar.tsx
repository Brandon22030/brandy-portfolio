"use client";

import { useState, type ReactNode } from "react";
import { BatteryFull, Wifi } from "lucide-react";
import Monogram from "./Monogram";
import { useClock } from "./hooks";

export type MenuItem =
  | { kind: "action"; label: string; shortcut?: string; onSelect: () => void; disabled?: boolean }
  | { kind: "link"; label: string; href: string }
  | { kind: "separator" };

export type Menu = { id: string; label: ReactNode; ariaLabel?: string; bold?: boolean; items: MenuItem[]; desktopOnly?: boolean };

export default function MenuBar({ menus }: { menus: Menu[] }) {
  const clock = useClock();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {openId ? <div className="fixed inset-0 z-[55]" onClick={() => setOpenId(null)} /> : null}
      <header className="relative z-[60] flex h-7 shrink-0 items-center justify-between bg-black/45 px-2 text-[13px] text-os-cream backdrop-blur-xl">
        <nav className="flex items-center">
          {menus.map((menu) => (
            <div key={menu.id} className={`relative ${menu.desktopOnly ? "max-md:hidden" : ""}`}>
              <button
                type="button"
                aria-label={menu.ariaLabel}
                aria-haspopup="menu"
                aria-expanded={openId === menu.id}
                onClick={() => setOpenId(openId === menu.id ? null : menu.id)}
                onMouseEnter={() => openId && openId !== menu.id && setOpenId(menu.id)}
                className={`flex h-6 items-center rounded px-2.5 ${menu.bold ? "font-semibold" : ""} ${
                  openId === menu.id ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {menu.label}
              </button>
              {openId === menu.id ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-1 min-w-[230px] rounded-lg border border-white/10 bg-[#1c1c1f]/95 p-1 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                >
                  {menu.items.map((item, i) => {
                    if (item.kind === "separator") return <div key={i} className="mx-2 my-1 h-px bg-white/10" />;
                    const className =
                      "flex w-full items-center justify-between gap-6 rounded-md px-3 py-1.5 text-left text-[13px] text-os-cream hover:bg-os-orange hover:text-white disabled:pointer-events-none disabled:opacity-40";
                    if (item.kind === "link") {
                      return (
                        <a key={i} role="menuitem" href={item.href} className={className}>
                          {item.label}
                        </a>
                      );
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        role="menuitem"
                        disabled={item.disabled}
                        onClick={() => {
                          setOpenId(null);
                          item.onSelect();
                        }}
                        className={className}
                      >
                        {item.label}
                        {item.shortcut ? <span className="font-mono text-[11px] opacity-60">{item.shortcut}</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 pr-1.5 text-os-cream/90">
          <Wifi size={14} className="max-sm:hidden" />
          <BatteryFull size={17} className="max-sm:hidden" />
          <span className="min-w-[7.5rem] text-right tabular-nums first-letter:uppercase max-sm:min-w-0">{clock}</span>
        </div>
      </header>
    </>
  );
}

export function LogoLabel() {
  return <Monogram className="h-[15px] w-[15px] text-[11px]" />;
}
