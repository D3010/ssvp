import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Molecule, PillBottle, Capsule } from "./PharmacyArt";

const STATS = [
  { value: "24/7", label: "systems running" },
  { value: "3M+", label: "actions / month" },
  { value: "< 4 wk", label: "to go live" },
];

/**
 * High-contrast brand band (the one inverted, dark-gradient surface on the
 * page) to break the white rhythm and anchor the enterprise pitch.
 */
export function Enterprise() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-wide">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(120deg,#1b1640,#4f46e5_55%,#7c3aed)] p-10 md:p-16">
            {/* texture */}
            <div aria-hidden className="absolute inset-0 bg-dots opacity-20" />
            <div aria-hidden className="absolute -right-16 -top-20 size-80 rounded-full bg-white/10 blur-3xl" />
            {/* faint depth art + glossy pharmacy accents (decorative) */}
            <Molecule className="pointer-events-none absolute -left-10 -bottom-12 z-0 w-48 opacity-20" />
            <Capsule className="pointer-events-none absolute right-10 -top-6 z-0 hidden w-32 -rotate-12 opacity-90 lg:block" />
            <PillBottle className="pointer-events-none absolute -right-3 bottom-3 z-0 hidden w-20 rotate-6 opacity-95 md:block" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/70">
                  Multi-location &amp; enterprise
                </span>
                <h2 className="mt-4 max-w-xl text-[length:var(--text-h2)] text-white">
                  Running at scale? We work differently.
                </h2>
                <p className="mt-5 max-w-lg text-lg text-white/80 text-pretty">
                  For groups and high-volume operations, we embed forward-deployed engineers and
                  build custom systems around your workflows — with one ledger across every location.
                </p>
                <div className="mt-8">
                  <Button href="/contact" variant="secondary" size="lg" className="!border-white/30 !bg-white !text-ink hover:!bg-white/90">
                    Let&apos;s talk
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <p className="tabular text-3xl font-semibold text-white md:text-4xl">{s.value}</p>
                    <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/60">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
