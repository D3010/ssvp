import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { StatusChip } from "@/components/ui/StatusChip";
import { Chip } from "@/components/ui/Chip";
import { PulseLine } from "@/components/ui/PulseLine";
import { ModuleDeck } from "@/components/product/ModuleDeck";
import { getModule, SHARED_SPINE, type ModuleDef } from "@/content/modules";
import { JsonLd, productJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "The five modules — SSVP AI",
  description:
    "Five jobs — typing, inventory, audit defense, insurance capture, ordering — run by one edge-bound engine that never changes how the pharmacy works. Not five tools; one invisible technician.",
  alternates: { canonical: "/product" },
};

/**
 * The shared spine, derived straight from SHARED_SPINE so the copy stays
 * single-source. The four clauses become the flow; the closing sentence is the
 * moat. Module associations per clause are page-level composition (the slugs
 * are the same relationships the spine describes).
 */
const [spineChain, ...spineRest] = SHARED_SPINE.split(". ");
const spineClauses = spineChain.split("; ");
const spineMoat = spineRest.join(". ");
const spineModulesByClause: string[][] = [
  ["auto-typing"],
  ["auto-typing", "inventory", "audit-defense"],
  ["inventory", "ordering"],
  ["insurance-capture"],
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={productJsonLd()} />

      <PageHero
        eyebrow="SSVP AI · THE FIVE MODULES"
        title="Five jobs. One invisible technician. Zero change to how the pharmacy works."
        sub="Not five tools bolted together. One engine perceives the script, reasons over it, and stages every keystroke — then a licensed pharmacist signs. Same PrimeRx. Same muscle memory. Same counter."
      />

      <SectionShell
        eyebrow="THE DECK"
        title="One engine, wearing five faces."
        intro="Each card opens the full module — what it reads, what it writes, and the gate a licensed pharmacist holds. Five surfaces, one system underneath."
        width="wide"
      >
        <ModuleDeck />
        <Reveal className="mt-12">
          <p className="max-w-2xl text-lg text-muted text-pretty">
            Put plainly: it&apos;s one new hire who already knows PrimeRx — not
            five apps your staff has to learn.
          </p>
        </Reveal>
      </SectionShell>

      <SectionShell
        id="shared-spine"
        eyebrow="ONE ENGINE, NOT FIVE TOOLS"
        title="The five don't sit side by side. They compound."
        intro="Every module makes the next one sharper. Read the spine top to bottom — each line hands its work to the one below it."
      >
        <ol className="space-y-4" aria-label="How the five modules compound">
          {spineClauses.map((clause, i) => {
            const mods = (spineModulesByClause[i] ?? [])
              .map((slug) => getModule(slug))
              .filter((m): m is ModuleDef => Boolean(m));
            return (
              <li key={clause}>
                <Reveal delay={i * 0.05}>
                  <div className="panel flex flex-col gap-5 p-6 md:flex-row md:items-center md:gap-8">
                    <div className="flex items-center gap-3 md:w-32 md:shrink-0">
                      <span className="font-mono text-sm tracking-[0.14em] text-mint-dim">
                        {`0${i + 1}`}
                      </span>
                      <PulseLine
                        variant="feed"
                        className="hidden md:block md:w-20"
                      />
                    </div>
                    <p className="text-lg text-text text-pretty [&::first-letter]:uppercase md:flex-1">
                      {clause}.
                    </p>
                    <div className="flex flex-wrap gap-2 md:max-w-[18rem] md:justify-end">
                      {mods.map((m) => (
                        <Link
                          key={m.slug}
                          href={`/product/${m.slug}`}
                          className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-obsidian/40 py-1 pl-2.5 pr-1.5 transition-colors hover:border-mint/40"
                        >
                          <Glyph name={m.glyph} className="size-4" />
                          <span className="text-sm text-text group-hover:text-mint">
                            {m.name}
                          </span>
                          <StatusChip status={m.status} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-4">
          <div className="panel flex flex-col items-center gap-5 bg-emerald-deep/70 p-8 text-center md:p-10">
            <Chip tone="mint">The moat</Chip>
            <p className="mx-auto max-w-2xl text-[length:var(--text-h3)] font-display text-text text-balance">
              {spineMoat}
            </p>
            <p className="mx-auto max-w-xl text-muted text-pretty">
              In plain terms: a rival can copy any one screen. It can&apos;t
              rebuild the live count, the clean claims, and the payer memory —
              the kind of thing that only accumulates one real operating day at a
              time.
            </p>
          </div>
        </Reveal>
      </SectionShell>

      <CTABand
        title="One engine. Five jobs. Zero change to your counter."
        sub="See the modules run on your PrimeRx, in your pharmacy, on your own hardware."
      />
    </>
  );
}
