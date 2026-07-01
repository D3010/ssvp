import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  base: "#0A1220",
  surface: "#121C2E",
  line: "#24344E",
  pulse: "#5AC8FA",
  text: "#E6EDF5",
  muted: "#93A6BD",
};

async function fonts() {
  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/ClashDisplay-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/ClashDisplay-Medium.ttf")),
  ]);
  return [
    { name: "Clash", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Clash", data: medium, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * Brand OG image in the Pulse aesthetic. Used by the root and every dynamic
 * route's opengraph-image so shares look like the dashboards SSVP builds.
 */
export async function renderOgImage({
  eyebrow = "AN AI TECHNICIAN FOR PRIMERX",
  title,
  metric,
}: {
  eyebrow?: string;
  title: string;
  metric?: { value: string; label: string };
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: COLORS.base,
          padding: "72px",
          fontFamily: "Clash",
          // faint instrument grid
          backgroundImage: `linear-gradient(${COLORS.line}55 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line}55 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      >
        {/* top: live dot + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, background: COLORS.pulse }} />
          <div
            style={{
              color: COLORS.pulse,
              fontSize: 22,
              letterSpacing: 4,
              fontWeight: 500,
            }}
          >
            {`// ${eyebrow}`}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              color: COLORS.text,
              fontSize: title.length > 40 ? 76 : 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {title}
          </div>
          {metric && (
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <div style={{ color: COLORS.pulse, fontSize: 64, fontWeight: 700 }}>
                {metric.value}
              </div>
              <div style={{ color: COLORS.muted, fontSize: 26 }}>{metric.label}</div>
            </div>
          )}
        </div>

        {/* footer: wordmark + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${COLORS.line}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: COLORS.pulse }} />
            <div style={{ color: COLORS.text, fontSize: 30, fontWeight: 700 }}>SSVP AI</div>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 24 }}>
            Invisible in the workflow. Visible in the log.
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
