import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * "Works with your stack" — an infinite marquee of the systems SSVP integrates
 * with. Two identical halves translate -50% for a seamless loop; edges fade out.
 */
const TOOLS = [
  "PioneerRx", "BestRx", "Liberty", "PrimeRx", "RedSail", "Pharmetika",
  "HubSpot", "Salesforce", "Twilio", "athenahealth", "QS/1", "Epic",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...TOOLS, ...TOOLS];
  return (
    <div className="flex w-max">
      <div className={`flex w-max gap-4 pr-4 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-display text-[0.95rem] font-medium text-text/80 shadow-[0_1px_2px_0_rgba(20,21,43,0.04)]"
          >
            <span className="size-1.5 rounded-full bg-pulse/60" aria-hidden />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 flex flex-col items-center gap-4 text-center">
          <Eyebrow>No rip-and-replace</Eyebrow>
          <h2 className="max-w-2xl text-[length:var(--text-h2)] text-balance">
            Works with the systems you already run
          </h2>
          <p className="max-w-xl text-lg text-muted text-pretty">
            We integrate into your pharmacy software, CRM, and phone stack — integration first,
            replacement only when it saves you money.
          </p>
        </Reveal>
      </div>

      {/* full-bleed marquee with edge fades */}
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex flex-col gap-4">
          <Row />
          <Row reverse />
        </div>
      </div>
    </section>
  );
}
