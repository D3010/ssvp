/**
 * The PrimeRx wireframe window — DOM, server-rendered. At rest (and with JS off
 * / reduced-motion / TIER 0) the static dots show, so it reads as a filled,
 * verified screen. When the engine takes over it adds `.intake-live` (dots hide;
 * the canvas draws them instead, aligned to these exact slots) and toggles
 * `.is-read` per row + `.intake-verified` for the gold check.
 *
 * aria-hidden: decorative. All real copy lives in the hero markup.
 */

const ROWS: { label: string; dots: number }[] = [
  { label: "PATIENT", dots: 13 },
  { label: "PRESCRIBER", dots: 11 },
  { label: "DRUG / NDC", dots: 16 },
  { label: "SIG", dots: 8 },
  { label: "QTY · DAYS", dots: 6 },
  { label: "DAW", dots: 2 },
];

export function IntakeWindow() {
  return (
    <div
      data-intake-window
      aria-hidden="true"
      className="glass-card intake-window w-full max-w-[440px] select-none overflow-hidden"
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-mint-dim/40" />
            <span className="size-2 rounded-full bg-mint-dim/25" />
            <span className="size-2 rounded-full bg-mint-dim/20" />
          </span>
          <span className="font-mono text-[0.6875rem] text-muted">PrimeRx — Rx Queue</span>
        </div>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mint-dim">intake</span>
      </div>

      {/* field rows */}
      <div className="flex flex-col">
        {ROWS.map((row, i) => (
          <div
            key={row.label}
            data-intake-row={i}
            className="intake-row relative flex items-center gap-3 border-b border-hairline px-4 py-2.5"
          >
            <span className="w-20 shrink-0 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-mint-dim">
              {row.label}
            </span>
            <span className="flex flex-wrap items-center gap-[6px] py-0.5">
              {Array.from({ length: row.dots }).map((_, d) => (
                <span key={d} data-dot className="block size-[3px] rounded-full bg-mint" />
              ))}
            </span>
            <span className="intake-scan pointer-events-none absolute inset-y-1 left-0 w-px bg-mint/70" />
          </div>
        ))}
      </div>

      {/* verification footer — the gold moment */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
          pharmacist verify
        </span>
        <span className="intake-check relative inline-flex size-6 items-center justify-center rounded-full bg-gold/15 text-gold">
          <span className="intake-check-ring pointer-events-none absolute inset-0 rounded-full border border-gold" />
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
            <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}
