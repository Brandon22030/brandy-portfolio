import { cache } from "react";
import { projects as staticProjects, type Project } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

// Fetches projects from Supabase; falls back to the static list in data.ts
// if Supabase isn't configured yet or the request fails, so the public site
// never breaks while the admin panel is being set up.
export const getProjects = cache(async (): Promise<Project[]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticProjects;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("name, description, stack, image_url, live_url, github_url, figma_url")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticProjects;
    }

    return data.map((row) => ({
      name: row.name,
      description: row.description,
      stack: row.stack ?? [],
      imageUrl: row.image_url ?? undefined,
      liveUrl: row.live_url ?? undefined,
      githubUrl: row.github_url ?? undefined,
      figmaUrl: row.figma_url ?? undefined,
    }));
  } catch {
    return staticProjects;
  }
});
