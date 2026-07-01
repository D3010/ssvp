import type { Metadata } from "next";
import type { Glyph as GlyphName } from "@/content/modules";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { SignOffStamp } from "@/components/verification/SignOffStamp";
import { RiskAccordion } from "@/components/security/RiskAccordion";
import {
  COMMITMENTS,
  OPERATING_AUTHORITY,
  RISK_REGISTER,
  STACK,
} from "@/content/security";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Security — SSVP AI",
  description:
    "How SSVP stays invisible in the PrimeRx workflow and visible in the log: a licensed-pharmacist gate on every fill-path action, edge-only PHI, controlled substances excluded from automation, and verified writes on an append-only trail.",
  alternates: { canonical: "/security" },
};

/** One glyph per commitment, in COMMITMENTS order. Machine-mint labels only —
 *  the single gold mark on this page belongs to the pharmacist gate. */
const COMMITMENT_GLYPHS: GlyphName[] = ["check", "shield", "bottle", "ledger"];

/* Split the verbatim operating-authority statement so the closing sentence can
 * carry the pull-quote — the two slices concatenate back to the original. */
const AUTHORITY_PUNCH_AT = OPERATING_AUTHORITY.indexOf("Headless");
const authorityLead =
  AUTHORITY_PUNCH_AT > 0
    ? OPERATING_AUTHORITY.slice(0, AUTHORITY_PUNCH_AT).trim()
    : OPERATING_AUTHORITY;
const authorityPunch =
  AUTHORITY_PUNCH_AT > 0 ? OPERATING_AUTHORITY.slice(AUTHORITY_PUNCH_AT) : "";

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="TRUST"
        title={
          <>
            Invisible in the workflow.{" "}
            <span className="text-mint">Visible in the log.</span>
          </>
        }
        sub="A licensed pharmacist gates every action on the fill path. Every model runs on the pharmacy's own hardware, so prescription images, cards, and claims never leave the building. Controlled substances stay out of automation entirely. And every write is read back before it counts."
      />

      {/* ── The four commitments ─────────────────────────────────────── */}
      <SectionShell
        eyebrow="COMMITMENTS"
        title="Four commitments, designed in — not bolted on."
        intro="None of these are policy paragraphs you have to take on faith. Each is a decision baked into how the system is built, so it holds whether or not anyone is watching."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {COMMITMENTS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.05}
              className="panel flex h-full flex-col p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
                  <Glyph name={COMMITMENT_GLYPHS[i] ?? "check"} />
                </span>
                <span className="font-mono text-xs tabular text-mint-dim">
                  {String(i + 1).padStart(2, "0")} / {String(COMMITMENTS.length).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-[length:var(--text-h3)] leading-tight text-text">
                {c.title}
              </h3>
              <p className="mt-3 text-muted text-pretty">{c.body}</p>

              {c.human && (
                <div className="mt-auto flex flex-col gap-3 pt-7">
                  <SignOffStamp />
                  <p className="text-sm text-muted text-pretty">
                    This is the one place a person — not the machine — has the
                    final say.
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          Read together: the machine does the work, and a licensed human owns
          the outcome.
        </p>
      </SectionShell>

      {/* ── Operating authority — the paper pull-quote ───────────────── */}
      <section className="border-y border-hairline">
        <div className="container-page py-20 md:py-28">
          <Reveal className="paper rounded-[var(--radius-card)] px-6 py-16 md:px-16 md:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/60">
              Operating authority
            </p>
            <blockquote className="mt-8 max-w-4xl">
              <p className="text-lg text-ink/70 text-pretty md:text-xl">
                {authorityLead}
              </p>
              {authorityPunch && (
                <p className="mt-6 font-display text-[length:var(--text-h3)] font-medium leading-tight text-ink text-balance">
                  {authorityPunch}
                </p>
              )}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── Risk register ────────────────────────────────────────────── */}
      <SectionShell
        eyebrow="RISK REGISTER"
        title="Five ways this could go wrong. Five brakes."
        intro="Every automation carries risk. Here is the honest list of what could fail — and exactly what stops it from reaching a patient or a claim."
      >
        <RiskAccordion rows={RISK_REGISTER} />
      </SectionShell>

      {/* ── The stack + BAA note ─────────────────────────────────────── */}
      <SectionShell
        eyebrow="PLATFORM"
        title="Every model on your hardware."
        intro="The whole stack runs on the pharmacy's own machines. Nothing about a patient leaves the building to make the software work."
      >
        <Reveal className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-emerald-deep/20">
          <dl className="divide-y divide-hairline">
            {STACK.map((s) => (
              <div
                key={s.layer}
                className="grid grid-cols-1 gap-1 px-5 py-4 md:grid-cols-[240px_1fr] md:items-baseline md:px-8 md:py-5"
              >
                <dt className="font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-mint-dim">
                  {s.layer}
                </dt>
                <dd className="font-mono text-sm text-text md:text-base">
                  {s.tech}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="panel mt-6 flex flex-col gap-4 p-7 md:flex-row md:items-start md:gap-6 md:p-8">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
            <Glyph name="shield" />
          </span>
          <div className="space-y-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
              Business Associate Agreement
            </span>
            <p className="text-muted text-pretty">
              Because every model runs on-premise, no prescription image,
              insurance card, or claim is ever sent to a third-party AI cloud —
              there is no external model provider handling your patients' data,
              and nothing to intercept in transit. Where {SITE.legalName} would
              qualify as a business associate under HIPAA, a Business Associate
              Agreement is executed before go-live.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-14 max-w-3xl">
          <p className="font-display text-[length:var(--text-h3)] leading-tight text-text text-balance">
            Built to be shown to a board of pharmacy, not hidden from one.
          </p>
        </Reveal>
      </SectionShell>

      <CTABand
        sub="Bring your compliance questions. Every commitment on this page is in the architecture — and in the log."
      />
    </>
  );
}
