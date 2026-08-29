"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const statsRaw = String(formData.get("stats") ?? "[]").trim();
  let stats: unknown;
  try {
    stats = JSON.parse(statsRaw || "[]");
  } catch {
    throw new Error("Le champ « Stats » doit être un JSON valide, ex: [{\"value\":\"2+\",\"label\":\"Ans\"}]");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profile")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      tagline: String(formData.get("tagline") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      github_url: String(formData.get("githubUrl") ?? "").trim(),
      linkedin_url: String(formData.get("linkedinUrl") ?? "").trim(),
      summary: String(formData.get("summary") ?? "").trim(),
      about_description: String(formData.get("aboutDescription") ?? "").trim(),
      stats,
    })
    .eq("id", 1);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}
