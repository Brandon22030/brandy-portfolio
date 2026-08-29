import type { SupabaseClient } from "@supabase/supabase-js";

// Uploads a file to the shared "media" storage bucket under the given
// folder (e.g. "projects", "clients") and returns its public URL.
export async function uploadMediaFile(
  supabase: SupabaseClient,
  file: File,
  folder: string,
): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
