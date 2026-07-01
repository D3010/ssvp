"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VerifyButton } from "@/components/verification/VerifyButton";
import { GoldCheck } from "@/components/verification/GoldCheck";
import { Chip } from "@/components/ui/Chip";
import { LiveDot } from "@/components/ui/LiveDot";
import { CHIP } from "@/content/site.config";
import { cn } from "@/lib/utils";

/**
 * OverlaySimulator (G1) — the site's hero interactive. A stylized-but-credible
 * PrimeRx-style window (HTML, crisp text — NOT WebGL). The agent works a script:
 * document appears → fields extract & type → per-field mint read-back check →
 * row waits, dimmed → a gold "Pharmacist verify" button waits for a REAL user
 * click → commit → a receipt slides into a mini-ledger. Permanent SIMULATION chip.
 */

type ScenarioKey = "escript" | "fax" | "scan";

const SCENARIOS: Record<ScenarioKey, { label: string; source: string; fields: { label: string; value: string }[] }> = {
  escript: {
    label: "e-Script",
    source: "SureScripts inbound",
    fields: [
      { label: "Patient", value: "MARGARET J. ELLIS" },
      { label: "Prescriber", value: "DR. A. PATEL · NPI 1841…" },
      { label: "Drug / NDC", value: "ATORVASTATIN 20MG · 00071-0155" },
      { label: "Sig", value: "1 PO QHS" },
      { label: "Qty", value: "90" },
      { label: "Days", value: "90" },
      { label: "Refills", value: "3" },
      { label: "DAW", value: "0" },
    ],
  },
  fax: {
    label: "Fax",
    source: "Inbound fax · OCR",
    fields: [
      { label: "Patient", value: "LEON T. WARD" },
      { label: "Prescriber", value: "DR. S. KIM · NPI 1730…" },
      { label: "Drug / NDC", value: "METFORMIN 500MG · 00093-1045" },
      { label: "Sig", value: "1 PO BID × 10d" },
      { label: "Qty", value: "20" },
      { label: "Days", value: "10" },
      { label: "Refills", value: "0" },
      { label: "DAW", value: "0" },
    ],
  },
  scan: {
    label: "Paper scan",
    source: "Counter scan · vision",
    fields: [
      { label: "Patient", value: "ROSA M. DÍAZ" },
      { label: "Prescriber", value: "DR. B. NGUYEN · NPI 1902…" },
      { label: "Drug / NDC", value: "LISINOPRIL 10MG · 00591-0405" },
      { label: "Sig", value: "1 PO DAILY" },
      { label: "Qty", value: "30" },
      { label: "Days", value: "30" },
      { label: "Refills", value: "5" },
      { label: "DAW", value: "0" },
    ],
  },
};

interface Receipt {
  id: string;
  text: string;
}

