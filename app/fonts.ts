import { Space_Grotesk, Geist_Mono, Inter } from "next/font/google";

// Display — Space Grotesk. Characterful grotesk with real personality at
// large sizes; the headline voice of pharmacy noir. Variable, tight tracking.
export const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Mono — Geist Mono. The brand's "machine speaking" register: every eyebrow,
// system label, stat unit, ledger entry, table header, and chip.
export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

// Body — Inter. Precise, excellent fallback metrics, tabular figures.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
