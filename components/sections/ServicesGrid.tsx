import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";
import { PILLARS, servicesByPillar } from "@/content/services";

export function ServicesGrid() {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <Eyebrow>WHAT WE BUILD</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            Nine systems. One ledger they all report to.
          </h2>
        </Reveal>

        <div className="space-y-12">
          {PILLARS.map((pillar) => (
            <div key={pillar.id}>
              <Reveal className="mb-5 flex flex-col gap-1 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold text-text">
                  {pillar.label}
                </h3>
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
      </div>
    </section>
  );
}
