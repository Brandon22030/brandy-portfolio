"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadMediaFile } from "@/lib/supabase/upload";
import { slugify } from "@/lib/slug";

export type ProjectInput = {
  slug: string;
  name: string;
  description: string;
  intro: string | null;
  features: string[] | null;
  category: string | null;
  client: string | null;
  projectDate: string | null;
  stack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  figmaUrl: string | null;
  sortOrder: number;
};

function readProjectForm(formData: FormData): ProjectInput {
  const name = String(formData.get("name") ?? "").trim();
  const stackRaw = String(formData.get("stack") ?? "");
  const featuresRaw = String(formData.get("features") ?? "");
  const slugRaw = String(formData.get("slug") ?? "").trim();

  return {
    slug: slugify(slugRaw || name),
    name,
    description: String(formData.get("description") ?? "").trim(),
    intro: String(formData.get("intro") ?? "").trim() || null,
    features: featuresRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    category: String(formData.get("category") ?? "").trim() || null,
    client: String(formData.get("client") ?? "").trim() || null,
    projectDate: String(formData.get("projectDate") ?? "").trim() || null,
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

// The gallery textarea holds the URLs the admin wants to KEEP (one per
// line — deleting a line removes that photo). New uploads are appended.
function readKeptGalleryUrls(formData: FormData): string[] {
  return String(formData.get("galleryUrls") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readGalleryFiles(formData: FormData): File[] {
  return formData.getAll("gallery").filter((f): f is File => f instanceof File && f.size > 0);
}

async function uploadGallery(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
): Promise<string[]> {
  const kept = readKeptGalleryUrls(formData);
  const newFiles = readGalleryFiles(formData);
  const uploaded = await Promise.all(newFiles.map((file) => uploadMediaFile(supabase, file, "projects")));
  return [...kept, ...uploaded];
}

export async function createProject(formData: FormData) {
  const input = readProjectForm(formData);
  const imageFile = readImageFile(formData);
  const supabase = await createClient();

  const imageUrl = imageFile ? await uploadMediaFile(supabase, imageFile, "projects") : null;
  const galleryUrls = await uploadGallery(supabase, formData);

  const { error } = await supabase.from("projects").insert({
    slug: input.slug,
    name: input.name,
    description: input.description,
    intro: input.intro,
    features: input.features && input.features.length > 0 ? input.features : null,
    category: input.category,
    client: input.client,
    project_date: input.projectDate,
    stack: input.stack,
    image_url: imageUrl,
    gallery_urls: galleryUrls.length > 0 ? galleryUrls : null,
    live_url: input.liveUrl,
    github_url: input.githubUrl,
    figma_url: input.figmaUrl,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${input.slug}`);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const input = readProjectForm(formData);
  const imageFile = readImageFile(formData);
  const supabase = await createClient();

  const galleryUrls = await uploadGallery(supabase, formData);

  const update: Record<string, unknown> = {
    slug: input.slug,
    name: input.name,
    description: input.description,
    intro: input.intro,
    features: input.features && input.features.length > 0 ? input.features : null,
    category: input.category,
    client: input.client,
    project_date: input.projectDate,
    stack: input.stack,
    gallery_urls: galleryUrls.length > 0 ? galleryUrls : null,
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
  revalidatePath(`/projects/${input.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/projects");
}
