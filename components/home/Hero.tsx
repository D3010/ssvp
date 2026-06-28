import { Button } from "@/components/ui/Button";
import { HeroMock } from "./HeroMock";
import { Capsule, Molecule, Tablet } from "./PharmacyArt";

const PROOF_CHIPS = ["Answers in 2 rings", "78% → 90% deliverability", "HIPAA-aware", "Receipts on Pulse"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ── layered light backdrop (static — paints once) ──────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-[14%] size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_22%,transparent),transparent_62%)] blur-2xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full">
        {/* ── first screen: copy, vertically + horizontally centered ───── */}
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col items-center justify-center py-14 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2 shadow-[0_1px_2px_0_rgba(20,21,43,0.05)]">
            <svg viewBox="0 0 24 24" className="size-4 text-pulse" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 7v10M7 12h10" />
            </svg>
            <span className="text-[0.82rem] font-semibold tracking-[0.02em] text-text">
              Built by pharmacists, for pharmacists
            </span>
          </span>

          <h1 className="mt-8 text-[length:var(--text-display)] font-semibold leading-[1.04] tracking-[-0.02em]">
            <span className="headline-sheen block">Scale your ops</span>
            <span className="block">
              <span className="gradient-text">without scaling</span>
            </span>
            <span className="headline-sheen block">headcount.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            SSVP designs, builds, and runs AI systems for healthcare and revenue teams — voice
            agents, outreach engines, and workflow automation that handle the busywork.{" "}
            <span className="font-medium text-text">Every result streams live on Pulse.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg">
              Book a build call
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="/pulse" variant="secondary" size="lg">
              See the live ledger
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {PROOF_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                <span className="size-1.5 rounded-full bg-pulse" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* ── product visual + pharmacy art (below the fold) ───────────── */}
        <div className="relative mx-auto max-w-[640px] pb-24">
          <Capsule className="absolute -top-10 right-4 z-20 w-28 rotate-[16deg] sm:right-8 sm:w-32" />
          <Tablet className="absolute -top-6 left-6 z-20 hidden w-11 md:block" />
          <Molecule className="absolute -bottom-12 -left-6 z-20 hidden w-28 lg:block sm:-left-10" />

          <HeroMock />

          <div className="absolute -bottom-6 right-5 z-30 hidden sm:block">
            <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] text-white">
                ✓
              </span>
              <div>
                <p className="text-[0.8rem] font-semibold text-text">Refill captured</p>
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">no staff touch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
