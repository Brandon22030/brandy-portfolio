import { notFound } from "next/navigation";
import EducationForm from "@/app/admin/EducationForm";
import { updateEducation } from "@/app/admin/actions/education";
import { createClient } from "@/lib/supabase/server";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase.from("education").select("*").eq("id", id).single();

  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Éditer {item.title}</h1>
      <div className="mt-6">
        <EducationForm action={updateEducation.bind(null, id)} defaults={item} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
