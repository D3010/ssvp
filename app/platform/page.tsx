import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { Chip } from "@/components/ui/Chip";
import { LiveDot } from "@/components/ui/LiveDot";
import { PulseLine } from "@/components/ui/PulseLine";
import { GoldCheck } from "@/components/verification/GoldCheck";
import { PulseLedger } from "@/components/pulse/PulseLedger";
import { STACK, DATA_SPINE } from "@/content/security";
import type { Glyph as GlyphName } from "@/content/modules";

export const metadata: Metadata = {
  title: "Platform — SSVP AI",
  description:
    "Two kinds of seeing, one loop. UI automation reads and writes PrimeRx control values continuously; an on-device vision-language model reads each document once. Perceive, reason, act — then a pharmacist verifies, and every action lands in an append-only log.",
  alternates: { canonical: "/platform" },
};

/* ── the two layers of perception ─────────────────────────────────────── */
const LAYERS: {
  tag: string;
  name: string;
  tech: string;
  glyph: GlyphName;
  cadence: string;
  body: string;
  fieldsLabel: string;
  fields: string[];
  target: string;
  continuous: boolean;
}[] = [
  {
    tag: "CONTINUOUS",
    name: "UI automation",
    tech: "FlaUI",
    glyph: "bolt",
    cadence: "Every field, all the time",
    body: "Drives PrimeRx the way your staff does — reading the value in every control, clicking the real buttons, keying into the real boxes. No API, no PMS-vendor permission. It never stops watching the screen, and every write it makes is read back and compared.",
    fieldsLabel: "reads + writes",
    fields: ["patient", "prescriber", "drug / NDC", "sig", "qty", "days", "refills", "DAW"],
    target: "→ PrimeRx control values",
    continuous: true,
  },
  {
    tag: "ONCE PER DOCUMENT",
    name: "Vision-language + OCR",
    tech: "local VLM · OCR",
    glyph: "eye",
    cadence: "One read, per document",
    body: "An on-device vision-language model and OCR open their eyes a single time for each piece of paper — a script, a card, an ID, an audit notice — turn the pixels into structured fields, and hand off. It is a read, not a stream. The image never leaves the building.",
    fieldsLabel: "turns pixels into",
    fields: ["e-script", "fax", "paper scan", "card + ID", "audit notice"],
    target: "→ structured fields",
    continuous: false,
  },
];

