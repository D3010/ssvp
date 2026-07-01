"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { CHIP } from "@/content/site.config";
import { cn, formatMetric } from "@/lib/utils";

/**
 * ROICalculator (/roi hero) — the arithmetic, shown.
 *
 * No email gate, no black box. Every output carries the exact math that made
 * it, and the summary sentence composes itself from the live inputs. Numbers
 * are illustrative models (the ILLUSTRATIVE chip is permanent, Part K.4) — the
 * point is that a pharmacy owner can check the multiplication by hand.
 */

// Fixed model constants — visible in the arithmetic lines below.
const MIN_PER_SCRIPT = 2; // minutes of tech time returned per typed script
const WORKING_DAYS = 300; // scripts-a-day → scripts-a-year
const AUDIT_BENCHMARK = 24_314; // published prepared-pharmacy recoupment avoided
const WC_LOW = 0.15; // share of brand shelf value freed as working capital…
const WC_HIGH = 0.25; // …by live perpetual inventory trimming overstock

/** Compact "$27k" / "$1.4M" for the self-composing summary line. */
function usdShort(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${Math.round(n)}`;
}

export function ROICalculator({ className }: { className?: string }) {
  const [scripts, setScripts] = useState(150);
  const [wage, setWage] = useState(18);
  const [stores, setStores] = useState(1);
  const [shelf, setShelf] = useState(80_000);

  // ── the arithmetic (transparent + correct) ──────────────────────────
  const hoursPerStore = (MIN_PER_SCRIPT * scripts * WORKING_DAYS) / 60; // = scripts × 10
  const hoursTotal = hoursPerStore * stores;
  const laborPerStore = hoursPerStore * wage;
  const laborTotal = laborPerStore * stores;
  const auditTotal = AUDIT_BENCHMARK * stores;
  const wcLowTotal = shelf * WC_LOW * stores;
  const wcHighTotal = shelf * WC_HIGH * stores;

  const storeWord = stores === 1 ? "one store returns" : `${stores} stores return`;
  const multiStore = stores > 1;

  return (
    <div className={cn("panel overflow-hidden", className)}>
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4 md:px-8">
        <span className="mono-label !text-mint">ROI Estimator</span>
        <Chip tone="outline">{CHIP.illustrative}</Chip>
      </div>

      <div className="grid gap-px bg-hairline lg:grid-cols-2">
        {/* ── INPUTS ─────────────────────────────────────────────── */}
        <div className="bg-emerald-deep/40 p-6 md:p-8">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
            Your inputs
          </p>
          <div className="mt-6 flex flex-col gap-7">
            <Field
              id="roi-scripts"
              label="Scripts / day"
              display={`${scripts.toLocaleString("en-US")}/day`}
              min={50}
              max={600}
              step={10}
              value={scripts}
              onChange={setScripts}
            />
            <Field
              id="roi-wage"
              label="Technician wage"
              display={`$${wage}/hr`}
              min={12}
              max={35}
              step={1}
              value={wage}
              onChange={setWage}
            />
            <Field
              id="roi-stores"
              label="Store count"
              display={stores === 1 ? "1 store" : `${stores} stores`}
              min={1}
              max={50}
              step={1}
              value={stores}
              onChange={setStores}
            />
            <Field
              id="roi-shelf"
              label="Avg brand shelf value"
              display={formatMetric(shelf, "usd")}
              min={20_000}
              max={300_000}
              step={5_000}
              value={shelf}
              onChange={setShelf}
              hint="Wholesale value of brand inventory sitting on the shelf."
            />
          </div>
        </div>

        {/* ── OUTPUTS ────────────────────────────────────────────── */}
        <div className="bg-emerald-deep/40 p-6 md:p-8">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
            Your return / year
          </p>

          <div aria-live="polite" className="mt-6 flex flex-col gap-5">
            <Output
              label="Technician hours returned"
              value={`${formatMetric(hoursTotal, "int")} hrs`}
              arithmetic={`≈${MIN_PER_SCRIPT} min/script × ${scripts.toLocaleString(
                "en-US",
              )} scripts/day × ${WORKING_DAYS} days${multiStore ? ` × ${stores} stores` : ""} = ${formatMetric(
                hoursTotal,
                "int",
              )} hours.`}
            />
            <Output
              label="Labor value returned"
              value={formatMetric(laborTotal, "usd")}
              arithmetic={`${formatMetric(hoursTotal, "int")} hours × $${wage}/hr.`}
            />
            <Output
              label="Working capital freed"
              value={`${formatMetric(wcLowTotal, "usd")}–${formatMetric(wcHighTotal, "usd")}`}
              arithmetic={`≈15–25% of ${formatMetric(shelf, "usd")} brand shelf value${
                multiStore ? ` × ${stores}` : ""
              } — live perpetual inventory trims overstock.`}
            />
            <Output
              label="Audit recoupment avoided"
              tag="Illustrative benchmark"
              value={formatMetric(auditTotal, "usd")}
              arithmetic={`$24,314 prepared-pharmacy benchmark${
                multiStore ? ` × ${stores} stores` : ""
              }. Published figure — illustrative, not a promise.`}
            />
          </div>
        </div>
      </div>

      {/* self-composing summary */}
      <div className="border-t border-hairline p-6 md:p-8">
        <div
          aria-live="polite"
          className="rounded-xl border border-mint/25 bg-mint/[0.06] p-5 md:p-6"
        >
          <p className="text-pretty text-base leading-relaxed text-text md:text-lg">
            At <span className="tabular text-mint">{scripts.toLocaleString("en-US")}</span> scripts a
            day, {storeWord}{" "}
            <span className="tabular font-semibold text-mint">≈{usdShort(laborTotal)}/yr</span> in
            technician time against a{" "}
            <span className="text-text">low-four-figures monthly retainer</span> —{" "}
            <span className="text-mint">before a single audit.</span>
          </p>
          <p className="mt-3 text-sm text-muted text-pretty">
            Working capital and audit recoupment stack on top. These are illustrative models — the
            arithmetic is shown so you can re-run it with your own store&apos;s numbers.
          </p>
        </div>
      </div>
    </div>
  );
}

/** A labelled range input with a live, tabular readout. */
function Field({
  id,
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted"
        >
          {label}
        </label>
        <output htmlFor={id} className="tabular text-base text-mint">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-emerald accent-mint"
      />
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted text-pretty">
          {hint}
        </p>
      )}
    </div>
  );
}

/** One output line: label, big mint number, and the arithmetic that made it. */
function Output({
  label,
  value,
  arithmetic,
  tag,
}: {
  label: string;
  value: string;
  arithmetic: string;
  tag?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
        {tag && (
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mint-dim">
            {tag}
          </span>
        )}
      </div>
      <span className="tabular text-3xl leading-none text-mint md:text-4xl">{value}</span>
      <p className="text-xs text-muted text-pretty">{arithmetic}</p>
    </div>
  );
}
