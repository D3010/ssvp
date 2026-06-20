import { Reveal } from "@/components/ui/Reveal";
import { PulseLine } from "@/components/ui/PulseLine";
import { Molecule } from "./PharmacyArt";

/**
 * Editorial manifesto moment — a single large brand statement. Breaks the
 * marketing rhythm with something that reads premium and human.
 */
export function PullQuote() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden border-y border-line bg-surface-2/50 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-30" />
      <Molecule className="pointer-events-none absolute -right-10 top-8 hidden w-40 opacity-40 md:block" />
      <Molecule className="pointer-events-none absolute -left-12 bottom-6 hidden w-28 opacity-30 lg:block" />

      <div className="container-page relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span aria-hidden className="block font-display text-6xl leading-none gradient-text">&ldquo;</span>
          <blockquote className="mt-2">
            <p className="text-balance text-[length:var(--text-h2)] font-semibold leading-[1.12] tracking-[-0.02em] text-text">
              A pharmacist&apos;s license shouldn&apos;t be spent on{" "}
              <span className="gradient-text">fax machines and hold music.</span> We automate the
              busywork so your team can do the work only they can do.
            </p>
          </blockquote>
          <div className="mx-auto mt-9 flex max-w-xs flex-col items-center gap-4">
            <PulseLine variant="footer" className="opacity-70" />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              Why we built SSVP
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
