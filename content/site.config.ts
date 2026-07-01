/**
 * SSVP site configuration — the single place Deep edits truth.
 *
 * Every claimable feature carries a `status`; components render the matching
 * StatusChip automatically (Part K, content-integrity law). Change a status
 * here and the whole site's claims update.
 */

export type Status = "live" | "pilot" | "in-build" | "roadmap";

export const STATUS_LABEL: Record<Status, string> = {
  live: "LIVE",
  pilot: "PILOT",
  "in-build": "IN BUILD",
  roadmap: "ROADMAP",
};

export interface CTA {
  label: string;
  href: string;
}

export const CTA = {
  book: { label: "Book a build call", href: "/book" } as CTA,
  pilot: { label: "Apply for the pilot", href: "/pilot" } as CTA,
  pilotGhost: { label: "Pilot program", href: "/pilot" } as CTA,
  roi: { label: "Run the numbers", href: "/roi" } as CTA,
} as const;

/**
 * Permanent labels for simulations / demo data (Part K.4). Rendered as chips
 * on the OverlaySimulator and every Pulse aggregate — beautiful, but present.
 */
export const CHIP = {
  simulation: "SIMULATION — PRODUCT INTENT",
  demoData: "DEMO DATA",
  illustrative: "ILLUSTRATIVE — ARITHMETIC SHOWN",
  expansion: "EXPANSION PATH — SAME ENGINE, NEW UIA MAPS",
} as const;

/** The three words that govern everything (Part B2). */
export const PRINCIPLES = [
  {
    word: "Invisible",
    body: "A transparent overlay on PrimeRx. No new app to learn, no change to muscle memory, no API, no permission from the PMS vendor needed.",
  },
  {
    word: "Verified",
    body: "A licensed pharmacist is a hard gate on every action. The agent perceives, reasons, stages; the human signs. Every write is read back and compared before it counts.",
  },
  {
    word: "Edge-bound",
    body: "Every model runs on the pharmacy's own hardware. Prescription images, cards, IDs, and claims never leave the building for a third-party AI cloud. HIPAA posture is architectural, not a policy paragraph.",
  },
] as const;

/** The hero trust strip (Home CH1). */
export const TRUST_STRIP = [
  "PHARMACIST-VERIFIED",
  "EDGE-ONLY PHI",
  "CONTROLLED SUBSTANCES EXCLUDED",
  "APPEND-ONLY LOG",
] as const;
