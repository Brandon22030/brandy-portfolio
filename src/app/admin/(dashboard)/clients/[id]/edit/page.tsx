import { notFound } from "next/navigation";
import ClientForm from "@/app/admin/ClientForm";
import { updateClientRecord } from "@/app/admin/actions/clients";
import { createClient } from "@/lib/supabase/server";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase.from("clients").select("*").eq("id", id).single();

  if (!client) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Éditer {client.name}</h1>
      <div className="mt-6">
        <ClientForm action={updateClientRecord.bind(null, id)} defaults={client} submitLabel="Enregistrer" />
      </div>
    </div>
  );
}
