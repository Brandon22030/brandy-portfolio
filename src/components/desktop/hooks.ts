"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}

const clockFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

function subscribeClock(callback: () => void) {
  const id = window.setInterval(callback, 10_000);
  return () => window.clearInterval(id);
}

export function useClock() {
  return useSyncExternalStore(
    subscribeClock,
    () => clockFormatter.format(new Date()),
    () => "",
  );
}

/** Minutes since epoch (0 during SSR/hydration) — a stable snapshot that ticks once a minute. */
export function useMinute() {
  return useSyncExternalStore(
    subscribeClock,
    () => Math.floor(Date.now() / 60_000),
    () => 0,
  );
}

const INTRO_KEY = "brandy-os:intro-seen";
const introListeners = new Set<() => void>();

function readIntroSeen() {
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function setIntroSeen(seen: boolean) {
  try {
    if (seen) window.sessionStorage.setItem(INTRO_KEY, "1");
    else window.sessionStorage.removeItem(INTRO_KEY);
  } catch {
    // storage unavailable (private mode) — the intro simply replays
  }
  introListeners.forEach((listener) => listener());
}

/** `null` while hydrating (unknown), then whether the intro was already played this session. */
export function useIntroSeen(): boolean | null {
  return useSyncExternalStore<boolean | null>(
    (callback) => {
      introListeners.add(callback);
      return () => introListeners.delete(callback);
    },
    readIntroSeen,
    () => null,
  );
}
