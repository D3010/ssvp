import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PMS = ["LifeFile", "Pharmetika", "PioneerRx", "Liberty", "PrimeRx", "PK Software", "Framework", "QS/1", "BestRx", "RedSail"];

const MOATS = [
  { n: "01", title: "Run faster than anyone else", body: "Speed is a moat. We ship and adapt quicker than vendors can close a door." },
  { n: "02", title: "Never depend on a single vendor", body: "No critical dependency on any one PMS, API, or relationship staying friendly." },
  { n: "03", title: "Deepest domain experts in pharmacy", body: "Not just the tech — the workflows, the regulations, the realities of the bench." },
  { n: "04", title: "Meet customers where they are", body: "We adapt to how your team already works. We never tell them they're doing it wrong." },
];

export function BuiltForReality() {
  return (
    <section className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots radial-fade opacity-25" />

      <div className="container-page relative">
        {/* header + stat */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow accent="pulse" className="justify-center">Why it&apos;s hard — and why it matters</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            <span className="gradient-text">26+ pharmacy systems.</span> Our bots work on all of them.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted text-pretty">
            From browser-based LifeFile and Pharmetika to Windows-client PioneerRx and Liberty, all
            the way to PK and Framework. <span className="font-medium text-text">If a pharmacy tech can
            work on it, our bots can too.</span>
          </p>
        </Reveal>

        {/* PMS chips */}
        <Reveal delay={0.05} className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {PMS.map((p) => (
            <span key={p} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.8rem] font-medium text-text/80 shadow-[0_1px_2px_0_rgba(20,21,43,0.04)]">
              {p}
            </span>
          ))}
        </Reveal>

        {/* narrative + how-it-works callout */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="space-y-5 text-[1.02rem] leading-relaxed text-muted text-pretty">
            <p>
              This wasn&apos;t the easy path. The easy path is what most &ldquo;X for pharmacy&rdquo;
              companies do: find an API, build a wrapper, launch a clean app, and call it a product.
              They work with one or two PMS vendors and pray those vendors stay friendly forever.
            </p>
            <p className="text-xl font-semibold text-text">
              That&apos;s not a business. That&apos;s a hostage situation.
            </p>
            <p>
              We did this on purpose — because we&apos;ve seen what happens when you don&apos;t. One
              vendor call. One terms-of-service change. One competitor with a better relationship.
              And your customers lose their automation overnight.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel relative overflow-hidden p-7">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_18%,transparent),transparent_70%)]" />
              <div className="relative">
                <span className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] text-white">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">Vision LLMs read the screen</h3>
                <p className="mt-3 text-[0.95rem] text-muted text-pretty">
                  Every new PMS, workflow, or screen layout — our bots adapt. They read the screen
                  dynamically, like a tech would.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {["No brittle selectors", "No hardcoded coordinates", "No dependency on anyone's API"].map((x) => (
                    <li key={x} className="flex items-center gap-2.5 text-[0.9rem] text-text">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-pulse/10 text-pulse">
                        <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* four moats */}
        <Reveal className="mt-16">
          <h3 className="text-center text-[length:var(--text-h3)] font-semibold tracking-tight">
            Four moats we protect like our lives depend on it
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MOATS.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.06} as="article">
              <div className="panel relative h-full overflow-hidden p-7">
                <span aria-hidden className="absolute -right-1 -top-3 font-display text-7xl font-bold text-pulse/10">{m.n}</span>
                <div className="relative">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pulse">Moat {m.n}</span>
                  <h4 className="mt-2.5 text-lg font-semibold tracking-tight text-text">{m.title}</h4>
                  <p className="mt-2.5 text-[0.92rem] text-muted text-pretty">{m.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* reality closer */}
        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-[1.02rem] leading-relaxed text-muted text-pretty">
            Most tech people walk into pharmacy thinking it&apos;s just another vertical — API key,
            clean workflow, done. Then reality arrives, fast. It&apos;s one of the most fragmented,
            regulation-heavy, workflow-specific industries on the planet: 26+ PMS vendors, dozens of
            workflow variations, and a pharmacist behind every screen who learned it a specific way.
            You either build for that reality, or you build a demo that never scales.
          </p>
          <p className="mt-8 text-[length:var(--text-h2)] font-semibold tracking-[-0.02em]">
            We chose <span className="gradient-text">reality.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
