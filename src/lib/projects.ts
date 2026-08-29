import { cache } from "react";
import { projects as staticProjects, type Project } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";

const PROJECT_COLUMNS =
  "slug, name, description, intro, features, category, client, project_date, stack, image_url, gallery_urls, live_url, github_url, figma_url";

type ProjectRow = {
  slug: string | null;
  name: string;
  description: string;
  intro: string | null;
  features: string[] | null;
  category: string | null;
  client: string | null;
  project_date: string | null;
  stack: string[] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  live_url: string | null;
  github_url: string | null;
  figma_url: string | null;
};

function mapRow(row: ProjectRow): Project {
  return {
    slug: row.slug ?? slugify(row.name),
    name: row.name,
    description: row.description,
    intro: row.intro ?? undefined,
    features: row.features ?? undefined,
    category: row.category ?? undefined,
    client: row.client ?? undefined,
    date: row.project_date ?? undefined,
    stack: row.stack ?? [],
    imageUrl: row.image_url ?? undefined,
    galleryUrls: row.gallery_urls ?? undefined,
    liveUrl: row.live_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    figmaUrl: row.figma_url ?? undefined,
  };
}

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
      .select(PROJECT_COLUMNS)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticProjects;
    }

    return data.map(mapRow);
  } catch {
    return staticProjects;
  }
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticProjects.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select(PROJECT_COLUMNS)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return staticProjects.find((p) => p.slug === slug) ?? null;
    }

    return mapRow(data);
  } catch {
    return staticProjects.find((p) => p.slug === slug) ?? null;
  }
});
