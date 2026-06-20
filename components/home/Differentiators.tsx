import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const POINTS = [
  {
    k: "01",
    title: "Built by operators",
    body: "We've run the phone line and worked the refill queue. Systems are designed around how the work actually happens — not a vendor's idea of it.",
  },
  {
    k: "02",
    title: "Engineered for your stack",
    body: "No ripping out your pharmacy system or CRM. We build on what you already pay for, with audited, HIPAA-aware data paths.",
  },
  {
    k: "03",
    title: "Embedded, not installed",
    body: "You get founder-direct access and monitored systems. Pulse flags anomalies before your patients or your pipeline ever notice.",
  },
];

export function Differentiators() {
  return (
    <section className="scroll-mt-24 border-y border-line bg-surface-2/50 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 flex max-w-3xl flex-col gap-4 md:mb-16">
          <Eyebrow accent="ice">Why SSVP</Eyebrow>
          <h2 className="text-[length:var(--text-h2)] text-balance">
            Built by insiders. <span className="gradient-text">Backed by engineers.</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08} as="article">
              <div className="panel relative h-full overflow-hidden p-7">
                <span aria-hidden className="absolute -right-2 -top-3 font-display text-7xl font-bold text-pulse/10">
                  {p.k}
                </span>
                <div className="relative">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pulse">{p.k}</span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-[0.95rem] text-muted text-pretty">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
