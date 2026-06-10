/**
 * Tiny class-name joiner. No clsx/tailwind-merge dependency — keep the
 * bundle lean and the dep list honest (the brief bans unused deps).
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Format a number the way Pulse renders it. All numbers are mono + tabular. */
export type MetricFormat = "int" | "usd" | "pct" | "duration";

export function formatMetric(value: number, format: MetricFormat): string {
  switch (format) {
    case "usd":
      return `$${Math.round(value).toLocaleString("en-US")}`;
    case "pct":
      return `${Math.round(value)}%`;
    case "duration": {
      // value is minutes
      if (value < 60) return `${Math.round(value)}m`;
      const h = Math.floor(value / 60);
      const m = Math.round(value % 60);
      return m === 0 ? `${h}h` : `${h}h ${m}m`;
    }
    case "int":
    default:
      return Math.round(value).toLocaleString("en-US");
  }
}

/** Site-wide constants wired into every CTA, the form, and the footer. */
export const SITE = {
  name: "SSVP",
  legalName: "SSVP HOLDING LLC",
  email: "deep@deepshah.tech",
  url: "https://ssvp.tech",
  tagline: "We don't sell automation. We sell receipts.",
  description:
    "SSVP designs, builds, and runs AI systems for healthcare and revenue teams — and streams the results live. Voice agents, outreach engines, workflow automation.",
} as const;
