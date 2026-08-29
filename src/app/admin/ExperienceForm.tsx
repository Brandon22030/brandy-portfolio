type ExperienceDefaults = {
  company?: string;
  role?: string;
  period?: string;
  location?: string;
  highlights?: string[];
  sort_order?: number;
};

export default function ExperienceForm({
  action,
  defaults,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: ExperienceDefaults;
  submitLabel: string;
}) {
  const field =
    "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <form action={action} className="space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className={label}>
            Entreprise
          </label>
          <input id="company" name="company" required defaultValue={defaults?.company} className={field} />
        </div>
        <div>
          <label htmlFor="role" className={label}>
            Poste
          </label>
          <input id="role" name="role" required defaultValue={defaults?.role} className={field} />
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
            placeholder="juin 2025 — août 2026"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="location" className={label}>
            Lieu
          </label>
          <input id="location" name="location" defaultValue={defaults?.location} className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="highlights" className={label}>
          Points clés (un par ligne)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={6}
          defaultValue={defaults?.highlights?.join("\n")}
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
