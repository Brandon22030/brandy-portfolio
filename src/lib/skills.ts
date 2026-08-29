import { cache } from "react";
import { skills as staticSkills, type SkillGroup } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const getSkillGroups = cache(async (): Promise<SkillGroup[]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticSkills;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("skill_groups")
      .select("category, items")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticSkills;
    }

    return data.map((row) => ({
      category: row.category,
      items: row.items ?? [],
    }));
  } catch {
    return staticSkills;
  }
});
