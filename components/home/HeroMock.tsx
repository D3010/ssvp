import { PulseLine } from "@/components/ui/PulseLine";

/**
 * The hero "product" visual: a clean light operations dashboard. Rendered
 * statically on the server (no cursor-tilt, no JS) so it paints instantly.
 * Floating notification cards and the pharmacy art live in the Hero so nothing
 * overlaps the dashboard's own text.
 */

const LEDGER = [
  { t: "09:41", label: "Refill captured · #RX-2231", val: "+1" },
  { t: "09:40", label: "Inbound answered · 2 rings", val: "0:38" },
  { t: "09:38", label: "Prior-auth resolved", val: "+1" },
];

const BARS = [38, 52, 44, 61, 49, 72, 66, 84, 70, 91];

export function HeroMock() {
  return (
    <div className="panel relative overflow-hidden p-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="size-2.5 rounded-full bg-pulse animate-breathe" />
          <span className="font-display text-sm font-semibold tracking-tight">SSVP Pulse</span>
        </div>
        <span className="rounded-full bg-pulse/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-pulse">
          Live
        </span>
      </div>

      {/* headline metric row */}
      <div className="mt-7 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Hours saved · this week</p>
          <p className="tabular mt-2 text-[2.6rem] font-semibold leading-none text-text">312.6</p>
        </div>
        <div className="text-right">
          <p className="tabular text-2xl font-semibold leading-none gradient-text">$24.3k</p>
          <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">cost avoided</p>
        </div>
      </div>

      {/* bar chart */}
      <div className="mt-7 flex h-24 items-end gap-2">
        {BARS.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,var(--brand-3),var(--brand-1))] opacity-90"
          />
        ))}
      </div>

      <div className="mt-5">
        <PulseLine variant="divider" />
      </div>

      {/* ledger */}
      <ul className="mt-4 space-y-2">
        {LEDGER.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3.5 py-2.5"
          >
            <span className="tabular text-[0.7rem] text-muted">{row.t}</span>
            <span className="flex-1 truncate text-[0.82rem] text-text">{row.label}</span>
            <span className="tabular text-[0.74rem] font-medium text-pulse">{row.val}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
