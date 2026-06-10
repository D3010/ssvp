import type { Metadata } from "next";
import { clash, inter, jetbrains } from "./fonts";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "SSVP — Automation you can audit",
    template: "%s · SSVP",
  },
  description: SITE.description,
  applicationName: "SSVP",
  authors: [{ name: "SSVP" }],
  keywords: [
    "pharmacy automation",
    "AI voice agent for pharmacy",
    "patient engagement platform",
    "cold email deliverability agency",
    "AI cold calling",
    "AI automation firm",
  ],
  openGraph: {
    type: "website",
    siteName: "SSVP",
    title: "SSVP — Automation you can audit",
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "SSVP — Automation you can audit",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${clash.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pulse focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
