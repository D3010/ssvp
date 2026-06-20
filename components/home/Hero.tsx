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
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center overflow-hidden">
      {/* ── layered light backdrop (cheap radial gradients, one soft blur) ─── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-[18%] size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_22%,transparent),transparent_62%)] blur-2xl animate-aurora"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full py-16 md:py-20">
        {/* ── centered copy ─────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.span
            variants={fade}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/80 px-3.5 py-1.5 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="size-3.5 text-pulse" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 7v10M7 12h10" />
            </svg>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-text">
              Built by pharmacists, for pharmacists
            </span>
          </motion.span>

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

          <motion.p variants={fade} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            SSVP designs, builds, and runs AI systems for healthcare and revenue teams — voice
            agents, outreach engines, and workflow automation that handle the busywork.{" "}
            <span className="font-medium text-text">Every result streams live on Pulse.</span>
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" size="lg" magnetic>
              Book a build call
              <span aria-hidden="true">→</span>
            </Button>
            <Button href="/pulse" variant="secondary" size="lg">
              See the live ledger
            </Button>
          </motion.div>

          <motion.ul variants={fade} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {PROOF_CHIPS.map((chip) => (
              <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                <span className="size-1.5 rounded-full bg-pulse" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── centered product visual + pharmacy art ────────────── */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease, delay: reduce ? 0 : 0.45 }}
          className="relative mx-auto mt-16 w-full max-w-[640px]"
        >
          {/* pharmacy 3D art — floats at the corners, never over the card's text */}
          <Capsule className="absolute -top-10 right-4 z-20 w-28 rotate-[16deg] animate-bob [--bob-rot:16deg] sm:right-8 sm:w-32" />
          <Tablet className="absolute -top-6 left-6 z-20 hidden w-11 animate-bob [animation-delay:1.2s] md:block" />
          <Molecule className="absolute -bottom-12 -left-6 z-20 hidden w-28 animate-bob [animation-duration:9s] lg:block sm:-left-10" />

          <HeroMock />

          {/* one floating notification card — peeks below the card edge */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
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
    </section>
  );
}
