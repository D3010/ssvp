import Link from "next/link";
import type { CaseStudy } from "@/content/caseStudies";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { LiveDot } from "@/components/ui/LiveDot";
import { PulseLine } from "@/components/ui/PulseLine";

export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  return (
    <>
      <PageHero
        eyebrow={`CASE STUDY · ${study.service.toUpperCase()}`}
        title={study.title}
        sub={study.summary}
        aside={
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-surface/60 p-6">
            {study.heroMetrics.map((m) => (
              <div key={m.label}>
                <p className="tabular text-3xl font-medium leading-none text-pulse">
                  {m.value}
                </p>
                <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {m.label}
                </p>
              </div>
            ))}
            <div className="border-t border-line pt-4">
              <LiveDot />
            </div>
          </div>
        }
      />

      <article className="py-20 md:py-24">
        <div className="container-page max-w-3xl space-y-16">
          <Reveal>
            <Eyebrow>THE PROBLEM</Eyebrow>
            <p className="mt-5 text-lg text-muted text-pretty">{study.problem}</p>
          </Reveal>

          <Reveal>
            <Eyebrow accent="pulse">WHAT WE BUILT</Eyebrow>
            <ol className="mt-6 space-y-4">
              {study.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="tabular font-mono text-sm text-pulse">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.05rem] text-text text-pretty">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <Eyebrow>THE RESULT</Eyebrow>
            <p className="mt-5 text-lg text-muted text-pretty">{study.result}</p>
            <div className="mt-8 rounded-[var(--radius-card)] border border-pulse/25 bg-pulse/[0.04] p-7 glow-pulse">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-pulse">
                  Verified on Pulse
                </span>
                <LiveDot label="LOGGED" />
              </div>
              <p className="tabular mt-4 text-5xl font-medium leading-none text-pulse">
                {study.pullMetric.value}
              </p>
              <p className="mt-2 text-sm text-muted">{study.pullMetric.label}</p>
              <div className="mt-5">
                <PulseLine variant="feed" />
              </div>
            </div>
          </Reveal>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8 text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Related
            </span>
            <Link href={`/services/${study.serviceSlug}`} className="text-ice hover:text-text">
              {study.service} →
            </Link>
            <Link href="/work" className="text-ice hover:text-text">
              All case studies →
            </Link>
          </div>
        </div>
      </article>

      <CTABand cta="Book a build call" />
    </>
  );
}
