"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const QUOTES = [
  {
    quote:
      "The agent eliminated a full step in our workflow. Pharmacists pre-check, and technicians don't touch those refills anymore.",
    name: "Director of Operations",
    role: "Independent compounding pharmacy",
  },
  {
    quote:
      "Our number stopped getting flagged and connect rates climbed the same week. For the first time we know which objection is actually killing the deal.",
    name: "VP of Sales",
    role: "B2B outbound team",
  },
  {
    quote:
      "We went from missing the lunch-rush calls to answering every line. The refills that used to walk across the street stay with us now.",
    name: "Pharmacy Owner",
    role: "Retail & independent",
  },
  {
    quote:
      "What sold me was Pulse. I can open one screen and see exactly what the system did this week — no exported spreadsheet, no guessing.",
    name: "Founder",
    role: "Specialty pharmacy",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 5500);
    return () => clearInterval(id);
  }, []);

  const q = QUOTES[i];

  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-col items-center gap-4 text-center">
          <Eyebrow accent="ice">In their words</Eyebrow>
          <h2 className="max-w-2xl text-[length:var(--text-h2)] text-balance">
            Teams that stopped hiring around the problem
          </h2>
        </Reveal>

        <div className="panel relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12">
          <span aria-hidden className="absolute left-6 top-2 font-display text-[7rem] leading-none text-pulse/10">
            &ldquo;
          </span>
          <div className="relative min-h-[180px]">
            {/* keyed so the brief CSS fade replays on each rotation; under
                prefers-reduced-motion the global rule makes the swap instant */}
            <blockquote key={i} className="animate-fade-in">
              <p className="text-balance text-xl font-medium text-text md:text-2xl">{q.quote}</p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,var(--brand-1),var(--brand-3))] font-display text-sm font-semibold text-white">
                  {q.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-text">{q.name}</span>
                  <span className="block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{q.role}</span>
                </span>
              </footer>
            </blockquote>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Show testimonial ${idx + 1}`}
                aria-current={idx === i}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-7 bg-pulse" : "w-1.5 bg-line hover:bg-pulse/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
