import { Reveal } from "@/components/ui/Reveal";

/**
 * Honest social proof: instead of borrowed customer logos, the strip shows the
 * receipts — real numbers the systems have produced. On-brand for SSVP.
 */
const STATS = [
  { value: "92,640", label: "messages delivered" },
  { value: "2 rings", label: "to answer inbound" },
  { value: "78% → 90%", label: "sender reputation" },
  { value: "100%", label: "of calls tagged" },
];

export function CredibilityStrip() {
  return (
    <section className="border-y border-line bg-surface-2/50">
      <div className="container-wide py-10">
        <Reveal>
          <p className="text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Proof, not promises — every number streams live on Pulse
          </p>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="text-center">
              <p className="tabular text-2xl font-semibold gradient-text md:text-3xl">{s.value}</p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
