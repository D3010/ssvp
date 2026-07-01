import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StatusChip } from "@/components/ui/StatusChip";
import { Glyph } from "@/components/ui/Glyph";
import { PHASES, HORIZON } from "@/content/roadmap";
import { STATUS_LABEL, CTA, type Status } from "@/content/site.config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roadmap — SSVP AI",
  description:
    "The fifteen-month build plan for SSVP: five pharmacy-AI modules shipped in overlapping phases (M0–15), each gated by a hard exit criterion before the next one leans on it.",
  alternates: { canonical: "/roadmap" },
};

/* ── month-bar plumbing ─────────────────────────────────────────────────
   Every bar sits on the same fixed 0–15 track, so overlap is legible just
   by reading top to bottom. Positions are pure percentages — no JS. */
const SCALE_MONTHS = 15;
const pct = (m: number) => (m / SCALE_MONTHS) * 100;

/* faint reference gridlines at M0 / M5 / M10 (M15 = the track's own edge). */
const TRACK_GRID: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(to right, var(--color-hairline) 0, var(--color-hairline) 1px, transparent 1px, transparent calc(100% / 3))",
};

/* Status → bar treatment. Encodes maturity in the mint machine accent:
   solid = happening, outlined = piloting, dashed = planned. No gold. */
const SEGMENT_STYLE: Record<Status, string> = {
  live: "bg-mint",
  "in-build": "bg-mint/80",
  pilot: "bg-mint/40 border border-mint/60",
  roadmap: "bg-mint/15 border border-dashed border-mint/50",
};

const LEGEND: Status[] = ["in-build", "pilot", "roadmap"];
const SCALE_TICKS = ["M0", "M5", "M10", "M15"];

function MonthBar({
  start,
  end,
  status,
  variant = "detail",
}: {
  start: number;
  end: number;
  status: Status;
  variant?: "detail" | "gantt";
}) {
  return (
    <div
      aria-hidden="true"
      style={TRACK_GRID}
      className={cn(
        "relative w-full overflow-hidden rounded-full border border-hairline bg-emerald-deep/70",
        variant === "gantt" ? "h-6" : "h-2.5",
      )}
    >
      <div
        className={cn("absolute inset-y-0 rounded-full", SEGMENT_STYLE[status])}
        style={{ left: `${pct(start)}%`, width: `${pct(end - start)}%` }}
      />
    </div>
  );
}

