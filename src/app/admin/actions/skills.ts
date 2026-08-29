"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readSkillGroupForm(formData: FormData) {
  const itemsRaw = String(formData.get("items") ?? "");
  return {
    category: String(formData.get("category") ?? "").trim(),
    items: itemsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createSkillGroup(formData: FormData) {
  const input = readSkillGroupForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.from("skill_groups").insert({
    category: input.category,
    items: input.items,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function updateSkillGroup(id: string, formData: FormData) {
  const input = readSkillGroupForm(formData);
  const supabase = await createClient();
  const { error } = await supabase
    .from("skill_groups")
    .update({
      category: input.category,
      items: input.items,
      sort_order: input.sortOrder,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkillGroup(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("skill_groups").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/skills");
}
