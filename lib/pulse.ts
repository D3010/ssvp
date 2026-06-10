/**
 * SSVP Pulse — the data layer.
 *
 * The public ticker runs on seeded, deterministic data today and a documented
 * API tomorrow. Components consume `usePulseFeed()` / the `PulseMetric` contract
 * and never change when real telemetry replaces the seed. The same contract is
 * served by GET /api/pulse.
 *
 * Determinism matters: the seeded generator produces identical output on the
 * server and the client, so the initial render never causes a hydration
 * mismatch. "Live" growth happens only after mount, on a client interval.
 */

export type PulseSystem = "voice-agent" | "email" | "workflow" | "outreach";
export type PulseKind = "call" | "reply" | "delivery" | "refill" | "hours-saved";

export interface PulseMetric {
  id: string;
  /** ISO-ish timestamp; for the seed this is a clock time today */
  ts: string;
  system: PulseSystem;
  event: string;
  valueUsd?: number;
  durationMin?: number;
  kind: PulseKind;
}

export interface PulseAggregate {
  callsAnswered: number;
  hoursSaved: number;
  messagesDelivered: number;
  revenueRecovered: number;
}

export type PulseRange = "week" | "all";

/** Anonymized aggregate across all SSVP systems (seeded baseline for launch). */
export const BASE_AGGREGATE: Record<PulseRange, PulseAggregate> = {
  week: {
    callsAnswered: 1842,
    hoursSaved: 461,
    messagesDelivered: 12880,
    revenueRecovered: 18650,
  },
  all: {
    callsAnswered: 14208,
    hoursSaved: 3517,
    messagesDelivered: 92640,
    revenueRecovered: 128400,
  },
};

/** Realistic ledger event templates, keyed by system. */
const EVENT_BANK: Record<PulseSystem, { event: string; kind: PulseKind; usd?: [number, number]; dur?: [number, number] }[]> = {
  "voice-agent": [
    { event: "Refill confirmed", kind: "refill", usd: [32, 86], dur: [2, 4] },
    { event: "Call answered", kind: "call", dur: [1, 5] },
    { event: "Appointment scheduled", kind: "call", dur: [2, 4] },
    { event: "Transferred to pharmacist", kind: "call", dur: [1, 3] },
  ],
  email: [
    { event: "Reply received", kind: "reply" },
    { event: "Message delivered", kind: "delivery" },
    { event: "Sequence completed", kind: "delivery" },
  ],
  workflow: [
    { event: "Prior-auth resolved", kind: "hours-saved", dur: [12, 40] },
    { event: "Fax parsed & routed", kind: "hours-saved", dur: [3, 9] },
    { event: "Inventory alert cleared", kind: "hours-saved", dur: [4, 11] },
  ],
  outreach: [
    { event: "Objection tagged", kind: "reply", dur: [1, 3] },
    { event: "Meeting booked", kind: "reply", usd: [120, 480], dur: [3, 6] },
    { event: "Connect → live rep", kind: "call", dur: [1, 4] },
  ],
};

const SYSTEMS: PulseSystem[] = ["voice-agent", "email", "workflow", "outreach"];

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

/**
 * Generate a deterministic ledger. The most recent row is "now" (relative to a
 * fixed clock so SSR === CSR); rows step back ~1–4 minutes each.
 */
export function generateLedger(count: number, seed = 42): PulseMetric[] {
  const rand = mulberry32(seed);
  const rows: PulseMetric[] = [];
  // fixed seed clock: 14:08 — deterministic, no Date.now() in render path
  let minutes = 14 * 60 + 8;

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
      valueUsd: tpl.usd
        ? Math.round(tpl.usd[0] + rand() * (tpl.usd[1] - tpl.usd[0]))
        : undefined,
      durationMin: tpl.dur
        ? Math.round(tpl.dur[0] + rand() * (tpl.dur[1] - tpl.dur[0]))
        : undefined,
    });

    minutes -= 1 + Math.floor(rand() * 4);
  }

  return rows;
}

export const SYSTEM_LABEL: Record<PulseSystem, string> = {
  "voice-agent": "voice-agent",
  email: "email",
  workflow: "workflow",
  outreach: "outreach",
};
