import type { Metadata } from "next";
import type { Glyph as GlyphName } from "@/content/modules";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a build call — SSVP AI",
  description:
    "Twenty minutes on your PrimeRx and the workflow costing you the most. You leave with a straight answer about what we'd build first and what it's worth — not a pitch deck. Pick a time, or send the details by email.",
  alternates: { canonical: "/book" },
};

const NEXT_STEPS: { glyph: GlyphName; title: string; body: string }[] = [
  {
    glyph: "eye",
    title: "You show us the screen",
    body: "On the call, walk us through the PrimeRx workflow that eats the most hours — typing, counting, chasing insurance, answering an audit. Whatever hurts.",
  },
  {
    glyph: "bulb",
    title: "We map it to a module",
    body: "We match the pain to the module that answers it — auto-typing, inventory, audit defense, insurance capture, or ordering — and tell you honestly how far along it is.",
  },
  {
    glyph: "ledger",
    title: "You get a system and an ROI model",
    body: "Usually within a day, you get a short write-up of what we'd install first and a rough ROI model run against your own numbers — not ours.",
  },
  {
    glyph: "check",
    title: "If it fits, we scope a pilot",
    body: "One PrimeRx store, a pharmacist on the gate, and an accuracy bar you set. No obligation to get there — the call is worth having either way.",
  },
];

export default function BookPage() {
  const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL;

  return (
    <>
      <PageHero
        eyebrow="BOOK A BUILD CALL"
        title={
          <>
            Show us the screen.{" "}
            <span className="text-mint">We&apos;ll show you the build.</span>
          </>
        }
        sub="Twenty minutes on your PrimeRx and the workflow costing you the most. You leave with a straight answer about what we'd build first and what it's worth — not a pitch deck, not a demo of someone else's store."
      />

      {/* ── The scheduler (only when a Cal.com URL is configured) ─────── */}
      {calUrl && (
        <SectionShell
          eyebrow="PICK A TIME"
          title="Grab a slot that works."
          intro="Straight onto the calendar. If nothing fits, the email path below reaches the same person."
        >
          <Reveal className="overflow-hidden rounded-[var(--radius-card)] border border-hairline bg-emerald-deep/20">
            <iframe
              src={calUrl}
              title="Book a build call with SSVP AI"
              loading="lazy"
              className="h-[72vh] min-h-[640px] w-full"
            />
          </Reveal>
        </SectionShell>
      )}

      {/* ── What happens next ────────────────────────────────────────── */}
      <SectionShell
        eyebrow="WHAT HAPPENS NEXT"
        title="No pitch. A plan."
        intro="Every build call runs the same way — from the screen you're staring at to a number you can check."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {NEXT_STEPS.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.05}
              className="panel flex h-full flex-col p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-emerald-deep/50">
                  <Glyph name={step.glyph} />
                </span>
                <span className="font-mono text-xs tabular text-mint-dim">
                  {String(i + 1).padStart(2, "0")} / 04
                </span>
              </div>
              <h3 className="mt-6 text-[length:var(--text-h3)] leading-tight text-text">
                {step.title}
              </h3>
              <p className="mt-3 text-muted text-pretty">{step.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          You walk away knowing exactly what we&apos;d build first and roughly
          what it&apos;s worth &mdash; whether or not you ever sign anything.
        </p>
      </SectionShell>

      {/* ── Email fallback — always present, the reliable path ────────── */}
      <SectionShell
        id="email"
        eyebrow="RELIABLE PATH"
        title="Prefer email? Send the details."
        intro={
          calUrl
            ? "Can't find a time, or would rather write it out? Send the workflow and your numbers and we'll come back with times and a first read — usually within a day."
            : "Send the workflow that's eating your hours and your rough numbers. It reaches the founder directly, and we'll come back with times and a first read — usually within a day."
        }
      >
        <div className="max-w-2xl">
          <ContactForm />
        </div>

        <p className="mt-8 font-mono text-sm text-mint-dim">
          Or reach us straight at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-mint underline underline-offset-4 hover:text-text"
          >
            {SITE.email}
          </a>
          .
        </p>
      </SectionShell>
    </>
  );
}
