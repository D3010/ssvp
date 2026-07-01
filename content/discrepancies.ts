/**
 * Module 03 DiscrepancyMapper data (verbatim, Part J) — 9 rows.
 * The discrepancy-code → defense-document mapping IS the product.
 */

export interface Discrepancy {
  n: number;
  finding: string; // the discrepancy finding
  alleges: string; // what the PBM alleges
  document: string; // the document the agent produces
}

export const DISCREPANCIES: Discrepancy[] = [
  {
    n: 1,
    finding: "Missing/invalid hardcopy",
    alleges: "No valid original prescription on file",
    document: "Original Rx image, or e-prescription transmission record",
  },
  {
    n: 2,
    finding: "Missing patient signature",
    alleges: "No proof the patient received the drug",
    document: "Signature log, pickup log, or proof-of-delivery",
  },
  {
    n: 3,
    finding: "Invalid DAW code",
    alleges: "Brand billed without justification",
    document: "Prescriber notation supporting DAW; original Rx",
  },
  {
    n: 4,
    finding: "Quantity/days-supply mismatch",
    alleges: "Billed amount differs from prescribed",
    document: "Original Rx showing sig, quantity, days supply",
  },
  {
    n: 5,
    finding: "Refill-too-soon",
    alleges: "Refilled before the allowable date",
    document: "Fill history + clinical or vacation-override note",
  },
  {
    n: 6,
    finding: "Invoice shortage",
    alleges: "Bought less drug than was dispensed",
    document: "Wholesaler invoices reconciled to dispensed units, by NDC",
  },
  {
    n: 7,
    finding: "Missing DUR documentation",
    alleges: "No drug-utilization review performed",
    document: "DUR alert resolution + pharmacist intervention note",
  },
  {
    n: 8,
    finding: "Prescriber not verified",
    alleges: "Prescriber authority unconfirmed",
    document: "Prescriber NPI/DEA verification + callback log",
  },
  {
    n: 9,
    finding: "Origin/transmission error",
    alleges: "Prescription provenance unclear",
    document: "SCRIPT transmission record and origin code",
  },
];

/** The 10 audit-trigger chips (Part J) — "signals PBMs watch," not fear-mongering. */
export const AUDIT_TRIGGERS: string[] = [
  "High-dollar & high-cost-drug claims",
  "Early refills & refill-too-soon patterns",
  "DAW code usage",
  "Compounded prescriptions",
  "Single-prescriber concentration spikes",
  "Brand dispensed where a generic exists",
  "Quantity & days-supply outliers",
  "High volume on a specific NDC",
  "Frequent reversals & rebilling",
  "Copay-collection inconsistencies",
];

/** The honest caveat (Module 03 — render verbatim as a designed pull-quote). */
export const HONEST_CAVEAT =
  "The defensible asset here isn't the vision plumbing; it's the PBM-rules knowledge — each provider manual, each discrepancy-code documentation standard, each appeal procedure, and the state audit protections that override them. That is what the human incumbents spent decades building. Budget for it as a knowledge-engineering effort as much as an AI one — but note that it compounds: every audit handled enriches the rules base, which is precisely what makes the business defensible over time.";
