import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteEducation } from "@/app/admin/actions/education";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const supabase = await createClient();
  const { data: education, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Formations</h1>
        <Link
          href="/admin/education/new"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white"
        >
          + Nouvelle formation
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie que la table `education` existe.
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        {education?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-background-elevated p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm text-muted">
                {item.school} · {item.period}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/education/${item.id}/edit`}
                className="font-mono text-xs text-accent hover:underline"
              >
                Éditer
              </Link>
              <form action={deleteEducation.bind(null, item.id)}>
                <button type="submit" className="font-mono text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}

        {education && education.length === 0 ? (
          <p className="text-sm text-muted">Aucune formation pour l&apos;instant.</p>
        ) : null}
      </div>
    </div>
  );
}
