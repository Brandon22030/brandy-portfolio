import ExperienceForm from "@/app/admin/ExperienceForm";
import { createExperience } from "@/app/admin/actions/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Nouvelle expérience</h1>
      <div className="mt-6">
        <ExperienceForm action={createExperience} submitLabel="Créer" />
      </div>
    </div>
  );
}
