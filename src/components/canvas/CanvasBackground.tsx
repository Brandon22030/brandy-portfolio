"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import DataNetworkScene from "./DataNetworkScene";

function subscribeNever() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default function CanvasBackground() {
  const isClient = useIsClient();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 11], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <DataNetworkScene
          count={isMobile ? 360 : 900}
          radius={7}
          linkDistance={isMobile ? 1.9 : 1.7}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
