import type { DiagramNode } from "@/content/services";

/**
 * "What we build" — a horizontal flow of nodes connected by pulse-green edges.
 * The last node always feeds into Pulse (the through-line of the whole site).
 */
export function SystemDiagram({ nodes }: { nodes: DiagramNode[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {nodes.map((node, i) => (
        <div key={node.label} className="relative">
          {/* connector to next node (desktop) */}
          {i < nodes.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-2 top-7 hidden h-px w-4 bg-gradient-to-r from-pulse/60 to-transparent lg:block"
            />
          )}
          <div className="flex h-full flex-col gap-3 rounded-[var(--radius-card)] border border-line bg-surface/40 p-5">
            <div className="flex items-center gap-2.5">
              <span className="tabular font-mono text-xs text-pulse">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-pulse/60"
              />
            </div>
            <h3 className="font-display text-base font-semibold text-text">
              {node.label}
            </h3>
            <p className="text-sm text-muted text-pretty">{node.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
