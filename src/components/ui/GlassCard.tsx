import clsx from "clsx";
import type { ReactNode } from "react";

export default function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-panel-border bg-panel p-6 backdrop-blur-md transition-colors hover:border-accent/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
