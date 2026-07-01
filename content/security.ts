/** /security — the compliance lead's page (Part F6, Part J). Verbatim. */

export interface Commitment {
  title: string;
  body: string;
  human?: boolean; // the pharmacist-gate pillar carries the one gold element
}

export const COMMITMENTS: Commitment[] = [
  {
    title: "The pharmacist gate",
    body: "A licensed pharmacist is a hard gate on every action on the fill path. The agent perceives, reasons, and stages; the human signs. Nothing moves without them.",
    human: true,
  },
  {
    title: "Edge-only PHI",
    body: "Every model runs on the pharmacy's own hardware. Prescription images, cards, IDs, and claims never leave the building for a third-party AI cloud. HIPAA posture is architectural, not a policy paragraph.",
  },
  {
    title: "Controlled substances excluded",
    body: "Controlled substances are excluded from every automated workflow — no auto-typing, no automated perpetual count, no automated ordering. 222/CSOS stays manual. A design decision, not a limitation to relax later.",
  },
  {
    title: "Verified writes, honest reads",
    body: "Every write is read back and compared before it counts. Every action lands in an append-only log — the same trail that becomes the audit-defense evidence.",
  },
];

/** Operating authority (verbatim, Part J). */
export const OPERATING_AUTHORITY =
  "SSVP runs under the pharmacy's own PrimeRx license and user account, performing actions the pharmacy's own staff are entitled to perform, at the pharmacy's direction. Staff are trained on it; the owner and pharmacist-in-charge control it; the append-only log makes every action attributable after the fact. Headless — not hidden from the people accountable.";

/** Risk register (5 rows, condensed-verbatim, Part J). */
export interface Risk {
  risk: string;
  mitigation: string;
}

export const RISK_REGISTER: Risk[] = [
  {
    risk: "PrimeRx update changes screens",
    mitigation:
      "Versioned UIA maps per build, canary checks, auto-halt to manual — the pharmacy is never worse off than before install.",
  },
  {
    risk: "Model misreads a document",
    mitigation:
      "Confidence scoring, mandatory human verification on the fill path, field-level provenance.",
  },
  {
    risk: "Payer rules drift",
    mitigation:
      "Versioned + dated KB, audit_outcome flags rules that stopped winning, re-verification before production changes.",
  },
  {
    risk: "Regulatory scrutiny",
    mitigation:
      "Pharmacist sign-off, controlled-substance exclusion, edge-only PHI, a complete action trail — built to be shown to a board of pharmacy, not hidden from one.",
  },
  {
    risk: "Wrong / double order",
    mitigation:
      "Net-against-in-transit, pack-size rounding, per-line reason codes, owner approval before transmission.",
  },
];

/** The platform stack (Part F3). */
export const STACK: { layer: string; tech: string }[] = [
  { layer: "OCR", tech: "PaddleOCR · Surya" },
  { layer: "Vision-language", tech: "Qwen2.5-VL · MiniCPM-V · InternVL2" },
  { layer: "Language reasoning", tech: "Ollama · llama.cpp (quantized, local)" },
  { layer: "UI automation", tech: "FlaUI" },
  { layer: "Overlay shell", tech: "Electron · .NET Windows-native" },
  { layer: "Data spine", tech: "PostgreSQL · pgvector" },
];

/** The three-table data spine (Part B3). */
export const DATA_SPINE: { name: string; body: string }[] = [
  {
    name: "payer_rule",
    body: "Each PBM's manual, documentation standards, and appeal procedures — the moat, versioned and dated.",
  },
  {
    name: "audit_outcome",
    body: "The feedback loop: what actually wins. Flags rules that stopped winning before they cost a defense.",
  },
  {
    name: "action_log",
    body: "Append-only. Every action attributable — and it doubles as the audit-defense evidence trail.",
  },
];
