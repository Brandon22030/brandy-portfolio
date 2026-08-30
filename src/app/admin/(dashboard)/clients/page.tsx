import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { deleteClientRecord } from "@/app/admin/actions/clients";
import DeleteButton from "@/app/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const supabase = await createClient();
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-foreground">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="rounded-full bg-accent px-4 py-2 font-mono text-xs font-medium text-white"
        >
          + Nouveau client
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted">
        Affichés en défilement continu sous le hero de la page publique. La section n&apos;apparaît que si au moins
        un client est ajouté.
      </p>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie que la table `clients` existe.
        </p>
      ) : null}

      <div className="mt-6 space-y-3">
        {clients?.map((client) => (
          <div
            key={client.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-panel-border bg-background-elevated p-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex h-10 w-24 items-center justify-center overflow-hidden rounded-lg border border-panel-border bg-background p-1.5">
                <Image src={client.logo_url} alt="" width={90} height={32} className="h-full w-auto object-contain" />
              </div>
              <p className="font-display text-base font-semibold text-foreground">{client.name}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/clients/${client.id}/edit`}
                className="font-mono text-xs text-accent hover:underline"
              >
                Éditer
              </Link>
              <DeleteButton action={deleteClientRecord.bind(null, client.id)} itemLabel={client.name} />
            </div>
          </div>
        ))}

        {clients && clients.length === 0 ? (
          <p className="text-sm text-muted">Aucun client pour l&apos;instant.</p>
        ) : null}
      </div>
    </div>
  );
}
