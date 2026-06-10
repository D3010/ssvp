import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PulseLine } from "@/components/ui/PulseLine";
import { cn } from "@/lib/utils";

/**
 * Shared inner-page hero: eyebrow + display headline + sub, on the instrument
 * grid, with the pulse line underneath. Optional aside (e.g. a metric).
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  aside,
  eyebrowAccent = "muted",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  aside?: ReactNode;
  eyebrowAccent?: "muted" | "ice" | "pulse";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_70%_70%_at_30%_0%,black,transparent)]"
      />
      <div className="container-wide relative py-16 md:py-24">
        <div
          className={cn(
            "grid gap-10",
            Boolean(aside) && "lg:grid-cols-[1.3fr_0.7fr] lg:items-end",
          )}
        >
          <div className="max-w-3xl">
            <Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[length:var(--text-display)] font-semibold leading-[1.0] tracking-[-0.03em] text-balance">
              {title}
            </h1>
            <div className="mt-6 max-w-xl">
              <PulseLine variant="underline" />
            </div>
            {sub && (
              <p className="mt-6 max-w-2xl text-lg text-muted text-pretty md:text-xl">
                {sub}
              </p>
            )}
          </div>
          {aside && <div>{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
