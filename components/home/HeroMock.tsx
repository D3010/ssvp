"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { MouseEvent } from "react";
import { PulseLine } from "@/components/ui/PulseLine";

/**
 * The hero "product" visual: a clean light operations dashboard that tilts
 * toward the cursor (real 3D transform). Floating notification cards and the
 * pharmacy art live in the Hero so nothing overlaps the dashboard's own text.
 */

const LEDGER = [
  { t: "09:41", label: "Refill captured · #RX-2231", val: "+1" },
  { t: "09:40", label: "Inbound answered · 2 rings", val: "0:38" },
  { t: "09:38", label: "Prior-auth resolved", val: "+1" },
];

const BARS = [38, 52, 44, 61, 49, 72, 66, 84, 70, 91];

export function HeroMock() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

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
    <div className="relative [perspective:1500px]" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="panel relative overflow-hidden p-6"
      >
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-full bg-pulse animate-breathe" />
            <span className="font-display text-sm font-semibold tracking-tight">SSVP Pulse</span>
          </div>
          <span className="rounded-full bg-pulse/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-pulse">
            Live
          </span>
        </div>

        {/* headline metric row */}
        <div className="mt-7 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Hours saved · this week</p>
            <p className="tabular mt-2 text-[2.6rem] font-semibold leading-none text-text">312.6</p>
          </div>
          <div className="text-right">
            <p className="tabular text-2xl font-semibold leading-none gradient-text">$24.3k</p>
            <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">cost avoided</p>
          </div>
        </div>

        {/* bar chart */}
        <div className="mt-7 flex h-24 items-end gap-2">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,var(--brand-3),var(--brand-1))] opacity-90"
            />
          ))}
        </div>

        <div className="mt-5">
          <PulseLine variant="divider" animate={!reduce} />
        </div>

        {/* ledger */}
        <ul className="mt-4 space-y-2">
          {LEDGER.map((row, i) => (
            <motion.li
              key={row.label}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface-2/60 px-3.5 py-2.5"
            >
              <span className="tabular text-[0.7rem] text-muted">{row.t}</span>
              <span className="flex-1 truncate text-[0.82rem] text-text">{row.label}</span>
              <span className="tabular text-[0.74rem] font-medium text-pulse">{row.val}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
