import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { SignOffStamp } from "@/components/verification/SignOffStamp";
import { PRINCIPLES } from "@/content/site.config";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — SSVP AI",
  description:
    "SSVP AI was built by insiders — operators who worked the counter and engineers who ship. We chose reality over demos: a verified overlay on PrimeRx, not another dashboard.",
  alternates: { canonical: "/about" },
};

/** One glyph per governing word — the machine reads, the human signs, the edge holds. */
const WORD_GLYPH = {
  Invisible: "eye",
  Verified: "check",
  "Edge-bound": "shield",
} as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="We chose reality over the demo."
        sub={
          <>
            SSVP wasn&rsquo;t dreamed up in a lab that read about pharmacy. It was
            built by insiders — the people who worked the counter and the people
            who ship production AI — around one conviction:{" "}
            <span className="text-text">
              a pharmacist&rsquo;s license shouldn&rsquo;t be spent on fax machines
              and hold music.
            </span>
          </>
        }
      />

      {/* ── THE BUILDER STORY ─────────────────────────────────────────── */}
      <SectionShell
        eyebrow="THE BUILDER"
        title="The person who scopes your system writes the code."
        intro="SSVP is founder-led by Deep Shah. There is no account manager translating your problem into a slide, then a slide into a ticket, then a ticket into something that misses the point."
      >
        <div className="max-w-3xl space-y-6 text-lg text-muted text-pretty">
          <p>
            Most pharmacy-AI companies chose the safe build: a dashboard that
            watches your claims through glass and hands you a to-do list. It demos
            beautifully. It changes nothing at 6pm when the queue is out the door
            and a payer is on hold.
          </p>
          <p>
            We chose the hard one. SSVP is a{" "}
            <span className="text-text">transparent overlay on PrimeRx</span> — it
            reads every screen, types every script, counts every bottle, and stages
            the work a technician would do. No new app to learn. No rip-and-replace.
            No permission from the PMS vendor. And no write happens until a licensed
            pharmacist signs it off.
          </p>
          <p>
            That is the whole company in one sentence:{" "}
            <span className="text-text">
              invisible in the workflow, visible in the log.
            </span>
          </p>
        </div>

        {/* The founding conviction — a signature-line moment. */}
        <figure className="mt-10 rounded-2xl border border-hairline bg-emerald-deep/40 p-8 md:p-10">
          <blockquote className="font-display text-2xl leading-snug text-balance text-text md:text-3xl">
            &ldquo;A pharmacist&rsquo;s license shouldn&rsquo;t be spent on fax
            machines and hold music.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="mono-label">
              The reason SSVP exists — your license goes to patients, not paperwork.
            </span>
            <SignOffStamp label="THE HUMAN STAYS ON THE GATE" />
          </figcaption>
        </figure>
      </SectionShell>

      {/* ── THE THREE GOVERNING WORDS ─────────────────────────────────── */}
      <SectionShell
        className="border-t border-hairline"
        width="wide"
        eyebrow="WHAT GOVERNS EVERYTHING"
        title="Three words decide every line we ship."
        intro="Not a mission statement. A specification. If a feature can't satisfy all three, it doesn't get built."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => {
            const isVerified = p.word === "Verified";
            return (
              <Reveal
                key={p.word}
                delay={i * 0.06}
                className="flex flex-col gap-5 rounded-2xl border border-hairline bg-emerald-deep/40 p-7 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <Glyph
                    name={WORD_GLYPH[p.word as keyof typeof WORD_GLYPH]}
                    className="size-7"
                  />
                  <span className="tabular font-mono text-sm text-mint-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-text">{p.word}</h3>
                <p className="text-muted text-pretty">{p.body}</p>
                {isVerified && (
                  <div className="mt-auto pt-2">
                    <SignOffStamp label="PHARMACIST-VERIFIED" />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </SectionShell>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <SectionShell className="border-t border-hairline">
        <div className="flex flex-col gap-6 rounded-2xl border border-hairline bg-emerald-deep/40 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <span className="mono-label">Talk to the builder</span>
            <h2 className="mt-3 font-display text-2xl text-text text-balance">
              No sales floor. Email the person writing the code.
            </h2>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="font-mono text-lg text-mint transition-colors hover:text-text"
          >
            {SITE.email}
          </a>
        </div>
      </SectionShell>

      <CTABand
        title="Built by insiders. Verified by a pharmacist. Yours to watch on the log."
        sub="A build call: we map your PrimeRx screens and show you exactly where the work gets done."
      />
    </>
  );
}
