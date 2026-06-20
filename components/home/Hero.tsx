"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroMock } from "./HeroMock";

const PROOF_CHIPS = ["Answers in 2 rings", "78% → 90% deliverability", "HIPAA-aware", "Receipts on Pulse"];

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
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
      {/* ── layered light backdrop ─────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-[0.5]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[14%] size-[680px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_28%,transparent),transparent_62%)] blur-3xl animate-aurora"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[26%] -left-[6%] size-[560px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-1)_22%,transparent),transparent_62%)] blur-3xl"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />

      <div className="container-wide relative w-full py-16 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ── copy ────────────────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.a
              href="/pulse"
              variants={fade}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 backdrop-blur-sm transition-colors hover:border-pulse/40"
            >
              <span className="rounded-full bg-[linear-gradient(110deg,var(--brand-1),var(--brand-3))] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white">
                New
              </span>
              <span className="font-mono text-[0.72rem] tracking-[0.04em] text-muted">
                Voice AI &amp; patient comms, live
              </span>
              <span aria-hidden className="text-pulse transition-transform group-hover:translate-x-0.5">→</span>
            </motion.a>

            <h1 className="mt-6 text-[length:var(--text-display)] font-semibold leading-[0.98] tracking-[-0.035em]">
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  Scale your ops —
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  <span className="gradient-text">without scaling</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="headline-sheen block">
                  headcount.
                </motion.span>
              </span>
            </h1>

            <motion.p variants={fade} className="mt-7 max-w-lg text-lg text-muted text-pretty">
              SSVP designs, builds, and runs AI systems for healthcare and revenue teams — voice
              agents, outreach engines, and workflow automation that handle the busywork.{" "}
              <span className="text-text">And every result streams live on Pulse.</span>
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact" size="lg" magnetic>
                Book a build call
                <span aria-hidden="true">→</span>
              </Button>
              <Button href="/pulse" variant="secondary" size="lg">
                See the live ledger
              </Button>
            </motion.div>

            <motion.ul variants={fade} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {PROOF_CHIPS.map((chip) => (
                <li key={chip} className="flex items-center gap-2 font-mono text-[0.72rem] text-muted">
                  <span className="size-1.5 rounded-full bg-pulse" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ── product visual ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease, delay: reduce ? 0 : 0.4 }}
          >
            <HeroMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
