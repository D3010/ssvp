import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { Glyph } from "@/components/ui/Glyph";
import { Button } from "@/components/ui/Button";
import { CHIP } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Services — SSVP AI",
  description:
    "The broader systems SSVP builds for existing clients — voice agents, outreach, and workflow automation. Secondary to the pharmacy product, and built on the same engine.",
  alternates: { canonical: "/services" },
};

/** Legacy engagements — the engine before it had a pharmacy on it. */
const SERVICES = [
  {
    glyph: "type",
    name: "Voice agents",
    body: "Phone systems that answer, triage, and handle real call volume in the caller's own words — the same edge-inference stack that now reads a PrimeRx screen.",
  },
  {
    glyph: "chart",
    name: "Outreach & lifecycle",
    body: "Email and messaging pipelines wired into your own data — deliverability, sequencing, and follow-through that a spreadsheet and a person can't keep up with.",
  },
  {
    glyph: "bolt",
    name: "Workflow automation",
    body: "The unglamorous glue: moving structured work between systems that were never meant to talk, with a log of every step so nothing happens off the record.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="The engine has a day job beyond the pharmacy."
        sub={
          <>
            Before SSVP was an invisible technician for PrimeRx, it was an
            engineering shop that built production automation. We still do that for
            existing clients — but make no mistake:{" "}
            <span className="text-text">the pharmacy product is the company.</span>{" "}
            This page is here for the people who knew us first.
          </>
        }
      />

      <SectionShell
        eyebrow="LEGACY ENGAGEMENTS"
        title="Three things we build when the problem isn't a pharmacy."
        intro="Same discipline as the product: edge-first where it matters, a log for everything, and the builder in the room instead of an account manager."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.name}
              delay={i * 0.06}
              className="flex flex-col gap-5 rounded-2xl border border-hairline bg-emerald-deep/40 p-7 md:p-8"
            >
              <Glyph name={s.glyph} className="size-7" />
              <h3 className="font-display text-xl text-text">{s.name}</h3>
              <p className="text-muted text-pretty">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* ── EXPANSION PATH ────────────────────────────────────────────── */}
      <SectionShell className="border-t border-hairline">
        <div className="rounded-2xl border border-mint/25 bg-emerald-deep/50 p-8 md:p-10">
          <Chip tone="mint">{CHIP.expansion}</Chip>
          <h2 className="mt-5 max-w-2xl font-display text-2xl text-text text-balance md:text-3xl">
            The overlay isn&rsquo;t married to PrimeRx.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted text-pretty">
            The write-access map is the moat, and it&rsquo;s a technique, not a
            single integration. Point the same perception-reason-verify engine at
            another pharmacy management system and the only new work is the UIA
            map — the screens change, the discipline doesn&rsquo;t. PrimeRx is
            where we start, not the ceiling.
          </p>
          <p className="mt-4 max-w-2xl text-muted text-pretty">
            In plain terms: if you run a different PMS, the answer is &ldquo;not
            yet&rdquo; — not &ldquo;never.&rdquo;
          </p>
        </div>
      </SectionShell>

      {/* ── BACK TO THE MAIN EVENT ────────────────────────────────────── */}
      <SectionShell className="border-t border-hairline">
        <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-emerald-deep/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <span className="mono-label">Where the focus really is</span>
            <h2 className="mt-3 font-display text-2xl text-text text-balance">
              Here for the pharmacy product? That&rsquo;s the front door.
            </h2>
          </div>
          <Button href="/product" variant="secondary" size="lg">
            See the five modules
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </SectionShell>

      <CTABand />
    </>
  );
}
