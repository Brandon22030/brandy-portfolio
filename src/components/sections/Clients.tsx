import { getClients } from "@/lib/clients";
import ClientsMarquee from "@/components/ClientsMarquee";

export default async function Clients() {
  const clients = await getClients();
  if (clients.length === 0) return null;

  return (
    <section
      id="clients"
      className="mx-auto w-full max-w-5xl border-t border-panel-border px-6 py-10 sm:px-10"
    >
      <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">
        Ils m&apos;ont fait confiance
      </p>
      <div className="mt-6">
        <ClientsMarquee clients={clients} />
      </div>
    </section>
  );
}
