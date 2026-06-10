import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PulseReceipt } from "@/components/pulse/PulseReceipt";
import { cn } from "@/lib/utils";

interface Step {
  time: string;
  text: string;
}

const WITHOUT: Step[] = [
  { time: "12:04", text: "Phone rings out at the lunch rush." },
  { time: "12:05", text: "Voicemail box is full." },
  { time: "12:40", text: "The refill request is gone." },
  { time: "Next day", text: "Patient transfers the script to a chain." },
];

const WITH: Step[] = [
  { time: "12:04", text: "The voice agent answers in two rings." },
  { time: "12:04", text: "Verifies the patient and the prescription." },
  { time: "12:05", text: "Queues the refill in your system." },
  { time: "12:05", text: "Texts the patient a confirmation." },
];

function Timeline({ steps, tone }: { steps: Step[]; tone: "fail" | "win" }) {
  return (
    <ol className="relative space-y-5 pl-6">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[5px] top-1 h-[calc(100%-0.5rem)] w-px",
          tone === "win" ? "bg-pulse/30" : "bg-danger/25",
        )}
      />
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              "absolute -left-6 top-1.5 size-[11px] rounded-full border-2",
              tone === "win"
                ? "border-pulse bg-base"
                : "border-danger/60 bg-base",
            )}
          />
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            {s.time}
          </span>
          <p
            className={cn(
              "mt-0.5 text-[0.95rem]",
              tone === "win" ? "text-text" : "text-muted",
            )}
          >
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function SplitNarrative() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow>THE SAME TUESDAY, TWO PHARMACIES</Eyebrow>
          <h2 className="mt-4 text-[length:var(--text-h2)] text-balance">
            One missed call is a script that walks across the street.
          </h2>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Without SSVP */}
          <Reveal className="rounded-[var(--radius-card)] border border-danger/20 bg-danger/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-danger/80">
                Without SSVP
              </span>
              <span className="font-mono text-[0.6875rem] text-muted">12:04 PM · lunch rush</span>
            </div>
            <div className="mt-7">
              <Timeline steps={WITHOUT} tone="fail" />
            </div>
            <div className="mt-8 rounded-[var(--radius-input)] border border-danger/20 bg-danger/[0.04] p-3">
              <p className="font-mono text-[0.8125rem] text-danger/90">
                ✗ Revenue walked out the door — and no one logged it.
              </p>
            </div>
          </Reveal>

          {/* With SSVP */}
          <Reveal
            delay={0.08}
            className="rounded-[var(--radius-card)] border border-pulse/25 bg-pulse/[0.04] p-6 md:p-8 glow-pulse"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-pulse">
                With SSVP
              </span>
              <span className="font-mono text-[0.6875rem] text-muted">12:04 PM · lunch rush</span>
            </div>
            <div className="mt-7">
              <Timeline steps={WITH} tone="win" />
            </div>
            <div className="mt-8">
              <PulseReceipt
                items={["1 refill captured", "4m staff time saved", "logged to CRM"]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
