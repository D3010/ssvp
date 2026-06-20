import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";

export function FinalCTA() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-2)_22%,transparent),transparent_62%)] blur-3xl animate-aurora"
      />

      <div className="container-page relative text-center">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-pulse">
            Stop hiring more
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-[length:var(--text-display)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Start automating <span className="gradient-text">smarter.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted text-pretty">
            We&apos;ll show you exactly how AI agents handle your admin backlog — without changing
            your software or your workflow. And you&apos;ll watch the results land on Pulse.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg" magnetic>
              Book a demo
              <span aria-hidden>→</span>
            </Button>
            <Button href="/pulse" variant="secondary" size="lg">
              Explore the platform
            </Button>
          </div>
          <div className="mx-auto mt-12 max-w-xl opacity-70">
            <PulseLine variant="converge" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
