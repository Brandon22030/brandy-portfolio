import EducationForm from "@/app/admin/EducationForm";
import { createEducation } from "@/app/admin/actions/education";

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Nouvelle formation</h1>
      <div className="mt-6">
        <EducationForm action={createEducation} submitLabel="Créer" />
      </div>
    </div>
  );
}
