import { cn } from "@/lib/utils";
import { STATUS_LABEL, type Status } from "@/content/site.config";

/**
 * The honesty mechanism (Part K.3, G10). Renders from config on every module
 * card, phase, and claimable feature. LIVE (mint solid) / PILOT (mint outline)
 * / IN BUILD (bone outline) / ROADMAP (dim). No feature UI without one.
 */
const styles: Record<Status, string> = {
  live: "bg-mint text-obsidian border-transparent",
  pilot: "text-mint border-mint/50",
  "in-build": "text-bone/80 border-bone/25",
  roadmap: "text-muted border-hairline",
};

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em]",
        styles[status],
        className,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
