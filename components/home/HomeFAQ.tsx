import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ } from "@/components/ui/FAQ";
import type { FaqItem } from "@/content/services";

const ITEMS: FaqItem[] = [
  { q: "Will this work with our current systems?", a: "Yes. We integrate into your pharmacy software, CRM, and phone stack rather than forcing a rip-and-replace. Integration first — replacement only when it clearly saves you money." },
  { q: "Is it HIPAA compliant?", a: "We architect HIPAA-aware from the first diagram: PHI minimization, access controls, audited data paths, and BAAs wherever a vendor touches PHI. We'll walk your compliance lead through it." },
  { q: "How long does setup take?", a: "Typically two to four weeks, depending on integrations. We phase larger workflows so you see value before the whole thing ships." },
  { q: "What happens when our software updates?", a: "Systems are monitored and maintained as part of the engagement. Pulse flags anomalies, and we adjust integrations proactively — you don't manage that." },
  { q: "How do you handle errors and exceptions?", a: "Edge cases are designed for, with humans in the loop where judgment is needed. Exceptions are surfaced and routed to your team with full context instead of failing silently." },
  { q: "Do we need IT or engineering on our side?", a: "No. We handle the build, integration, and monitoring. You get founder-direct access for anything you need — no internal engineering required." },
];

export function HomeFAQ() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            Frequently asked
          </h2>
          <p className="mt-5 max-w-sm text-muted text-pretty">
            Still wondering whether it fits your operation? Book a call and we&apos;ll map it to
            your actual workflow on the spot.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
