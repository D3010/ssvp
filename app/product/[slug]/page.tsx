import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MODULES,
  getModule,
  SHARED_SPINE,
  type ModuleDef,
  type PipelineStep,
} from "@/content/modules";
import { AUDIT_TRIGGERS, HONEST_CAVEAT } from "@/content/discrepancies";
import { STATUS_LABEL } from "@/content/site.config";
import { SITE, cn } from "@/lib/utils";
import { JsonLd } from "@/lib/jsonld";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PulseLine } from "@/components/ui/PulseLine";
import { StatusChip } from "@/components/ui/StatusChip";
import { Chip, SpecChip } from "@/components/ui/Chip";
import { Glyph } from "@/components/ui/Glyph";
import { SectionShell } from "@/components/ui/SectionShell";
import { CTABand } from "@/components/sections/CTABand";
import { GoldCheck } from "@/components/verification/GoldCheck";
import { SignOffStamp } from "@/components/verification/SignOffStamp";
import { DiscrepancyMapper } from "@/components/product/DiscrepancyMapper";

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) return {};
  return {
    // absolute: bypass the "%s · SSVP AI" root template so the title reads exactly.
    title: { absolute: `${m.name} — SSVP AI` },
    description: m.heroSub,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: `${m.name} — SSVP AI`,
      description: m.heroSub,
      url: `${SITE.url}/product/${slug}`,
    },
  };
}

/* ── the module "scene" — a lightweight, server-rendered instrument panel,
   themed by the module's own glyph. No WebGL, no client JS. Decorative. ── */
function ModuleScene({ m }: { m: ModuleDef }) {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md">
      <div className="glass-card bg-dots relative flex h-full w-full items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full text-mint/15"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="200" cy="200" r="72" />
          <circle cx="200" cy="200" r="122" />
          <circle cx="200" cy="200" r="172" strokeDasharray="2 7" />
          <line x1="200" y1="18" x2="200" y2="382" strokeDasharray="2 9" />
          <line x1="18" y1="200" x2="382" y2="200" strokeDasharray="2 9" />
        </svg>
        <div className="glow-mint relative flex size-24 items-center justify-center rounded-full border border-mint/30 bg-emerald-deep/80">
          <Glyph name={m.glyph} className="!size-11" />
        </div>
        <span className="absolute left-4 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
          SSVP // OVERLAY
        </span>
        <span className="absolute right-4 top-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
          MOD {m.id}/05
        </span>
        <span className="absolute bottom-4 left-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
          {STATUS_LABEL[m.status]}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mint-dim">
          PrimeRx
        </span>
        <div className="absolute inset-x-8 bottom-10">
          <PulseLine variant="feed" />
        </div>
      </div>
    </div>
  );
}

/* ── one step of the agentic loop. step.gold marks the human-verification step,
   the only place the verification accent appears — and it appears strictly
   through the verification components (GoldCheck / SignOffStamp), never a token. ── */
