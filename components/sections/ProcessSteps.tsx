import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Audit", body: "We map your manual hours and find what's leaking." },
  { n: "02", title: "Architect", body: "We design the system and the ROI model before we write a line." },
  { n: "03", title: "Build", body: "We ship in weeks, not quarters." },
  { n: "04", title: "Run", body: "You're live on Pulse from day one." },
];

export function ProcessSteps() {
  return (
    <section className="border-y border-line bg-surface/20 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow>HOW WE WORK</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            Four steps from manual hours to a live dashboard.
          </h2>
        </Reveal>

        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delay={i * 0.06}
              className="flex flex-col gap-4 bg-base p-6"
            >
              <span className="tabular font-mono text-sm text-pulse">{step.n}</span>
              <h3 className="font-display text-xl font-semibold text-text">
                {step.title}
              </h3>
              <p className="text-sm text-muted text-pretty">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
