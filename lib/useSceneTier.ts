"use client";

import { useEffect, useState } from "react";

/**
 * Device tiering (Part D). detect-gpu on mount →
 *   TIER 0 — reduced-motion or no WebGL at all: serve poster only.
 *   TIER 1 — most devices: full scene, no postprocessing.
 *   TIER 2 — capable GPUs: full scene + bloom.
 *
 * Deliberately PERMISSIVE: the hero 3D should show on nearly every device.
 * Only prefers-reduced-motion (accessibility) or a hard WebGL failure drops
 * to the static poster.
 */
export type SceneTier = 0 | 1 | 2;

export function useSceneTier(): SceneTier | null {
  const [tier, setTier] = useState<SceneTier | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTier(0);
      return;
    }

    // No WebGL context at all → poster.
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setTier(0);
        return;
      }
    } catch {
      setTier(0);
      return;
    }

    (async () => {
      try {
        const { getGPUTier } = await import("detect-gpu");
        const gpu = await getGPUTier();
        if (cancelled) return;
        // detect-gpu tier: 0 fallback, 1 low, 2 mid, 3 high.
        // Be generous: anything that reports WebGL gets the scene; only a hard
        // 0/failure would have been caught above.
        if (!gpu) setTier(1);
        else if (gpu.tier >= 3) setTier(2);
        else setTier(1);
      } catch {
        // detect-gpu failed but WebGL exists → still show the scene.
        if (!cancelled) setTier(1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return tier;
}