export function OverlaySimulator() {
  const [scenario, setScenario] = useState<ScenarioKey>("escript");
  const fields = SCENARIOS[scenario].fields;

  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLen, setTypedLen] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "awaiting" | "verified">("idle");
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // Start when scrolled into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        setPhase("typing");
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion → fill instantly, jump to the gold gate.
  useEffect(() => {
    if (phase !== "typing") return;
    if (reduced) {
      setActiveIndex(fields.length);
      setPhase("awaiting");
      return;
    }
    const active = fields[activeIndex];
    if (!active) {
      setPhase("awaiting");
      return;
    }
    if (typedLen < active.value.length) {
      const t = setTimeout(() => setTypedLen((n) => n + 1), 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setActiveIndex((i) => i + 1);
      setTypedLen(0);
    }, 260);
    return () => clearTimeout(t);
  }, [phase, activeIndex, typedLen, fields, reduced]);

  function handleVerify() {
    setPhase("verified");
    const n = 2231 + receipts.length;
    setReceipts((r) => [{ id: `rx-${n}`, text: `Script typed & verified · #RX-${n}` }, ...r].slice(0, 3));
  }

  function replay() {
    setActiveIndex(0);
    setTypedLen(0);
    setPhase("typing");
  }

  function switchScenario(k: ScenarioKey) {
    setScenario(k);
    setActiveIndex(0);
    setTypedLen(0);
    setPhase("typing");
  }

  const narration =
    phase === "verified"
      ? "Pharmacist signed off. Script committed and logged."
      : phase === "awaiting"
        ? "All fields staged and read back. Waiting for the pharmacist to verify."
        : `Typing ${fields[activeIndex]?.label ?? "fields"} into PrimeRx.`;

  return (
    <div ref={rootRef} className="glass-card overflow-hidden">
      {/* title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-mint-dim/50" />
            <span className="size-2.5 rounded-full bg-mint-dim/30" />
            <span className="size-2.5 rounded-full bg-mint-dim/20" />
          </span>
          <span className="font-mono text-xs text-muted">PrimeRx — Rx Queue</span>
        </div>
        <Chip tone="outline">{CHIP.simulation}</Chip>
      </div>

      {/* scenario tabs */}
      <div className="flex items-center gap-1 border-b border-hairline px-3 py-2">
        {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => switchScenario(k)}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors",
              scenario === k ? "bg-mint/15 text-mint" : "text-muted hover:text-text",
            )}
          >
            {SCENARIOS[k].label}
          </button>
        ))}
        <span className="ml-auto font-mono text-[0.625rem] text-mint-dim">{SCENARIOS[scenario].source}</span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
        {/* document */}
        <div className="hidden border-r border-hairline p-4 md:block">
          <div className="mono-label mb-3">Source document</div>
          <div className="space-y-2 rounded-lg border border-hairline bg-obsidian/40 p-4">
            {fields.map((f, i) => (
              <div key={f.label} className={cn("h-2 rounded-full bg-mint-dim/25", i <= activeIndex ? "opacity-100" : "opacity-40")} style={{ width: `${50 + ((i * 37) % 45)}%` }} />
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">The agent reads the script once, then stages every field for sign-off.</p>
        </div>

        {/* fields */}
        <div className={cn("p-4 transition-opacity", phase === "awaiting" && "opacity-90")}>
          <div className="mono-label mb-3">PrimeRx fields</div>
          <div className={cn("space-y-1.5", phase === "awaiting" && "opacity-80")}>
            {fields.map((f, i) => {
              const done = i < activeIndex || phase === "verified" || phase === "awaiting";
              const active = i === activeIndex && phase === "typing";
              const shown = done ? f.value : active ? f.value.slice(0, typedLen) : "";
              return (
                <div key={f.label} className="grid grid-cols-[6rem_1fr_1.2rem] items-center gap-2 border-b border-hairline/60 py-1.5">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-mint-dim">{f.label}</span>
                  <span className="truncate font-mono text-[0.8125rem] text-text">
                    {shown}
                    {active && <span className="animate-caret text-mint">▍</span>}
                  </span>
                  {done ? <GoldCheck size={15} /> : <span className="justify-self-center text-mint-dim/40">·</span>}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            {phase === "awaiting" && <VerifyButton onVerify={handleVerify} />}
            {phase === "verified" && (
              <button type="button" onClick={replay} className="font-mono text-xs uppercase tracking-[0.12em] text-mint hover:text-text">
                ↻ Replay
              </button>
            )}
            {(phase === "typing" || phase === "idle") && (
              <span className="font-mono text-xs text-muted">staging…</span>
            )}
          </div>
        </div>
      </div>

      {/* mini-ledger */}
      <div className="border-t border-hairline bg-obsidian/40 px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="mono-label">Pulse · mini-ledger</span>
          <LiveDot label="LOGGED" />
        </div>
        {receipts.length === 0 ? (
          <p className="font-mono text-xs text-muted/60">Sign off to write the first receipt.</p>
        ) : (
          <ul className="space-y-1">
            {receipts.map((r) => (
              <li key={r.id} className="ssvp-row-in flex items-center gap-2 font-mono text-xs text-text">
                <GoldCheck size={14} />
                <span className="text-mint-dim">21:14</span>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* accessible narration */}
      <p className="sr-only" aria-live="polite">
        {narration}
      </p>
    </div>
  );
}
