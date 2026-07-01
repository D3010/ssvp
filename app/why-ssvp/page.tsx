import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { SignOffStamp } from "@/components/verification/SignOffStamp";
import { TERRITORIES, DASHBOARDS_VS_HANDS, MOATS } from "@/content/moats";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why SSVP — SSVP AI",
  description:
    "The whole funded market can see the pharmacy-AI opportunity. Only SSVP is built to act on it — write-access to PrimeRx, a payer-rules flywheel, an NDC-level ledger, and pharmacist-verified trust at the edge.",
  alternates: { canonical: "/why-ssvp" },
};

const { competitor, ssvp } = DASHBOARDS_VS_HANDS;

/** Strata read top-to-bottom; the write-access map (01) sits at bedrock. */
const STRATA = [...MOATS].reverse();

export default function WhySsvpPage() {
  return (
    <>
      <PageHero
        eyebrow="THE MOAT"
        title="Everyone can see the opportunity. Nobody else can act on it."
        sub={
          <>
            The whole funded market can see what pharmacy AI could be. Every one of
            them stops at the glass — a dashboard that recommends. SSVP is the only
            one with its hands on the keyboard, and a{" "}
            <span className="text-text">pharmacist&rsquo;s signature</span> on every
            move.
          </>
        }
      />

      {/* ── THE TERRITORY MAP ─────────────────────────────────────────── */}
      <SectionShell
        id="territory"
        width="wide"
        eyebrow="THE TERRITORY"
        title="Four zones. The funded market is crowded into three."
        intro="Map the pharmacy-AI market and it splits into four territories. The well-funded players are stacked into three of them — all reading, none writing. The fourth is empty."
      >
        <figure className="relative overflow-hidden rounded-2xl border border-hairline bg-emerald-deep/30 p-4 md:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)]"
          />
          <div className="relative flex items-center justify-between gap-4 border-b border-hairline pb-3">
            <span className="mono-label">Fig. 01 — The funded market, mapped</span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              See <span aria-hidden="true">↔</span> Act
            </span>
          </div>

          <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
            {TERRITORIES.map((t, i) => {
              const tag = `T-${String(i + 1).padStart(2, "0")}`;
              return (
                <Reveal
                  key={t.zone}
                  delay={i * 0.05}
                  className={cn(
                    "relative flex flex-col gap-4 rounded-xl p-5",
                    t.empty
                      ? "justify-center border border-dashed border-mint/40 bg-mint/[0.04]"
                      : "border border-hairline bg-obsidian/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-[0.625rem] uppercase tracking-[0.18em]",
                        t.empty ? "text-mint" : "text-mint-dim",
                      )}
                    >
                      {tag}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.5625rem] uppercase tracking-[0.16em]",
                        t.empty ? "text-mint" : "text-muted",
                      )}
                    >
                      {t.empty ? "Unclaimed" : "Occupied"}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-text">{t.zone}</h3>

                  {t.empty ? (
                    <>
                      <p className="font-display text-xl text-mint text-balance">
                        {t.who}
                      </p>
                      <p className="text-sm text-muted text-pretty">{t.cant}</p>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="mono-label">Who&rsquo;s here</span>
                        <p className="mt-1 text-sm text-text">{t.who}</p>
                      </div>
                      <div>
                        <span className="mono-label">What they can&rsquo;t do</span>
                        <p className="mt-1 text-sm text-muted text-pretty">{t.cant}</p>
                      </div>
                    </>
                  )}
                </Reveal>
              );
            })}
          </div>

          <figcaption className="relative mt-4 border-t border-hairline pt-3 text-sm text-muted text-pretty">
            Everyone else is renting the view. The one room nobody has built in —
            audit defense — is the one that saves you when a payer comes asking.
          </figcaption>
        </figure>
      </SectionShell>

      {/* ── DASHBOARDS VS HANDS ───────────────────────────────────────── */}
      <SectionShell
        className="border-t border-hairline"
        eyebrow="DASHBOARDS VS. HANDS"
        title="A dashboard hands you a to-do list. We hand it back done."
        intro="Same problem, two answers. One side watches through the glass and tells you what to fix. The other side has write-access and a licensed pharmacist on the gate."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-emerald-deep/30 p-6 md:p-8">
            <header>
              <span className="mono-label">The glass</span>
              <h3 className="mt-2 font-display text-xl text-muted">
                {competitor.title}
              </h3>
            </header>
            <ul className="mt-6 space-y-3">
              {competitor.lines.map((line) => (
                <li key={line} className="flex items-center gap-3 text-muted">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-muted/50"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-mint/25 bg-emerald-deep/60 p-6 glow-mint md:p-8">
            <header>
              <span className="mono-label">The keyboard</span>
              <h3 className="mt-2 font-display text-xl text-text">{ssvp.title}</h3>
            </header>
            <ul className="mt-6 space-y-3">
              {ssvp.lines.map((line) => (
                <li key={line} className="flex items-center gap-3 text-text">
                  <Glyph name="check" className="size-4 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-lg text-muted text-pretty">
          A dashboard tells you what to fix. We fix it — and a pharmacist signs off
          before it counts.
        </p>
      </SectionShell>

      {/* ── THE MOAT, IN STRATA ───────────────────────────────────────── */}
      <SectionShell
        className="border-t border-hairline"
        width="wide"
        eyebrow="THE MOAT, IN STRATA"
        title="Four moats — and each one compounds the next."
        intro="Read it top to bottom. Each layer rests on the one beneath it, and the bedrock is write-access. Map every PrimeRx screen, and everything above becomes possible — then everything above starts compounding."
      >
        <div className="overflow-hidden rounded-2xl border border-hairline bg-gradient-to-b from-emerald-deep/25 to-emerald-deep/60">
          {STRATA.map((m, i) => {
            const isBedrock = m.n === "01";
            const isTrust = m.n === "04";
            const isLast = i === STRATA.length - 1;
            return (
              <Reveal key={m.n} delay={i * 0.05}>
                <div
                  className={cn(
                    "relative flex flex-col gap-6 p-6 md:flex-row md:items-start md:gap-8 md:p-9",
                    !isLast && "border-b border-hairline",
                    isBedrock && "bg-mint/5",
                  )}
                >
                  <div className="flex items-baseline gap-3 md:w-40 md:shrink-0 md:flex-col md:items-start md:gap-2">
                    <span className="tabular text-4xl text-mint md:text-5xl">
                      {m.n}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-mint-dim">
                      {isBedrock ? "Bedrock layer" : `Stratum ${m.n}`}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-xl text-text md:text-2xl">
                      {m.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted text-pretty">{m.body}</p>
                    {isTrust && (
                      <div className="mt-4">
                        <SignOffStamp label="PHARMACIST-VERIFIED" />
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-hairline bg-obsidian/50 p-4 md:w-60 md:shrink-0">
                    <span className="mono-label">Compounds</span>
                    <p className="mt-2 text-sm text-text text-pretty">
                      {m.mechanism}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex flex-col gap-2 rounded-xl border border-hairline bg-emerald-deep/40 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="mono-label shrink-0">Annotation</span>
          <p className="text-text text-pretty">
            Every month in production hardens it.{" "}
            <span className="text-muted">
              The longer we run inside your pharmacy, the further ahead this gets —
              and the harder it becomes for anyone to reconstruct.
            </span>
          </p>
        </Reveal>
      </SectionShell>

      {/* ── BUILT BY INSIDERS ─────────────────────────────────────────── */}
      <SectionShell
        className="border-t border-hairline"
        eyebrow="BUILT BY INSIDERS"
        title="Operators who worked the counter. Engineers who ship."
        intro="SSVP isn't built by a lab that read about pharmacy. It's built by two kinds of people who rarely share a room — and it shows in what we chose to automate first."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-hairline bg-emerald-deep/40 p-6 md:p-8">
            <span className="mono-label">The operators</span>
            <p className="mt-3 text-muted text-pretty">
              People who have stood at the counter at 6pm with a queue of patients,
              a payer on hold, and an audit letter in the drawer. They know which
              minute actually costs money — and which task should never have needed
              a human.
            </p>
          </div>
          <div className="rounded-xl border border-hairline bg-emerald-deep/40 p-6 md:p-8">
            <span className="mono-label">The engineers</span>
            <p className="mt-3 text-muted text-pretty">
              People who ship production AI — edge inference, verified writes, an
              append-only log — and who treat a pharmacist&rsquo;s signature as a
              hard gate, not a nice-to-have.
            </p>
          </div>
        </div>

        <figure className="mt-6 rounded-xl border border-hairline bg-emerald-deep/40 p-8 md:p-10">
          <blockquote className="font-display text-2xl leading-snug text-balance text-text md:text-3xl">
            &ldquo;A pharmacist&rsquo;s license shouldn&rsquo;t be spent on fax
            machines and hold music.&rdquo;
          </blockquote>
          <figcaption className="mt-5 mono-label">
            The reason SSVP exists — so your license goes to patients, not paperwork.
          </figcaption>
        </figure>
      </SectionShell>

      <CTABand
        title="See the opportunity? So does everyone. Let's talk about acting on it."
        sub="A build call: we map your PrimeRx screens and show you exactly where the moat starts."
      />
    </>
  );
}
