import type { Metadata } from "next";
import { display, mono, inter } from "./fonts";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const TITLE = "SSVP AI — The Invisible Technician for PrimeRx pharmacies";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s · SSVP AI",
  },
  description: SITE.description,
  applicationName: "SSVP AI",
  authors: [{ name: "SSVP HOLDING LLC" }],
  keywords: [
    "PrimeRx automation",
    "pharmacy AI technician",
    "PBM audit defense",
    "pharmacy inventory intelligence",
    "independent pharmacy software",
    "pharmacy auto-typing",
  ],
  openGraph: {
    type: "website",
    siteName: "SSVP AI",
    title: TITLE,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${inter.variable}`}>
      <body className="min-h-dvh antialiased">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:text-obsidian"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
