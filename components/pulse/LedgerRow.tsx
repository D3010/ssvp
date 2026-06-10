import { formatMetric } from "@/lib/utils";
import { SYSTEM_LABEL, type PulseMetric } from "@/lib/pulse";
import { cn } from "@/lib/utils";

const SYSTEM_COLOR: Record<PulseMetric["system"], string> = {
  "voice-agent": "text-pulse",
  email: "text-ice",
  workflow: "text-text",
  outreach: "text-ice",
};

/** One ledger row — mono throughout, with real event semantics (not a counter). */
export function LedgerRow({ row, fresh }: { row: PulseMetric; fresh?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[3.2rem_1fr_auto] items-center gap-3 border-b border-line/60 px-3 py-2.5 font-mono text-[0.8125rem] sm:grid-cols-[3.5rem_7rem_1fr_auto] sm:gap-4",
        fresh && "animate-[ssvp-row-in_0.4s_cubic-bezier(0.22,1,0.36,1)]",
      )}
    >
      <span className="tabular text-muted">{row.ts}</span>
      <span className={cn("hidden truncate sm:block", SYSTEM_COLOR[row.system])}>
        {SYSTEM_LABEL[row.system]}
      </span>
      <span className="truncate text-text">
        <span className={cn("sm:hidden", SYSTEM_COLOR[row.system])}>
          {SYSTEM_LABEL[row.system]} ·{" "}
        </span>
        {row.event}
      </span>
      <span className="flex items-center justify-end gap-3 tabular">
        {row.valueUsd ? (
          <span className="text-pulse">+{formatMetric(row.valueUsd, "usd")}</span>
        ) : (
          <span className="text-muted/50">—</span>
        )}
        <span className="w-8 text-right text-muted">
          {row.durationMin ? formatMetric(row.durationMin, "duration") : "—"}
        </span>
      </span>
    </div>
  );
}
