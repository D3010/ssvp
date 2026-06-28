import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The classic "volume is rising, capacity isn't" diverging-lines graphic.
 * The SVG paths render fully drawn on the server (no JS draw-in) so the chart
 * is visible instantly.
 */
export function ProblemStatement() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow accent="pulse">The squeeze</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            Volume keeps rising.{" "}
            <span className="gradient-text">Headcount can&apos;t.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted text-pretty">
            Calls, refills, faxes, prior-auths, follow-ups — the admin load grows every quarter,
            but the labor market and your margins don&apos;t. Hiring your way out doesn&apos;t scale,
            and a generic IVR just makes people angrier.
          </p>
          <ul className="mt-7 space-y-3">
            {[
              "Manual data entry retyped across systems that don't talk",
              "Phones ring out at the lunch rush — refills walk away",
              "No straight line from activity to revenue you can audit",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pulse" aria-hidden="true" />
                <span className="text-[0.95rem] text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel relative overflow-hidden p-7">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  Workload vs. capacity
                </span>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  24 mo
                </span>
              </div>
              <svg viewBox="0 0 400 200" className="mt-4 w-full" fill="none">
                {/* demand — climbing */}
                <path
                  d="M0 170 C 80 160, 140 120, 200 100 S 320 40, 400 18"
                  stroke="url(#demand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* capacity — flat */}
                <path
                  d="M0 150 C 100 148, 200 146, 300 145 S 380 144, 400 144"
                  stroke="var(--color-line)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 8"
                />
                <defs>
                  <linearGradient id="demand" x1="0" y1="0" x2="400" y2="0">
                    <stop offset="0" stopColor="var(--brand-1)" />
                    <stop offset="1" stopColor="var(--brand-3)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="mt-3 flex items-center gap-6">
                <span className="flex items-center gap-2 text-[0.75rem] text-text">
                  <span className="h-0.5 w-5 rounded bg-[linear-gradient(90deg,var(--brand-1),var(--brand-3))]" />
                  Workload
                </span>
                <span className="flex items-center gap-2 text-[0.75rem] text-muted">
                  <span className="h-0.5 w-5 rounded bg-line" />
                  Staff capacity
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
