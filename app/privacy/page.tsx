import type { Metadata } from "next";
import { LegalLayout } from "@/components/sections/LegalLayout";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SSVP HOLDING LLC handles the information you share with us.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>
        This Privacy Policy explains how {SITE.legalName} (&ldquo;SSVP,&rdquo;
        &ldquo;we,&rdquo; or &ldquo;us&rdquo;) collects, uses, and protects the
        information you share with us through this website.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect only what you choose to send us. When you submit the contact
        form, we receive your name, email, optional company, and your message. We
        do not sell your information, and we do not use third-party advertising
        trackers on this site.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your inquiry and scope potential work.</li>
        <li>To send you a system sketch and ROI model when relevant.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>

      <h2>Client data and PHI</h2>
      <p>
        For client engagements involving protected health information (PHI), data
        handling is governed by a separate Business Associate Agreement (BAA) and
        a HIPAA-aware architecture, not by this website policy. Nothing entered
        into this marketing site should include PHI.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep inquiry messages only as long as needed to evaluate and pursue a
        potential engagement, then delete them on request. To have your
        information removed, email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. {SITE.legalName} is a
        United States limited liability company.
      </p>
    </LegalLayout>
  );
}
