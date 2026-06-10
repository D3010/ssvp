import { SITE } from "./utils";
import type { FaqItem, Service } from "@/content/services";

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
      "AI voice agents",
      "Pharmacy automation",
      "Patient engagement",
      "Cold email deliverability",
      "AI cold calling",
      "Workflow automation",
    ],
  };
}

/** Service schema for a service page. */
export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.heroSub,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "US",
  };
}

/** FAQPage schema — used by service pages and any FAQ block. */
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
