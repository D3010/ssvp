import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Metric } from "@/components/ui/Metric";

export function FeaturedCase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface/40">
          <div className="grid gap-10 p-8 md:grid-cols-[1fr_1px_1fr] md:items-center md:gap-12 md:p-12">
            <div>
              <Eyebrow>CASE STUDY</Eyebrow>
              <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-6">
                <div className="flex items-center gap-3">
                  <Metric value={78} format="pct" size="lg" className="opacity-60" />
                  <span className="font-display text-4xl text-pulse">→</span>
                  <Metric value={90} format="pct" size="xl" live label="sender reputation" />
                </div>
                <Metric value={28} format="pct" size="lg" live label="reply rate" />
              </div>
            </div>

            <div aria-hidden="true" className="hidden h-full w-px bg-line md:block" />

            <div>
              <p className="text-lg text-muted text-pretty">
                A client&apos;s cold outreach was landing in spam — sender
                reputation had cratered to 78%. We rebuilt the deliverability
                stack from authentication up: SPF, DKIM, DMARC, a disciplined
                warm-up, and personalization that reads like a human wrote it.
                Reputation recovered to 90% and replies climbed to 28%.{" "}
                <span className="text-text">The inbox stopped being a wall.</span>
              </p>
              <Link
                href="/work/email-reputation-recovery"
                className="mt-6 inline-flex items-center gap-2 text-sm text-ice transition-colors hover:text-text"
              >
                Read the full study
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
