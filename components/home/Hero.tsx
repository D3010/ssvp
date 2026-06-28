import { Button } from "@/components/ui/Button";
import { HeroMock } from "./HeroMock";
import { Capsule, Molecule, Tablet, PillBottle, BlisterPack } from "./PharmacyArt";

const PROOF_CHIPS = ["Answers in 2 rings", "78% → 90% deliverability", "HIPAA-aware", "Receipts on Pulse"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ── layered, drifting light backdrop ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-[14%] size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_24%,transparent),transparent_62%)] blur-2xl animate-aurora"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[30%] size-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-1)_18%,transparent),transparent_65%)] blur-2xl animate-aurora [animation-delay:6s]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full">
        {/* ── first screen: copy, centered, with floating 3D art ───────── */}
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col items-center justify-center py-14 text-center">
          {/* floating pharmacy art around the headline (decorative) */}
          <Capsule className="pointer-events-none absolute -left-28 top-[12%] z-0 hidden w-28 -rotate-12 animate-float opacity-90 lg:block xl:-left-44" />
          <Molecule className="pointer-events-none absolute -right-24 top-[8%] z-0 hidden w-28 animate-float-slow opacity-90 lg:block xl:-right-40" />
          <Tablet className="pointer-events-none absolute left-[2%] bottom-[18%] z-0 hidden w-12 animate-bob opacity-90 xl:block" />
          <PillBottle className="pointer-events-none absolute -left-20 bottom-[8%] z-0 hidden w-16 rotate-6 animate-bob [animation-delay:1.4s] opacity-90 xl:block" />
          <BlisterPack className="pointer-events-none absolute -right-28 bottom-[14%] z-0 hidden w-28 -rotate-6 animate-float [animation-delay:0.8s] opacity-90 lg:block xl:-right-40" />

          <span className="animate-rise relative z-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2 shadow-[0_1px_2px_0_rgba(20,21,43,0.05)] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-pulse animate-breathe" aria-hidden="true" />
            <span className="text-[0.82rem] font-semibold tracking-[0.02em] text-text">
              Built by pharmacists, for pharmacists
            </span>
          </span>

          <h1 className="relative z-10 mt-8 text-[length:var(--text-display)] font-semibold leading-[1.04] tracking-[-0.02em]">
            <span className="animate-rise headline-sheen block [animation-delay:0.08s]">Scale your ops</span>
            <span className="animate-rise block [animation-delay:0.16s]">
              <span className="gradient-text animate-gradient-pan">without scaling</span>
            </span>
            <span className="animate-rise headline-sheen block [animation-delay:0.24s]">headcount.</span>
          </h1>

          <p className="animate-rise relative z-10 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty [animation-delay:0.32s]">
            SSVP designs, builds, and runs AI systems for healthcare and revenue teams — voice
            agents, outreach engines, and workflow automation that handle the busywork.{" "}
            <span className="font-medium text-text">Every result streams live on Pulse.</span>
          </p>

          <div className="animate-rise relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.4s]">
            <Button href="/contact" size="lg">
              Book a build call
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="/pulse" variant="secondary" size="lg">
              See the live ledger
            </Button>
          </div>

          <ul className="animate-rise relative z-10 mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 [animation-delay:0.48s]">
            {PROOF_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                <span className="size-1.5 rounded-full bg-pulse animate-breathe" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* ── product visual + pharmacy art (below the fold) ───────────── */}
        <div className="relative mx-auto max-w-[640px] pb-24">
          <Capsule className="absolute -top-10 right-4 z-20 w-28 rotate-[16deg] animate-bob sm:right-8 sm:w-32" />
          <Tablet className="absolute -top-6 left-6 z-20 hidden w-11 animate-bob [animation-delay:1.2s] md:block" />
          <Molecule className="absolute -bottom-12 -left-6 z-20 hidden w-28 animate-float-slow lg:block sm:-left-10" />

          <HeroMock />

          <div className="absolute -bottom-6 right-5 z-30 hidden animate-float sm:block">
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
