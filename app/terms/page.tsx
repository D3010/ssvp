import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the SSVP HOLDING LLC website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: false },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 2026">
      <p>
        These Terms govern your use of this website, operated by {SITE.legalName}{" "}
        (&ldquo;SSVP&rdquo;). By using the site, you agree to them.
      </p>

      <h2>Use of the site</h2>
      <p>
        This website is provided for informational purposes. You may not use it
        to break the law, infringe our or anyone&apos;s rights, or attempt to
        disrupt its operation.
      </p>

      <h2>The Pulse demo</h2>
      <p>
        The live ledger shown on this site (&ldquo;SSVP Pulse&rdquo;) is powered
        by seeded demonstration data on a documented API contract. Aggregate
        figures shown publicly are illustrative until replaced by verified client
        telemetry under a signed engagement. Nothing on this marketing site is an
        offer, guarantee, or warranty of specific results.
      </p>

      <h2>Engagements</h2>
      <p>
        Any actual work is governed by a separate written agreement — including
        scope, pricing (which may be partly outcome-aligned and tied to verified
        Pulse metrics), and, where applicable, a Business Associate Agreement.
        Those agreements control over anything stated here.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site&apos;s design, code, and content are owned by {SITE.legalName}{" "}
        unless otherwise noted. The infrastructure and trademarks of third parties
        referenced on the site belong to their respective owners.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The site is provided &ldquo;as is.&rdquo; To the fullest extent permitted
        by law, {SITE.legalName} is not liable for any indirect or consequential
        damages arising from your use of it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
