"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PulseLine } from "@/components/ui/PulseLine";
import { PulseTicker } from "@/components/pulse/PulseTicker";

/**
 * The orchestrated hero load sequence:
 *   headline mask-reveal → subhead fade → ticker odometers → pulse line draws.
 * Total < 2s. Reduced-motion → everything renders at final state instantly.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 } },
  };
  const lineUp = {
    hidden: { y: reduce ? 0 : "110%" },
    show: { y: "0%", transition: { duration: 0.6, ease } },
  };
  const fade = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* faint instrument grid + radial wash, both non-green */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-pulse/[0.04] blur-3xl"
      />

      <div className="container-wide relative grid gap-14 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fade}>
            <Eyebrow accent="pulse">AI SYSTEMS THAT DO REAL WORK</Eyebrow>
          </motion.div>

          <h1 className="mt-6 text-[length:var(--text-display)] font-semibold leading-[0.98] tracking-[-0.03em]">
            <span className="block overflow-hidden">
              <motion.span variants={lineUp} className="block">
                Automation
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={lineUp} className="block">
                you can audit.
              </motion.span>
            </span>
          </h1>

          <motion.div variants={fade} className="mt-5 max-w-xl">
            <PulseLine variant="underline" animate={!reduce} />
          </motion.div>

          <motion.p
            variants={fade}
            className="mt-6 max-w-xl text-lg text-muted text-pretty md:text-xl"
          >
            SSVP designs, builds, and runs AI systems for healthcare and revenue
            teams — and streams the results live. Voice agents, outreach engines,
            workflow automation.{" "}
            <span className="text-text">Receipts included.</span>
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
        </motion.div>

        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: reduce ? 0 : 0.5 }}
        >
          <PulseTicker />
        </motion.div>
      </div>
    </section>
  );
}
