import type { Metadata } from "next";
import type { Glyph as GlyphName } from "@/content/modules";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { StatusChip } from "@/components/ui/StatusChip";
import { ExposureSelfCheck } from "@/components/pilot/ExposureSelfCheck";
import { PilotForm } from "@/components/pilot/PilotForm";
import { PHASES } from "@/content/roadmap";

export const metadata: Metadata = {
  title: "Pilot program — SSVP AI",
  description:
    "Set the accuracy bar with us. Pilot stores get the modules that are furthest along, a founder on the other end of every email, and pricing that reflects the work you put in. All we ask is one PrimeRx store and honest feedback.",
  alternates: { canonical: "/pilot" },
};

// The two phases a pilot starts inside — verbatim from the roadmap.
const EARLY_PHASES = PHASES.filter((p) => p.id === "P1" || p.id === "P2");

const WHAT_YOU_GET: { glyph: GlyphName; title: string; body: string }[] = [
  {
    glyph: "check",
    title: "A founder on the other end",
    body: "No SDR, no ticket queue, no account manager reading a script. You email the person building the overlay, and you get a real answer back — usually the same day.",
  },
  {
    glyph: "ledger",
    title: "Pricing that reflects the work",
    body: "Pilot stores help set the accuracy bar the whole product is measured against. That contribution is worth something, and pilot pricing is scoped with it in mind — priced against the pain, not the hour.",
  },
];

const WHAT_WE_ASK: { glyph: GlyphName; title: string; body: string }[] = [
  {
    glyph: "bottle",
    title: "One PrimeRx store",
    body: "The overlay reads and types PrimeRx screens directly, so the pilot runs on a store already live on PrimeRx. Controlled substances stay out of every automated workflow — that line does not move.",
  },
  {
    glyph: "check",
    title: "A pharmacist who signs",
    body: "The agent perceives, reasons, and stages the work; a licensed human is the hard gate on every action on the fill path. We need someone on your side who owns that sign-off.",
  },
  {
    glyph: "clock",
    title: "A feedback cadence",
    body: "A standing 20-minute check-in where your team tells us what the agent got wrong. Every correction sharpens the model — that loop is the entire point of a pilot.",
  },
];

export default function PilotPage() {
  return (
    <>
      <PageHero
        eyebrow="PILOT PROGRAM"
        title={
          <>
            Set the accuracy bar{" "}
            <span className="text-mint">with us.</span>
          </>
        }
        sub="A pilot is where the target gets set — with your corrections, on your PrimeRx, on your scripts. You get the modules that are furthest along and a direct line to the person building them. We get a real store and honest feedback. That trade is the whole deal."
      />

      {/* ── What pilots get ──────────────────────────────────────────── */}
      <SectionShell
        eyebrow="WHAT YOU GET"
        title="You start where the engine is furthest along."
        intro="Pilots begin with the modules already in build — the ones that earn daily trust first — with the option for audit-distressed stores to enter straight through reactive audit defense."
      >
        <Reveal className="panel p-7 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
              <Glyph name="bolt" />
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
              First in line
            </span>
          </div>
          <h3 className="mt-6 text-[length:var(--text-h3)] leading-tight text-text">
            Phase 1&ndash;2 modules first.
          </h3>
          <ul className="mt-6 space-y-3">
            {EARLY_PHASES.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-hairline bg-emerald-deep/30 px-4 py-3"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
                    {p.label}
                  </span>
                  <span className="text-text">{p.title}</span>
                </span>
                <StatusChip status={p.status} />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-muted text-pretty">
            Already have an audit notice on your desk? You can onboard straight
            into reactive audit defense and work the claim you already owe an
            answer on.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {WHAT_YOU_GET.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.05}
              className="panel flex h-full flex-col p-7 md:p-8"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
                <Glyph name={item.glyph} />
              </span>
              <h3 className="mt-6 text-[length:var(--text-h3)] leading-tight text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-muted text-pretty">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          In plain terms: you get the parts that are ready, the founder&apos;s
          direct attention, and a fair deal for helping build them.
        </p>
      </SectionShell>

      {/* ── What SSVP asks ───────────────────────────────────────────── */}
      <SectionShell
        eyebrow="WHAT WE ASK"
        title="Three things from you."
        intro="A pilot only works if it runs in a real store with a real gate and a real feedback loop. Here is the whole ask, stated plainly."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {WHAT_WE_ASK.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.05}
              className="panel flex h-full flex-col p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
                  <Glyph name={item.glyph} />
                </span>
                <span className="font-mono text-xs tabular text-mint-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-[length:var(--text-h3)] leading-tight text-text">
                {item.title}
              </h3>
              <p className="mt-3 text-muted text-pretty">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          Bring us a PrimeRx store, a pharmacist to sign, and twenty honest
          minutes a week &mdash; we&apos;ll bring the machine.
        </p>
      </SectionShell>

      {/* ── The qualifying self-check ────────────────────────────────── */}
      <SectionShell
        eyebrow="QUALIFYING SELF-CHECK"
        title="How exposed are you right now?"
        intro="Before you apply, see where you stand against the signals a PBM's audit algorithm sorts on. It runs entirely in your browser — a mirror, not a verdict."
      >
        <ExposureSelfCheck />
      </SectionShell>

      {/* ── The application ──────────────────────────────────────────── */}
      <SectionShell
        id="pilot-application"
        eyebrow="APPLY"
        title="Apply for the pilot."
        intro="Tell us about the store and the task that hurts most. If you ran the self-check above, attach it — it goes straight into the note we read first."
        width="page"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <PilotForm />
          <Reveal className="panel p-7 md:p-8 lg:sticky lg:top-24">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
              After you send
            </span>
            <ol className="mt-5 space-y-5">
              {[
                "We read it ourselves and pick the first module that pays for itself fastest in your store.",
                "You get a short write-up and a rough ROI model against your own numbers — usually within a day.",
                "If it fits, we scope the pilot on that one store, and you set the accuracy bar we build to.",
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-mint/40 font-mono text-xs tabular text-mint">
                    {i + 1}
                  </span>
                  <span className="text-muted text-pretty">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-hairline pt-6 text-sm text-muted text-pretty">
              Would rather talk it through first?{" "}
              <a
                href="/book"
                className="text-mint underline underline-offset-4 hover:text-text"
              >
                Book a build call
              </a>{" "}
              instead &mdash; same person, same day.
            </p>
          </Reveal>
        </div>
      </SectionShell>
    </>
  );
}
