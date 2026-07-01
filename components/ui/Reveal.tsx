"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper — the SAFE kind.
 *
 * Content is fully rendered in the server HTML (no `opacity:0` ever ships). On
 * mount, JS adds the `reveal` (hidden) class and animates it back in when it
 * scrolls into view. So: with JS the section fades/slides in; with JS slow or
 * disabled the content is simply visible the whole time. This can never recreate
 * the "blank page until JS loads" bug, because the hidden state is applied by
 * the client, never by the server.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal");
    if (delay) el.style.transitionDelay = `${delay}s`;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return createElement(as, { ref, className }, children);
}
