/**
 * Seed case studies. Typed local data — Sanity-ready. Every metric here is
 * real and matches the claims made elsewhere on the site.
 */

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  service: string;
  serviceSlug: string;
  summary: string;
  heroMetrics: CaseMetric[];
  /** narrative blocks */
  problem: string;
  approach: string[];
  result: string;
  pullMetric: CaseMetric;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "email-reputation-recovery",
    title: "Sender reputation, recovered from the spam folder",
    client: "B2B outbound team",
    service: "Email Automation",
    serviceSlug: "email-automation",
    summary:
      "A cold outreach program landing in spam at 78% reputation, rebuilt from authentication up to 90% reputation and a 28% reply rate.",
    heroMetrics: [
      { value: "78% → 90%", label: "sender reputation" },
      { value: "28%", label: "reply rate" },
    ],
    problem:
      "The team had volume but no inbox. Sender reputation had cratered to 78%, authentication was misconfigured, and sequences were landing in spam — where no reply is even possible. Every send was quietly burning the domain instead of building pipeline.",
    approach: [
      "Rebuilt authentication from the ground up: SPF, DKIM, and DMARC configured correctly and monitored.",
      "Ran a disciplined warm-up to rebuild reputation without tripping spam filters.",
      "Replaced merge-tag 'personalization' with per-recipient relevance that reads like a human wrote it.",
      "Wired deliverability, opens, and reply rate into Pulse so the team could see inbox placement in real time.",
    ],
    result:
      "Sender reputation recovered from 78% to 90%, and reply rate climbed to 28%. The inbox stopped being a wall, and outreach became a predictable source of pipeline the team could finally trust.",
    pullMetric: { value: "28%", label: "reply rate, verified on Pulse" },
  },
  {
    slug: "pharmacy-voice-agent",
    title: "A pharmacy phone line that never rings out",
    client: "Independent pharmacy",
    service: "AI Voice Agents",
    serviceSlug: "ai-voice-agents",
    summary:
      "An AI voice agent that answers in two rings during the lunch rush — verifying patients, queuing refills, and logging every interaction to Pulse.",
    heroMetrics: [
      { value: "2 rings", label: "to answer" },
      { value: "24/7", label: "coverage" },
    ],
    problem:
      "At the lunch rush the phone rang out, the voicemail box filled, and refills walked across the street to a chain. The missed calls never showed up in any report — the revenue just disappeared, unlogged.",
    approach: [
      "Deployed a voice agent that answers inbound in two rings, around the clock.",
      "Verified each caller and prescription against the pharmacy system inside a HIPAA-aware architecture.",
      "Queued refills, scheduled pickups, and transferred complex calls to a pharmacist with full context.",
      "Logged every interaction — outcome, value, and time saved — to Pulse.",
    ],
    result:
      "Calls that used to ring out are now answered, verified, and queued without staff lifting the phone. Each interaction lands on the ledger as a receipt — proof of a refill that would otherwise have been lost.",
    pullMetric: { value: "0", label: "calls left ringing" },
  },
  {
    slug: "ats-outreach-engine",
    title: "An outreach engine wired into applicant data",
    client: "Staffing & recruiting",
    service: "AI Cold Calling",
    serviceSlug: "ai-cold-calling",
    summary:
      "Outbound wired directly into applicant and contact data, with every call objection-tagged so the script improves against real signal.",
    heroMetrics: [
      { value: "100%", label: "of calls tagged" },
      { value: "ATS", label: "integrated" },
    ],
    problem:
      "Outreach ran blind. Reps dialed from stale lists, notes never made it into the system, and no one could say which objections were actually killing conversion. The data that would fix the script evaporated after every call.",
    approach: [
      "Integrated outbound directly with the applicant tracking system so reps always dialed live, relevant contacts.",
      "Added caller-ID hygiene and branded calling to keep connect rates up.",
      "Transcribed and objection-tagged every call automatically.",
      "Streamed connect rate, talk time, and objection mix to Pulse.",
    ],
    result:
      "Every call now improves the next one. With objections tagged and connect rates monitored, the team rewrites scripts against real data instead of guesswork — and the pipeline reflects it.",
    pullMetric: { value: "100%", label: "of calls tagged & logged" },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
