import { cache } from "react";
import { profile as staticProfile, type Stat } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  photo: string;
  summary: string;
  aboutDescription: string;
  stats: Stat[];
};

// Fetches the profile singleton from Supabase; falls back to the static
// profile in data.ts if Supabase isn't configured or the request fails.
export const getProfile = cache(async (): Promise<Profile> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticProfile;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profile").select("*").eq("id", 1).single();

    if (error || !data) {
      return staticProfile;
    }

    return {
      name: data.name,
      role: data.role,
      tagline: data.tagline,
      location: data.location,
      email: data.email,
      github: data.github_url,
      linkedin: data.linkedin_url,
      photo: staticProfile.photo,
      summary: data.summary,
      aboutDescription: data.about_description,
      stats: (data.stats as Stat[] | null) ?? staticProfile.stats,
    };
  } catch {
    return staticProfile;
  }
});
