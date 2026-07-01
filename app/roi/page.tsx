import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { StatusChip } from "@/components/ui/StatusChip";
import { StatWall } from "@/components/ui/StatWall";
import { ROICalculator } from "@/components/roi/ROICalculator";
import { CHIP } from "@/content/site.config";
import { ROI_BLOCKS, ROI_NOTE, MARKET_STATS } from "@/content/stats";
import { MODULES } from "@/content/modules";

export const metadata: Metadata = {
  title: "ROI — SSVP AI",
  description:
    "Your numbers, your arithmetic. Move the sliders and watch the technician hours, labor dollars, working capital, and avoided audit recoupment recompute — every figure shows its math. Priced against the pain, not the labor.",
  alternates: { canonical: "/roi" },
};

// Pricing tiers reference real modules by id — names and statuses come from
// content/modules so the page can never overstate what ships.
const CORE_IDS = ["01", "02", "04", "05"] as const;
const coreModules = MODULES.filter((m) => (CORE_IDS as readonly string[]).includes(m.id));
const auditModule = MODULES.find((m) => m.id === "03");
const fullSuite = MODULES;

export default function ROIPage() {
  return (
    <>
      {/* ── Hero = the calculator ────────────────────────────────────── */}
      <PageHero
        eyebrow="ROI · YOUR NUMBERS, YOUR ARITHMETIC"
        title={
          <>
            Every dollar here <span className="text-mint">shows its work.</span>
          </>
        }
        sub="No email gate, no black box. Move the sliders and the arithmetic recomputes in front of you. These are illustrative models — re-run them with your store's real volumes and check the multiplication by hand."
      >
        <div className="mt-12 md:mt-16">
          <ROICalculator />
        </div>
      </PageHero>

      {/* ── The four illustrative blocks ─────────────────────────────── */}
      <SectionShell
        eyebrow="ILLUSTRATIVE MODEL"
        title="Four ways it pays for itself."
        intro="Each figure below is a worked example at 150 scripts a day — the arithmetic is printed under it, not hidden inside a spreadsheet."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROI_BLOCKS.map((b, i) => (
            <Reveal
              key={b.label}
              delay={i * 0.05}
              className="panel flex h-full flex-col gap-3 p-6"
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
                {String(i + 1).padStart(2, "0")} / {String(ROI_BLOCKS.length).padStart(2, "0")}
              </span>
              <span className="tabular text-[clamp(1.75rem,3vw,2.5rem)] leading-none text-mint">
                {b.value}
              </span>
              <span className="text-sm font-medium text-text">{b.label}</span>
              <p className="mt-auto pt-2 text-sm text-muted text-pretty">{b.arithmetic}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Chip tone="outline">{CHIP.illustrative}</Chip>
          <p className="text-sm text-muted text-pretty">{ROI_NOTE}</p>
        </Reveal>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          Add these up and the machine has usually paid for a year before the first audit letter
          ever lands.
        </p>
      </SectionShell>

      {/* ── Pricing architecture — three tiers ───────────────────────── */}
      <SectionShell
        eyebrow="PRICING"
        title="Priced against the pain — not the labor."
        intro="We don't meter API calls or charge per seat. Each tier is a flat monthly retainer, sized against the money you stop losing — so you can put it on one line and know exactly what it is."
        width="wide"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Tier 01 — Core Technician */}
          <Tier
            index="01"
            name="Core Technician"
            blurb="The everyday machine: it reads, types, counts, captures, and reorders — all inside PrimeRx. Priced against the technician hours you stop paying for, per store, per month."
            modules={coreModules}
            priceLead="Low-four-figures monthly retainer"
            priceDetail="Per store. Scales down as your group grows."
          />

          {/* Tier 02 — Audit Shield */}
          <Tier
            index="02"
            name="Audit Shield"
            blurb="Module 03 run as a standing defense against PBM recoupment. Priced against one bad audit — a flat retainer, or a share of the recoupment you avoid. Pick whichever your CFO sleeps better with."
            modules={auditModule ? [auditModule] : []}
            priceLead="Flat retainer — priced against one bad audit"
            priceDetail="Or a share of recoupment avoided."
          />

          {/* Tier 03 — Full Suite (the default pitch) */}
          <Tier
            index="03"
            name="Full Suite"
            featured
            blurb="Everything, billed as one line item — the default pitch. The full technician plus audit defense, as a single monthly number you can put in front of a partner on one page."
            modules={fullSuite}
            priceLead="One line item — low-four-figures monthly retainer"
            priceDetail="The whole engine. One number, priced against the pain it removes."
          />
        </div>

        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          No per-seat math, no metered usage, no setup surprise. One retainer, and it costs less than
          the problem it takes off your plate.
        </p>
      </SectionShell>

      {/* ── Market strip ─────────────────────────────────────────────── */}
      <SectionShell
        eyebrow="MARKET"
        title="Why the math keeps compounding."
        intro="The same engine runs across a large, addressable market — and because every claim stays auditable for years, the protection it sells is recurring, not one-and-done."
      >
        <StatWall stats={MARKET_STATS} />
        <p className="mt-10 max-w-2xl text-lg text-muted text-pretty">
          Thousands of stores, years of auditable claims, and one engine that keeps earning its
          keep — that is why the numbers only grow from here.
        </p>
      </SectionShell>

      <CTABand
        title="Run the numbers. Then bring us your real ones."
        sub="Every figure on this page shows its arithmetic. Book a build call and we'll re-run it against your store's actual volumes."
      />
    </>
  );
}

/** One pricing tier card. Lists real modules with their live StatusChips, then
 *  the pain-based price framing — never an invented dollar figure. */
function Tier({
  index,
  name,
  blurb,
  modules,
  priceLead,
  priceDetail,
  featured = false,
}: {
  index: string;
  name: string;
  blurb: string;
  modules: (typeof MODULES)[number][];
  priceLead: string;
  priceDetail: string;
  featured?: boolean;
}) {
  return (
    <Reveal
      className={[
        "panel flex h-full flex-col p-7 md:p-8",
        featured && "panel-mint",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint-dim">
          Tier {index}
        </span>
        {featured && (
          <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-mint">
            Default pitch
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[length:var(--text-h3)] leading-tight text-text">{name}</h3>
      <p className="mt-3 text-muted text-pretty">{blurb}</p>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-hairline pt-6">
        {modules.map((m) => (
          <li key={m.id} className="flex items-center justify-between gap-3">
            <span className="text-sm text-text">
              <span className="font-mono text-mint-dim">{m.id}</span> {m.name}
            </span>
            <StatusChip status={m.status} />
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint-dim">
          Priced against the pain
        </span>
        <p className="mt-1.5 text-lg font-medium text-text text-pretty">{priceLead}</p>
        <p className="mt-1 text-sm text-muted text-pretty">{priceDetail}</p>
      </div>
    </Reveal>
  );
}
