import { cache } from "react";
import { education as staticEducation, type EducationItem } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const getEducationList = cache(async (): Promise<EducationItem[]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticEducation;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("education")
      .select("title, school, period")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticEducation;
    }

    return data.map((row) => ({
      title: row.title,
      school: row.school,
      period: row.period,
    }));
  } catch {
    return staticEducation;
  }
});
