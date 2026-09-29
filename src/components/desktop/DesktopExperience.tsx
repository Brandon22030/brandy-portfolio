"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import DeskScene from "./scene/DeskScene";
import DesktopOS from "./DesktopOS";
import { setIntroSeen, useIntroSeen } from "./hooks";
import type { PortfolioData } from "./types";

export default function DesktopExperience({ data }: { data: PortfolioData }) {
  const introSeen = useIntroSeen();

  if (introSeen === null) {
    return <div className="fixed inset-0 bg-os-ink" />;
  }


  return (
    <MotionConfig reducedMotion="user">
    <div className="fixed inset-0 overflow-hidden bg-os-ink">
      <AnimatePresence>
        {introSeen ? (
          <motion.div
            key="os"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
          >
            <DesktopOS
              data={data}
              onShutdown={() => setIntroSeen(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="intro"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DeskScene onEnter={() => setIntroSeen(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
