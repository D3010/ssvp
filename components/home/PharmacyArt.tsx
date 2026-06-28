import { cn } from "@/lib/utils";

/**
 * Pharmacy-themed decorative art — pure SVG with gradient shading, specular
 * highlights, and soft contact shadows so each piece reads as glossy 3D without
 * any WebGL or raster images (zero JS, near-zero weight, crisp at any size).
 * Each accepts a className for placement. All are aria-hidden: pure decoration.
 */

/** A glossy two-tone capsule — the signature pharmacy object. */
export function Capsule({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 60" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="capBrand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="capLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe3fb" />
        </linearGradient>
        <linearGradient id="capShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#1b1640" stopOpacity="0.22" />
        </linearGradient>
        <clipPath id="capClip">
          <rect x="2" y="2" width="136" height="56" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#capClip)">
        <rect x="0" y="0" width="71" height="60" fill="url(#capBrand)" />
        <rect x="69" y="0" width="71" height="60" fill="url(#capLight)" />
        <rect x="66" y="0" width="4" height="60" fill="#2e2570" opacity="0.28" />
        {/* top-to-bottom form shading */}
        <rect x="0" y="0" width="140" height="60" fill="url(#capShade)" />
        {/* bright specular streak */}
        <ellipse cx="46" cy="14" rx="40" ry="6" fill="#ffffff" opacity="0.45" />
        <ellipse cx="104" cy="13" rx="24" ry="4" fill="#ffffff" opacity="0.7" />
      </g>
      <rect x="2" y="2" width="136" height="56" rx="28" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.2" />
    </svg>
  );
}

/** An amber Rx prescription bottle with a labelled front — classic pharmacy cue. */
export function PillBottle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 132" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="bottleCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9cdf4" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="22" y="6" width="56" height="22" rx="6" fill="url(#bottleCap)" stroke="#ffffff" strokeOpacity="0.7" />
      <rect x="22" y="20" width="56" height="6" rx="3" fill="#1b1640" opacity="0.12" />
      {/* body */}
      <rect x="16" y="28" width="68" height="98" rx="12" fill="url(#bottleBody)" />
      {/* glass highlight streak */}
      <rect x="24" y="36" width="9" height="80" rx="4.5" fill="#ffffff" opacity="0.35" />
      {/* label */}
      <rect x="24" y="52" width="52" height="58" rx="6" fill="#ffffff" opacity="0.96" />
      <g fill="#4f46e5">
        <text x="30" y="74" fontFamily="Georgia, serif" fontSize="20" fontWeight="700">℞</text>
      </g>
      <rect x="46" y="60" width="26" height="4" rx="2" fill="#a855f7" />
      <rect x="46" y="68" width="22" height="3" rx="1.5" fill="#c7d2fe" />
      <rect x="30" y="88" width="40" height="3" rx="1.5" fill="#c7d2fe" />
      <rect x="30" y="95" width="34" height="3" rx="1.5" fill="#c7d2fe" />
      <rect x="30" y="102" width="38" height="3" rx="1.5" fill="#c7d2fe" />
    </svg>
  );
}

/** A foil blister pack with domed pills — a dense, tactile pharmacy object. */
export function BlisterPack({ className }: { className?: string }) {
  const cols = 4;
  const rows = 3;
  const gap = 27;
  const ox = 20;
  const oy = 20;
  const cells = Array.from({ length: cols * rows }, (_, i) => ({
    x: ox + (i % cols) * gap,
    y: oy + Math.floor(i / cols) * gap,
  }));
  return (
    <svg viewBox="0 0 130 105" className={cn("art-shadow", className)} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f6fc" />
          <stop offset="1" stopColor="#d9ddf3" />
        </linearGradient>
        <radialGradient id="dome" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5b21b6" />
        </radialGradient>
      </defs>
      <rect x="6" y="6" width="118" height="93" rx="12" fill="url(#foil)" stroke="#ffffff" strokeOpacity="0.7" />
      {cells.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="10.5" fill="#1b1640" opacity="0.08" />
          <circle cx={c.x} cy={c.y} r="9.5" fill="url(#dome)" />
          <ellipse cx={c.x - 2.5} cy={c.y - 3} rx="3.2" ry="2" fill="#ffffff" opacity="0.7" />
        </g>
      ))}
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
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#5b21b6" />
        </radialGradient>
        <radialGradient id="molGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#a855f7" stopOpacity="0.25" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="56" fill="url(#molGlow)" />
      <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {/* bonds to center */}
        {nodes.map((n, i) => (
          <line key={`c${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="url(#molBond)" strokeWidth="2.4" strokeOpacity="0.55" />
        ))}
        {/* ring bonds */}
        {nodes.map((n, i) => {
          const m = nodes[(i + 1) % nodes.length];
          return <line key={`r${i}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="url(#molBond)" strokeWidth="2.4" strokeOpacity="0.4" />;
        })}
        {/* outer atoms */}
        {nodes.map((n, i) => (
          <g key={`n${i}`}>
            <circle cx={n.x} cy={n.y} r="8.5" fill="url(#molNode)" />
            <ellipse cx={n.x - 2.4} cy={n.y - 2.8} rx="2.6" ry="1.6" fill="#ffffff" opacity="0.7" />
          </g>
        ))}
        {/* center atom */}
        <circle cx={cx} cy={cy} r="12" fill="url(#molNode)" />
        <ellipse cx={cx - 3.4} cy={cy - 4} rx="3.6" ry="2.2" fill="#ffffff" opacity="0.7" />
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
      <circle cx="32" cy="33" r="29" fill="#1b1640" opacity="0.10" />
      <circle cx="32" cy="32" r="29" fill="url(#tabFill)" stroke="#ffffff" strokeOpacity="0.7" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#8b5cf6" strokeOpacity="0.4" strokeWidth="2" />
      <ellipse cx="24" cy="20" rx="12" ry="5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}
