import type { Metadata } from "next";
import Link from "next/link";
import GlassSceneMount from "@/components/scenes/GlassSceneMount";
import { GlassPoster } from "@/components/scenes/GlassPoster";
import { OverlaySimulator } from "@/components/home/OverlaySimulator";
import { PulseLedger } from "@/components/pulse/PulseLedger";
import { ModuleDeck } from "@/components/product/ModuleDeck";
import { StatWall } from "@/components/ui/StatWall";
import { FAQ } from "@/components/ui/FAQ";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionShell } from "@/components/ui/SectionShell";
import { Glyph } from "@/components/ui/Glyph";
import { PulseLine } from "@/components/ui/PulseLine";
import { GoldCheck } from "@/components/verification/GoldCheck";
import { SignOffStamp } from "@/components/verification/SignOffStamp";
import { PRINCIPLES, TRUST_STRIP } from "@/content/site.config";
import { AUDIT_STATS } from "@/content/stats";
import { DASHBOARDS_VS_HANDS } from "@/content/moats";
import { FAQS } from "@/content/faq";
import { SITE, cn } from "@/lib/utils";
import { JsonLd, productJsonLd, faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "SSVP AI — The Invisible Technician for PrimeRx pharmacies",
  description: SITE.description,
};

export default function Home() {
  return (
    <>
      <JsonLd data={productJsonLd()} />
      <JsonLd data={faqJsonLd(FAQS)} />

      {/* CH1 — THE GLASS */}
      <section className="relative min-h-[100svh] overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 bg-dots opacity-70" aria-hidden="true" />
        <div className="absolute inset-0">
          <GlassSceneMount poster={<GlassPoster />} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent,rgb(7_20_16/0.55)_75%,rgb(7_20_16/0.9))]" aria-hidden="true" />
        <div className="container-page relative z-10 flex min-h-[100svh] flex-col justify-center py-28">
          <Eyebrow accent="pulse" className="animate-rise">SSVP AI · AN AI TECHNICIAN FOR PRIMERX</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[length:var(--text-display)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
            <span className="block animate-rise" style={{ animationDelay: "0.08s" }}>The best technician</span>
            <span className="block animate-rise text-mint" style={{ animationDelay: "0.18s" }}>you&apos;ll never see.</span>
          </h1>
          <p className="mt-7 max-w-2xl animate-rise text-lg text-muted text-pretty md:text-xl" style={{ animationDelay: "0.28s" }}>
            An AI technician that runs unseen on top of PrimeRx — reading every screen, typing every script, counting every bottle, and keeping the money the pharmacy is about to lose.
          </p>
          <div className="mt-9 flex animate-rise flex-col gap-4 sm:flex-row" style={{ animationDelay: "0.36s" }}>
            <Button href="/book" size="lg">Book a build call <span aria-hidden>→</span></Button>
            <Button href="#watch" variant="secondary" size="lg">Watch it work</Button>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-mint-dim">
            {TRUST_STRIP.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-mint-dim" aria-hidden />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CH2 — THE ONE-LINER */}
      <section className="border-b border-hairline py-32 md:py-48">
        <div className="container-page">
          <Reveal>
            <p className="max-w-5xl text-[length:var(--text-h1)] font-display leading-[1.04] tracking-[-0.02em] text-balance">
              They help you fill faster. <span className="text-mint">We make sure you keep the money — and survive the audit.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CH3 — TWO SIDES OF ONE COUNTER */}
      <SectionShell
        eyebrow="TWO SIDES OF ONE COUNTER"
        title="Front of house is the race to fill. Back of house is where money is kept or lost."
        width="wide"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="panel p-7">
            <div className="mono-label !text-mint">FRONT OF HOUSE — the race to fill</div>
            <ul className="mt-5 space-y-3 font-mono text-sm text-text">
              {["Intake", "Typing", "Adjudication", "Refill calls"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-mint" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Fast, visible, and where every funded competitor fights.</p>
          </Reveal>
          <Reveal delay={0.08} className="panel p-7">
            <div className="mono-label !text-risk">BACK OF HOUSE — where money is kept or lost</div>
            <ul className="mt-5 space-y-3 font-mono text-sm text-text">
              {["Cash tied up on the shelf", "Rejected claims", "The PBM audit clock", "Invoice-shortage drift"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-risk" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Slow, invisible, and where the business is actually won or lost.</p>
          </Reveal>
        </div>
        <p className="mt-8 max-w-2xl text-lg text-text text-pretty">
          Every funded competitor is fighting on the front. <span className="text-mint">SSVP does both.</span>
        </p>
      </SectionShell>

      {/* CH4 — THE FIVE */}
      <SectionShell
        eyebrow="THE FIVE MODULES"
        title="Five jobs. One invisible technician. Zero change to how the pharmacy works."
        width="wide"
      >
        <ModuleDeck />
      </SectionShell>

      {/* CH5 — WATCH IT WORK */}
      <section id="watch" className="scroll-mt-24 border-y border-hairline bg-emerald-deep/20 py-20 md:py-28">
        <div className="container-page">
          <Reveal className="mb-10 flex flex-col gap-4">
            <Eyebrow accent="pulse">WATCH IT WORK</Eyebrow>
            <h2 className="max-w-3xl text-[length:var(--text-h2)] text-balance">
              The agent stages every field. Your pharmacist presses the gold button.
            </h2>
            <p className="max-w-2xl text-lg text-muted text-pretty">
              A faithful-but-abstract PrimeRx window. Watch a script get read, typed, and read back — then sign it off yourself.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <OverlaySimulator />
          </Reveal>
        </div>
      </section>

      {/* CH6 — THE LOOP */}
      <SectionShell
        eyebrow="THE LOOP"
        title="Perceive. Reason. Act. Verify. Every action written to an append-only log."
        intro="The same trail that becomes the audit defense."
        width="wide"
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { g: "eye" as const, t: "Perceive", b: "Read the screen and the document as structured data — not pixels." },
            { g: "bulb" as const, t: "Reason", b: "Parse the sig, resolve the NDC, rank the exposure, stage the change." },
            { g: "bolt" as const, t: "Act", b: "Key the fields into PrimeRx via UI automation, then read them back." },
            { g: "check" as const, t: "Verify", b: "A licensed pharmacist signs. Nothing counts until they do.", gold: true },
          ].map((n, i) => (
            <Reveal key={n.t} delay={i * 0.06} className={cn("panel p-6", n.gold && "panel-gold")}>
              <div className="flex size-11 items-center justify-center rounded-lg border border-hairline bg-obsidian/50">
                <Glyph name={n.g} gold={n.gold} />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-[0.6875rem] text-mint-dim">0{i + 1}</span>
                <h3 className="font-display text-lg text-text">{n.t}</h3>
                {n.gold && <GoldCheck size={16} />}
              </div>
              <p className="mt-2 text-sm text-muted text-pretty">{n.b}</p>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* CH7 — DASHBOARDS VS HANDS */}
      <section className="border-y border-hairline py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-10">
            <Eyebrow>THE MOAT</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[length:var(--text-h2)] text-balance">
              Everyone can see the opportunity. Nobody else can act on it.
            </h2>
          </Reveal>
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal className="panel p-8">
              <div className="mono-label">{DASHBOARDS_VS_HANDS.competitor.title}</div>
              <ul className="mt-5 space-y-3">
                {DASHBOARDS_VS_HANDS.competitor.lines.map((l) => (
                  <li key={l} className="text-lg text-muted">{l}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="panel panel-mint p-8">
              <div className="mono-label !text-mint">{DASHBOARDS_VS_HANDS.ssvp.title}</div>
              <ul className="mt-5 space-y-3">
                {DASHBOARDS_VS_HANDS.ssvp.lines.map((l) => (
                  <li key={l} className="text-lg text-text">{l}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="mt-8">
            <Link href="/why-ssvp" className="font-mono text-sm uppercase tracking-[0.12em] text-mint hover:text-text">
              See the map, honestly drawn →
            </Link>
          </div>
        </div>
      </section>

      {/* CH8 — THE NUMBERS (paper interlude) */}
      <section className="paper py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-10">
            <p className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-ink/60">// THE NUMBERS</p>
            <h2 className="mt-4 max-w-3xl text-[length:var(--text-h2)] text-ink text-balance">
              The audit that can claw back a year of profit in two weeks.
            </h2>
          </Reveal>
          <StatWall stats={AUDIT_STATS} paper />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/roi" size="md">Run the numbers <span aria-hidden>→</span></Button>
            <span className="text-sm text-ink/60">Illustrative — arithmetic shown on the ROI page.</span>
          </div>
        </div>
      </section>

      {/* CH9 — TRUST + PULSE */}
      <SectionShell
        eyebrow="TRUST"
        title={<>Invisible in the workflow. <span className="text-mint">Visible in the log.</span></>}
        width="wide"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.word} delay={i * 0.06} className="panel p-6">
                <h3 className="font-display text-xl text-text">{p.word}</h3>
                <p className="mt-3 text-sm text-muted text-pretty">{p.body}</p>
              </Reveal>
            ))}
            <Reveal delay={0.18} className="panel p-6">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-text">Signed</h3>
                <GoldCheck size={18} />
              </div>
              <p className="mt-3 text-sm text-muted text-pretty">
                Every write is read back and compared. A licensed pharmacist is a hard gate on every action.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <PulseLedger count={8} />
            <p className="mt-3 text-xs text-muted">
              &ldquo;We don&apos;t sell automation — we sell receipts.&rdquo; The public face of the append-only action_log.
            </p>
          </Reveal>
        </div>
        <div className="mt-8">
          <Link href="/security" className="font-mono text-sm uppercase tracking-[0.12em] text-mint hover:text-text">
            How the pharmacist gate, edge PHI, and CS exclusion work →
          </Link>
        </div>
      </SectionShell>

      {/* CH10 — FROM INSTALL TO INVISIBLE */}
      <section className="border-y border-hairline py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-10">
            <Eyebrow>FROM INSTALL TO INVISIBLE</Eyebrow>
            <h2 className="mt-4 max-w-3xl text-[length:var(--text-h2)] text-balance">
              Four stages, and then the technician disappears into the workflow.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { n: "01", t: "Install & map", b: "We build your store's UIA map. Nothing acts yet." },
              { n: "02", t: "Shadow mode", b: "Reads only. The ledger starts accruing." },
              { n: "03", t: "Assisted mode", b: "The agent stages; your pharmacist signs everything.", gold: true },
              { n: "04", t: "Steady state", b: "The technician disappears into the workflow. The log stays visible." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06} className={cn("panel p-6", s.gold && "panel-gold")}>
                <span className="font-mono text-2xl text-mint-dim">{s.n}</span>
                <div className="mt-3 flex items-center gap-2">
                  <h3 className="font-display text-lg text-text">{s.t}</h3>
                </div>
                <p className="mt-2 text-sm text-muted text-pretty">{s.b}</p>
                {s.gold && <div className="mt-4"><SignOffStamp label="PHARMACIST SIGNS" /></div>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SectionShell eyebrow="QUESTIONS" title="What a pharmacy owner actually asks at 11pm.">
        <div className="max-w-3xl">
          <FAQ items={FAQS} />
        </div>
      </SectionShell>

      {/* CH11 — THE ASK */}
      <section className="border-t border-hairline py-24 md:py-32">
        <div className="container-page text-center">
          <Reveal className="mx-auto max-w-3xl">
            <div className="mx-auto mb-8 max-w-sm">
              <PulseLine variant="converge" animate />
            </div>
            <h2 className="text-[length:var(--text-h2)] text-balance">3–5 pilot pharmacies. One invisible technician.</h2>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/pilot" size="lg">Apply for the pilot <span aria-hidden>→</span></Button>
              <Button href="/book" variant="secondary" size="lg">Book a build call</Button>
            </div>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-mint-dim">
              Buying group, wholesaler, or investor? <Link href="/investors" className="text-mint hover:text-text">Start here →</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
