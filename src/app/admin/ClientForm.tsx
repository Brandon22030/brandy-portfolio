import Image from "next/image";

type ClientDefaults = {
  name?: string;
  logo_url?: string | null;
  website_url?: string | null;
  sort_order?: number;
};

export default function ClientForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: ClientDefaults;
  submitLabel: string;
}) {
  const field =
    "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6">
      <div>
        <label htmlFor="name" className={label}>
          Nom du client
        </label>
        <input id="name" name="name" required defaultValue={defaults?.name} className={field} />
      </div>

      <div>
        <label htmlFor="logo" className={label}>
          Logo
        </label>
        {defaults?.logo_url ? (
          <div className="relative mt-2 flex h-16 w-40 items-center justify-center overflow-hidden rounded-lg border border-panel-border bg-background p-2">
            <Image src={defaults.logo_url} alt="" width={140} height={48} className="h-full w-auto object-contain" />
          </div>
        ) : null}
        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          required={!defaults?.logo_url}
          className="mt-2 block text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-background file:px-3 file:py-1.5 file:font-mono file:text-xs file:text-foreground hover:file:bg-panel-border"
        />
        <p className="mt-1 text-xs text-muted">
          {defaults?.logo_url ? "Laisse vide pour garder le logo actuel." : "PNG/SVG avec fond transparent recommandé."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="websiteUrl" className={label}>
            Site web (optionnel)
          </label>
          <input id="websiteUrl" name="websiteUrl" defaultValue={defaults?.website_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="sortOrder" className={label}>
            Ordre d&apos;affichage
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={defaults?.sort_order ?? 0}
            className={field}
          />
        </div>
      </div>

      <button type="submit" className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white">
        {submitLabel}
      </button>
    </form>
  );
}
