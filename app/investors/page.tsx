import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { PulseLine } from "@/components/ui/PulseLine";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Investors — SSVP AI",
  description:
    "Three lines for investors: a category-creating product with write-access no dashboard has, a moat built on cash-protection revenue and a payer-rules data flywheel, and what we're raising for the 15-month build.",
  alternates: { canonical: "/investors" },
  robots: { index: true, follow: true },
};

const LINES = [
  {
    label: "The category",
    body: (
      <>
        A defensible, category-creating product: an AI technician with{" "}
        <span className="text-text">write-access to PrimeRx</span> that no
        dashboard has. Every funded competitor watches claims through glass and
        recommends. SSVP has its hands on the keyboard and a licensed
        pharmacist&rsquo;s signature on every move.
      </>
    ),
  },
  {
    label: "The moat",
    body: (
      <>
        Recurring, cash-protection revenue — money the pharmacy was about to lose —
        stacked on a{" "}
        <span className="text-text">payer-rules data flywheel</span>. Every audit
        handled makes the next defense stronger, an asset human incumbents took
        decades to build, now accruing at software speed and impossible to
        backfill.
      </>
    ),
  },
  {
    label: "The ask",
    body: (
      <>
        Build capital for the{" "}
        <span className="text-text">15-month build</span>, weighted toward
        payer-rules knowledge engineering; pilot partners who want the overlay in
        their stores first; and channel introductions into independent pharmacy.
        No numbers here beyond what&rsquo;s already public on this site.
      </>
    ),
  },
] as const;

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="INVESTORS"
        title="Three lines. The rest is a conversation."
        sub="Not a deck — a teaser. The full story lives across this site; here is why it's worth a call."
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <ol className="overflow-hidden rounded-2xl border border-hairline bg-emerald-deep/30">
            {LINES.map((line, i) => (
              <Reveal
                as="li"
                key={line.label}
                delay={i * 0.06}
                className={
                  "flex flex-col gap-6 p-7 md:flex-row md:items-start md:gap-10 md:p-10" +
                  (i < LINES.length - 1 ? " border-b border-hairline" : "")
                }
              >
                <div className="flex items-baseline gap-3 md:w-48 md:shrink-0 md:flex-col md:gap-2">
                  <span className="tabular text-4xl text-mint md:text-5xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono-label">{line.label}</span>
                </div>
                <p className="max-w-2xl text-lg text-muted text-pretty md:text-xl">
                  {line.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12 flex flex-col items-center gap-6 text-center">
            <div className="w-full max-w-sm">
              <PulseLine variant="converge" />
            </div>
            <p className="max-w-xl text-lg text-text text-balance">
              If that&rsquo;s a thesis you want to underwrite, the next step is a
              direct email — no gatekeeper.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-lg text-mint transition-colors hover:text-text"
            >
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
