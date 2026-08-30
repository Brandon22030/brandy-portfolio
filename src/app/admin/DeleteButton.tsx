"use client";

import { useState, useTransition } from "react";

export default function DeleteButton({
  action,
  itemLabel,
}: {
  action: () => Promise<void>;
  itemLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-mono text-xs text-red-600 hover:underline"
      >
        Supprimer
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-panel-border bg-background-elevated p-6 shadow-xl">
            <p className="font-display text-base font-semibold text-foreground">
              Supprimer {itemLabel} ?
            </p>
            <p className="mt-2 text-sm text-muted">Cette action est définitive et ne peut pas être annulée.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="rounded-full border border-panel-border px-4 py-2 font-mono text-xs text-foreground hover:bg-background disabled:opacity-60"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() =>
                  startTransition(async () => {
                    await action();
                    setOpen(false);
                  })
                }
                disabled={isPending}
                className="rounded-full bg-red-600 px-4 py-2 font-mono text-xs font-medium text-white disabled:opacity-60"
              >
                {isPending ? "Suppression…" : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
