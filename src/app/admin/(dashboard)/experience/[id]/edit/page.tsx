import { notFound } from "next/navigation";
import ExperienceForm from "@/app/admin/ExperienceForm";
import { updateExperience } from "@/app/admin/actions/experience";
import { createClient } from "@/lib/supabase/server";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: exp } = await supabase.from("experience").select("*").eq("id", id).single();

  if (!exp) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Éditer {exp.role} — {exp.company}
      </h1>
      <div className="mt-6">
        <ExperienceForm action={updateExperience.bind(null, id)} defaults={exp} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
