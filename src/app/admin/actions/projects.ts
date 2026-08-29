"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadMediaFile } from "@/lib/supabase/upload";

export type ProjectInput = {
  name: string;
  description: string;
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  figmaUrl: string | null;
  sortOrder: number;
};

function readProjectForm(formData: FormData): ProjectInput {
  const stackRaw = String(formData.get("stack") ?? "");
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    stack: stackRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    liveUrl: String(formData.get("liveUrl") ?? "").trim() || null,
    githubUrl: String(formData.get("githubUrl") ?? "").trim() || null,
    figmaUrl: String(formData.get("figmaUrl") ?? "").trim() || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function readImageFile(formData: FormData): File | null {
  const file = formData.get("image");
  return file instanceof File && file.size > 0 ? file : null;
}

export async function createProject(formData: FormData) {
  const input = readProjectForm(formData);
  const imageFile = readImageFile(formData);
  const supabase = await createClient();

  const imageUrl = imageFile ? await uploadMediaFile(supabase, imageFile, "projects") : null;

  const { error } = await supabase.from("projects").insert({
    name: input.name,
    description: input.description,
    stack: input.stack,
    image_url: imageUrl,
    live_url: input.liveUrl,
    github_url: input.githubUrl,
    figma_url: input.figmaUrl,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const input = readProjectForm(formData);
  const imageFile = readImageFile(formData);
  const supabase = await createClient();

  const update: Record<string, unknown> = {
    name: input.name,
    description: input.description,
    stack: input.stack,
    live_url: input.liveUrl,
    github_url: input.githubUrl,
    figma_url: input.figmaUrl,
    sort_order: input.sortOrder,
  };

  if (imageFile) {
    update.image_url = await uploadMediaFile(supabase, imageFile, "projects");
  }

  const { error } = await supabase.from("projects").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
