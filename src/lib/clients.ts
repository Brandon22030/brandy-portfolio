import { cache } from "react";
import { clients as staticClients, type Client } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export const getClients = cache(async (): Promise<Client[]> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return staticClients;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("clients")
      .select("name, logo_url, website_url")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticClients;
    }

    return data.map((row) => ({
      name: row.name,
      logoUrl: row.logo_url,
      websiteUrl: row.website_url ?? undefined,
    }));
  } catch {
    return staticClients;
  }
});
