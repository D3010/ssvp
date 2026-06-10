import { cn } from "@/lib/utils";

/**
 * Breathing green dot + LIVE label. Green here means "real, streaming data."
 */
export function LiveDot({
  label = "LIVE",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="size-2 rounded-full bg-pulse animate-breathe"
        aria-hidden="true"
      />
      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-pulse">
        {label}
      </span>
    </span>
  );
}
