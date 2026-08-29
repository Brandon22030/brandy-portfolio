"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError("Identifiants invalides.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Supabase n'est pas configuré (.env.local manquant ou incomplet).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-panel-border bg-background-elevated p-8 shadow-[0_1px_2px_rgba(17,18,20,0.04)]"
      >
        <h1 className="font-display text-xl font-semibold text-foreground">Espace admin</h1>
        <p className="mt-1 text-sm text-muted">Connecte-toi pour gérer le contenu du site.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block font-mono text-xs text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-mono text-xs text-muted">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-panel-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-white transition-opacity disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
