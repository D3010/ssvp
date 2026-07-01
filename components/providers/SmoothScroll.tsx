"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lenis smooth scroll on desktop pointers only (native scroll on touch), synced
 * to GSAP ScrollTrigger. Killed entirely under prefers-reduced-motion.
 *
 * Next 16 note: with cacheComponents/PPR, routes can be hidden (Activity) rather
 * than unmounted, and Lenis' RAF loop must not leak — so we destroy on cleanup
 * and re-init per pathname. GSAP is imported dynamically to keep it out of the
 * initial shared bundle.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    let lenis: import("lenis").default | undefined;
    let rafId = 0;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time * 1000);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [pathname]);

  // Scroll to top on route change (Next 16 no longer forces this with smooth CSS).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
