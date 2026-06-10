import { Reveal } from "@/components/ui/Reveal";

const STACK = [
  "Anthropic",
  "OpenAI",
  "Twilio",
  "SendGrid",
  "AWS",
  "Next.js",
  "Supabase",
  "HubSpot",
];

/**
 * Honest credibility: the infrastructure SSVP builds ON, rendered as clean
 * wordmarks. No invented client logos.
 */
export function CredibilityStrip() {
  return (
    <section className="border-y border-line bg-surface/30">
      <div className="container-wide py-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
          <p className="max-w-[14rem] shrink-0 text-sm text-muted">
            Built on infrastructure you already trust.
          </p>
          <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-4">
            {STACK.map((name) => (
              <li
                key={name}
                className="font-display text-lg font-medium text-muted/80 transition-colors hover:text-text"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
