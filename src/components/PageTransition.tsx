"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// Only /projects/* navigations get the swipe treatment — the rest of the
// site is a one-page anchor-scroll (no real route change), and admin
// shouldn't get this motion.
function isProjectRoute(pathname: string) {
  return pathname.startsWith("/projects/");
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const animated = isProjectRoute(pathname);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={animated ? { x: "-100%" } : false}
        animate={{ x: 0 }}
        exit={animated ? { x: "100%" } : undefined}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
