import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { CTABand } from "./CTABand";

/** Shared shell for privacy/terms. SSVP HOLDING LLC appears in this fine print. */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="LEGAL" title={title} sub={`Last updated ${updated}.`} />
      <section className="py-16 md:py-24">
        <div className="container-page max-w-3xl space-y-8 text-muted [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:text-text [&_a]:text-ice [&_a:hover]:text-text [&_p]:text-pretty [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </section>
      <CTABand />
    </>
  );
}
