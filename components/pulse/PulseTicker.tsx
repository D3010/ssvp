import { Metric } from "@/components/ui/Metric";
import { LiveDot } from "@/components/ui/LiveDot";
import { PulseLine } from "@/components/ui/PulseLine";
import { BASE_AGGREGATE, type PulseRange } from "@/lib/pulse";
import { cn } from "@/lib/utils";

type TickerKey = "callsAnswered" | "hoursSaved" | "messagesDelivered" | "revenueRecovered";

const META: Record<TickerKey, { label: string; format: "int" | "duration" | "usd" }> = {
  callsAnswered: { label: "calls answered", format: "int" },
  hoursSaved: { label: "hours saved", format: "int" },
  messagesDelivered: { label: "messages delivered", format: "int" },
  revenueRecovered: { label: "revenue recovered", format: "usd" },
};

/**
 * The aggregate odometer cluster. Green numbers = real streaming data.
 * Used in the hero (3 metrics) and on /pulse (4 metrics).
 */
export function PulseTicker({
  range = "all",
  keys = ["callsAnswered", "hoursSaved", "messagesDelivered"],
  variant = "panel",
  className,
}: {
  range?: PulseRange;
  keys?: TickerKey[];
  variant?: "panel" | "bare";
  className?: string;
}) {
  const agg = BASE_AGGREGATE[range];

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {range === "week" ? "This month" : "All time"} · across all SSVP systems
        </span>
        <LiveDot />
      </div>

      <div
        className={cn(
          "mt-6 grid gap-x-6 gap-y-7",
          keys.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3",
        )}
      >
        {keys.map((k) => (
          <Metric
            key={k}
            value={agg[k]}
            format={META[k].format}
            label={META[k].label}
            live
            size="md"
          />
        ))}
      </div>

      <div className="mt-6">
        <PulseLine variant="feed" />
      </div>
    </>
  );

  if (variant === "bare") return <div className={className}>{inner}</div>;

  return (
    <div className={cn("panel panel-pulse p-6", className)}>{inner}</div>
  );
}
