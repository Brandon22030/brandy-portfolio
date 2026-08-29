import { createClient } from "@/lib/supabase/server";
import { updateProfile } from "@/app/admin/actions/profile";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const { data: profile, error } = await supabase.from("profile").select("*").eq("id", 1).single();

  const field =
    "mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent";
  const label = "block font-mono text-xs text-muted";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-foreground">À propos</h1>
      <p className="mt-1 text-sm text-muted">
        Ces informations alimentent le hero, la section À propos, le contact et le footer du site.
      </p>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Erreur de connexion à Supabase : {error.message}. Vérifie que la table `profile` existe et contient une
          ligne (id = 1).
        </p>
      ) : (
        <form
          action={updateProfile}
          className="mt-6 space-y-5 rounded-2xl border border-panel-border bg-background-elevated p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>
                Nom
              </label>
              <input id="name" name="name" required defaultValue={profile?.name} className={field} />
            </div>
            <div>
              <label htmlFor="role" className={label}>
                Rôle
              </label>
              <input id="role" name="role" required defaultValue={profile?.role} className={field} />
            </div>
            <div>
              <label htmlFor="tagline" className={label}>
                Tagline
              </label>
              <input id="tagline" name="tagline" defaultValue={profile?.tagline} className={field} />
            </div>
            <div>
              <label htmlFor="location" className={label}>
                Localisation
              </label>
              <input id="location" name="location" defaultValue={profile?.location} className={field} />
            </div>
            <div>
              <label htmlFor="email" className={label}>
                Email
              </label>
              <input id="email" name="email" type="email" defaultValue={profile?.email} className={field} />
            </div>
            <div>
              <label htmlFor="githubUrl" className={label}>
                Lien GitHub
              </label>
              <input id="githubUrl" name="githubUrl" defaultValue={profile?.github_url} className={field} />
            </div>
            <div>
              <label htmlFor="linkedinUrl" className={label}>
                Lien LinkedIn
              </label>
              <input id="linkedinUrl" name="linkedinUrl" defaultValue={profile?.linkedin_url} className={field} />
            </div>
          </div>

          <div>
            <label htmlFor="summary" className={label}>
              Résumé (hero + à propos)
            </label>
            <textarea id="summary" name="summary" rows={5} defaultValue={profile?.summary} className={field} />
          </div>

          <div>
            <label htmlFor="aboutDescription" className={label}>
              Description courte (sous-titre section À propos)
            </label>
            <textarea
              id="aboutDescription"
              name="aboutDescription"
              rows={2}
              defaultValue={profile?.about_description}
              className={field}
            />
          </div>

          <div>
            <label htmlFor="stats" className={label}>
              Chiffres clés (JSON — tableau de {"{"}value, label{"}"})
            </label>
            <textarea
              id="stats"
              name="stats"
              rows={4}
              defaultValue={JSON.stringify(profile?.stats ?? [], null, 2)}
              className={`${field} font-mono`}
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white"
          >
            Enregistrer
          </button>
        </form>
      )}
    </div>
  );
}
