"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { PulseLine } from "@/components/ui/PulseLine";
import { HeroDashboard } from "@/components/pulse/HeroDashboard";

/**
 * The orchestrated hero load sequence:
 *   headline mask-reveal → subhead fade → dashboard rises → sparkline draws.
 * Reduced-motion → everything renders at final state instantly.
 */
const PROOF_CHIPS = [
  "78% → 90% deliverability",
  "2-ring answer",
  "HIPAA-aware",
];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.05 } },
  };
  const lineUp = {
    hidden: { y: reduce ? 0 : "115%" },
    show: { y: "0%", transition: { duration: 0.65, ease } },
  };
  const fade = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* ── layered backdrop ──────────────────────────────────────────── */}
      {/* drifting green aurora, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[20%] size-[820px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-pulse)_16%,transparent),transparent_60%)] blur-2xl animate-aurora"
      />
      {/* faint ice counter-glow, lower-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] -left-[10%] size-[640px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-ice)_10%,transparent),transparent_60%)] blur-2xl"
      />
      {/* instrument grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-fine radial-fade opacity-60" />
      {/* film grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-screen" />
      {/* settle into the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* ── copy ──────────────────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              variants={fade}
              className="inline-flex items-center gap-2 rounded-full border border-pulse/20 bg-pulse/[0.06] px-3 py-1"
            >
              <span className="size-1.5 rounded-full bg-pulse animate-breathe" />
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pulse">
                AI systems that do real work
              </span>
            </motion.div>

            <h1 className="mt-6 text-[length:var(--text-display)] font-semibold leading-[0.95] tracking-[-0.035em]">
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  Automation
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  you can audit.
                </motion.span>
              </span>
            </h1>

            <motion.div variants={fade} className="mt-5 max-w-md">
              <PulseLine variant="underline" animate={!reduce} />
            </motion.div>

            <motion.p variants={fade} className="mt-6 max-w-lg text-lg text-muted text-pretty">
              SSVP designs, builds, and runs AI systems for healthcare and revenue
              teams — and streams the results live. Voice agents, outreach engines,
              workflow automation. <span className="text-text">Receipts included.</span>
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" magnetic>
                Book a build call
                <span aria-hidden="true">→</span>
              </Button>
              <Button href="/pulse" variant="secondary" size="lg">
                See the ledger →
              </Button>
            </motion.div>

            <motion.ul variants={fade} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              {PROOF_CHIPS.map((chip) => (
                <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                  <span className="size-1 rounded-full bg-pulse" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── live dashboard ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: reduce ? 0 : 0.45 }}
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
