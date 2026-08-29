import clsx from "clsx";
import type { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-panel-border bg-background-elevated p-6 shadow-[0_1px_2px_rgba(17,18,20,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(17,18,20,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
