import type { Status } from "./site.config";

/**
 * The five core modules — one engine, not five tools (Part B4).
 * Chips are verbatim from the Copy Bank (Part J). Status defaults per Part K.3.
 */

export interface ModuleChip {
  label: string; // e.g. INPUT, OUTPUT, GATE, EXCLUDES
  value: string;
}

export interface PipelineStep {
  n: string; // "01"
  title: string;
  body: string;
  glyph: Glyph;
  gold?: boolean; // human-verification step → gold
}

export type Glyph =
  | "eye"
  | "bulb"
  | "bolt"
  | "check"
  | "shield"
  | "ledger"
  | "bottle"
  | "card"
  | "clock"
  | "type"
  | "chart";

export interface ModuleDef {
  id: string; // "01"
  slug: string; // route under /product/<slug>
  name: string;
  glyph: Glyph;
  status: Status;
  promise: string; // one-line promise on the deck card
  chips: ModuleChip[]; // INPUT / OUTPUT / GATE / EXCLUDES
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  today: string[]; // "Today" column
  withSsvp: string[]; // "With SSVP" column
  pipeline: PipelineStep[];
  returns: { value: string; label: string }[]; // "what it returns" chips
  callouts: { title: string; body: string }[];
  flagship?: boolean;
}

export const MODULES: ModuleDef[] = [
  {
    id: "01",
    slug: "auto-typing",
    name: "Auto-Typing Engine",
    glyph: "type",
    status: "in-build",
    promise: "Reads every incoming Rx and types it into PrimeRx — pharmacist verifies, agent keys.",
    chips: [
      { label: "INPUT", value: "e-Script · Fax · Paper scan" },
      { label: "OUTPUT", value: "Typed script in PrimeRx" },
      { label: "GATE", value: "Pharmacist verify" },
      { label: "EXCLUDES", value: "Controlled substances" },
    ],
    heroEyebrow: "MODULE 01 · AUTO-TYPING",
    heroHeadline: "The typing, done.",
    heroSub:
      "Reads every incoming Rx — e-script, fax, physical scan — and types it into PrimeRx: patient, prescriber, drug/NDC, sig, quantity, days supply, refills, DAW. Sig intelligence and NDC crosswalk are first-class. Your pharmacist verifies; the agent keys.",
    today: [
      "A technician reads each script and hand-keys eight-plus fields.",
      "Sig codes get re-interpreted from scratch every time.",
      "NDC selection is a manual lookup, error-prone under volume.",
    ],
    withSsvp: [
      "The agent reads the script once and stages every field.",
      "Sig intelligence structures directions and days supply automatically.",
      "NDC crosswalk proposes the exact package; the pharmacist confirms.",
    ],
    pipeline: [
      { n: "01", title: "Perceive", body: "The incoming Rx is read once — e-script feed, inbound fax, or a physical scan on the counter.", glyph: "eye" },
      { n: "02", title: "Reason", body: "Sig intelligence parses the directions; NDC crosswalk resolves the exact package and quantity.", glyph: "bulb" },
      { n: "03", title: "Act", body: "The agent keys every field into PrimeRx via UI automation — patient, prescriber, drug, sig, qty, days, refills, DAW.", glyph: "bolt" },
      { n: "04", title: "Verify", body: "Each write is read back and compared. The pharmacist signs before the script counts.", glyph: "check", gold: true },
    ],
    returns: [
      { value: "≈2 min", label: "saved per script, typed" },
      { value: "8+ fields", label: "keyed and read back" },
      { value: "0", label: "controlled substances touched" },
    ],
    callouts: [
      { title: "Sig intelligence", body: "\"1 PO BID × 10d\" restructures into structured Directions and Days-supply tokens — not a guess, a parse." },
      { title: "NDC crosswalk", body: "The agent maps the prescribed drug to the exact package and quantity in stock, so the claim bills clean the first time." },
    ],
  },
  {
    id: "02",
    slug: "inventory",
    name: "Inventory Intelligence",
    glyph: "bottle",
    status: "in-build",
    promise: "Scan a bottle in, count goes up; every dispense read via UIA, count goes down.",
    chips: [
      { label: "STOCK IN", value: "Scan bottle → +qty" },
      { label: "STOCK OUT", value: "Dispense → −qty" },
      { label: "GRANULARITY", value: "Per NDC · lot/expiry" },
      { label: "FEEDS", value: "Audit + Ordering" },
    ],
    heroEyebrow: "MODULE 02 · INVENTORY",
    heroHeadline: "Live perpetual inventory, at NDC level.",
    heroSub:
      "Scan a bottle in, the count goes up. Every dispense read via UI automation, the count goes down. Lot and expiry captured, tied to invoices. The moat-grade signal is purchased-vs-dispensed drift — the earliest warning for the invoice-shortage audit finding.",
    today: [
      "On-hand counts are a monthly guess, reconciled by hand.",
      "Drift between what you bought and dispensed is invisible until an audit finds it.",
      "Reorder points drift out of date as volume shifts.",
    ],
    withSsvp: [
      "Perpetual inventory at NDC level, updated on every scan and dispense.",
      "Purchased-vs-dispensed drift surfaces the moment it starts.",
      "Live on-hand feeds audit defense and the end-of-day order.",
    ],
    pipeline: [
      { n: "01", title: "Scan in", body: "A bottle is scanned at receiving; the count goes up, lot and expiry captured, tied to the wholesaler invoice.", glyph: "bottle" },
      { n: "02", title: "Read the dispense", body: "Every dispense event is read from PrimeRx via UIA; the count goes down, per NDC.", glyph: "eye" },
      { n: "03", title: "Watch the drift", body: "Purchased-vs-dispensed is reconciled continuously; a gap opens the instant it appears.", glyph: "chart" },
      { n: "04", title: "Feed the engine", body: "Live on-hand powers audit defense reconciliation and the end-of-day ordering bot.", glyph: "bolt" },
    ],
    returns: [
      { value: "NDC-level", label: "perpetual inventory" },
      { value: "lot + expiry", label: "captured on scan-in" },
      { value: "2 of 5", label: "modules powered by this number" },
    ],
    callouts: [
      { title: "Drift, the moment it starts", body: "Purchased-vs-dispensed truth can't be backfilled. The advantage starts the day SSVP installs and grows with tenure." },
      { title: "One number, two modules", body: "The same NDC-level ledger feeds audit-defense reconciliation and the nightly order. A competitor can't reassemble it from parts." },
    ],
  },
  {
    id: "03",
    slug: "audit-defense",
    name: "PBM Audit Defense",
    glyph: "shield",
    status: "pilot",
    flagship: true,
    promise: "A daily exposure queue ranked by dollars-at-risk, and a reactive assembler that builds the defense package.",
    chips: [
      { label: "MODE", value: "Proactive + Reactive" },
      { label: "INPUT", value: "Audit notice · claim & doc state" },
      { label: "OUTPUT", value: "Exposure queue · defense package" },
      { label: "MOAT", value: "Payer-rule knowledge base" },
    ],
    heroEyebrow: "MODULE 03 · AUDIT DEFENSE",
    heroHeadline: "Survive the audit that could end the business.",
    heroSub:
      "Proactive: a daily exposure queue ranked by dollars-at-risk. Reactive: parse the notice, map each discrepancy code to its required documents, pull them from PrimeRx, reconcile invoices to dispensed units by NDC, and assemble a per-claim package with a cover rebuttal. The discrepancy-code → defense-document mapping is the product.",
    today: [
      "An audit notice lands with a two-week clock and no system to answer it.",
      "Documents are hunted one claim at a time, by hand, under pressure.",
      "Invoice-to-dispensed reconciliation is a spreadsheet nightmare.",
    ],
    withSsvp: [
      "A daily queue ranks exposure by dollars-at-risk before any notice arrives.",
      "The reactive agent maps every discrepancy code to its required documents.",
      "Invoice-to-dispensed reconciles by NDC; the package assembles itself.",
    ],
    pipeline: [
      { n: "01", title: "Rank the exposure", body: "Daily, the proactive agent scores claims by dollars-at-risk — threshold claims, DAW without docs, early refills, NDC drift, missing signatures.", glyph: "chart" },
      { n: "02", title: "Parse the notice", body: "A reactive audit notice is read once; each discrepancy code is mapped to the documents that answer it.", glyph: "eye" },
      { n: "03", title: "Assemble the package", body: "Documents pull from PrimeRx via vision + UIA; invoices reconcile to dispensed units by NDC; a per-claim package and cover rebuttal compose.", glyph: "ledger" },
      { n: "04", title: "Sign and send", body: "Gaps are flagged, the clock is tracked, everything is logged. The pharmacist reviews and signs off.", glyph: "check", gold: true },
    ],
    returns: [
      { value: "$26,144", label: "avg PBM audit recoupment" },
      { value: "< 2 wks", label: "typical window to respond" },
      { value: "$24,314", label: "avg a prepared pharmacy avoids" },
    ],
    callouts: [
      { title: "Two agents, one knowledge base", body: "Proactive ranks tomorrow's exposure; reactive answers today's notice. Both drink from the payer-rule KB — the asset human incumbents took decades to build." },
      { title: "The mapping is the moat", body: "Each provider manual, each discrepancy-code documentation standard, each appeal procedure. Every audit handled enriches the base." },
    ],
  },
  {
    id: "04",
    slug: "insurance-capture",
    name: "Insurance & ID Auto-Capture",
    glyph: "card",
    status: "in-build",
    promise: "Photo of card + ID → validated BIN/PCN/Group/Member ID → staged diff → staff confirm → written to PrimeRx.",
    chips: [
      { label: "INPUT", value: "Photo of card + ID" },
      { label: "OUTPUT", value: "Updated PrimeRx patient record" },
      { label: "WHEN", value: "New patient · plan change · COB" },
      { label: "GATE", value: "Staged diff → staff confirm" },
    ],
    heroEyebrow: "MODULE 04 · INSURANCE & ID CAPTURE",
    heroHeadline: "It learns who you're dealing with.",
    heroSub:
      "A photo of the card and ID → the on-device model reads BIN/PCN/Group/Member ID and name/DOB/address → validates (6-digit BIN, payer lookup, name/DOB match) → stages an old-vs-new diff → staff confirm → writes to PrimeRx via UIA with read-back. Built for January plan-change season.",
    today: [
      "Card and ID are hand-typed at intake, transposition errors and all.",
      "Plan changes get caught at the register — as a rejected claim.",
      "Nobody knows which PBM a patient is on until the claim bounces.",
    ],
    withSsvp: [
      "The model reads the card and ID once and validates every field.",
      "An old-vs-new diff is staged for a one-click staff confirm.",
      "BIN/PCN identifies the PBM and routes payer rules into audit defense.",
    ],
    pipeline: [
      { n: "01", title: "Capture", body: "A photo of the card and ID is taken at intake — no keying.", glyph: "card" },
      { n: "02", title: "Read & validate", body: "The on-device model reads BIN/PCN/Group/Member ID and name/DOB/address, then validates the 6-digit BIN and matches name/DOB.", glyph: "eye" },
      { n: "03", title: "Stage the diff", body: "Old-vs-new is staged so staff see exactly what changed before anything is written.", glyph: "chart" },
      { n: "04", title: "Confirm & write", body: "Staff confirm; the record writes to PrimeRx via UIA with read-back verification.", glyph: "check", gold: true },
    ],
    returns: [
      { value: "6-digit BIN", label: "validated + payer lookup" },
      { value: "old-vs-new", label: "diff staged for confirm" },
      { value: "→ Module 03", label: "BIN/PCN routes payer rules" },
    ],
    callouts: [
      { title: "BIN → PBM routing", body: "The BIN/PCN identifies the PBM, which routes the right payer rules into audit defense. Every capture makes the audit engine smarter." },
      { title: "Built for January", body: "Plan-change season is a wall of new cards. This is the module that turns that wall into a queue of one-click confirms." },
    ],
  },
  {
    id: "05",
    slug: "ordering",
    name: "End-of-Day Ordering Bot",
    glyph: "clock",
    status: "in-build",
    promise: "At close, drafts a PO from the day's scripts and live on-hand — owner approves, EDI transmits.",
    chips: [
      { label: "TRIGGER", value: "End-of-day close" },
      { label: "INPUT", value: "Day's billed scripts + live on-hand" },
      { label: "OUTPUT", value: "Draft PO, owner-approved" },
      { label: "EXCLUDES", value: "Controlled substances" },
    ],
    heroEyebrow: "MODULE 05 · ORDERING",
    heroHeadline: "The nightly order, drafted.",
    heroSub:
      "At close, the bot reads the day's billed scripts and live on-hand, then drafts a PO under three rules: items below par per live count, every insulin dispensed today, and branded drugs one-for-one. It nets against in-transit, rounds to pack sizes, groups by wholesaler, and puts a reason code on every line.",
    today: [
      "The order is built from memory and gut at the end of a long day.",
      "Insulin and fast-movers get missed; overstock ties up cash.",
      "No reason code, no reconciliation against what's already in transit.",
    ],
    withSsvp: [
      "A PO drafts itself from the day's scripts and the live count.",
      "Three rules cover par, insulin, and branded one-for-one replacement.",
      "Every line has a reason code; the owner approves and it transmits.",
    ],
    pipeline: [
      { n: "01", title: "Close the day", body: "At store close, the bot reads the day's billed scripts and the live on-hand count.", glyph: "clock" },
      { n: "02", title: "Apply the rules", body: "Items below par, every insulin dispensed today, and branded drugs one-for-one — classified into three bins.", glyph: "bulb" },
      { n: "03", title: "Compose the PO", body: "Net against in-transit, round to pack sizes, group by wholesaler, put a reason code on every line.", glyph: "ledger" },
      { n: "04", title: "Approve & transmit", body: "The owner approves; the PO transmits via EDI 850 or portal. Tomorrow's scan-in reconciles the receipt.", glyph: "check", gold: true },
    ],
    returns: [
      { value: "3 rules", label: "par · insulin · branded 1:1" },
      { value: "per-line", label: "reason codes" },
      { value: "EDI 850", label: "or portal transmit" },
    ],
    callouts: [
      { title: "Why the rule set is smart", body: "Par protects throughput, insulin protects adherence, branded one-for-one protects margin. The PO is only as good as the count behind it — and the count is live." },
      { title: "The morning loop", body: "Tomorrow's delivery is scanned in and reconciled against the PO, closing the receipt and updating the perpetual count." },
    ],
  },
];

export function getModule(slug: string): ModuleDef | undefined {
  return MODULES.find((m) => m.slug === slug);
}

/** The shared spine — how the five compound (Part B4). */
export const SHARED_SPINE =
  "Typing feeds clean claims; clean claims plus live inventory feed audit defense; the same inventory feeds ordering; insurance capture tells every module which PBM it's dealing with. A competitor cannot reassemble this from parts.";
