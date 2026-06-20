"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroMock } from "./HeroMock";
import { Capsule, Molecule, Tablet } from "./PharmacyArt";

const PROOF_CHIPS = ["Answers in 2 rings", "78% → 90% deliverability", "HIPAA-aware", "Receipts on Pulse"];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.04 } },
  };
  const lineUp = {
    hidden: { y: reduce ? 0 : "115%" },
    show: { y: "0%", transition: { duration: 0.7, ease } },
  };
  const fade = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* ── layered light backdrop (cheap radial gradients, one soft blur) ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6%] -top-[12%] size-[620px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_26%,transparent),transparent_62%)] blur-2xl animate-aurora"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full py-16 md:py-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
          {/* ── copy ────────────────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.a
              href="/pulse"
              variants={fade}
              className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 py-1 pl-1 pr-3.5 backdrop-blur-sm transition-colors hover:border-pulse/40"
            >
              <span className="rounded-full bg-[linear-gradient(110deg,var(--brand-1),var(--brand-3))] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white">
                New
              </span>
              <span className="text-[0.8rem] font-medium tracking-tight text-muted">
                Voice AI &amp; patient comms, live
              </span>
              <span aria-hidden className="text-pulse transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <h1 className="mt-7 text-[length:var(--text-display)] font-semibold leading-[1.04] tracking-[-0.02em]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  Scale your ops
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineUp} className="block">
                  <span className="gradient-text">without scaling</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  headcount.
                </motion.span>
              </span>
            </h1>

            <motion.p variants={fade} className="mt-7 max-w-lg text-lg leading-relaxed text-muted text-pretty">
              SSVP designs, builds, and runs AI systems for healthcare and revenue teams — voice
              agents, outreach engines, and workflow automation that handle the busywork.{" "}
              <span className="font-medium text-text">Every result streams live on Pulse.</span>
            </motion.p>

            <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" magnetic>
                Book a build call
                <span aria-hidden="true">→</span>
              </Button>
              <Button href="/pulse" variant="secondary" size="lg">
                See the live ledger
              </Button>
            </motion.div>

            <motion.ul variants={fade} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {PROOF_CHIPS.map((chip) => (
                <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                  <span className="size-1.5 rounded-full bg-pulse" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── product visual + pharmacy art ───────────────────── */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease, delay: reduce ? 0 : 0.35 }}
            className="relative mx-auto w-full max-w-[520px] lg:mx-0"
          >
            {/* pharmacy 3D art — floats around the card, never over its text */}
            <Capsule className="absolute -top-9 -right-2 z-20 w-28 rotate-[16deg] animate-bob [--bob-rot:16deg] sm:w-32" />
            <Molecule className="absolute -bottom-12 -left-12 z-20 hidden w-28 animate-bob [animation-duration:9s] lg:block" />
            <Tablet className="absolute -top-5 left-10 z-20 hidden w-11 animate-bob [animation-delay:1.2s] sm:block" />

            <HeroMock />

            {/* one floating notification card — peeks below the card edge */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="absolute -bottom-6 right-5 z-30 hidden sm:block"
            >
              <div className="glass-card flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] text-white">
                  ✓
                </span>
                <div>
                  <p className="text-[0.8rem] font-semibold text-text">Refill captured</p>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted">no staff touch</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
