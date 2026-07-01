import { cn } from "@/lib/utils";

/**
 * The read-back ✓ — gold, because a human's sign-off is what makes it count.
 * components/verification/* is the only scope allowed to use the gold token.
 */
export function GoldCheck({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full bg-gold/15 text-gold", className)}
      style={{ width: size, height: size }}
      aria-label="verified"
    >
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
        <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
