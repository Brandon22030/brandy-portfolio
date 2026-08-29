import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "@/app/admin/actions/projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white"
        >
          + Nouveau projet
        </Link>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie ta table `projects` et tes variables
          d&apos;environnement.
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-background-elevated p-4"
          >
            <div className="flex min-w-0 items-center gap-4">
              {project.image_url ? (
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-panel-border">
                  <Image src={project.image_url} alt="" fill className="object-cover" />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-foreground">{project.name}</p>
                <p className="mt-1 line-clamp-1 text-sm text-muted">{project.description}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="font-mono text-xs text-accent hover:underline"
              >
                Éditer
              </Link>
              <form action={deleteProject.bind(null, project.id)}>
                <button type="submit" className="font-mono text-xs text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}

        {projects && projects.length === 0 ? (
          <p className="text-sm text-muted">Aucun projet pour l&apos;instant.</p>
        ) : null}
      </div>
    </div>
  );
}
