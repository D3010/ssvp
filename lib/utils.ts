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
  name: "SSVP AI",
  legalName: "SSVP HOLDING LLC",
  email: "deep@deepshah.tech",
  url: "https://ssvp-ai.com",
  tagline: "Invisible in the workflow. Visible in the log.",
  description:
    "SSVP AI is an AI technician that runs unseen on top of PrimeRx — reading every screen, typing every script, counting every bottle, and keeping the money the pharmacy is about to lose. Pharmacist-verified. Edge-only PHI. Controlled substances excluded.",
} as const;
