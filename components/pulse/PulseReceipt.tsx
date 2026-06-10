import { LiveDot } from "@/components/ui/LiveDot";
import { cn } from "@/lib/utils";

/**
 * The small "logged to Pulse" stamp used at the bottom of the With-SSVP
 * timeline. A receipt for a single interaction.
 */
export function PulseReceipt({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-input)] border border-pulse/30 bg-pulse/[0.06] p-3",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-pulse">
          Pulse receipt
        </span>
        <LiveDot label="LOGGED" />
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.75rem] text-text">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-1.5">
            <span className="text-pulse" aria-hidden="true">
              +
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
