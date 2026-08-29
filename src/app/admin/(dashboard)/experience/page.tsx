import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteExperience } from "@/app/admin/actions/experience";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data: experience, error } = await supabase
    .from("experience")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Expérience</h1>
        <Link
          href="/admin/experience/new"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white"
        >
          + Nouvelle expérience
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie que la table `experience` existe.
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        {experience?.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-background-elevated p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                {exp.role} — {exp.company}
              </p>
              <p className="mt-1 text-sm text-muted">{exp.period}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/experience/${exp.id}/edit`}
                className="font-mono text-xs text-accent hover:underline"
              >
                Éditer
              </Link>
              <form action={deleteExperience.bind(null, exp.id)}>
                <button type="submit" className="font-mono text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}

        {experience && experience.length === 0 ? (
          <p className="text-sm text-muted">Aucune expérience pour l&apos;instant.</p>
        ) : null}
      </div>
    </div>
  );
}
