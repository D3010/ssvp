"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * GOLD = the human. This is the pharmacist gate made interactive: it pulses
 * gold and waits for a REAL user click (Part G1, Part N). Keyboard-operable.
 *
 * This file lives under components/verification/* — the only scope where the
 * `gold` token is permitted (Part I lint rule).
 */
export function VerifyButton({
  label = "Pharmacist verify",
  verifiedLabel = "Signed off",
  onVerify,
  className,
}: {
  label?: string;
  verifiedLabel?: string;
  onVerify?: () => void;
  className?: string;
}) {
  const [verified, setVerified] = useState(false);

  function handle() {
    if (verified) return;
    setVerified(true);
    onVerify?.();
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={verified}
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-200",
        verified
          ? "cursor-default border border-gold/60 bg-gold/15 text-gold-bright"
          : "animate-gold-pulse bg-gold text-obsidian hover:bg-gold-bright",
        className,
      )}
    >
      {verified ? (
        <>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {verifiedLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
