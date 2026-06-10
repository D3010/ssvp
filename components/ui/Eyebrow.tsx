import { cn } from "@/lib/utils";

/**
 * Section-labeling system: mono, uppercase, `//` prefix. e.g. `// PROOF LEDGER`.
 */
export function Eyebrow({
  children,
  className,
  accent = "muted",
}: {
  children: string;
  className?: string;
  accent?: "muted" | "ice" | "pulse";
}) {
  const color =
    accent === "pulse" ? "text-pulse" : accent === "ice" ? "text-ice" : "text-muted";
  return (
    <p
      className={cn(
        "font-mono text-[0.8125rem] uppercase tracking-[0.16em]",
        color,
        className,
      )}
    >
      <span aria-hidden="true" className="text-muted/60">
        {"// "}
      </span>
      {children}
    </p>
  );
}
