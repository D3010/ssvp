"use client";

import { useEffect, useState } from "react";

/**
 * Device tiering (Part D). detect-gpu on mount →
 *   TIER 0 — no WebGL / reduced-motion / low-end: serve poster only.
 *   TIER 1 — mid: scene at reduced counts, no postprocessing.
 *   TIER 2 — full scene + bloom.
 * The single source of truth for whether/how a scene renders.
 */
export type SceneTier = 0 | 1 | 2;

export function useSceneTier(): SceneTier | null {
  // null = undecided (still deciding on mount → render poster until known).
  const [tier, setTier] = useState<SceneTier | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTier(0);
      return;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
      // touch devices: cap at TIER 1 unless clearly capable
    }

    (async () => {
      try {
        const { getGPUTier } = await import("detect-gpu");
        const gpu = await getGPUTier();
        if (cancelled) return;
        // detect-gpu tier: 0 fallback, 1 low, 2 mid, 3 high.
        if (!gpu || gpu.tier <= 1) setTier(0);
        else if (gpu.tier === 2) setTier(1);
        else setTier(2);
      } catch {
        if (!cancelled) setTier(0);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return tier;
}
