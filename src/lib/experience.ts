import { cache } from "react";
import { experience as staticExperience, type Experience } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const getExperience = cache(async (): Promise<Experience[]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticExperience;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experience")
      .select("company, role, period, location, highlights")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticExperience;
    }

    return data.map((row) => ({
      company: row.company,
      role: row.role,
      period: row.period,
      location: row.location,
      highlights: row.highlights ?? [],
    }));
  } catch {
    return staticExperience;
  }
});
