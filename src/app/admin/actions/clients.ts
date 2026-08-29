"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadMediaFile } from "@/lib/supabase/upload";

function readClientForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

function readLogoFile(formData: FormData): File | null {
  const file = formData.get("logo");
  return file instanceof File && file.size > 0 ? file : null;
}

export async function createClientRecord(formData: FormData) {
  const input = readClientForm(formData);
  const logoFile = readLogoFile(formData);
  if (!logoFile) throw new Error("Un logo est requis pour créer un client.");

  const supabase = await createClient();
  const logoUrl = await uploadMediaFile(supabase, logoFile, "clients");

  const { error } = await supabase.from("clients").insert({
    name: input.name,
    logo_url: logoUrl,
    website_url: input.websiteUrl,
    sort_order: input.sortOrder,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function updateClientRecord(id: string, formData: FormData) {
  const input = readClientForm(formData);
  const logoFile = readLogoFile(formData);
  const supabase = await createClient();

  const update: Record<string, unknown> = {
    name: input.name,
    website_url: input.websiteUrl,
    sort_order: input.sortOrder,
  };

  if (logoFile) {
    update.logo_url = await uploadMediaFile(supabase, logoFile, "clients");
  }

  const { error } = await supabase.from("clients").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function deleteClientRecord(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin/clients");
}
