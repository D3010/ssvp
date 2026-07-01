import { cn } from "@/lib/utils";

/**
 * The sign-off state — a gold stamp for the "signature line" moments (ledger,
 * onboarding stage 03, dossier cover). Gold token permitted here only.
 */
export function SignOffStamp({
  label = "PHARMACIST SIGNED",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-gold/50 bg-gold/10 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold-bright",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </span>
  );
}
