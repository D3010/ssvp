/**
 * The service catalog. Typed local data — structured so a CMS (Sanity) can
 * drop in later without touching components. Eight services, three pillars,
 * plus Pulse (handled separately on /pulse).
 */

export type PillarId = "revenue" | "healthcare" | "platforms";

export interface Pillar {
  id: PillarId;
  label: string;
  blurb: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface DiagramNode {
  label: string;
  detail: string;
}

export interface Service {
  slug: string;
  pillar: PillarId;
  name: string;
  /** one-line outcome used on the homepage card */
  outcome: string;
  /** tiny proof chip on the card */
  microMetric: string;
  /** service-page hero */
  heroHeadline: string;
  heroSub: string;
  /** the single big mono metric in the hero */
  heroMetric: { value: string; label: string };
  /** two short paragraphs, buyer's language */
  problem: [string, string];
  /** "what we build" diagram */
  build: DiagramNode[];
  /** how it shows up in Pulse */
  pulseWidget: string;
  miniCase: { metric: string; story: string; href: string };
  faqs: FaqItem[];
  /** related service slug for interlinking */
  related: string;
}

export const PILLARS: Pillar[] = [
  {
    id: "revenue",
    label: "Revenue Systems",
    blurb: "Growth infrastructure that dials, sends, and books — measured on Pulse.",
  },
  {
    id: "healthcare",
    label: "Healthcare & Pharmacy",
    blurb: "HIPAA-aware automation built for the realities of the pharmacy phone line.",
  },
  {
    id: "platforms",
    label: "Platforms & Infrastructure",
    blurb: "The sites and systems everything else runs on — built or integrated.",
  },
];

export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- Revenue
  {
    slug: "end-to-end-marketing",
    pillar: "revenue",
    name: "End-to-End Marketing",
    outcome: "Full-funnel growth, run by the people who build the funnel.",
    microMetric: "1 team, whole funnel",
    heroHeadline: "Full-funnel growth, run by the people who build the funnel.",
    heroSub:
      "Positioning, content, paid, SEO/AEO, and analytics — executed AI-native and measured on Pulse, not on a slide deck.",
    heroMetric: { value: "1", label: "team, whole funnel" },
    problem: [
      "Most marketing engagements split your funnel across four vendors who don't talk to each other. The strategist doesn't build, the builder doesn't measure, and the report arrives a month late with numbers no one can audit.",
      "You end up paying for activity — posts published, emails sent, ads boosted — with no straight line to revenue. When growth stalls, no one can tell you which part of the machine broke.",
    ],
    build: [
      { label: "Positioning", detail: "Message, ICP, and offer architecture you can defend." },
      { label: "Content engine", detail: "SEO/AEO-targeted content produced AI-native, edited by a human." },
      { label: "Paid + outbound", detail: "Channels wired to the same attribution model." },
      { label: "Analytics → Pulse", detail: "Every channel reports into one ledger you can open." },
    ],
    pulseWidget:
      "A funnel view: spend in, qualified pipeline out, cost per booked call — updated as campaigns run, not at month-end.",
    miniCase: {
      metric: "28% reply rate",
      story:
        "We rebuilt a client's outbound from deliverability up and tied every channel to one attribution model. Replies hit 28% and the team finally knew which dollar did the work.",
      href: "/work/email-reputation-recovery",
    },
    faqs: [
      { q: "Do you replace our whole marketing team?", a: "No. We run the system end-to-end or plug into the team you have — usually owning execution and measurement while your team owns brand and relationships." },
      { q: "How fast do we see results?", a: "Deliverability and outbound move in weeks. SEO/AEO compounds over months — we show leading indicators on Pulse so you're not flying blind while it builds." },
      { q: "What's the pricing model?", a: "Part fixed retainer, part outcome-aligned. A portion is tied to qualified pipeline that Pulse verifies." },
      { q: "Will it work with our existing tools?", a: "Yes — we build on your CRM, analytics, and ad accounts. Integration first; replacement only when it saves you money." },
    ],
    related: "email-automation",
  },
  {
    slug: "ai-cold-calling",
    pillar: "revenue",
    name: "AI Cold Calling",
    outcome: "Outbound that dials, listens, and tags every objection.",
    microMetric: "branded caller ID",
    heroHeadline: "Outbound that dials, listens, and tags every objection.",
    heroSub:
      "Voice infrastructure with caller-ID hygiene, branded calling, AI dialing, and analytics that tag why every call ended the way it did.",
    heroMetric: { value: "100%", label: "of calls tagged" },
    problem: [
      "Cold calling fails quietly. Your number gets flagged as spam, half your dials show up as 'Scam Likely,' and no one can tell you which objections are actually killing deals — because no one logs them.",
      "Reps burn hours on manual dialing and call notes that never make it into the CRM. The data that would tell you how to fix the script evaporates after every call.",
    ],
    build: [
      { label: "Caller-ID hygiene", detail: "Branded calling and number reputation monitoring so you connect." },
      { label: "AI dialing", detail: "Concurrent dialing that hands a live human (or agent) the connects." },
      { label: "Objection tagging", detail: "Every call transcribed and tagged by outcome and objection." },
      { label: "Analytics → Pulse", detail: "Connect rate, talk time, and objection mix, live." },
    ],
    pulseWidget:
      "A calling board: dials, connect rate, and the top objections this week — so you can rewrite the script against real data.",
    miniCase: {
      metric: "answers in 2 rings",
      story:
        "Our pharmacy voice agent answers inbound in two rings and logs every interaction. The same telemetry stack powers outbound objection tagging.",
      href: "/work/pharmacy-voice-agent",
    },
    faqs: [
      { q: "Is this compliant?", a: "We build with calling regulations in mind — consent handling, DNC scrubbing, and branded caller ID. We'll align the setup with your compliance posture before a single dial." },
      { q: "Does a human or an AI make the calls?", a: "Either. We build AI dialing that connects live reps, or full AI voice agents — depending on your motion and risk tolerance." },
      { q: "What if our number gets flagged?", a: "We monitor number reputation and rotate/brand proactively. Caller-ID hygiene is the part most vendors skip — it's where we start." },
      { q: "How do we measure it?", a: "Connect rate, talk time, and objection mix stream to Pulse. You see what's working without exporting a CSV." },
    ],
    related: "email-automation",
  },
  {
    slug: "email-automation",
    pillar: "revenue",
    name: "Email Automation",
    outcome: "Inboxes you can actually reach.",
    microMetric: "78%→90% · 28% reply",
    heroHeadline: "Inboxes you can actually reach.",
    heroSub:
      "Deliverability engineering — SPF, DKIM, DMARC, disciplined warm-up, and personalization at scale that reads like a human wrote it.",
    heroMetric: { value: "90%", label: "sender reputation" },
    problem: [
      "You can write the perfect email and still lose, because it never reaches the inbox. Sender reputation craters, authentication is misconfigured, and your sequences land in spam where no reply is even possible.",
      "Then the 'personalization' is a merge tag that everyone recognizes on sight. Volume without deliverability and relevance isn't outreach — it's a slow way to burn your domain.",
    ],
    build: [
      { label: "Authentication", detail: "SPF, DKIM, DMARC configured and monitored — done right." },
      { label: "Warm-up", detail: "Disciplined ramp that rebuilds reputation without tripping filters." },
      { label: "Personalization", detail: "Per-recipient relevance at scale that doesn't read like a mail-merge." },
      { label: "Reply optimization → Pulse", detail: "Deliverability, opens, and reply rate, live." },
    ],
    pulseWidget:
      "A deliverability gauge: inbox placement, sender reputation, and reply rate — the numbers that decide whether outreach works at all.",
    miniCase: {
      metric: "78% → 90%",
      story:
        "A client's outreach was landing in spam at 78% reputation. We rebuilt the stack from authentication up. Reputation recovered to 90% and replies climbed to 28%.",
      href: "/work/email-reputation-recovery",
    },
    faqs: [
      { q: "Can you fix a domain that's already burned?", a: "Usually, yes — through authentication fixes, a disciplined warm-up, and sometimes a fresh sending domain. The 78%→90% recovery is exactly this scenario." },
      { q: "How long does recovery take?", a: "Weeks, not days. Reputation is rebuilt by consistent, well-authenticated sending — there's no overnight shortcut that survives the filters." },
      { q: "Do you write the emails too?", a: "We build the system and the personalization engine. Copy can be yours or ours — either way it's measured on reply rate." },
      { q: "What's the pricing model?", a: "Part fixed, part tied to verified reply-rate improvement that shows up on Pulse." },
    ],
    related: "ai-cold-calling",
  },
  // ------------------------------------------------------------- Healthcare
  {
    slug: "pharmacy-workflow-automation",
    pillar: "healthcare",
    name: "Pharmacy & Healthcare Workflow Automation",
    outcome: "The busywork between the patient and the pharmacist, automated.",
    microMetric: "HIPAA-aware",
    heroHeadline: "The busywork between the patient and the pharmacist, automated.",
    heroSub:
      "Refill workflows, prior-auth chasing, inventory alerts, and document pipelines — on HIPAA-aware architecture, built for how a pharmacy actually runs.",
    heroMetric: { value: "24/7", label: "workflows running" },
    problem: [
      "Your staff spend their day on faxes, prior-auth phone trees, and refill queues — work that's essential, repetitive, and a terrible use of a pharmacist's license. Every manual step is a place a script can fall through.",
      "The software you already pay for doesn't talk to itself, so someone retypes the same patient data three times a day. That's not a clinical problem. It's an automation problem.",
    ],
    build: [
      { label: "Refill workflow", detail: "Intake → verify → queue → notify, without the phone tag." },
      { label: "Prior-auth chasing", detail: "Automated follow-up on stuck authorizations." },
      { label: "Inventory alerts", detail: "Thresholds and reorder nudges before you run dry." },
      { label: "Document pipeline → Pulse", detail: "Faxes and forms parsed and routed; hours saved logged." },
    ],
    pulseWidget:
      "An operations view: refills processed, prior-auths resolved, and staff hours returned this week — in minutes, not impressions.",
    miniCase: {
      metric: "+1 refill / call",
      story:
        "Paired with our voice agent, the workflow captures refills the moment a patient calls — verifying, queuing, and confirming without staff lifting the phone.",
      href: "/work/pharmacy-voice-agent",
    },
    faqs: [
      { q: "Is this HIPAA compliant?", a: "We architect HIPAA-aware from the first diagram: PHI minimization, access controls, audited data paths, and BAAs wherever a vendor touches PHI. We'll walk your compliance lead through it." },
      { q: "Will it work with our pharmacy system?", a: "We integrate with the system you run rather than forcing a rip-and-replace. Integration first, always." },
      { q: "What's the timeline?", a: "Weeks, not quarters. We phase larger workflows so you see value before the whole thing ships." },
      { q: "What if it breaks?", a: "You get founder-direct Slack access and monitored systems. Pulse flags anomalies before your patients notice." },
    ],
    related: "ai-voice-agents",
  },
  {
    slug: "ai-voice-agents",
    pillar: "healthcare",
    name: "AI Voice Agents",
    outcome: "Phones that never ring out.",
    microMetric: "answers in 2 rings",
    heroHeadline: "Phones that never ring out.",
    heroSub:
      "24/7 phone agents that answer refill requests, schedule, triage, and transfer — built for real pharmacy call volume, not a demo.",
    heroMetric: { value: "2", label: "rings to answer" },
    problem: [
      "At the lunch rush your phone rings out, the voicemail box is full, and the refill walks across the street to a chain. You never see the call you missed — and neither does your revenue report.",
      "Hiring your way out of phone volume doesn't scale, and a generic IVR just makes patients angrier. You need something that actually answers, understands, and acts.",
    ],
    build: [
      { label: "Answer", detail: "Picks up in two rings, 24/7, in a natural voice." },
      { label: "Verify", detail: "Confirms patient and prescription against your system." },
      { label: "Act", detail: "Queues refills, schedules, triages, or transfers to a human." },
      { label: "Log → Pulse", detail: "Every call logged with outcome, value, and time saved." },
    ],
    pulseWidget:
      "A call ledger: calls answered, refills captured, and transfers to staff — each row a receipt for a call you'd otherwise have lost.",
    miniCase: {
      metric: "0 missed calls",
      story:
        "During the lunch rush, the agent answers every line, verifies the patient, queues the refill, and texts a confirmation — then logs the whole interaction to Pulse.",
      href: "/work/pharmacy-voice-agent",
    },
    faqs: [
      { q: "Will patients know it's AI?", a: "We design for transparency and a clean handoff to staff for anything sensitive. The goal is a call answered well, not a trick." },
      { q: "Is it HIPAA compliant?", a: "Yes — PHI is minimized, access is controlled, and data paths are audited. Verification happens inside a HIPAA-aware architecture." },
      { q: "What happens for complex calls?", a: "The agent triages and transfers to a human with full context. It handles the repetitive volume so your staff handle the judgment calls." },
      { q: "How fast can it go live?", a: "Typically 2–4 weeks, depending on integrations with your pharmacy system." },
    ],
    related: "pharmacy-workflow-automation",
  },
  {
    slug: "patient-engagement-platform",
    pillar: "healthcare",
    name: "Patient Engagement Platform",
    outcome: "Reach every patient without lifting a phone.",
    microMetric: "2-way at scale",
    heroHeadline: "Reach every patient without lifting a phone.",
    heroSub:
      "Reminders, two-way texting, reviews, digital forms, and campaigns — AI-native, not a messaging tool with AI bolted on the side.",
    heroMetric: { value: "2-way", label: "at scale" },
    problem: [
      "Patients miss pickups, no-show appointments, and never leave the review that would bring you the next ten. Reaching them means someone manually working a list — so it doesn't happen consistently.",
      "The point tools you've tried each do one thing and none of them share data, so a patient gets three disconnected messages and you get three invoices.",
    ],
    build: [
      { label: "Reminders", detail: "Refill, pickup, and appointment nudges that actually land." },
      { label: "Two-way texting", detail: "Conversations at scale, with AI drafting and a human in the loop." },
      { label: "Reviews + forms", detail: "Reputation requests and digital intake without paper." },
      { label: "Campaigns → Pulse", detail: "Delivery, response, and outcomes — all in one ledger." },
    ],
    pulseWidget:
      "An engagement view: messages delivered, responses, and pickups recovered — the difference a nudge actually made.",
    miniCase: {
      metric: "92,640 delivered",
      story:
        "Across SSVP systems, messages are delivered and tracked end-to-end — every send accountable to a response, not just a send count.",
      href: "/pulse",
    },
    faqs: [
      { q: "How is this different from a texting tool?", a: "It's AI-native and unified: reminders, two-way conversations, reviews, and forms share one patient record and one ledger — not four disconnected apps." },
      { q: "Is patient data secure?", a: "Yes — HIPAA-aware architecture with minimized PHI and audited access throughout." },
      { q: "Can we still talk to patients ourselves?", a: "Always. AI drafts and handles volume; your team steps in on anything that needs a human, with full context." },
      { q: "What does it integrate with?", a: "Your pharmacy system, scheduling, and review profiles. We meet your stack where it is." },
    ],
    related: "ai-voice-agents",
  },
  // -------------------------------------------------------------- Platforms
  {
    slug: "website-development",
    pillar: "platforms",
    name: "Website Development",
    outcome: "Conversion-engineered sites. You're looking at the demo.",
    microMetric: "Lighthouse 95+",
    heroHeadline: "Conversion-engineered sites. You're looking at the demo.",
    heroSub:
      "Sites built like instruments — fast, accountable, and wired to Pulse from launch. This one is the portfolio piece.",
    heroMetric: { value: "95+", label: "Lighthouse score" },
    problem: [
      "Most agency sites are slow, untracked, and impossible to change without a ticket. They look fine in the pitch and fall apart on a phone at the LCP that actually decides whether a buyer stays.",
      "And they can't tell you what the site did this week. A marketing site that doesn't report its own conversion is just an expensive brochure.",
    ],
    build: [
      { label: "Engineered front end", detail: "Next.js, sub-1.8s LCP, zero layout shift — performance as a feature." },
      { label: "Conversion structure", detail: "Every section earns its scroll; CTAs wired to your pipeline." },
      { label: "SEO + OG", detail: "Per-page metadata, JSON-LD, generated social images." },
      { label: "Wired to Pulse", detail: "The site reports its own conversion from day one." },
    ],
    pulseWidget:
      "A site view: visits, booked calls, and conversion rate — the site held to the same proof standard as everything else we build.",
    miniCase: {
      metric: "Lighthouse 95+",
      story:
        "This site is the demo: dark, instrument-grade, sub-1.8s LCP, and wired to a live ledger. What you're reading is the deliverable.",
      href: "/pulse",
    },
    faqs: [
      { q: "Can you redesign our existing site?", a: "Yes — redesign or build fresh. We start from your conversion goals and work backward to the structure." },
      { q: "What stack do you build on?", a: "Next.js on Vercel by default — the same stack this site runs on. Fast, maintainable, and easy to extend." },
      { q: "Will we be able to edit it?", a: "We structure content as typed data or a CMS so your team can update copy without a deploy ticket." },
      { q: "How do you prove it works?", a: "The site reports its own conversion to Pulse. You see visits-to-booked-calls, not a vanity traffic chart." },
    ],
    related: "crm-platform",
  },
  {
    slug: "crm-platform",
    pillar: "platforms",
    name: "CRM Platform",
    outcome: "HubSpot-class workflows without HubSpot-class invoices.",
    microMetric: "built or integrated",
    heroHeadline: "HubSpot-class workflows without HubSpot-class invoices.",
    heroSub:
      "Pipeline, contact intelligence, and automation triggers — built fresh or integrated into the CRM you already run.",
    heroMetric: { value: "1", label: "source of truth" },
    problem: [
      "Your customer data lives in five places: a spreadsheet, an inbox, a calendar, a billing tool, and someone's memory. The 'CRM' you pay for is either too expensive to use fully or too rigid to fit how you actually sell.",
      "So automations don't fire, follow-ups slip, and the pipeline number in the Monday meeting is a guess. The system meant to give you leverage is creating drag.",
    ],
    build: [
      { label: "Pipeline", detail: "Stages that match your real motion, not a template's." },
      { label: "Contact intelligence", detail: "Enriched records and a single source of truth." },
      { label: "Automation triggers", detail: "Follow-ups, handoffs, and tasks that fire on their own." },
      { label: "Reporting → Pulse", detail: "Pipeline movement and conversion, live and auditable." },
    ],
    pulseWidget:
      "A pipeline view: deals by stage, conversion between stages, and automations fired — the CRM holding itself accountable.",
    miniCase: {
      metric: "ATS-integrated",
      story:
        "We wired an outreach engine into applicant and contact data, with objection-tagged automation triggering the right follow-up at the right time.",
      href: "/work/ats-outreach-engine",
    },
    faqs: [
      { q: "Build new or integrate with HubSpot/Salesforce?", a: "Either. We integrate where you're already invested, or build a lean CRM when the per-seat invoices outweigh the value." },
      { q: "Will it fit our sales process?", a: "Yes — we model your actual stages and triggers instead of forcing your motion into a template." },
      { q: "Can it talk to our other tools?", a: "That's the point. Email, calling, and the website all feed one record and one ledger." },
      { q: "How is this measured?", a: "Pipeline movement and stage conversion stream to Pulse, so the forecast stops being a guess." },
    ],
    related: "website-development",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: PillarId): Service[] {
  return SERVICES.filter((s) => s.pillar === pillar);
}
