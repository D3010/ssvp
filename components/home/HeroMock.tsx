"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";
import { PulseLine } from "@/components/ui/PulseLine";

/**
 * The hero "product" visual: a light operations dashboard that tilts toward the
 * cursor (real 3D transform), wrapped by floating frosted-glass notification
 * cards. Pure CSS/SVG — no WebGL, no heavy deps.
 */

const LEDGER = [
  { t: "09:41", label: "Refill captured · #RX-2231", val: "+1" },
  { t: "09:40", label: "Inbound answered · 2 rings", val: "0:38" },
  { t: "09:38", label: "Prior-auth resolved", val: "+1" },
  { t: "09:37", label: "Reminder delivered", val: "✓" },
];

const BARS = [38, 52, 44, 61, 49, 72, 66, 84, 70, 91];

export function HeroMock() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative [perspective:1400px]" onMouseMove={onMove} onMouseLeave={reset}>
      {/* soft brand glow behind the stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_srgb,var(--brand-2)_28%,transparent),transparent_70%)] blur-2xl"
      />

      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="panel relative overflow-hidden p-5"
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-pulse animate-breathe" />
            <span className="font-display text-sm font-semibold tracking-tight">SSVP Pulse</span>
          </div>
          <span className="rounded-full bg-pulse/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-pulse">
            Live
          </span>
        </div>

        {/* headline metric */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Hours saved · this week</p>
            <p className="tabular mt-1 text-4xl font-semibold text-text">312.6</p>
          </div>
          <div className="text-right">
            <p className="tabular text-2xl font-semibold gradient-text">$24.3k</p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">cost avoided</p>
          </div>
        </div>

        {/* bar chart */}
        <div className="mt-5 flex h-24 items-end gap-1.5">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className="flex-1 rounded-t-md bg-[linear-gradient(180deg,var(--brand-3),var(--brand-1))] opacity-90"
            />
          ))}
        </div>

        <div className="mt-4">
          <PulseLine variant="divider" animate={!reduce} />
        </div>

        {/* ledger */}
        <ul className="mt-3 space-y-2">
          {LEDGER.map((row, i) => (
            <motion.li
              key={row.label}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3 py-2"
            >
              <span className="tabular text-[0.7rem] text-muted">{row.t}</span>
              <span className="flex-1 truncate text-[0.8rem] text-text">{row.label}</span>
              <span className="tabular text-[0.72rem] font-medium text-pulse">{row.val}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* floating frosted card — top left */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute -left-6 top-16 hidden sm:block"
      >
        <div className="glass-card animate-float rounded-2xl px-4 py-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">Calls answered</p>
          <p className="tabular mt-0.5 text-xl font-semibold text-text">100%</p>
        </div>
      </motion.div>

      {/* floating frosted card — bottom right */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute -right-5 bottom-12 hidden sm:block"
      >
        <div className="glass-card animate-float-slow flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] text-white">
            ✓
          </span>
          <div>
            <p className="text-[0.78rem] font-medium text-text">Refill captured</p>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">no staff touch</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
