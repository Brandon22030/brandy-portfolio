import SkillGroupForm from "@/app/admin/SkillGroupForm";
import { createSkillGroup } from "@/app/admin/actions/skills";

export default function NewSkillGroupPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Nouveau groupe de compétences</h1>
      <div className="mt-6">
        <SkillGroupForm action={createSkillGroup} submitLabel="Créer" />
      </div>
    </div>
  );
}
