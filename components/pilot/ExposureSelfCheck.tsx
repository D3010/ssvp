"use client";

import { useState } from "react";
import { AUDIT_TRIGGERS } from "@/content/discrepancies";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Qualifying self-check for the pilot page. Ten yes/no switches = the audit
 * triggers a PBM's selection algorithm sorts on (from @/content/discrepancies).
 * Toggling is fully client-side — nothing leaves the browser until the visitor
 * chooses to carry the read into the application form below.
 *
 * The result is framed factually ("signals PBMs watch"), never as fear: a high
 * score is a statistical selection likelihood, not an accusation.
 */

const EXPOSURE_EVENT = "ssvp:exposure";
const EXPOSURE_STORAGE_KEY = "ssvp-exposure";
const FORM_ANCHOR = "pilot-application";

type Verdict = "LOW" | "ELEVATED" | "HIGH";

export interface ExposureSummary {
  verdict: Verdict;
  count: number;
  total: number;
  flagged: string[];
}

function verdictFor(count: number): Verdict {
  if (count >= 6) return "HIGH";
  if (count >= 3) return "ELEVATED";
  return "LOW";
}

const VERDICT: Record<
  Verdict,
  { tone: string; dot: string; ring: string; line: string }
> = {
  LOW: {
    tone: "text-mint",
    dot: "bg-mint",
    ring: "border-mint/30",
    line: "Few of the usual signals are firing today. The catch: purchased-vs-dispensed drift and documentation gaps start invisible, so a quiet week is the cheapest time to set a baseline — not a reason to wait.",
  },
  ELEVATED: {
    tone: "text-text",
    dot: "bg-mint-dim",
    ring: "border-mint-dim/40",
    line: "You are showing several of the patterns a payer's algorithm ranks on. None of these is wrongdoing — each is simply a reason a claim gets pulled, and a reason the paperwork behind it needs to be assembled before a notice lands, not after.",
  },
  HIGH: {
    tone: "text-risk",
    dot: "bg-risk",
    ring: "border-risk/40",
    line: "You are lit up on most of the signals PBMs rank by. That does not mean you did anything wrong; it means your store is statistically more likely to be selected — and a two-week response window is not when you want to start hunting for documents.",
  },
};

export function ExposureSelfCheck() {
  const total = AUDIT_TRIGGERS.length;
  const [answers, setAnswers] = useState<boolean[]>(() =>
    AUDIT_TRIGGERS.map(() => false),
  );

  const count = answers.filter(Boolean).length;
  const verdict = verdictFor(count);
  const flagged = AUDIT_TRIGGERS.filter((_, i) => answers[i]);
  const v = VERDICT[verdict];

  function toggle(i: number) {
    setAnswers((prev) => prev.map((val, idx) => (idx === i ? !val : val)));
  }

  function carryIntoForm() {
    const summary: ExposureSummary = { verdict, count, total, flagged };
    try {
      sessionStorage.setItem(EXPOSURE_STORAGE_KEY, JSON.stringify(summary));
    } catch {
      /* private mode / storage disabled — the event path still works */
    }
    window.dispatchEvent(
      new CustomEvent<ExposureSummary>(EXPOSURE_EVENT, { detail: summary }),
    );
    const target = document.getElementById(FORM_ANCHOR);
    if (target) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className="panel p-6 md:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
          Exposure self-check · 10 signals
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
          Stays in your browser
        </span>
      </div>

      <p className="mt-4 max-w-2xl text-muted text-pretty">
        These are the patterns a PBM&apos;s audit algorithm actually sorts on.
        Toggle each one that describes your store. It is a mirror, not a verdict —
        nothing here is sent anywhere until you choose to attach it to the
        application.
      </p>

      <fieldset className="mt-7">
        <legend className="sr-only">
          Toggle each audit signal that describes your pharmacy
        </legend>
        <ul role="list" className="grid gap-3 sm:grid-cols-2">
          {AUDIT_TRIGGERS.map((trigger, i) => {
            const on = answers[i];
            return (
              <li key={trigger}>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggle(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    on
                      ? "border-mint/40 bg-mint/[0.06]"
                      : "border-hairline bg-emerald-deep/30 hover:border-mint/25",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative h-5 w-9 shrink-0 rounded-full transition-colors",
                      on ? "bg-mint" : "bg-emerald",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute left-0.5 top-0.5 size-4 rounded-full transition-transform",
                        on ? "translate-x-4 bg-obsidian" : "bg-muted",
                      )}
                    />
                  </span>
                  <span className="text-sm text-text">{trigger}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      {/* Live verdict — announced to screen readers on every toggle. */}
      <div
        aria-live="polite"
        className={cn(
          "mt-7 rounded-xl border bg-emerald-deep/40 p-5 md:p-6",
          v.ring,
        )}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="inline-flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn("size-2.5 rounded-full", v.dot)}
            />
            <span
              className={cn(
                "font-display text-2xl font-semibold tracking-tight md:text-3xl",
                v.tone,
              )}
            >
              {verdict} exposure
            </span>
          </span>
          <span className="font-mono text-sm tabular text-muted">
            {count} / {total} signals firing
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm text-muted text-pretty md:text-base">
          {v.line}
        </p>

        {flagged.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
              Driven by
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {flagged.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-hairline bg-emerald-deep/60 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant="secondary" onClick={carryIntoForm}>
          Attach this read to my application
          <span aria-hidden="true">↓</span>
        </Button>
        <p className="text-sm text-muted">
          Whatever the score, the pilot is where you set the accuracy bar we
          build against.
        </p>
      </div>
    </div>
  );
}
