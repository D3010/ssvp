"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MODULES } from "@/content/modules";
import { StatusChip } from "@/components/ui/StatusChip";
import { Glyph } from "@/components/ui/Glyph";
import { cn } from "@/lib/utils";

/**
 * ModuleDeck (G2) — the five modules as tilting designer cards. Framer-motion
 * (motion) transforms only; no WebGL. Card → module page. Mobile snaps.
 */
export function ModuleDeck() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MODULES.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className={cn(m.flagship && "lg:col-span-1")}
        >
          <Link
            href={`/product/${m.slug}`}
            className="group flex h-full flex-col gap-4 rounded-xl border border-hairline bg-emerald-deep/50 p-5 transition-colors hover:border-mint/30"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-mint-dim">
                MODULE {m.id}/05
              </span>
              <StatusChip status={m.status} />
            </div>
            <div className="flex size-11 items-center justify-center rounded-lg border border-hairline bg-obsidian/50">
              <Glyph name={m.glyph} gold={m.pipeline.some((p) => p.gold) && false} />
            </div>
            <div>
              <h3 className="font-display text-xl text-text">{m.name}</h3>
              <p className="mt-2 text-sm text-muted text-pretty">{m.promise}</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {m.chips.slice(0, 2).map((c) => (
                <span
                  key={c.label}
                  className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted"
                >
                  {c.label}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-mint">
              Open module
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
