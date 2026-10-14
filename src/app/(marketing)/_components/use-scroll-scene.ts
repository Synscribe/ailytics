"use client";

import { useSyncExternalStore } from "react";

/**
 * Pinned scroll scenes run only on wide, tall screens for visitors who allow
 * motion. Everyone else (no JavaScript, reduced motion, phones) gets the
 * static stacked layout that the server renders.
 */
const SCROLL_SCENE_QUERY =
  "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(SCROLL_SCENE_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useScrollScene(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(SCROLL_SCENE_QUERY).matches,
    () => false,
  );
}
