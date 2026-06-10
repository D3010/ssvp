import Link from "next/link";
import type { Service } from "@/content/services";

/**
 * Service card: name, one-line outcome, micro-metric chip, arrow.
 * Hover draws a pulse-green underline (CSS, GPU-composited).
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/40 p-6 transition-colors hover:border-line hover:bg-surface"
    >
      {/* hover underline that draws across the top */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-pulse transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
      <div>
        <h3 className="font-display text-xl font-semibold text-text">
          {service.name}
        </h3>
        <p className="mt-2 text-[0.95rem] text-muted text-pretty">
          {service.outcome}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="tabular rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-ice">
          {service.microMetric}
        </span>
        <span
          aria-hidden="true"
          className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-pulse"
        >
          →
        </span>
      </div>
    </Link>
  );
}
