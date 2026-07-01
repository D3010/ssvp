"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { DISCREPANCIES } from "@/content/discrepancies";
import { Glyph } from "@/components/ui/Glyph";
import { cn } from "@/lib/utils";

/**
 * DiscrepancyMapper (Module 03 core) — the discrepancy-code → defense-document
 * mapping IS the product, so it gets a real instrument.
 *
 * Left rail: the nine audit findings as a vertical tablist. Selecting one (click,
 * arrow keys, or PLAY ALL) reveals what the PBM alleges and the exact document the
 * agent assembles to answer it — the active row lights mint, the rest dim.
 *
 * Accessible: WAI-ARIA tabs with automatic activation, roving tabindex, Home/End,
 * an aria-pressed play toggle, and a polite live region for the autoplay walk.
 * Fully server-rendered readable — finding 01's mapping is in the initial HTML.
 */

const STEP_MS = 2600;
const pad = (n: number) => String(n).padStart(2, "0");

export function DiscrepancyMapper() {
  const count = DISCREPANCIES.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing, count]);

  const select = useCallback((i: number, focus = false) => {
    setPlaying(false);
    setActive(i);
    if (focus) tabsRef.current[i]?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = (active + 1) % count;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = (active - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    select(next, true);
  };

  const item = DISCREPANCIES[active];

  return (
    <div className="panel overflow-hidden">
      {/* instrument header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Glyph name="shield" className="!size-4" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
            Discrepancy Mapper
          </span>
          <span aria-hidden="true" className="tabular font-mono text-[0.625rem] text-muted">
            {pad(active + 1)} / {pad(count)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-pressed={playing}
          aria-label={playing ? "Pause the walk-through" : "Play all nine findings"}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors",
            playing
              ? "border-mint/50 bg-mint/10 text-mint"
              : "border-hairline text-muted hover:border-mint/40 hover:text-mint",
          )}
        >
          <span aria-hidden="true" className="text-[0.5rem] leading-none">
            {playing ? "❚❚" : "▶"}
          </span>
          {playing ? "Pause" : "Play all"}
        </button>
      </div>

      <div className="grid gap-px bg-hairline lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* left — the nine findings */}
        <div
          role="tablist"
          aria-label="PBM audit discrepancy findings"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex flex-col bg-emerald-deep/40"
        >
          {DISCREPANCIES.map((d, i) => {
            const selected = i === active;
            return (
              <button
                key={d.n}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`disc-tab-${d.n}`}
                aria-selected={selected}
                aria-controls="disc-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  "group flex items-center gap-3 border-l-2 px-4 py-3 text-left transition-all outline-none",
                  selected
                    ? "border-mint bg-mint/[0.06]"
                    : "border-transparent hover:bg-emerald/40",
                )}
              >
                <span
                  className={cn(
                    "tabular font-mono text-[0.625rem]",
                    selected ? "text-mint" : "text-mint-dim",
                  )}
                >
                  {pad(d.n)}
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    selected ? "text-text" : "text-muted group-hover:text-text",
                  )}
                >
                  {d.finding}
                </span>
              </button>
            );
          })}
        </div>

        {/* right — the mapping for the active finding */}
        <div
          role="tabpanel"
          id="disc-panel"
          aria-labelledby={`disc-tab-${item.n}`}
          tabIndex={0}
          className="flex flex-col bg-emerald-deep/60 p-5 outline-none sm:p-6"
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
                Finding {pad(item.n)}
              </span>
              <p className="mt-1 font-display text-xl text-text md:text-2xl">{item.finding}</p>
            </div>

            {/* what the PBM alleges */}
            <div className="rounded-lg border border-risk/25 bg-risk/[0.06] p-4">
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-risk">
                PBM alleges
              </span>
              <p className="mt-1.5 text-sm text-text/90 text-pretty">{item.alleges}</p>
            </div>

            {/* connective highlight */}
            <div aria-hidden="true" className="flex items-center gap-2.5 pl-2">
              <svg width="16" height="30" viewBox="0 0 16 30" fill="none" className="text-mint">
                <line
                  x1="8"
                  y1="0"
                  x2="8"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                />
                <path
                  d="M3 17l5 6 5-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
                SSVP assembles
              </span>
            </div>

            {/* the document the agent produces */}
            <div className="rounded-lg border border-mint/25 bg-mint/[0.06] p-4">
              <div className="flex items-center gap-2">
                <Glyph name="ledger" className="!size-4" />
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint">
                  Agent produces
                </span>
              </div>
              <p className="mt-1.5 text-sm text-text text-pretty">{item.document}</p>
            </div>
          </motion.div>

          <p className="mt-6 border-t border-hairline pt-4 text-xs text-muted text-pretty">
            Every code maps to the exact documents that answer it — pulled from PrimeRx,
            reconciled to invoices by NDC, and assembled into a per-claim package. In plain
            terms: when the auditor points at a claim, the paperwork that clears it is already built.
          </p>
        </div>
      </div>

      {/* screen-reader narration for the autoplay walk */}
      <p className="sr-only" aria-live="polite">
        Finding {active + 1} of {count}: {item.finding}. The PBM alleges {item.alleges}. The agent
        produces {item.document}.
      </p>
    </div>
  );
}
