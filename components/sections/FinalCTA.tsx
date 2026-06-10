import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";
import { SITE } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-pulse/[0.05] blur-3xl"
      />
      <div className="container-page relative py-24 text-center md:py-32">
        <Reveal className="mx-auto max-w-3xl">
          <div className="mx-auto mb-10 max-w-lg">
            <PulseLine variant="converge" />
          </div>
          <h2 className="text-[length:var(--text-h2)] text-balance">
            Your competitors are answering every call.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted text-pretty">
            Tell us where the manual hours are leaking. We&apos;ll come back with
            a system and an ROI model — usually within a day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg" magnetic>
              Book a build call
              <span aria-hidden="true">→</span>
            </Button>
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-sm text-ice transition-colors hover:text-text"
            >
              or {SITE.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
