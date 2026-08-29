"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readEducationForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    school: String(formData.get("school") ?? "").trim(),
    period: String(formData.get("period") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createEducation(formData: FormData) {
  const input = readEducationForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("education").insert({
    title: input.title,
    school: input.school,
    period: input.period,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/education");
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  const input = readEducationForm(formData);
  const supabase = await createClient();
  const { error } = await supabase
    .from("education")
    .update({
      title: input.title,
      school: input.school,
      period: input.period,
      sort_order: input.sortOrder,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/education");
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/education");
}
