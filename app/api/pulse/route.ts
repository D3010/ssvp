import { NextResponse } from "next/server";
import { BASE_AGGREGATE, generateLedger, type PulseRange } from "@/lib/pulse";

/**
 * GET /api/pulse — the documented Pulse contract.
 *
 * Returns the seeded aggregate + recent ledger for launch. When real telemetry
 * comes online, this handler swaps its source; the response shape (and every
 * component that consumes it) stays identical.
 *
 *   GET /api/pulse?range=week|all&limit=20
 *   → { range, aggregate: PulseAggregate, metrics: PulseMetric[], source }
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = (searchParams.get("range") === "week" ? "week" : "all") as PulseRange;
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);

  return NextResponse.json({
    range,
    aggregate: BASE_AGGREGATE[range],
    metrics: generateLedger(limit, 42),
    source: "seed", // → "telemetry" when live
    updatedAt: new Date().toISOString(),
  });
}
