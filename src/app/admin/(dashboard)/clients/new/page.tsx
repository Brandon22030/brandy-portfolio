import ClientForm from "@/app/admin/ClientForm";
import { createClientRecord } from "@/app/admin/actions/clients";

export default function NewClientPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">Nouveau client</h1>
      <div className="mt-6">
        <ClientForm action={createClientRecord} submitLabel="Créer" />
      </div>
    </div>
  );
}
