import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About — The anti-agency",
  description:
    "SSVP is a founder-led, engineering-first AI automation firm. The person scoping your system writes the code. Trained in AI/ML at Stevens Institute of Technology.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { title: "Receipts over rhetoric.", body: "If we claim it, Pulse can prove it. Every engagement reports its own numbers." },
  { title: "Ship in weeks.", body: "Value in weeks, not quarters. We phase the big builds so you see results early." },
  { title: "The builder takes the meeting.", body: "No account managers translating your problem. You talk to the person writing the code." },
  { title: "Build on what you already trust.", body: "Integration first. We meet your stack where it is instead of forcing a rip-and-replace." },
  { title: "If we can't measure it, we don't bill for it.", body: "Outcome-aligned pricing tied to metrics Pulse verifies." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="THE ANTI-AGENCY"
        title="We'd rather show you the code than the slide deck."
        sub="An engineering-first AI automation firm, founder-led on purpose."
      />

      <section className="py-20 md:py-24">
        <div className="container-page max-w-3xl space-y-6 text-lg text-muted text-pretty">
          <p>
            SSVP is an engineering-first AI automation firm. We build production
            systems — voice agents handling real pharmacy call volume, email
            pipelines that recovered sender reputation from 78% to 90%, outreach
            engines wired into ATS data — and we hold ourselves to the numbers
            they produce.
          </p>
          <p>
            The firm is founder-led: trained in AI/ML at Stevens Institute of
            Technology, shipping healthcare AI in production. We started SSVP
            because the gap between what agencies promise and what they can prove
            was a business waiting to happen.{" "}
            <span className="text-text">
              Pulse is our answer: every claim, on the record.
            </span>
          </p>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow accent="pulse">PRINCIPLES</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              How we work, in five lines.
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className="flex flex-col gap-3 bg-base p-7">
                <span className="tabular font-mono text-sm text-pulse">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-text">{p.title}</h3>
                <p className="text-sm text-muted text-pretty">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand cta="Book a build call" />
    </>
  );
}
