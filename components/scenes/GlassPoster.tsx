/**
 * Server-rendered poster for the Glass hero scene. Pure SVG/markup — visible
 * with JS disabled, and the LCP element while the WebGL chunk loads (Part L).
 * Mirrors the scene: wireframe PrimeRx window, emerald glass pane, mint data
 * particles snapping into rows, one gold ✓.
 */
export function GlassPoster() {
  const rows = [64, 96, 128, 160, 192, 224];
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <svg viewBox="0 0 640 360" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b2a44" stopOpacity="0.4" />
            <stop offset="1" stopColor="#121c2e" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {/* streaming particles before the glass (chaotic) */}
        {Array.from({ length: 40 }).map((_, i) => (
          <circle
            key={`c${i}`}
            cx={20 + ((i * 37) % 240)}
            cy={40 + ((i * 53) % 280)}
            r={1.4}
            fill="#5ac8fa"
            opacity={0.5}
          />
        ))}
        {/* structured particles inside the rows */}
        {rows.map((y, r) =>
          Array.from({ length: 14 }).map((_, i) => (
            <circle key={`s${r}-${i}`} cx={230 + i * 22} cy={y + 24} r={1.6} fill="#5ac8fa" opacity={0.85} />
          )),
        )}
        {/* wireframe window */}
        <g stroke="#5e90bd" fill="none" strokeWidth={1}>
          <rect x="210" y="40" width="360" height="260" rx="6" opacity={0.7} />
          <rect x="210" y="40" width="360" height="34" rx="6" opacity={0.5} />
          {rows.map((y) => (
            <rect key={y} x="230" y={y + 12} width="300" height="22" rx="3" opacity={0.4} />
          ))}
        </g>
        {/* emerald glass pane */}
        <rect x="180" y="26" width="410" height="300" rx="8" fill="url(#glass-grad)" stroke="#5ac8fa" strokeOpacity={0.22} />
        {/* the first gold check */}
        <g transform="translate(548, 76)">
          <circle r="11" fill="none" stroke="#e5b34e" strokeWidth={1.5} />
          <path d="M-5 0 L-1 4 L6 -5" fill="none" stroke="#e5b34e" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
