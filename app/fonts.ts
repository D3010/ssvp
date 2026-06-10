import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";

// Display — Clash Display (self-hosted, Fontshare). Characterful editorial grotesk.
export const clash = localFont({
  src: [
    { path: "../public/fonts/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
  // fallback metrics tuned to minimize CLS while Clash swaps in
  fallback: ["Inter", "system-ui", "sans-serif"],
});

// Body — Inter. Precise, boring on purpose, excellent fallback metrics.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Mono — JetBrains Mono. Every number on the site. Telemetry, not marketing.
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
