import { cn } from "@/lib/utils";

/**
 * Generic mono chip. Used for SIMULATION / DEMO DATA / ILLUSTRATIVE labels
 * (Part K.4) and the module INPUT/OUTPUT/GATE/EXCLUDES chips.
 * `tone="gold"` is intentionally NOT offered here — verification-only accents
 * live in components/verification/*.
 */
export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "mint" | "risk" | "outline";
  className?: string;
}) {
  const tones = {
    neutral: "bg-emerald-deep/60 text-muted border-hairline",
    mint: "bg-mint/10 text-mint border-mint/25",
    risk: "bg-risk/10 text-risk border-risk/30",
    outline: "text-bone/70 border-bone/20",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A labelled spec chip: mono label + value, for the module I/O/GATE/EXCLUDES. */
export function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex flex-col gap-0.5 rounded-lg border border-hairline bg-emerald-deep/40 px-3 py-2">
      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mint-dim">
        {label}
      </span>
      <span className="text-sm text-text">{value}</span>
    </span>
  );
}
