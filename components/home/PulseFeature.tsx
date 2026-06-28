import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

const FEATURES = [
  { title: "Live, not monthly", body: "Results stream in real time — no waiting for a deck at month-end." },
  { title: "Every action is a receipt", body: "Each refill, call, and send lands on the ledger with outcome and value." },
  { title: "One screen, every system", body: "Voice, outreach, and workflows report into a single source of truth." },
];

const GAUGE = [
  { label: "Inbox placement", pct: 90 },
  { label: "Calls resolved", pct: 82 },
  { label: "Refills captured", pct: 96 },
];

export function PulseFeature() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow accent="pulse">The platform</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            Every system reports to <span className="gradient-text">Pulse</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted text-pretty">
            We don&apos;t sell automation — we sell receipts. Pulse is the live ledger where every
            system we build proves what it did, the moment it does it.
          </p>
          <ul className="mt-8 space-y-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-pulse/10 text-pulse">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-4">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-medium text-text">{f.title}</span>
                  <span className="block text-[0.9rem] text-muted text-pretty">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/pulse" size="lg">
              Open Pulse
              <span aria-hidden>→</span>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel relative overflow-hidden p-7">
            <div aria-hidden className="absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_18%,transparent),transparent_70%)] blur-2xl" />
            <div className="relative flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-pulse animate-breathe" />
                <span className="font-display text-sm font-semibold">Pulse · this week</span>
              </span>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">auto-refresh</span>
            </div>

            <div className="relative mt-7 space-y-5">
              {GAUGE.map((g) => (
                <div key={g.label}>
                  <div className="flex items-center justify-between text-[0.78rem]">
                    <span className="text-text">{g.label}</span>
                    <span className="tabular font-medium text-pulse">{g.pct}%</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      style={{ width: `${g.pct}%` }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-1),var(--brand-3))]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-7 grid grid-cols-3 gap-3 border-t border-line pt-5">
              {[
                { v: "1,284", l: "actions" },
                { v: "312h", l: "saved" },
                { v: "$24.3k", l: "avoided" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="tabular text-lg font-semibold text-text">{s.v}</p>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
