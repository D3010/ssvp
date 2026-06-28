"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatMetric, type MetricFormat } from "@/lib/utils";

/**
 * A number on the site = mono + tabular + count-up. SSR renders the REAL final
 * value (so it's visible with zero JS / good for crawlers); on scroll-into-view
 * the client animates it up from 0 with requestAnimationFrame — no animation
 * library. Green (pulse) only when `live`.
 */
export function Metric({
  value,
  format = "int",
  label,
  prefix,
  live = false,
  countUp = true,
  size = "md",
  className,
}: {
  value: number;
  format?: MetricFormat;
  label?: string;
  prefix?: string;
  live?: boolean;
  countUp?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR-safe: start at the real value so it's visible without JS, no hydration
  // mismatch. The count-up briefly resets to 0 then animates up, in view only.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!countUp) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started) continue;
          started = true;
          obs.unobserve(entry.target);
          const start = performance.now();
          const duration = 1400;
          setDisplay(0);
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
            else setDisplay(value);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, countUp]);

  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-[clamp(3rem,7vw,5.5rem)]",
  } as const;

  return (
    <span className={cn("flex flex-col gap-1", className)}>
      <span
        ref={ref}
        className={cn(
          "tabular font-medium leading-none",
          sizes[size],
          live ? "text-pulse" : "text-text",
        )}
      >
        {prefix}
        {formatMetric(display, format)}
      </span>
      {label && (
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      )}
    </span>
  );
}
