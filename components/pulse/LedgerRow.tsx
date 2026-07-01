import { cn, formatMetric } from "@/lib/utils";
import { SYSTEM_LABEL, type PulseMetric } from "@/lib/pulse";
import { GoldCheck } from "@/components/verification/GoldCheck";

/** System label tint — all machine accents (mint family). Gold is human-only. */
const SYSTEM_COLOR: Record<PulseMetric["system"], string> = {
  "auto-typing": "text-mint",
  inventory: "text-mint-dim",
  audit: "text-mint",
  insurance: "text-mint-dim",
  ordering: "text-mint",
};

/** One append-only action_log row — mono throughout, real event semantics. */
export function LedgerRow({ row, fresh }: { row: PulseMetric; fresh?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-hairline px-3 py-2.5 font-mono text-[0.8125rem] sm:grid-cols-[3.4rem_7.5rem_1fr_auto] sm:gap-4",
        fresh && "ssvp-row-in",
      )}
    >
      <span className="tabular text-muted">{row.ts}</span>
      <span className={cn("hidden truncate sm:block", SYSTEM_COLOR[row.system])}>
        {SYSTEM_LABEL[row.system]}
      </span>
      <span className="flex min-w-0 items-center gap-2 truncate text-text">
        <span className={cn("sm:hidden", SYSTEM_COLOR[row.system])}>{SYSTEM_LABEL[row.system]} · </span>
        <span className="truncate">{row.event}</span>
        {row.verified && <GoldCheck size={15} />}
      </span>
      <span className="flex items-center justify-end gap-3 tabular">
        {row.atRiskUsd ? (
          <span className="text-risk">{formatMetric(row.atRiskUsd, "usd")} at risk</span>
        ) : row.valueUsd ? (
          <span className="text-mint">+{formatMetric(row.valueUsd, "usd")}</span>
        ) : (
          <span className="text-muted/50">—</span>
        )}
      </span>
    </div>
  );
}
