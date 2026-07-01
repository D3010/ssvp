import type { Glyph as GlyphName } from "@/content/modules";
import { cn } from "@/lib/utils";

/**
 * Custom 1.5px-stroke glyph set (Part C6). No emoji, no icon-library defaults.
 * eye/perceive · bulb/reason · bolt/act · check/verify · shield · ledger ·
 * bottle · card · clock · type · chart.
 */
const paths: Record<GlyphName, React.ReactNode> = {
  eye: (
    <>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  ledger: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  bottle: (
    <>
      <path d="M9 3h6v3l1 2v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l1-2V3Z" />
      <path d="M8 12h8" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M6 14h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  type: (
    <>
      <path d="M5 7V5h14v2" />
      <path d="M12 5v14M9 19h6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="m7 15 3-4 3 2 4-6" />
    </>
  ),
};

export function Glyph({
  name,
  className,
  gold = false,
}: {
  name: GlyphName;
  className?: string;
  gold?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", gold ? "text-gold" : "text-mint", className)}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
