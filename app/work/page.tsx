import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { CASE_STUDIES } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Work — Proof, not promises",
  description:
    "Production AI systems SSVP has shipped: email reputation recovery from 78% to 90%, a pharmacy voice agent, and an ATS-integrated outreach engine.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <PageHero
        eyebrow="THE RECEIPTS"
        title="Proof, not promises."
        sub="Production systems, with the numbers they produced. Every metric here is verified on Pulse."
      />

      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-5">
          {CASE_STUDIES.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid gap-8 rounded-[var(--radius-card)] border border-line bg-surface/40 p-7 transition-colors hover:border-pulse/30 hover:bg-surface md:grid-cols-[1fr_auto] md:items-center md:p-9"
              >
                <div className="max-w-2xl">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                    {study.service}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-text md:text-3xl">
                    {study.title}
                  </h2>
                  <p className="mt-3 text-muted text-pretty">{study.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-ice transition-all group-hover:gap-3">
                    Read the case study <span aria-hidden="true">→</span>
                  </span>
                </div>
                <div className="flex gap-8 md:flex-col md:gap-4 md:border-l md:border-line md:pl-9">
                  {study.heroMetrics.map((m) => (
                    <div key={m.label}>
                      <p className="tabular text-2xl font-medium leading-none text-pulse md:text-3xl">
                        {m.value}
                      </p>
                      <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
