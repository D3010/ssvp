import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  { label: "HIPAA-aware architecture", note: "PHI minimized, paths audited." },
  { label: "SPF / DKIM / DMARC done right", note: "Authentication that lands." },
  { label: "SOC2-ready practices", note: "Controls in place from day one." },
  { label: "CRM sync built in", note: "One record, everywhere." },
  { label: "US-based", note: "Same timezone, same accountability." },
  { label: "Founder-direct Slack access", note: "The builder, one message away." },
];

export function TableStakesGrid() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow>QUIETLY UNDERNEATH</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            The table stakes, handled without a fuss.
          </h2>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.04} className="bg-base p-6">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-mono text-pulse"
                >
                  ✓
                </span>
                <div>
                  <p className="font-medium text-text">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
