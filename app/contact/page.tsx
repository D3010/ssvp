import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { LiveDot } from "@/components/ui/LiveDot";
import { PulseLine } from "@/components/ui/PulseLine";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact — Book a build call",
  description:
    "Tell SSVP where the manual hours are leaking. We'll come back with a system and an ROI model, usually within a day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="START HERE"
        title="Book a build call."
        sub="Tell us where the manual hours are leaking. We'll come back with a system and an ROI model — usually within a day."
      />

      <section className="py-16 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface/30 p-7 md:p-9">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-lg font-semibold text-text">
                What happens next
              </h2>
              <ol className="mt-5 space-y-4">
                {[
                  "We read what you sent and map the manual hours.",
                  "We come back — usually within a day — with a system sketch and an ROI model.",
                  "If it's a fit, we scope the build. You're live on Pulse from day one.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="tabular font-mono text-sm text-pulse">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-surface/40 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                  Founder-direct
                </span>
                <LiveDot label="OPEN" />
              </div>
              <p className="mt-4 text-sm text-muted text-pretty">
                You talk to the builder, not an account manager. Prefer email?
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block font-mono text-ice hover:text-text"
              >
                {SITE.email}
              </a>
              <div className="mt-5">
                <PulseLine variant="feed" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
