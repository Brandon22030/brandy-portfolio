import Image from "next/image";

type ProjectDefaults = {
  slug?: string;
  name?: string;
  description?: string;
  intro?: string | null;
  features?: string[] | null;
  category?: string | null;
  client?: string | null;
  project_date?: string | null;
  stack?: string[];
  image_url?: string | null;
  gallery_urls?: string[] | null;
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Nom du projet
          </label>
          <input id="name" name="name" required defaultValue={defaults?.name} className={field} />
        </div>
        <div>
          <label htmlFor="slug" className={label}>
            Slug (URL)
          </label>
          <input id="slug" name="slug" defaultValue={defaults?.slug} placeholder="mon-projet" className={field} />
          <p className="mt-1 text-xs text-muted">
            Laisse vide pour le générer depuis le nom. /projets/<code>{defaults?.slug || "..."}</code>
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="description" className={label}>
          Description courte (carte projet)
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={defaults?.description}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="intro" className={label}>
          Description longue (page projet, optionnel)
        </label>
        <textarea id="intro" name="intro" rows={4} defaultValue={defaults?.intro ?? ""} className={field} />
      </div>

      <div>
        <label htmlFor="features" className={label}>
          Fonctionnalités (une par ligne, optionnel)
        </label>
        <textarea
          id="features"
          name="features"
          rows={4}
          defaultValue={defaults?.features?.join("\n")}
          className={field}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="category" className={label}>
            Catégorie
          </label>
          <input
            id="category"
            name="category"
            defaultValue={defaults?.category ?? ""}
            placeholder="Web, Mobile..."
            className={field}
          />
        </div>
        <div>
          <label htmlFor="client" className={label}>
            Client
          </label>
          <input id="client" name="client" defaultValue={defaults?.client ?? ""} className={field} />
        </div>
        <div>
          <label htmlFor="projectDate" className={label}>
            Date
          </label>
          <input
            id="projectDate"
            name="projectDate"
            defaultValue={defaults?.project_date ?? ""}
            placeholder="2025-05"
            className={field}
          />
        </div>
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

      <div>
        <label className={label}>Photos supplémentaires (galerie, optionnel)</label>
        <p className="mt-1 text-xs text-muted">
          La couverture ci-dessus reste toujours la première image. Chaque photo ajoutée ici vient s&apos;ajouter à
          la suite.
        </p>
        {defaults?.gallery_urls && defaults.gallery_urls.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {defaults.gallery_urls.map((url) => (
              <div key={url} className="w-24">
                <input type="hidden" name="existingGallery" value={url} />
                <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-panel-border">
                  <Image src={url} alt="" fill className="object-cover" />
                </div>
                <label className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-muted">
                  <input type="checkbox" name="removeGallery" value={url} />
                  Retirer
                </label>
              </div>
            ))}
          </div>
        ) : null}
        <input
          id="gallery"
          name="gallery"
          type="file"
          accept="image/*"
          multiple
          className="mt-3 block text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-background file:px-3 file:py-1.5 file:font-mono file:text-xs file:text-foreground hover:file:bg-panel-border"
        />
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
