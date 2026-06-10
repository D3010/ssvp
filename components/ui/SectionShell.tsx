import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

/**
 * Standard section rhythm + optional eyebrow/title header, with a built-in
 * reveal on the header. Keeps vertical spacing consistent site-wide.
 */
export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  width = "page",
  headerAlign = "left",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  width?: "page" | "wide";
  headerAlign?: "left" | "center";
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
    >
      <div className={width === "wide" ? "container-wide" : "container-page"}>
        {(eyebrow || title) && (
          <Reveal
            className={cn(
              "mb-12 flex flex-col gap-4 md:mb-16",
              headerAlign === "center" && "items-center text-center",
            )}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="max-w-3xl text-[length:var(--text-h2)] text-balance">
                {title}
              </h2>
            )}
            {intro && (
              <div className="max-w-2xl text-lg text-muted text-pretty">{intro}</div>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
