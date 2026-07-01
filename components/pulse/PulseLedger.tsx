"use client";

import { usePulseFeed } from "./usePulseFeed";
import { LedgerRow } from "./LedgerRow";
import { Metric } from "@/components/ui/Metric";
import { LiveDot } from "@/components/ui/LiveDot";
import { Chip } from "@/components/ui/Chip";
import { PulseLine } from "@/components/ui/PulseLine";
import { CHIP } from "@/content/site.config";
import { cn } from "@/lib/utils";

/**
 * PulseLedger (G4) — the receipts stream. "We don't sell automation — we sell
 * receipts." Base rows are seeded during SSR (visible with JS off); streaming is
 * pure progressive enhancement. The DEMO DATA chip is permanent (Part K.4) —
 * these are never implied to be live customer numbers.
 */
export function PulseLedger({ count = 8, className }: { count?: number; className?: string }) {
  const { rows, aggregate } = usePulseFeed({ count, stream: true, initialRange: "week" });

  return (
    <div className={cn("panel overflow-hidden", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="mono-label !text-mint">SSVP Pulse</span>
          <LiveDot label="APPEND-ONLY" />
        </div>
        <Chip tone="outline">{CHIP.demoData}</Chip>
      </div>

      {/* weekly counters */}
      <div className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-4">
        <div className="bg-emerald-deep/60 p-4">
          <Metric value={aggregate.scriptsTyped} format="int" label="scripts typed / wk" size="sm" live />
        </div>
        <div className="bg-emerald-deep/60 p-4">
          <Metric value={aggregate.hoursSaved} format="int" label="hours saved / wk" size="sm" live />
        </div>
        <div className="bg-emerald-deep/60 p-4">
          <Metric value={aggregate.dollarsProtected} format="usd" label="dollars protected / wk" size="sm" live />
        </div>
        <div className="bg-emerald-deep/60 p-4">
          <Metric value={aggregate.driftFlags} format="int" label="drift flags / wk" size="sm" live />
        </div>
      </div>

      {/* the stream */}
      <div className="max-h-[22rem] overflow-hidden">
        {rows.map((row, i) => (
          <LedgerRow key={row.id} row={row} fresh={i === 0 && row.id.startsWith("live-")} />
        ))}
      </div>

      <div className="px-4 py-3">
        <PulseLine variant="feed" />
      </div>
    </div>
  );
}
