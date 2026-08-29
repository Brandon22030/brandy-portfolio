import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteSkillGroup } from "@/app/admin/actions/skills";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: skillGroups, error } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Compétences</h1>
        <Link
          href="/admin/skills/new"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white"
        >
          + Nouveau groupe
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie que la table `skill_groups` existe.
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        {skillGroups?.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-background-elevated p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-foreground">{group.category}</p>
              <p className="mt-1 line-clamp-1 text-sm text-muted">{(group.items ?? []).join(", ")}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/skills/${group.id}/edit`}
                className="font-mono text-xs text-accent hover:underline"
              >
                Éditer
              </Link>
              <form action={deleteSkillGroup.bind(null, group.id)}>
                <button type="submit" className="font-mono text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}

        {skillGroups && skillGroups.length === 0 ? (
          <p className="text-sm text-muted">Aucun groupe de compétences pour l&apos;instant.</p>
        ) : null}
      </div>
    </div>
  );
}
