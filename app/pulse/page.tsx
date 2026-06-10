import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { PulseTicker } from "@/components/pulse/PulseTicker";
import { PulseDashboard } from "@/components/pulse/PulseDashboard";
import { PulseLine } from "@/components/ui/PulseLine";
import { LiveDot } from "@/components/ui/LiveDot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "SSVP Pulse — The Proof Ledger",
  description:
    "Every system SSVP ships streams its results — calls answered, hours saved, revenue recovered — to a live dashboard. We don't sell automation. We sell receipts.",
  alternates: { canonical: "/pulse" },
};

const LAYERS = [
  {
    n: "01",
    title: "Client layer",
    body: "Every client gets a private, real-time ROI dashboard: what your automation did today, this week, all-time — in money and minutes, not impressions.",
  },
  {
    n: "02",
    title: "Public layer",
    body: "The numbers on this page are real aggregate output across SSVP systems, anonymized. They go up while you read.",
  },
  {
    n: "03",
    title: "Pricing layer",
    body: "Outcome-aligned engagements. A portion of every fee is tied to metrics Pulse verifies. If it doesn't move, you don't pay for the part that didn't.",
  },
];

export default function PulsePage() {
  return (
    <>
      <PageHero
        eyebrow="PROOF LEDGER"
        eyebrowAccent="pulse"
        title="Every system we ship streams its results."
        sub="Most agencies tell you it worked. We show you, in real time, in dollars and hours. This is the ledger."
        aside={
          <div className="flex items-center justify-start lg:justify-end">
            <LiveDot />
          </div>
        }
      >
        <div className="mt-12">
          <PulseLine variant="divider" animate />
        </div>
      </PageHero>

      {/* aggregate */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <Reveal>
            <PulseTicker
              range="all"
              keys={["callsAnswered", "hoursSaved", "messagesDelivered", "revenueRecovered"]}
            />
          </Reveal>
        </div>
      </section>

      {/* three layers */}
      <section className="border-y border-line bg-surface/20 py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-12 max-w-2xl">
            <Eyebrow>THREE LAYERS</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              Proof for the client, the market, and the invoice.
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
            {LAYERS.map((layer, i) => (
              <Reveal key={layer.n} delay={i * 0.06} className="flex flex-col gap-4 bg-base p-7">
                <span className="tabular font-mono text-sm text-pulse">{layer.n}</span>
                <h3 className="font-display text-xl font-semibold text-text">{layer.title}</h3>
                <p className="text-[0.95rem] text-muted text-pretty">{layer.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* interactive demo dashboard */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <Reveal className="mb-10 max-w-2xl">
            <Eyebrow accent="pulse">INTERACTIVE DEMO</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              The same dashboard your systems report to.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <PulseDashboard />
          </Reveal>
        </div>
      </section>

      {/* API contract */}
      <section className="border-t border-line bg-surface/20 py-20 md:py-28">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal>
            <Eyebrow>THE CONTRACT</Eyebrow>
            <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
              Built to be replaced by real telemetry.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted text-pretty">
              The public ticker runs on seeded data today and a documented API
              tomorrow — same component, same{" "}
              <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-ice">
                PulseMetric
              </code>{" "}
              contract. When your systems go live, your real telemetry flows into
              the exact dashboard you&apos;re looking at.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-base">
              <div className="flex items-center gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5 font-mono text-xs text-muted">
                <span className="size-2.5 rounded-full bg-pulse/40" />
                <span>GET /api/pulse</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed text-muted">
                <code>{`interface PulseMetric {
  id: string
  ts: string
  system: "voice-agent" | "email"
        | "workflow" | "outreach"
  event: string
  valueUsd?: number
  durationMin?: number
  kind: "call" | "reply" | "delivery"
      | "refill" | "hours-saved"
}

// → { range, aggregate, metrics, source }
//   source: "seed" → "telemetry"`}</code>
              </pre>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand sub="A portion of every fee is tied to what Pulse verifies. Let's build something worth measuring." />
    </>
  );
}
