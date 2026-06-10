import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseDashboard } from "@/components/pulse/PulseDashboard";

const POINTS = [
  {
    title: "Private client dashboards",
    body: "Your numbers, in dollars and hours, updated in real time.",
  },
  {
    title: "Public proof ticker",
    body: "Anonymized aggregate results, live on this page.",
  },
  {
    title: "Outcome-aligned pricing",
    body: "Part of what you pay is tied to what Pulse verifies.",
  },
];

export function PulseFeatureSection() {
  return (
    <section id="pulse" className="relative border-y border-line bg-surface/20 py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <Reveal>
            <Eyebrow accent="pulse">PROOF LEDGER</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              We don&apos;t sell automation. We sell receipts.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted text-pretty">
              Every system we ship reports for duty. Calls answered, emails
              delivered, replies generated, hours returned to your staff, revenue
              recovered — streamed to a dashboard you can open any time. Vanity
              metrics don&apos;t make the cut. Only what moved.
            </p>

            <ul className="mt-8 space-y-4">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-pulse"
                  />
                  <span>
                    <span className="font-medium text-text">{p.title}</span>
                    <span className="text-muted"> — {p.body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button href="/pulse" variant="secondary">
                Explore the ledger →
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <PulseDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
