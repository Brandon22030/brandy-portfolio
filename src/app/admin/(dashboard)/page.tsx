import Link from "next/link";

const sections = [
  { href: "/admin/projects", label: "Projets", description: "Les projets affichés sur la page publique." },
  { href: "/admin/clients", label: "Clients", description: "Logos défilants sous le hero." },
  { href: "/admin/about", label: "À propos", description: "Profil, résumé et chiffres clés du hero." },
  { href: "/admin/experience", label: "Expérience", description: "Parcours professionnel." },
  { href: "/admin/skills", label: "Compétences", description: "Groupes de compétences techniques." },
  { href: "/admin/education", label: "Formations", description: "Diplômes et certifications." },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Espace admin</h1>
      <p className="mt-1 text-sm text-muted">Choisis une section à gérer.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-panel-border bg-background-elevated p-5 transition-colors hover:border-accent/40"
          >
            <p className="font-display text-base font-semibold text-foreground">{section.label}</p>
            <p className="mt-1 text-sm text-muted">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
