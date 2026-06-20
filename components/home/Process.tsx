import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STEPS = [
  { n: "01", title: "Kickoff & walkthrough", body: "We map the exact task, queue, or call flow we're automating — and the number it should move." },
  { n: "02", title: "Build & integrate", body: "We wire into your existing systems and build the agent or workflow, phased so you see value early." },
  { n: "03", title: "Test & QA", body: "Real-data dry runs with humans in the loop until edge cases and exceptions are handled cleanly." },
  { n: "04", title: "Go live & support", body: "Launch with monitoring, founder-direct access, and live results streaming to Pulse from day one." },
];

export function Process() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <Eyebrow>How it ships</Eyebrow>
          <h2 className="max-w-3xl text-[length:var(--text-h2)] text-balance">
            Fast onboarding. Full support. <span className="gradient-text">Zero disruption.</span>
          </h2>
        </Reveal>

        <div className="relative grid gap-5 md:grid-cols-4">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-pulse-dim),var(--color-pulse-dim),transparent)] md:block"
          />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} as="article" className="relative">
              <div className="flex flex-col">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-line bg-surface text-pulse shadow-[0_8px_24px_-12px_rgba(20,21,43,0.18)]">
                  <span className="tabular text-lg font-semibold">{s.n}</span>
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.9rem] text-muted text-pretty">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
