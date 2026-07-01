"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSceneTier } from "@/lib/useSceneTier";
import { cn } from "@/lib/utils";

/**
 * Frame for a lazy client-only WebGL scene (Part D, Part H).
 *
 * - `poster` is passed down from a Server Component, so it renders in the SSR
 *   HTML and is visible with JS disabled / while the scene loads (satisfies the
 *   no-JS-gated-visibility rule).
 * - `children` (the dynamically-imported <Canvas> scene) mounts ONLY when the
 *   frame scrolls into view AND the device tier can handle it (>= 1).
 * - IntersectionObserver disconnects on unmount; the scene owns GL disposal.
 */
export function SceneFrame({
  poster,
  children,
  className,
  minTier = 1,
}: {
  poster: ReactNode;
  children: ReactNode;
  className?: string;
  minTier?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const tier = useSceneTier();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = inView && tier !== null && tier >= minTier;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Poster: always in the DOM, server-rendered, fades under the scene. */}
      <div className={cn("transition-opacity duration-700", show && "opacity-0")}>{poster}</div>
      {show && <div className="absolute inset-0">{children}</div>}
    </div>
  );
}
