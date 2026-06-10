import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { PILLARS, servicesByPillar } from "@/content/services";

export const metadata: Metadata = {
  title: "Services — Nine systems, one ledger",
  description:
    "Revenue systems, healthcare & pharmacy automation, and the platforms underneath — eight services plus SSVP Pulse, all measured on a live ledger.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <PageHero
        eyebrow="WHAT WE BUILD"
        title="Nine systems. One ledger they all report to."
        sub="Three pillars, eight services, and SSVP Pulse tying them together. Each one ships in weeks and proves itself in dollars and hours."
      />

      <section className="py-16 md:py-24">
        <div className="container-wide space-y-14">
          {PILLARS.map((pillar) => (
            <div key={pillar.id}>
              <Reveal className="mb-6 flex flex-col gap-1 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-display text-2xl font-semibold text-text">
                  {pillar.label}
                </h2>
                <p className="max-w-md text-sm text-muted">{pillar.blurb}</p>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByPillar(pillar.id).map((service, i) => (
                  <Reveal key={service.slug} delay={i * 0.05}>
                    <ServiceCard service={service} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
