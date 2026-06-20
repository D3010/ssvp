import { cn } from "@/lib/utils";

/**
 * Pharmacy-themed decorative art — pure SVG with gradient shading so it reads as
 * 3D without any WebGL. Each piece accepts a className for placement/animation.
 * All are aria-hidden: pure decoration.
 */

/** A glossy two-tone capsule (the signature pharmacy object). */
export function Capsule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 60" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="capBrand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="capLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e7e9fb" />
        </linearGradient>
        <linearGradient id="capShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#1b1640" stopOpacity="0.18" />
        </linearGradient>
        <clipPath id="capClip">
          <rect x="2" y="2" width="136" height="56" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#capClip)">
        <rect x="0" y="0" width="71" height="60" fill="url(#capBrand)" />
        <rect x="69" y="0" width="71" height="60" fill="url(#capLight)" />
        <rect x="67" y="0" width="3" height="60" fill="#2e2570" opacity="0.25" />
        <rect x="0" y="0" width="140" height="60" fill="url(#capShade)" />
        <ellipse cx="42" cy="15" rx="32" ry="7" fill="#ffffff" opacity="0.28" />
      </g>
      <rect x="2" y="2" width="136" height="56" rx="28" fill="none" stroke="#ffffff" strokeOpacity="0.6" />
    </svg>
  );
}

/** A molecule / orbital ring of atoms with bonds — science + health cue. */
export function Molecule({ className }: { className?: string }) {
  const cx = 60;
  const cy = 60;
  const r = 40;
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 120 120" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="molBond" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a855f7" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <radialGradient id="molNode" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5b21b6" />
        </radialGradient>
      </defs>
      <g className="animate-spin-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* bonds to center */}
        {nodes.map((n, i) => (
          <line key={`c${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="url(#molBond)" strokeWidth="2.2" strokeOpacity="0.5" />
        ))}
        {/* ring bonds */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          return <line key={`r${i}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="url(#molBond)" strokeWidth="2.2" strokeOpacity="0.35" />;
        })}
        {/* outer atoms */}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r="8" fill="url(#molNode)" />
        ))}
        {/* center atom */}
        <circle cx={cx} cy={cy} r="11" fill="url(#molNode)" />
      </g>
    </svg>
  );
}

/** A round tablet with a score line — small floating accent. */
export function Tablet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <radialGradient id="tabFill" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#eef0fd" />
          <stop offset="1" stopColor="#c9cdf4" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="29" fill="url(#tabFill)" stroke="#ffffff" strokeOpacity="0.7" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#8b5cf6" strokeOpacity="0.35" strokeWidth="2" />
      <ellipse cx="24" cy="20" rx="12" ry="5" fill="#ffffff" opacity="0.55" />
    </svg>
  );
}
