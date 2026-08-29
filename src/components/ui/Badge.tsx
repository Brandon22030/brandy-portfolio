import clsx from "clsx";

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-panel-border bg-background px-3 py-1 font-mono text-xs text-foreground/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
