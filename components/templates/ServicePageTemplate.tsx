import Link from "next/link";
import type { Service } from "@/content/services";
import { getService } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SystemDiagram } from "./SystemDiagram";
import { FAQ } from "@/components/ui/FAQ";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Metric } from "@/components/ui/Metric";
import { LiveDot } from "@/components/ui/LiveDot";
import { PulseLine } from "@/components/ui/PulseLine";
import { JsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { PILLARS } from "@/content/services";

export function ServicePageTemplate({ service }: { service: Service }) {
  const related = getService(service.related);
  const pillarLabel = PILLARS.find((p) => p.id === service.pillar)?.label ?? "";
  // Only odometer-animate clean numerics like "90%" or "2"; render anything
  // with extra glyphs ("24/7", "95+") verbatim so nothing is lost.
  const isNumeric = /^\d+%?$/.test(service.heroMetric.value);
  const numeric = Number(service.heroMetric.value.replace(/[^\d.]/g, ""));

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faqs)} />

      <PageHero
        eyebrow={pillarLabel.toUpperCase()}
        title={service.heroHeadline}
        sub={service.heroSub}
        aside={
          <div className="rounded-[var(--radius-card)] border border-line bg-surface/60 p-6 text-center">
            {isNumeric ? (
              <Metric
                value={numeric}
                format={service.heroMetric.value.includes("%") ? "pct" : "int"}
                label={service.heroMetric.label}
                live
                size="lg"
                className="items-center"
              />
            ) : (
              <span className="flex flex-col items-center gap-1">
                <span className="tabular text-5xl font-medium leading-none text-pulse">
                  {service.heroMetric.value}
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {service.heroMetric.label}
                </span>
              </span>
            )}
            <div className="mt-5 flex justify-center">
              <LiveDot />
            </div>
          </div>
        }
      />

      {/* problem */}
      <section className="py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <Eyebrow>THE PROBLEM</Eyebrow>
          <div className="mt-6 space-y-5 text-lg text-muted text-pretty">
            <p>{service.problem[0]}</p>
            <p>{service.problem[1]}</p>
          </div>
        </div>
      </section>

      {/* what we build */}
      <section className="border-y border-line bg-surface/20 py-20 md:py-24">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow accent="pulse">WHAT WE BUILD</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              The system, end to end.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <SystemDiagram nodes={service.build} />
          </Reveal>
        </div>
      </section>

      {/* how it shows up in Pulse */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal>
            <Eyebrow>HOW IT SHOWS UP IN PULSE</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              Every action becomes a receipt.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted text-pretty">
              {service.pulseWidget}
            </p>
            <Link
              href="/pulse"
              className="mt-6 inline-flex items-center gap-2 text-sm text-ice transition-colors hover:text-text"
            >
              See the full ledger <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface/60 p-6 glow-pulse">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                  {service.name}
                </span>
                <LiveDot />
              </div>
              <div className="mt-6 flex items-end justify-between">
                <Metric
                  value={Number(service.miniCase.metric.replace(/[^\d.]/g, "")) || 0}
                  format={service.miniCase.metric.includes("%") ? "pct" : "int"}
                  label="this engagement"
                  live
                  size="lg"
                />
                <span className="tabular font-mono text-sm text-pulse">
                  {service.miniCase.metric}
                </span>
              </div>
              <div className="mt-6">
                <PulseLine variant="feed" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* mini case */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <Eyebrow>PROOF</Eyebrow>
          <p className="mt-6 text-2xl text-text text-pretty md:text-3xl">
            {service.miniCase.story}
          </p>
          <Link
            href={service.miniCase.href}
            className="mt-6 inline-flex items-center gap-2 text-sm text-ice transition-colors hover:text-text"
          >
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <Eyebrow>QUESTIONS</Eyebrow>
          <h2 className="mb-8 mt-4 text-[length:var(--text-h2)] text-balance">
            The objections we actually hear.
          </h2>
          <FAQ items={service.faqs} />

          {related && (
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Related
              </span>
              <Link href="/pulse" className="text-ice hover:text-text">
                SSVP Pulse →
              </Link>
              <Link href={`/services/${related.slug}`} className="text-ice hover:text-text">
                {related.name} →
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTABand cta="Book a build call" />
    </>
  );
}
