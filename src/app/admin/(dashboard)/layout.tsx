import type { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/app/admin/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const sections = [
  { href: "/admin/projects", label: "Projets" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/about", label: "À propos" },
  { href: "/admin/experience", label: "Expérience" },
  { href: "/admin/skills", label: "Compétences" },
  { href: "/admin/education", label: "Formations" },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6">
        <h1 className="font-display text-xl font-semibold text-foreground">Supabase non configuré</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Remplis <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">.env.local</code> avec
          l&apos;URL et la clé anon de ton projet Supabase (voir{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">.env.example</code>), exécute{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">supabase/schema.sql</code> puis{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">supabase/seed.sql</code> et{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">supabase/seed_content.sql</code>{" "}
          dans le SQL editor de ton projet, et redémarre le serveur.
        </p>
        <Link href="/" className="mt-6 font-mono text-xs text-accent hover:underline">
          ← Retour au site
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-panel-border bg-background-elevated">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-display text-base font-semibold text-foreground">
            Espace admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-xs text-muted transition-colors hover:text-accent">
              Voir le site
            </Link>
            <form action={signOut}>
              <button type="submit" className="font-mono text-xs text-muted transition-colors hover:text-accent">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-4xl gap-5 px-6 pb-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
