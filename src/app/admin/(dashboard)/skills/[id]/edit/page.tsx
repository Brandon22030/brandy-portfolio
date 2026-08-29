import { notFound } from "next/navigation";
import SkillGroupForm from "@/app/admin/SkillGroupForm";
import { updateSkillGroup } from "@/app/admin/actions/skills";
import { createClient } from "@/lib/supabase/server";

export default async function EditSkillGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: group } = await supabase.from("skill_groups").select("*").eq("id", id).single();

  if (!group) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Éditer {group.category}</h1>
      <div className="mt-6">
        <SkillGroupForm action={updateSkillGroup.bind(null, id)} defaults={group} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