function PipelineStepCard({ step }: { step: PipelineStep }) {
  const isVerify = Boolean(step.gold);
  return (
    <li
      className={cn(
        "relative flex h-full flex-col gap-3 rounded-xl border p-5",
        isVerify
          ? "border-hairline bg-emerald-deep/70 ring-1 ring-inset ring-mint/10"
          : "border-hairline bg-emerald-deep/40",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="tabular font-mono text-xs tracking-[0.18em] text-mint-dim">{step.n}</span>
        <div className="relative flex size-10 items-center justify-center rounded-lg border border-hairline bg-obsidian/60">
          <Glyph name={step.glyph} className="!size-5" />
          {isVerify && (
            <span className="absolute -right-2 -top-2">
              <GoldCheck size={20} />
            </span>
          )}
        </div>
      </div>
      <h3 className="font-display text-lg text-text">{step.title}</h3>
      <p className="text-sm text-muted text-pretty">{step.body}</p>
      {isVerify && (
        <div className="mt-auto pt-2">
          <SignOffStamp />
        </div>
      )}
    </li>
  );
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getModule(slug);
  if (!m) notFound();

  const others = MODULES.filter((x) => x.slug !== m.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${m.name} — SSVP AI`,
          description: m.heroSub,
          brand: { "@type": "Brand", name: SITE.name },
          category: "Pharmacy automation software",
          url: `${SITE.url}/product/${m.slug}`,
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black,transparent)]"
        />
        <div className="container-wide relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{m.heroEyebrow}</Eyebrow>
                <StatusChip status={m.status} />
              </div>
              <h1 className="mt-5 text-[length:var(--text-h1)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
                {m.heroHeadline}
              </h1>
              <div className="mt-6 max-w-md">
                <PulseLine variant="underline" animate />
              </div>
              <p className="mt-6 max-w-xl text-lg text-muted text-pretty md:text-xl">{m.heroSub}</p>
              <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {m.chips.map((c) => (
                  <SpecChip key={c.label} label={c.label} value={c.value} />
                ))}
              </div>
            </div>
            <ModuleScene m={m} />
          </div>
        </div>
      </section>

      {/* ── TODAY vs WITH SSVP ───────────────────────────────────────── */}
      <SectionShell
        eyebrow="TODAY VS. WITH SSVP"
        title="What changes the day it installs."
        width="wide"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="panel p-6 md:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-risk/70" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-risk">
                Today — the manual way
              </span>
            </div>
            <ul className="space-y-3.5">
              {m.today.map((line) => (
                <li key={line} className="flex gap-3 text-muted text-pretty">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-px w-4 shrink-0 bg-risk/60"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel panel-mint p-6 md:p-7">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-mint" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint">
                With SSVP
              </span>
            </div>
            <ul className="space-y-3.5">
              {m.withSsvp.map((line) => (
                <li key={line} className="flex gap-3 text-text text-pretty">
                  <Glyph name="check" className="!size-4 mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-muted text-pretty">
          Same counter, same PrimeRx, same pharmacist in charge — the keystrokes just stop being
          yours.
        </p>
      </SectionShell>

      {/* ── THE AGENTIC LOOP (pipeline rail) ─────────────────────────── */}
      <SectionShell
        eyebrow="THE AGENTIC LOOP"
        title="Perceive. Reason. Act. Verify."
        intro="Four steps, every time. The agent handles the first three; a licensed pharmacist handles the last."
        width="wide"
        className="border-t border-line"
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {m.pipeline.map((step) => (
            <PipelineStepCard key={step.n} step={step} />
          ))}
        </ol>
        <p className="mt-8 max-w-2xl text-muted text-pretty">
          The machine never signs. A licensed pharmacist does — every write is read back and
          compared before it counts.
        </p>
      </SectionShell>

      {/* ── FLAGSHIP: the Discrepancy Mapper instrument ──────────────── */}
      {m.flagship && (
        <SectionShell
          eyebrow="THE INSTRUMENT"
          title="Every discrepancy code, mapped to the document that answers it."
          intro="This mapping — code → required documents — is the product. Pick a finding, or press Play all to walk the nine."
          width="wide"
          className="cv-auto border-t border-line"
        >
          <DiscrepancyMapper />
        </SectionShell>
      )}

      {/* ── FLAGSHIP: what gets a pharmacy audited ───────────────────── */}
      {m.flagship && (
        <SectionShell
          eyebrow="WHAT GETS A PHARMACY AUDITED"
          title="Ten signals PBMs watch."
          intro="Not fear-mongering — just the patterns that pull a claim into review. The proactive queue scores your book against every one of them, daily."
          width="page"
          className="cv-auto border-t border-line"
        >
          <div className="flex flex-wrap gap-2.5">
            {AUDIT_TRIGGERS.map((t) => (
              <Chip key={t} tone="neutral">
                {t}
              </Chip>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-muted text-pretty">
            Plain version: these are the things that make a PBM come knocking. SSVP watches them for
            you, before the notice ever arrives.
          </p>
        </SectionShell>
      )}

      {/* ── WHAT IT RETURNS ──────────────────────────────────────────── */}
      <SectionShell
        eyebrow="WHAT IT RETURNS"
        title="The numbers it hands back."
        width="page"
        className="border-t border-line"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {m.returns.map((r) => (
            <div key={r.label} className="panel flex flex-col gap-2 p-6">
              <span className="tabular font-display text-4xl text-mint">{r.value}</span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── WHY IT HOLDS (callouts) ──────────────────────────────────── */}
      <SectionShell
        eyebrow="UNDER THE HOOD"
        title="Why this one holds up."
        width="page"
        className="border-t border-line"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {m.callouts.map((c) => (
            <div key={c.title} className="panel flex flex-col gap-3 p-6 md:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border border-hairline bg-obsidian/50">
                  <Glyph name={m.glyph} className="!size-4" />
                </span>
                <h3 className="font-display text-xl text-text">{c.title}</h3>
              </div>
              <p className="text-muted text-pretty">{c.body}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── FLAGSHIP: the honest caveat, verbatim ────────────────────── */}
      {m.flagship && (
        <section className="cv-auto border-t border-line py-20 md:py-28">
          <div className="container-page">
            <Reveal className="relative mx-auto max-w-3xl">
              <span aria-hidden="true" className="block font-display text-6xl leading-none text-mint/30">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-2xl leading-snug text-text text-pretty md:text-[length:var(--text-h3)]">
                {HONEST_CAVEAT}
              </blockquote>
              <footer className="mt-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-mint/40" />
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
                  The honest caveat · Module 03
                </span>
              </footer>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── ONE ENGINE, FIVE MODULES (siblings) ──────────────────────── */}
      <SectionShell
        eyebrow="ONE ENGINE, FIVE MODULES"
        title="It doesn't work alone."
        intro={SHARED_SPINE}
        width="wide"
        className="cv-auto border-t border-line"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/product/${o.slug}`}
              className="group flex h-full flex-col gap-3 rounded-xl border border-hairline bg-emerald-deep/40 p-5 transition-colors hover:border-mint/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-mint-dim">
                  MOD {o.id}/05
                </span>
                <StatusChip status={o.status} />
              </div>
              <span className="flex size-9 items-center justify-center rounded-lg border border-hairline bg-obsidian/50">
                <Glyph name={o.glyph} className="!size-4" />
              </span>
              <h3 className="font-display text-base text-text">{o.name}</h3>
              <p className="text-sm text-muted text-pretty">{o.promise}</p>
              <span className="mt-auto inline-flex items-center gap-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mint">
                Open module
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </SectionShell>

      <CTABand
        title="Want this module running on your PrimeRx?"
        sub="Book a build call and we'll scope it against your store's real volume — and show you the log it keeps."
      />
    </>
  );
}
