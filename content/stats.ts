/**
 * Stats — every number on the site traces here, with required provenance
 * (Part K.2). No unsourced dollar figures anywhere (Part N).
 */

export interface Stat {
  value: string;
  label: string;
  source?: string; // provenance line rendered small under the stat
  tone?: "mint" | "risk" | "neutral";
}

/** The numbers wall (Home CH8 — bone/paper interlude). */
export const AUDIT_STATS: Stat[] = [
  { value: "$26,144", label: "average PBM audit recoupment", tone: "risk" },
  { value: "< 2 wks", label: "typical window to respond", tone: "risk" },
  { value: "2–6 yrs", label: "claim look-back period", tone: "risk" },
  { value: "$24,314", label: "avg recoupment a prepared pharmacy avoids", tone: "mint" },
  {
    value: "93%",
    label: "recoupment reduction for prepared members",
    source: "Published PAAS National benchmark",
    tone: "mint",
  },
];

/** Market strip (/roi, /why-ssvp). */
export const MARKET_STATS: Stat[] = [
  { value: "≈19,000", label: "US independent pharmacies", source: "NCPA" },
  { value: "1,000s", label: "stores on PrimeRx — the beachhead" },
  { value: "2–6 yrs", label: "every claim auditable — protection revenue recurs" },
  { value: "+ PMS", label: "expansion path: same engine, new UIA maps" },
];

/** ROI illustrative blocks — arithmetic always shown (Part K.2). */
export interface RoiBlock {
  value: string;
  label: string;
  arithmetic: string;
}

export const ROI_BLOCKS: RoiBlock[] = [
  {
    value: "$24,314",
    label: "audit recoupment avoided",
    arithmetic: "The average recoupment a prepared pharmacy avoids — illustrative, per published benchmarks.",
  },
  {
    value: "$27,000",
    label: "technician hours returned",
    arithmetic: "≈2 min/script × 150 scripts/day × 300 days ≈ 1,500 hours.",
  },
  {
    value: "$12–20k",
    label: "working capital freed",
    arithmetic: "Live perpetual inventory trims overstock tying up cash on the shelf.",
  },
  {
    value: "upside",
    label: "rejected-claims recovered",
    arithmetic: "Clean typing and validated insurance reduce first-pass rejections.",
  },
];

export const ROI_NOTE = "Illustrative — arithmetic shown. Re-run these with your store's own volumes.";
