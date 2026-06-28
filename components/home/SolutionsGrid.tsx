import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Solution = {
  icon: ReactNode;
  name: string;
  outcome: string;
  metric: string;
  href: string;
};

const I = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5">
    <path d={d} />
  </svg>
);

const SOLUTIONS: Solution[] = [
  {
    icon: I("M15.5 14.5 19 18a2 2 0 0 1-2 3 16 16 0 0 1-14-14 2 2 0 0 1 3-2l3.5 3.5-1.8 2.3a12 12 0 0 0 4.3 4.3z"),
    name: "AI Voice Agents",
    outcome: "Phones that never ring out — answered, verified, and queued in two rings.",
    metric: "2 rings · 24/7",
    href: "/services/ai-voice-agents",
  },
  {
    icon: I("M4 7h16M4 12h16M4 17h10 M7 4v3 M12 9v3 M17 14v3"),
    name: "Workflow Automation",
    outcome: "Refills, prior-auths, faxes, and document pipelines — handled before staff touch them.",
    metric: "HIPAA-aware",
    href: "/services/pharmacy-workflow-automation",
  },
  {
    icon: I("M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"),
    name: "Patient Engagement",
    outcome: "Reminders, two-way texting, reviews, and forms — AI-native, in one ledger.",
    metric: "2-way at scale",
    href: "/services/patient-engagement-platform",
  },
  {
    icon: I("M22 12h-4l-3 9L9 3l-3 9H2"),
    name: "AI Cold Calling",
    outcome: "Outbound that dials, listens, and tags every objection against real data.",
    metric: "branded caller ID",
    href: "/services/ai-cold-calling",
  },
  {
    icon: I("M4 4h16v16H4z M4 9h16 M9 20V9"),
    name: "Email Automation",
    outcome: "Deliverability engineering and personalization at scale — inboxes you can reach.",
    metric: "78% → 90%",
    href: "/services/email-automation",
  },
  {
    icon: I("M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0 M3 12h18 M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"),
    name: "Web & CRM Platforms",
    outcome: "Conversion-engineered sites and a lean CRM, wired to Pulse from launch.",
    metric: "Lighthouse 95+",
    href: "/services/website-development",
  },
];

function Card({ s }: { s: Solution }) {
  return (
    <Reveal as="article">
      <Link
        href={s.href}
        className="panel group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pulse/40 hover:shadow-[0_26px_60px_-28px_color-mix(in_srgb,var(--color-pulse)_55%,transparent)]"
      >
        <span className="grid size-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] text-white shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--brand-2)_70%,transparent)]">
          {s.icon}
        </span>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.name}</h3>
        <p className="mt-2.5 text-[0.95rem] text-muted text-pretty">{s.outcome}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-pulse">
            {s.metric}
          </span>
          <span aria-hidden className="font-mono text-sm text-pulse transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function SolutionsGrid() {
  return (
    <section id="solutions" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <Eyebrow>What we build</Eyebrow>
          <h2 className="max-w-3xl text-[length:var(--text-h2)] text-balance">
            One team for the whole automation stack
          </h2>
          <p className="max-w-2xl text-lg text-muted text-pretty">
            Each system is built for how your operation actually runs — integrated into the tools
            you already have, and accountable to a number you can open.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Card key={s.name} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
