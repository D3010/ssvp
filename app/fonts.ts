import { Sora, Inter } from "next/font/google";

// Display — Sora. Confident geometric grotesk; premium without being cold.
// Replaces the heavier Clash Display and ships fewer files for faster loads.
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// Body — Inter. Precise, excellent fallback metrics, tabular figures for numbers.
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
