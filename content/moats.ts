/** The moat — four, each compounding (Part B5). Rendered as stacked strata. */

export interface Moat {
  n: string; // "01"
  name: string;
  body: string;
  mechanism: string; // the compounding mechanism annotation
}

export const MOATS: Moat[] = [
  {
    n: "01",
    name: "The write-access map",
    body: "A verified, versioned UIA element map of every PrimeRx screen — the toll bridge every module drives across.",
    mechanism: "Every screen mapped is a screen no dashboard can write to.",
  },
  {
    n: "02",
    name: "The payer-rules flywheel",
    body: "payer_rule + audit_outcome. Every audit handled makes the next defense stronger — the asset human incumbents took decades to build, accruing at software speed.",
    mechanism: "Every audit handled enriches the rules base.",
  },
  {
    n: "03",
    name: "The NDC-level ledger",
    body: "Purchased-vs-dispensed truth can't be backfilled. The advantage starts the day SSVP installs and grows with tenure.",
    mechanism: "Every month in production is a month a competitor can't reconstruct.",
  },
  {
    n: "04",
    name: "Trust at the edge",
    body: "Edge-only PHI, pharmacist-verified actions, controlled substances excluded, an append-only log. The difference between \"AI experiment\" and \"something I'll let touch my claims.\"",
    mechanism: "Every action attributable — trust compounds like the data does.",
  },
];

/** The territory map — dashboards vs hands (Part F4, Part J). */
export interface Territory {
  zone: string;
  who: string;
  cant: string;
  empty?: boolean; // audit-defense territory renders empty
}

export const TERRITORIES: Territory[] = [
  {
    zone: "Throughput zone",
    who: "TJM Labs · Asepha · Sonet",
    cant: "Fight on the front of house. Read-only, integration-dependent, advice — not the work.",
  },
  {
    zone: "Reconciliation & reporting",
    who: "Net-Rx / Outcomes",
    cant: "Report on claims after the fact. No write-access to fix what they surface.",
  },
  {
    zone: "Inventory analytics",
    who: "Datarithm",
    cant: "Analyze inventory from a dashboard. No perpetual NDC ledger tied to dispenses.",
  },
  {
    zone: "Audit defense",
    who: "No AI player exists here.",
    cant: "The territory the funded market left empty — and the one SSVP is built to take.",
    empty: true,
  },
];

/** Dashboards vs hands (Home CH7). */
export const DASHBOARDS_VS_HANDS = {
  competitor: {
    title: "Every funded competitor",
    lines: ["Dashboards that recommend.", "Read-only.", "Integration-dependent.", "Advice."],
  },
  ssvp: {
    title: "SSVP",
    lines: ["An agent that executes.", "Write-access.", "Pharmacist sign-off.", "Not a to-do list. The work, done."],
  },
} as const;
