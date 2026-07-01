"use client";

import { useId, useState } from "react";
import type { Risk } from "@/content/security";
import { cn } from "@/lib/utils";

/**
 * The risk register, as an accordion table. Each row is a risk (the trigger)
 * with its mitigation underneath. The mitigation is ALWAYS in the DOM — it is
 * only visually collapsed via a pure-CSS grid-rows transition — so the full
 * register is readable without JS and legible to crawlers. Keyboard-operable
 * via the native <button>; the panel is a labelled region.
 */
function RiskRow({
  row,
  n,
  defaultOpen = false,
}: {
  row: Risk;
  n: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const btnId = `risk-trigger-${uid}`;
  const panelId = `risk-panel-${uid}`;

  return (
    <div className={cn("transition-colors duration-300", open && "bg-emerald-deep/40")}>
      <h3 className="m-0">
        <button
          id={btnId}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 px-5 py-6 text-left md:gap-6 md:px-8"
        >
          <span className="mt-1 shrink-0 font-mono text-xs tabular text-mint-dim">
            {n}
          </span>
          <span className="flex-1 font-display text-lg leading-snug text-text md:text-xl">
            {row.risk}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-hairline text-muted transition-transform duration-300",
              open && "rotate-45 border-mint/40 text-mint",
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex gap-4 px-5 pb-7 md:gap-6 md:px-8">
            {/* spacer that mirrors the index column so the mitigation aligns under the risk */}
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 select-none font-mono text-xs tabular text-transparent"
            >
              {n}
            </span>
            <div className="flex-1">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
                Mitigation
              </span>
              <p className="mt-2 max-w-2xl text-muted text-pretty md:text-[1.0625rem]">
                {row.mitigation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RiskAccordion({ rows }: { rows: Risk[] }) {
  return (
    <div className="divide-y divide-hairline overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-emerald-deep/20">
      {rows.map((row, i) => (
        <RiskRow
          key={row.risk}
          row={row}
          n={String(i + 1).padStart(2, "0")}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
