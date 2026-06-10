"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePulseFeed } from "./usePulseFeed";
import { LedgerRow } from "./LedgerRow";
import { LiveDot } from "@/components/ui/LiveDot";
import { Metric } from "@/components/ui/Metric";
import { BASE_AGGREGATE, type PulseRange, type PulseSystem } from "@/lib/pulse";
import { cn } from "@/lib/utils";

const FILTERS: { id: PulseSystem | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "voice-agent", label: "Voice" },
  { id: "email", label: "Email" },
  { id: "workflow", label: "Workflow" },
  { id: "outreach", label: "Outreach" },
];

const RANGES: { id: PulseRange; label: string }[] = [
  { id: "week", label: "This week" },
  { id: "all", label: "All time" },
];

/**
 * The interactive demo dashboard. Tabs (week/all), system filters, and a
 * streaming ledger. Honest about being a demo of the live contract.
 */
export function PulseDashboard({ compact = false }: { compact?: boolean }) {
  const { rows, range, setRange } = usePulseFeed({ initialRange: "all", count: compact ? 6 : 10 });
  const [filter, setFilter] = useState<PulseSystem | "all">("all");

  const visible = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.system === filter)),
    [rows, filter],
  );

  const agg = BASE_AGGREGATE[range];

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/80 backdrop-blur-sm">
      {/* header: range tabs + live aggregate */}
      <div className="flex flex-col gap-4 border-b border-line bg-surface-2/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-line p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                range === r.id ? "bg-pulse text-ink" : "text-muted hover:text-text",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {!compact && (
            <Metric value={agg.revenueRecovered} format="usd" label="recovered" size="sm" live />
          )}
          <Metric value={agg.callsAnswered} format="int" label="calls answered" size="sm" live />
          <LiveDot />
        </div>
      </div>

      {/* system filters */}
      <div className="flex flex-wrap gap-1.5 border-b border-line p-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors",
              filter === f.id
                ? "border-ice/40 bg-ice/10 text-ice"
                : "border-line text-muted hover:text-text",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* column header */}
      <div className="grid grid-cols-[3.2rem_1fr_auto] gap-3 border-b border-line px-3 py-2 font-mono text-[0.625rem] uppercase tracking-wider text-muted/70 sm:grid-cols-[3.5rem_7rem_1fr_auto] sm:gap-4">
        <span>time</span>
        <span className="hidden sm:block">system</span>
        <span>event</span>
        <span className="text-right">value · dur</span>
      </div>

      {/* streaming rows */}
      <div className="max-h-[22rem] overflow-hidden">
        <AnimatePresence initial={false}>
          {visible.map((row) => (
            <motion.div
              key={row.id}
              layout
              initial={row.id.startsWith("live-") ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <LedgerRow row={row} fresh={row.id.startsWith("live-")} />
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 && (
          <p className="px-4 py-8 text-center font-mono text-sm text-muted">
            No {filter} events in this window.
          </p>
        )}
      </div>

      <p className="border-t border-line bg-surface-2/30 px-4 py-2.5 font-mono text-[0.6875rem] text-muted/70">
        Demo feed · seeded data on the documented{" "}
        <code className="text-ice">GET /api/pulse</code> contract
      </p>
    </div>
  );
}
