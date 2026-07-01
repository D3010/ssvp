import Link from "next/link";
import { cn } from "@/lib/utils";

/** SSVP wordmark with the live pulse dot. Brand uses "SSVP" everywhere. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SSVP — home"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-text",
        className,
      )}
    >
      <span
        className="size-2 rounded-full bg-mint animate-breathe"
        aria-hidden="true"
      />
      SSVP
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-mint-dim">AI</span>
    </Link>
  );
}
