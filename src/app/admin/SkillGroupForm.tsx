type SkillGroupDefaults = {
  category?: string;
  items?: string[];
  sort_order?: number;
};

export default function SkillGroupForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: SkillGroupDefaults;
  submitLabel: string;
}) {
  const field =
    "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6">
      <div>
        <label htmlFor="category" className={label}>
          Catégorie
        </label>
        <input id="category" name="category" required defaultValue={defaults?.category} className={field} />
      </div>

      <div>
        <label htmlFor="items" className={label}>
          Compétences (séparées par des virgules)
        </label>
        <textarea
          id="items"
          name="items"
          rows={3}
          defaultValue={defaults?.items?.join(", ")}
          placeholder="Next.js, React.js, TypeScript"
          className={field}
        />
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

      <button type="submit" className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white">
        {submitLabel}
      </button>
    </form>
  );
}
