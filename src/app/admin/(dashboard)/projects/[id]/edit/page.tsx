import { notFound } from "next/navigation";
import ProjectForm from "@/app/admin/ProjectForm";
import { updateProject } from "@/app/admin/actions/projects";
import { createClient } from "@/lib/supabase/server";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Éditer {project.name}</h1>
      <div className="mt-6">
        <ProjectForm action={updateProject.bind(null, id)} defaults={project} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
