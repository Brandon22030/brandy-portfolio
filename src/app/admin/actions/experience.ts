"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readExperienceForm(formData: FormData) {
  const highlightsRaw = String(formData.get("highlights") ?? "");
  return {
    company: String(formData.get("company") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    highlights: highlightsRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createExperience(formData: FormData) {
  const input = readExperienceForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("experience").insert({
    company: input.company,
    role: input.role,
    period: input.period,
    location: input.location,
    highlights: input.highlights,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const input = readExperienceForm(formData);
  const supabase = await createClient();
  const { error } = await supabase
    .from("experience")
    .update({
      company: input.company,
      role: input.role,
      period: input.period,
      location: input.location,
      highlights: input.highlights,
      sort_order: input.sortOrder,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/experience");
}
