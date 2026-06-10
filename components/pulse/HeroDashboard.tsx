"use client";

import { motion } from "motion/react";
import { Metric } from "@/components/ui/Metric";
import { usePulseFeed } from "./usePulseFeed";
import { formatMetric } from "@/lib/utils";

// A believable, gently up-trending metric sparkline (sender reputation recovery).
const LINE =
  "M0,98 L24,96 L48,92 L72,88 L96,82 L120,84 L144,74 L168,70 L192,62 L216,64 L240,54 L264,48 L288,42 L312,38 L336,30 L360,26 L384,18 L400,13";
const AREA = `${LINE} L400,120 L0,120 Z`;

// Real, defensible proof points — not invented aggregate volume.
const PROOF = [
  { value: 28, format: "pct" as const, label: "reply rate" },
  { value: null, display: "2-ring", label: "answer time" },
];

export function HeroDashboard() {
  const { rows } = usePulseFeed({ count: 2, stream: true });

  return (
    <div className="panel panel-pulse relative overflow-hidden p-5 sm:p-6">
      {/* ambient inner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-pulse/10 blur-3xl"
      />

      {/* header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-lg border border-pulse/25 bg-pulse/10">
            <span className="size-2 rounded-full bg-pulse animate-breathe" />
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            Proof Ledger
          </span>
        </div>
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted/80">
          Sample
        </span>
      </div>

      {/* featured REAL metric: sender reputation recovery */}
      <div className="relative mt-6 flex items-end justify-between">
        <Metric value={90} format="pct" label="sender reputation · recovered from 78%" live size="lg" />
        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-pulse/10 px-2.5 py-1 font-mono text-[0.7rem] text-pulse">
          <span aria-hidden="true">▲</span> +12 pts
        </span>
      </div>

      {/* sparkline */}
      <div className="relative mt-4 h-24 w-full">
        <svg
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible text-pulse"
          role="presentation"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.26" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={AREA} fill="url(#hero-area)" />
          <motion.path
            d={LINE}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          />
        </svg>
        {/* riding dot at the end of the line */}
        <span className="absolute right-0 top-[10%] -translate-y-1/2">
          <span className="relative grid place-items-center">
            <span className="absolute size-3 rounded-full bg-pulse/40 animate-ping-slow" />
            <span className="size-2 rounded-full bg-pulse shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-pulse)_60%,transparent)]" />
          </span>
        </span>
      </div>

      {/* two REAL proof tiles */}
      <div className="relative mt-2 grid grid-cols-2 gap-2.5">
        {PROOF.map((p) => (
          <div key={p.label} className="rounded-xl border border-white/[0.06] bg-base/40 p-3">
            {p.value !== null ? (
              <Metric value={p.value} format={p.format} size="sm" live={false} className="!gap-0.5" />
            ) : (
              <span className="tabular text-xl font-medium leading-none text-text">{p.display}</span>
            )}
            <span className="mt-1.5 block font-mono text-[0.55rem] uppercase tracking-wider text-muted">
              {p.label}
            </span>
          </div>
        ))}
      </div>

      {/* sample event stream — illustrates the product, claims no totals */}
      <div className="relative mt-4 border-t border-white/[0.06] pt-3">
        {rows.slice(0, 2).map((row) => (
          <div key={row.id} className="flex items-center gap-3 py-1.5 font-mono text-[0.72rem]">
            <span className="tabular text-muted/70">{row.ts}</span>
            <span className="size-1 rounded-full bg-pulse/60" />
            <span className="flex-1 truncate text-muted">{row.event}</span>
            {row.valueUsd ? (
              <span className="tabular text-pulse">+{formatMetric(row.valueUsd, "usd")}</span>
            ) : (
              <span className="tabular text-muted/40">logged</span>
            )}
          </div>
        ))}
        <p className="mt-2 font-mono text-[0.6rem] text-muted/50">Sample feed · your real telemetry replaces it on day one</p>
      </div>
    </div>
  );
}
