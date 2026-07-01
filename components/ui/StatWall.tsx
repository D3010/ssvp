import type { Stat } from "@/content/stats";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * StatWall — the sourced numbers (Part J). Every value carries its provenance
 * line where required (Part K.2). `paper` inverts to the bone interlude.
 */
export function StatWall({ stats, paper = false, className }: { stats: Stat[]; paper?: boolean; className?: string }) {
  return (
    <div className={cn("grid gap-px", stats.length >= 5 ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4", paper ? "bg-ink/10" : "bg-hairline", className)}>
      {stats.map((s, i) => (
        <Reveal
          key={i}
          delay={i * 0.05}
          className={cn("flex flex-col gap-2 p-6", paper ? "bg-bone" : "bg-emerald-deep/50")}
        >
          <span
            className={cn(
              "tabular font-display text-[clamp(2rem,4vw,3rem)] leading-none",
              s.tone === "risk" ? "text-risk" : s.tone === "mint" ? "text-mint" : paper ? "text-ink" : "text-text",
            )}
          >
            {s.value}
          </span>
          <span className={cn("text-sm text-pretty", paper ? "text-ink/70" : "text-muted")}>{s.label}</span>
          {s.source && (
            <span className={cn("font-mono text-[0.625rem] uppercase tracking-[0.12em]", paper ? "text-ink/50" : "text-mint-dim")}>
              {s.source}
            </span>
          )}
        </Reveal>
      ))}
    </div>
  );
}
