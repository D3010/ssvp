"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { formatMetric, type MetricFormat } from "@/lib/utils";

/**
 * A number on the site = mono + tabular + count-up. Green only when `live`
 * (real streaming data); static metrics stay in neutral text.
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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  // start at 0 (SSR-safe: client also starts at 0 → no hydration mismatch),
  // then drive the value entirely through motion's onUpdate callback. Under
  // reduced motion (or countUp off) duration is 0, so it lands instantly.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduce || !countUp ? 0 : 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, countUp, reduce]);

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
