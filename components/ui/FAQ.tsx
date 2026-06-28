"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Accessible accordion. The answer is always in the DOM (good for SEO and for
 * the FAQPage JSON-LD the page emits separately) and expands via a pure-CSS
 * grid-rows transition — no animation library, no layout-measuring JS.
 */
export function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg font-medium text-text">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300",
                    isOpen && "rotate-45 border-pulse/40 text-pulse",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 text-muted text-pretty">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
