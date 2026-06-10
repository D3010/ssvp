import { cn } from "@/lib/utils";

/**
 * The signature element. A thin ECG/signal line that recurs through the site
 * (hero underline → section dividers → ledger baseline → final-CTA converge →
 * footer accent), tying the healthcare + live-data identity together.
 *
 * Draw-in is a pure CSS animation (ssvp-draw, fill forwards) so it resolves to
 * the fully-drawn state even under prefers-reduced-motion (the global media
 * query collapses the duration but the forwards fill keeps it visible).
 */

// A hand-tuned ECG path: flat → P-wave bump → flat → QRS spike → flat → T bump → flat.
const ECG_PATH =
  "M0 20 H300 q10 0 14 -3 t14 3 H470 l10 0 l6 -14 l8 28 l6 -14 l10 0 H720 q10 0 14 -4 t14 4 H1200";

type Variant = "underline" | "divider" | "feed" | "converge" | "footer";

export function PulseLine({
  variant = "divider",
  animate = false,
  className,
}: {
  variant?: Variant;
  animate?: boolean;
  className?: string;
}) {
  const heights: Record<Variant, string> = {
    underline: "h-3 w-full max-w-[460px]",
    divider: "h-6 w-full",
    feed: "h-4 w-full opacity-40",
    converge: "h-10 w-full",
    footer: "h-3 w-24",
  };

  return (
    <svg
      className={cn("block text-pulse", heights[variant], className)}
      viewBox="0 0 1200 40"
      fill="none"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`pulse-fade-${variant}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="1" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d={ECG_PATH}
        stroke={`url(#pulse-fade-${variant})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={
          animate
            ? {
                strokeDasharray: 1320,
                strokeDashoffset: 1320,
                animation: "ssvp-draw 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards",
              }
            : undefined
        }
      />
    </svg>
  );
}
