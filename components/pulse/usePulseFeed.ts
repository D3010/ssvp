"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  BASE_AGGREGATE,
  generateLedger,
  type PulseAggregate,
  type PulseMetric,
  type PulseRange,
} from "@/lib/pulse";

/**
 * Consumes the seeded Pulse feed. Today it reads the deterministic generator;
 * tomorrow it swaps to `GET /api/pulse` without touching any component.
 *
 * Initial render is the seeded set (SSR === CSR, no hydration mismatch).
 * New rows stream in only after mount, on a client interval — and never when
 * the user prefers reduced motion.
 */
export function usePulseFeed({
  initialRange = "all",
  count = 9,
  stream = true,
}: {
  initialRange?: PulseRange;
  count?: number;
  stream?: boolean;
} = {}) {
  const reduce = useReducedMotion();
  const [range, setRange] = useState<PulseRange>(initialRange);
  const [rows, setRows] = useState<PulseMetric[]>(() => generateLedger(count, 42));
  const seedRef = useRef(1000);

  const aggregate: PulseAggregate = BASE_AGGREGATE[range];

  useEffect(() => {
    if (!stream || reduce) return;
    const id = setInterval(() => {
      seedRef.current += 1;
      const [fresh] = generateLedger(1, seedRef.current);
      // stamp the new row at the current clock for a live feel
      const now = new Date();
      const ts = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      setRows((prev) => [{ ...fresh, id: `live-${seedRef.current}`, ts }, ...prev].slice(0, 24));
    }, 3600);
    return () => clearInterval(id);
  }, [stream, reduce]);

  return { rows, aggregate, range, setRange };
}
