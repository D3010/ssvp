import { SITE } from "./utils";
import type { FaqItem } from "@/content/faq";

/** Organization schema — emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingLocation: { "@type": "Place", name: "United States" },
    knowsAbout: [
      "PrimeRx automation",
      "PBM audit defense",
      "Pharmacy inventory intelligence",
      "Prescription auto-typing",
      "Insurance card capture",
      "Independent pharmacy operations",
    ],
  };
}

/** Product schema — the Invisible Technician suite. */
export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SSVP AI — The Invisible Technician",
    description: SITE.description,
    brand: { "@type": "Brand", name: SITE.name },
    url: `${SITE.url}/product`,
    category: "Pharmacy automation software",
  };
}

/** FAQPage schema — used by any FAQ block. */
export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Inline <script> JSON-LD helper. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // schema content is trusted, built from local typed data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
