import Image from "next/image";

type ProjectDefaults = {
  name?: string;
  description?: string;
  stack?: string[];
  image_url?: string | null;
  live_url?: string | null;
  github_url?: string | null;
  figma_url?: string | null;
  sort_order?: number;
};

export default function ProjectForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: ProjectDefaults;
  submitLabel: string;
}) {
  const field = "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6">
      <div>
        <label htmlFor="name" className={label}>
          Nom du projet
        </label>
        <input id="name" name="name" required defaultValue={defaults?.name} className={field} />
      </div>

      <div>
        <label htmlFor="description" className={label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={defaults?.description}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="stack" className={label}>
          Stack technique (séparée par des virgules)
        </label>
        <input
          id="stack"
          name="stack"
          defaultValue={defaults?.stack?.join(", ")}
          placeholder="Next.js, TypeScript, Supabase"
          className={field}
        />
      </div>

      <div>
        <label htmlFor="image" className={label}>
          Image de couverture
        </label>
        {defaults?.image_url ? (
          <div className="relative mt-2 aspect-[16/9] w-full max-w-xs overflow-hidden rounded-lg border border-panel-border">
            <Image src={defaults.image_url} alt="" fill className="object-cover" />
          </div>
        ) : null}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          className="mt-2 block text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-background file:px-3 file:py-1.5 file:font-mono file:text-xs file:text-foreground hover:file:bg-panel-border"
        />
        <p className="mt-1 text-xs text-muted">
          {defaults?.image_url ? "Laisse vide pour garder l'image actuelle." : "Optionnel — sans image, un dégradé de couleur est utilisé."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="liveUrl" className={label}>
            Lien du site
          </label>
          <input id="liveUrl" name="liveUrl" defaultValue={defaults?.live_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="githubUrl" className={label}>
            Lien GitHub
          </label>
          <input id="githubUrl" name="githubUrl" defaultValue={defaults?.github_url ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="figmaUrl" className={label}>
            Lien Figma
          </label>
          <input id="figmaUrl" name="figmaUrl" defaultValue={defaults?.figma_url ?? ""} className={field} />
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

      <button
        type="submit"
        className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white"
      >
        {submitLabel}
      </button>
    </form>
  );
}
