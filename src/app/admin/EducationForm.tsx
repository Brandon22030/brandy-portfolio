type EducationDefaults = {
  title?: string;
  school?: string;
  period?: string;
  sort_order?: number;
};

export default function EducationForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: EducationDefaults;
  submitLabel: string;
}) {
  const field =
    "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6">
      <div>
        <label htmlFor="title" className={label}>
          Intitulé
        </label>
        <input id="title" name="title" required defaultValue={defaults?.title} className={field} />
      </div>

      <div>
        <label htmlFor="school" className={label}>
          Établissement
        </label>
        <input id="school" name="school" required defaultValue={defaults?.school} className={field} />
      </div>

      <div>
        <label htmlFor="period" className={label}>
          Période
        </label>
        <input
          id="period"
          name="period"
          required
          defaultValue={defaults?.period}
          placeholder="juin 2024 — juin 2025"
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