function ScaleTicks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex justify-between font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mint-dim",
        className,
      )}
    >
      {SCALE_TICKS.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="BUILD ROADMAP · M0–15"
        title="Fifteen months from overlay to the full five-module suite."
        sub="The five modules ship in overlapping waves, not one big-bang launch. Each phase has to clear a hard exit criterion before the next one is allowed to lean on it. Here is the sequence — and why it runs in this order."
      />

      <SectionShell
        id="sequence"
        width="wide"
        eyebrow="SEQUENCE"
        title="The build, phase by phase."
        intro="Every bar below sits on the same fifteen-month track, so you can see exactly where the waves overlap. Typing starts before inventory is finished; audit defense begins while inventory is still settling. Nothing waits for a perfect predecessor."
      >
        {/* ── overlap-at-a-glance gantt (fully server-rendered) ── */}
        <Reveal className="panel p-5 sm:p-8">
          <p className="mono-label mb-6">Overlap at a glance · M0–15</p>

          <div className="space-y-3.5">
            {/* scale header, aligned to the plotting column */}
            <div className="grid grid-cols-[2.25rem_1fr_3.25rem] items-center gap-3 sm:grid-cols-[2.75rem_1fr_3.75rem]">
              <span aria-hidden="true" />
              <ScaleTicks />
              <span aria-hidden="true" />
            </div>

            {PHASES.map((phase) => (
              <div
                key={phase.id}
                className="grid grid-cols-[2.25rem_1fr_3.25rem] items-center gap-3 sm:grid-cols-[2.75rem_1fr_3.75rem]"
              >
                <span className="font-mono text-sm font-medium text-mint">
                  {phase.id}
                </span>
                <MonthBar
                  start={phase.monthStart}
                  end={phase.monthEnd}
                  status={phase.status}
                  variant="gantt"
                />
                <span className="text-right font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted">
                  {phase.months}
                </span>
              </div>
            ))}
          </div>

          {/* legend: bar colour = build maturity */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-4">
            <span className="mono-label">Legend</span>
            {LEGEND.map((status) => (
              <span
                key={status}
                className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted"
              >
                <span
                  aria-hidden="true"
                  className={cn("h-2.5 w-7 rounded-full", SEGMENT_STYLE[status])}
                />
                {STATUS_LABEL[status]}
              </span>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 max-w-2xl text-base text-muted text-pretty">
          Read it top to bottom and the staggering is the point: help reaches
          the technician early, and the harder modules build on real data
          instead of waiting for it.
        </p>

        {/* ── the detailed timeline of monoliths ── */}
        <ol className="mt-14 space-y-6 md:mt-16">
          {PHASES.map((phase, i) => {
            const isLast = i === PHASES.length - 1;
            return (
              <Reveal as="li" key={phase.id} delay={i * 0.04}>
                {phase.why && (
                  <div className="mb-5 md:pl-[calc(2.75rem+1.5rem)]">
                    <Eyebrow>Why this order</Eyebrow>
                    <p className="mt-2 max-w-2xl text-sm text-muted text-pretty md:text-base">
                      {phase.why}
                    </p>
                  </div>
                )}

                <div className="md:grid md:grid-cols-[2.75rem_1fr] md:gap-6">
                  {/* desktop rail: ordinal node + connecting line */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex md:flex-col md:items-center"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-mint/40 bg-emerald-deep font-mono text-sm text-mint">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "mt-3 w-px grow bg-gradient-to-b from-mint/40",
                        isLast ? "to-transparent" : "to-line",
                      )}
                    />
                  </div>

                  <article className="panel p-6 transition-colors hover:border-mint/30 sm:p-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="mono-label">
                        {phase.label} · {phase.months}
                      </span>
                      <StatusChip status={phase.status} className="ml-auto" />
                    </div>

                    <h3 className="mt-3 text-[length:var(--text-h3)] text-balance">
                      {phase.title}
                    </h3>

                    {/* per-phase month-bar on the shared 0–15 scale */}
                    <div className="mt-6">
                      <ScaleTicks className="mb-2" />
                      <MonthBar
                        start={phase.monthStart}
                        end={phase.monthEnd}
                        status={phase.status}
                      />
                    </div>

                    {/* deliverables */}
                    <div className="mt-7">
                      <p className="mono-label mb-3">Ships</p>
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {phase.deliverables.map((d) => (
                          <li
                            key={d}
                            className="flex items-start gap-2.5 text-sm text-text"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-mint"
                            />
                            <span className="text-pretty">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* exit stamp — the gate out of this phase (machine milestone) */}
                    <div className="mt-7 flex items-start gap-3 rounded-md border border-mint/25 bg-mint/[0.05] px-4 py-3.5">
                      <Glyph name="check" className="mt-0.5 size-5 shrink-0" />
                      <div>
                        <p className="mono-label">Exit criterion</p>
                        <p className="mt-1 text-sm text-text text-pretty">
                          {phase.exit}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <p className="mt-12 max-w-2xl text-base text-muted text-pretty">
          Plainly: nothing on this page is called done until it has passed the
          exit line above it. That is the whole discipline of the plan.
        </p>
      </SectionShell>

      {/* ── beyond the five: the horizon ── */}
      <SectionShell
        id="horizon"
        className="cv-auto border-t border-line"
        eyebrow="BEYOND THE FIVE"
        title="After the suite ships."
        intro="These are not inside the fifteen months. They are the lanes the same engine opens once all five modules are live — directional, not scheduled, and marked ROADMAP so no one mistakes them for a promise."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {HORIZON.map((item, i) => {
            const accent = ["text-mint", "text-mint-dim", "text-muted"][i];
            const edge = i === 0 ? "border-mint/25" : "border-hairline";
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className={cn(
                  "panel flex h-full flex-col gap-3 p-6",
                  edge,
                  i === 0 && "bg-mint/[0.04]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("font-mono text-xs tracking-[0.12em]", accent)}>
                    H{i + 1}
                  </span>
                  <StatusChip status="roadmap" />
                </div>
                <h3 className="text-[length:var(--text-h3)] text-balance">
                  {item.title}
                </h3>
                <p className="text-sm text-muted text-pretty">{item.body}</p>
              </Reveal>
            );
          })}
        </ol>

        <p className="mt-10 max-w-2xl text-base text-muted text-pretty">
          In plain terms: the road keeps going past the five modules — but we
          would rather ship those five first and earn the right to build these.
        </p>
      </SectionShell>

      <CTABand
        title="The dates above are commitments, not hopes."
        sub="Want to be one of the pilot stores that shapes phases 1 through 3? That is how the roadmap earns its numbers instead of guessing them."
        cta={CTA.pilot.label}
        href={CTA.pilot.href}
      />
    </>
  );
}
