import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CASE_STUDIES } from "@/content/caseStudies";

/**
 * ROI / proof cards. Pulls real seed case studies; the first card spans wide
 * as the featured story (TJM-style asymmetric ROI grid).
 */
export function CaseStudies() {
  const [featured, ...rest] = CASE_STUDIES;

  return (
    <section className="scroll-mt-24 border-y border-line bg-surface-2/50 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <Eyebrow accent="pulse">Receipts</Eyebrow>
          <h2 className="max-w-3xl text-[length:var(--text-h2)] text-balance">
            Proven ROI, fewer errors, <span className="gradient-text">happier teams</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* featured */}
          <Reveal as="article" className="lg:col-span-2">
            <Link
              href={`/work/${featured.slug}`}
              className="panel group relative flex h-full flex-col justify-between overflow-hidden p-8 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/40"
            >
              <div aria-hidden className="pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_18%,transparent),transparent_70%)] blur-2xl" />
              <div className="relative">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{featured.service}</span>
                <h3 className="mt-3 max-w-md text-2xl font-semibold tracking-tight">{featured.title}</h3>
                <p className="mt-3 max-w-md text-[0.95rem] text-muted text-pretty">{featured.summary}</p>
              </div>
              <div className="relative mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
                {featured.heroMetrics.map((m) => (
                  <div key={m.label}>
                    <p className="tabular text-3xl font-semibold gradient-text md:text-4xl">{m.value}</p>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">{m.label}</p>
                  </div>
                ))}
                <span className="ml-auto font-mono text-sm text-pulse transition-transform group-hover:translate-x-1">
                  Read case study →
                </span>
              </div>
            </Link>
          </Reveal>

          {/* secondary stack */}
          <div className="flex flex-col gap-5">
            {rest.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08} as="article" className="flex-1">
                <Link
                  href={`/work/${c.slug}`}
                  className="panel group flex h-full flex-col justify-between p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/40"
                >
                  <div>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">{c.service}</span>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{c.title}</h3>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="tabular text-2xl font-semibold gradient-text">{c.pullMetric.value}</p>
                      <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">{c.pullMetric.label}</p>
                    </div>
                    <span aria-hidden className="font-mono text-sm text-pulse transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
