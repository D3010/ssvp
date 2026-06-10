import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SplitNarrative } from "@/components/sections/SplitNarrative";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { PulseTicker } from "@/components/pulse/PulseTicker";
import { FAQ } from "@/components/ui/FAQ";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { servicesByPillar } from "@/content/services";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";
import type { FaqItem } from "@/content/services";

export const metadata: Metadata = {
  title: "Pharmacy Automation — AI built for the pharmacy phone line",
  description:
    "AI voice agents, workflow automation, and patient engagement for independent and regional pharmacies. Answer every call, chase every prior auth, and prove what you recovered.",
  alternates: { canonical: "/industries/pharmacy" },
  keywords: [
    "pharmacy automation",
    "AI voice agent for pharmacy",
    "patient engagement platform",
    "pharmacy workflow automation",
    "prior authorization automation",
  ],
};

const FAQS: FaqItem[] = [
  {
    q: "Is pharmacy automation HIPAA compliant?",
    a: "Yes. We architect HIPAA-aware from the first diagram: PHI minimization, access controls, audited data paths, and BAAs wherever a vendor touches PHI. We'll walk your compliance lead through the architecture.",
  },
  {
    q: "Will it integrate with our pharmacy management system?",
    a: "We integrate with the system you already run rather than forcing a rip-and-replace. Verification and refill queuing happen against your existing data.",
  },
  {
    q: "How quickly can a voice agent go live?",
    a: "Typically 2–4 weeks, depending on the integrations involved. Workflow automation phases in so you see value before the whole thing ships.",
  },
  {
    q: "What happens to calls the AI can't handle?",
    a: "The agent triages and transfers to a pharmacist with full context. It handles the repetitive volume so your staff handle the judgment calls.",
  },
];

export default function PharmacyPage() {
  const healthcare = servicesByPillar("healthcare");

  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />

      <PageHero
        eyebrow="HEALTHCARE & PHARMACY"
        eyebrowAccent="ice"
        title="AI automation built for the pharmacy phone line."
        sub="Independent and regional pharmacies lose scripts to busy signals and full voicemail boxes every day. SSVP answers every call, chases every prior auth, and proves what it recovered."
      />

      <SplitNarrative />

      {/* the healthcare services */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow accent="ice">THE STACK</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              Three systems, one pharmacy that runs itself.
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {healthcare.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* pulse proof block */}
      <section className="border-t border-line bg-surface/20 py-20 md:py-24">
        <div className="container-wide">
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow accent="pulse">PROOF LEDGER</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              Every refill captured shows up here.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <PulseTicker
              range="all"
              keys={["callsAnswered", "hoursSaved", "messagesDelivered", "revenueRecovered"]}
            />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 md:py-24">
        <div className="container-page max-w-3xl">
          <Eyebrow>QUESTIONS</Eyebrow>
          <h2 className="mb-8 mt-4 text-[length:var(--text-h2)] text-balance">
            What pharmacy owners ask first.
          </h2>
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTABand
        title="Your competitors are answering every call."
        cta="Book a build call"
      />
    </>
  );
}