/* ── the loop: Perceive → Reason → Act → Verify ───────────────────────── */
const LOOP: { n: string; title: string; body: string; glyph?: GlyphName; gold?: boolean }[] = [
  {
    n: "01",
    title: "Perceive",
    glyph: "eye",
    body: "UIA reads the live control values off the screen; when a document is in play, the VLM reads it once and structures it.",
  },
  {
    n: "02",
    title: "Reason",
    glyph: "bulb",
    body: "On-device models resolve the fields — sig, NDC, BIN/PCN, discrepancy codes — against the versioned payer-rule knowledge base.",
  },
  {
    n: "03",
    title: "Act",
    glyph: "bolt",
    body: "UIA keys and clicks inside PrimeRx, then reads every write back and compares it to what it intended before anything is trusted.",
  },
  {
    n: "04",
    title: "Verify",
    gold: true,
    body: "A licensed pharmacist is the hard gate. Nothing counts until they sign — and the signed action lands in the append-only log.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="THE ENGINE"
        title={
          <>
            Two kinds of seeing.{" "}
            <span className="gradient-text">One loop.</span>
          </>
        }
        sub="SSVP is one engine, not a bag of tools. A layer that watches PrimeRx without pause, a layer that reads each document once, and a single loop that turns what they see into staged actions — every one of which waits for a pharmacist to sign."
      />

      {/* ── THE TWO LAYERS ─────────────────────────────────────────────── */}
      <SectionShell
        id="layers"
        width="wide"
        eyebrow="TWO LAYERS OF PERCEPTION"
        title={<>The screen never stops. The paper is read once.</>}
        intro="Both layers run on the pharmacy's own hardware. One is a continuous machine; the other fires a single time per document. Neither of them ever asks the outside world what it just saw."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {LAYERS.map((layer, i) => (
            <Reveal
              key={layer.name}
              delay={i * 0.08}
              className="panel flex flex-col gap-6 p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-hairline bg-emerald-deep/60">
                    <Glyph name={layer.glyph} className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[length:var(--text-h3)] leading-none">
                      {layer.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-mint-dim">{layer.tech}</p>
                  </div>
                </div>
                <Chip tone={layer.continuous ? "mint" : "neutral"}>{layer.tag}</Chip>
              </div>

              {/* cadence rail — continuous sweep vs a single fixed read */}
              <div
                className="relative h-9 overflow-hidden rounded-lg border border-hairline bg-obsidian/70"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-dots opacity-50" />
                {layer.continuous ? (
                  <>
                    <div className="animate-scan absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-mint/45 to-transparent" />
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <LiveDot />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    <span className="size-2 rounded-full bg-mint animate-breathe" />
                    <span className="mono-label !text-[0.625rem]">1× / document</span>
                  </div>
                )}
              </div>
              <p className="-mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                {layer.cadence}
              </p>

              <p className="text-pretty text-muted">{layer.body}</p>

              <div className="mt-auto space-y-3">
                <p className="mono-label">{layer.fieldsLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.fields.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-hairline bg-emerald-deep/40 px-3 py-1 font-mono text-xs text-text"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className="pt-1 font-mono text-xs text-mint-dim">{layer.target}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-pretty text-lg text-muted">
          One layer never looks away from the screen. The other opens its eyes
          once, for each piece of paper, then closes them.{" "}
          <span className="text-text">
            Between them, the software reads your pharmacy the way a good
            technician does — and only ever proposes what a good technician
            would.
          </span>
        </p>
      </SectionShell>

      {/* ── THE LOOP ───────────────────────────────────────────────────── */}
      <section id="loop" className="cv-auto scroll-mt-24 border-t border-hairline py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
            <p className="mono-label">// THE LOOP</p>
            <h2 className="max-w-3xl text-balance text-[length:var(--text-h2)]">
              Perceive, reason, act — then wait for the signature.
            </h2>
            <p className="max-w-2xl text-pretty text-lg text-muted">
              The same four beats run under every module. Three are the machine.
              The fourth is a person, and it is the only one that counts.
            </p>
          </Reveal>

          {/* the signal spine */}
          <div className="mb-6" aria-hidden="true">
            <PulseLine variant="divider" animate />
          </div>

          <ol className="grid gap-4 md:grid-cols-4">
            {LOOP.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.06}
                className="panel relative flex flex-col gap-4 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label">{step.n}</span>
                  {step.gold ? (
                    <GoldCheck size={30} />
                  ) : (
                    step.glyph && <Glyph name={step.glyph} className="size-7" />
                  )}
                </div>
                <h3 className="font-display text-[length:var(--text-h3)] leading-none">
                  {step.title}
                </h3>
                <p className="text-pretty text-sm text-muted">{step.body}</p>
                <p className="mt-auto pt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mint-dim">
                  {step.gold ? "the human · hard gate" : "the machine"}
                </p>
              </Reveal>
            ))}
          </ol>

          <p
            className="mt-6 text-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted"
            aria-label="The loop repeats from Perceive"
          >
            <span aria-hidden="true">↺ </span>and back to Perceive
          </p>

          {/* the two guarantees that bracket every loop */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="glass-card flex items-start gap-4 p-6">
              <span className="mt-0.5 shrink-0">
                <Glyph name="shield" className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg text-text">The pharmacist gate</h3>
                <p className="mt-1 text-pretty text-sm text-muted">
                  The agent perceives, reasons, and stages. The human signs.
                  Nothing on the fill path moves without them, and controlled
                  substances are excluded from the loop entirely.
                </p>
              </div>
            </div>
            <div className="glass-card flex items-start gap-4 p-6">
              <span className="mt-0.5 shrink-0">
                <Glyph name="ledger" className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-lg text-text">The append-only log</h3>
                <p className="mt-1 text-pretty text-sm text-muted">
                  Every signed action is written once and never edited —
                  attributable after the fact, and the same trail that becomes
                  your audit-defense evidence.
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-balance text-center text-lg text-muted">
            The computer does the reading and the typing. A pharmacist still says
            yes. That is the whole design.
          </p>
        </div>
      </section>

      {/* ── ON-DEVICE STACK ────────────────────────────────────────────── */}
      <SectionShell
        id="stack"
        className="cv-auto"
        eyebrow="ON-DEVICE STACK"
        title={<>Everything that thinks runs in your building.</>}
        intro="No prescription image, card, ID, or claim is sent to a third-party AI cloud. HIPAA posture is architectural, not a policy paragraph — here is the whole stack, layer by layer."
      >
        <Reveal className="panel overflow-hidden">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              SSVP on-device stack — each layer and the technology that runs it
            </caption>
            <thead>
              <tr className="border-b border-hairline">
                <th scope="col" className="mono-label px-5 py-4 font-normal sm:px-7">
                  Layer
                </th>
                <th scope="col" className="mono-label px-5 py-4 font-normal sm:px-7">
                  Runs on device
                </th>
              </tr>
            </thead>
            <tbody>
              {STACK.map((row) => (
                <tr
                  key={row.layer}
                  className="border-b border-hairline/60 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-5 align-top font-display text-base font-medium text-text sm:px-7"
                  >
                    {row.layer}
                  </th>
                  <td className="px-5 py-5 align-top font-mono text-sm text-mint-dim sm:px-7">
                    {row.tech}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mt-8 max-w-3xl text-pretty text-lg text-muted">
          The models live on hardware you own and can point to. Nothing about a
          patient leaves the four walls of the pharmacy to make a decision.
        </p>
      </SectionShell>

      {/* ── THE DATA SPINE ─────────────────────────────────────────────── */}
      <SectionShell
        id="spine"
        className="cv-auto"
        width="wide"
        eyebrow="THE DATA SPINE"
        title={<>Three tables the loop is built on.</>}
        intro="Every module writes to and reads from the same spine. It is why the five modules compound instead of sitting side by side — and it is not something a competitor can reassemble from parts."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {DATA_SPINE.map((table, i) => {
            const isLog = table.name === "action_log";
            return (
              <Reveal
                key={table.name}
                delay={i * 0.08}
                className={`panel flex min-h-[17rem] flex-col p-6 md:p-7 ${
                  isLog ? "panel-mint" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                  {isLog && <LiveDot label="APPEND-ONLY" />}
                </div>
                <div className="mt-8 h-8 w-px bg-gradient-to-b from-mint/50 to-transparent" aria-hidden="true" />
                <h3 className="mt-4 font-mono text-lg text-mint">{table.name}</h3>
                <p className="mt-3 text-pretty text-muted">{table.body}</p>
                {isLog && (
                  <p className="mt-auto pt-5 font-mono text-xs text-mint-dim">
                    → surfaces publicly as SSVP Pulse
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl text-pretty text-lg text-muted">
          One clean record of what was bought, what was dispensed, and what was
          signed. That single record is what pays off the day an auditor calls.
        </p>
      </SectionShell>

      {/* ── PULSE ──────────────────────────────────────────────────────── */}
      <section id="pulse" className="cv-auto border-t border-hairline py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-10 flex flex-col gap-4">
            <p className="mono-label">// THE RECEIPTS</p>
            <h2 className="max-w-4xl text-balance text-[length:var(--text-h2)]">
              We don&rsquo;t sell automation —{" "}
              <span className="gradient-text">we sell receipts.</span>
            </h2>
            <p className="max-w-2xl text-pretty text-lg text-muted">
              Pulse is the public face of the append-only <code className="font-mono text-mint-dim">action_log</code>:
              a live stream of what the engine actually did, so a claim can always
              be checked against a record instead of a promise.
            </p>
          </Reveal>

          <Reveal>
            <PulseLedger count={9} />
          </Reveal>

          <p className="mx-auto mt-8 max-w-3xl text-balance text-center text-lg text-muted">
            If we say the machine typed a script or caught a shortage, the line is
            already in the ledger. You are never asked to take our word for it.
          </p>
        </div>
      </section>

      <CTABand
        title="Two kinds of seeing. One loop. Every action, on the record."
        sub="Book a working session and we'll walk the loop on your own PrimeRx screens."
      />
    </>
  );
}
