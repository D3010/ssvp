import { cn } from "@/lib/utils";
import { formatMetric, type MetricFormat } from "@/lib/utils";

/**
 * A number on the site = mono + tabular. Rendered at its final value on the
 * server (no JS count-up) so it's visible instantly and ships no JavaScript.
 * Green (pulse) only when `live` — real streaming data; static metrics stay
 * neutral.
 */
export function Metric({
  value,
  format = "int",
  label,
  prefix,
  live = false,
  size = "md",
  className,
}: {
  value: number;
  format?: MetricFormat;
  label?: string;
  prefix?: string;
  live?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-[clamp(3rem,7vw,5.5rem)]",
  } as const;

  return (
    <span className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "tabular font-medium leading-none",
          sizes[size],
          live ? "text-pulse" : "text-text",
        )}
      >
        {prefix}
        {formatMetric(value, format)}
      </span>
      {label && (
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
          {label}
        </span>
      )}
    </span>
  );
}
