import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-panel-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="font-mono text-xs">Next.js · React Three Fiber · Tailwind CSS</p>
      </div>
    </footer>
  );
}
