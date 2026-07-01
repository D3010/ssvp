import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * SSVP AI wordmark. The "pulse chip" mark = the overlay tile (a script screen)
 * with an ice-blue signal line ending in a gold sign-off node — the brand in
 * one glyph: invisible overlay, visible log, the human who signs. Paired with
 * "SSVP" and an "AI" ice pill.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SSVP AI — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative inline-flex">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-lg bg-mint/25 blur-md opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        />
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className="relative size-8 transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="28" height="28" rx="8" fill="#0E1726" />
          <rect
            x="2.75"
            y="2.75"
            width="26.5"
            height="26.5"
            rx="7.25"
            stroke="#5AC8FA"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <path
            d="M6 17H11l1.7-8 3 13.5 2.2-9.5H21.5"
            stroke="#5AC8FA"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24.4" cy="16.4" r="2.3" fill="#E5B34E" className="animate-breathe" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-lg font-semibold tracking-tight text-text">SSVP</span>
        <span className="rounded bg-mint/15 px-1.5 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-mint">
          AI
        </span>
      </span>
    </Link>
  );
}
