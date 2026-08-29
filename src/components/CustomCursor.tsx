"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary, input[type="submit"]';
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default function CustomCursor() {
  const enabled = useMediaQuery("(pointer: fine)");
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overText, setOverText] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor");

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
      setOverText(Boolean(target?.closest(TEXT_SELECTOR)));
    };

    const handleLeave = () => setVisible(false);
    const handleDown = () => setVisible(true);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const show = visible && !overText;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
        style={{ x, y, translate: "-50% -50%", opacity: show ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border-2 border-foreground shadow-[0_2px_16px_rgba(17,18,20,0.2)]"
        style={{ x: ringX, y: ringY, translate: "-50% -50%", opacity: show ? 1 : 0 }}
        animate={{
          width: hovering ? 56 : 26,
          height: hovering ? 56 : 26,
          backgroundColor: hovering ? "rgba(67,56,202,0.12)" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
