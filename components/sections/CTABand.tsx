import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";
import { SITE } from "@/lib/utils";

/**
 * Reusable closing CTA band for inner pages. Defaults to the Pulse tagline.
 */
export function CTABand({
  title = SITE.tagline,
  sub,
  cta = "Book a build call",
  href = "/contact",
}: {
  title?: string;
  sub?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="container-page py-20 text-center md:py-24">
        <Reveal className="mx-auto max-w-2xl">
          <div className="mx-auto mb-8 max-w-sm">
            <PulseLine variant="converge" />
          </div>
          <h2 className="text-[length:var(--text-h2)] text-balance">{title}</h2>
          {sub && <p className="mx-auto mt-4 max-w-xl text-lg text-muted text-pretty">{sub}</p>}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={href} size="lg" magnetic>
              {cta}
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
