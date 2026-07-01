/**
 * SSVP Pulse — the public face of the append-only action_log and the
 * dollars-protected ledger. "Invisible in the workflow. Visible in the log."
 *
 * The ledger runs on seeded, deterministic DEMO data for launch (always shown
 * behind a DEMO DATA chip — Part K.4) and a documented API tomorrow. Components
 * consume `usePulseFeed()` / the `PulseMetric` contract and never change when
 * real telemetry replaces the seed. The same contract is served by GET /api/pulse.
 *
 * Determinism matters: the seeded generator produces identical output on the
 * server and the client, so the initial render never causes a hydration
 * mismatch. "Live" growth happens only after mount, on a client interval.
 */

export type PulseSystem = "auto-typing" | "inventory" | "audit" | "insurance" | "ordering";
export type PulseKind = "typed" | "drift" | "exposure" | "captured" | "order" | "reconciled";

export interface PulseMetric {
  id: string;
  ts: string; // clock time (fixed seed clock so SSR === CSR)
  system: PulseSystem;
  event: string;
  valueUsd?: number; // dollars logged / protected (mint)
  atRiskUsd?: number; // dollars at risk (risk tone)
  durationMin?: number;
  verified?: boolean; // pharmacist-signed → renders a gold check
  kind: PulseKind;
}

export interface PulseAggregate {
  scriptsTyped: number;
  hoursSaved: number;
  dollarsProtected: number;
  driftFlags: number;
}

export type PulseRange = "week" | "all";

/** DEMO aggregate — always rendered behind a DEMO DATA chip; never real customers. */
export const BASE_AGGREGATE: Record<PulseRange, PulseAggregate> = {
  week: { scriptsTyped: 1284, hoursSaved: 42, dollarsProtected: 8420, driftFlags: 6 },
  all: { scriptsTyped: 18640, hoursSaved: 620, dollarsProtected: 124300, driftFlags: 74 },
};

const EVENT_BANK: Record<
  PulseSystem,
  { event: string; kind: PulseKind; usd?: [number, number]; risk?: [number, number]; dur?: [number, number]; verified?: boolean }[]
> = {
  "auto-typing": [
    { event: "Script typed & verified", kind: "typed", dur: [2, 3], verified: true },
    { event: "Sig parsed → structured", kind: "typed", dur: [1, 2] },
    { event: "NDC crosswalk resolved", kind: "typed", dur: [1, 2] },
  ],
  inventory: [
    { event: "Bottle scanned in", kind: "reconciled", dur: [1, 1] },
    { event: "Purchased-vs-dispensed drift flagged", kind: "drift", risk: [120, 620] },
    { event: "Perpetual count reconciled", kind: "reconciled", dur: [1, 2] },
  ],
  audit: [
    { event: "Exposure ranked", kind: "exposure", risk: [220, 1400] },
    { event: "Defense document assembled", kind: "exposure", dur: [3, 8], verified: true },
    { event: "Invoice reconciled by NDC", kind: "exposure", usd: [180, 900] },
  ],
  insurance: [
    { event: "Card + ID captured", kind: "captured", dur: [1, 2] },
    { event: "BIN/PCN validated → PBM routed", kind: "captured", dur: [1, 1] },
    { event: "Old-vs-new diff confirmed", kind: "captured", verified: true },
  ],
  ordering: [
    { event: "PO drafted — owner approval pending", kind: "order", dur: [2, 4] },
    { event: "Insulin flagged for reorder", kind: "order" },
    { event: "PO transmitted · EDI 850", kind: "order", verified: true },
  ],
};

const SYSTEMS: PulseSystem[] = ["auto-typing", "inventory", "audit", "insurance", "ordering"];

/** Mulberry32 — tiny deterministic PRNG. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

/** Generate a deterministic ledger against a fixed clock so SSR === CSR. */
export function generateLedger(count: number, seed = 42): PulseMetric[] {
  const rand = mulberry32(seed);
  const rows: PulseMetric[] = [];
  let minutes = 21 * 60 + 14; // fixed seed clock: 21:14 (after close)

  for (let i = 0; i < count; i++) {
    const system = SYSTEMS[Math.floor(rand() * SYSTEMS.length)];
    const bank = EVENT_BANK[system];
    const tpl = bank[Math.floor(rand() * bank.length)];
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    rows.push({
      id: `pm-${seed}-${i}`,
      ts: `${pad(h)}:${pad(m)}`,
      system,
      event: tpl.event,
      kind: tpl.kind,
      verified: tpl.verified,
      valueUsd: tpl.usd ? Math.round(tpl.usd[0] + rand() * (tpl.usd[1] - tpl.usd[0])) : undefined,
      atRiskUsd: tpl.risk ? Math.round(tpl.risk[0] + rand() * (tpl.risk[1] - tpl.risk[0])) : undefined,
      durationMin: tpl.dur ? Math.round(tpl.dur[0] + rand() * (tpl.dur[1] - tpl.dur[0])) : undefined,
    });

    minutes -= 1 + Math.floor(rand() * 4);
  }

  return rows;
}

export const SYSTEM_LABEL: Record<PulseSystem, string> = {
  "auto-typing": "auto-typing",
  inventory: "inventory",
  audit: "audit-defense",
  insurance: "insurance",
  ordering: "ordering",
};
