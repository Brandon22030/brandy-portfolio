import ProjectForm from "@/app/admin/ProjectForm";
import { createProject } from "@/app/admin/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Nouveau projet</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} submitLabel="Créer le projet" />
      </div>
    </div>
  );
}
