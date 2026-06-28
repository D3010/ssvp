"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { PRIMARY_NAV } from "@/content/nav";
import { PILLARS, servicesByPillar } from "@/content/services";
import { SERVICE_ICONS, SERVICE_MENU_LABEL } from "./serviceIcons";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "glass border-b border-line shadow-[0_1px_24px_-12px_rgba(20,21,43,0.25)]"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between gap-6">
        <Wordmark />

        {/* desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {PRIMARY_NAV.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            const isServices = link.href === "/services";
            const isPulse = link.href === "/pulse";
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => isServices && setServicesOpen(true)}
                onMouseLeave={() => isServices && setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors",
                    active ? "text-text" : "text-muted hover:text-text",
                  )}
                >
                  {link.label}
                  {isPulse && (
                    <span className="size-1.5 rounded-full bg-pulse animate-breathe" aria-hidden="true" />
                  )}
                </Link>

                {isServices && servicesOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[740px] -translate-x-1/2 pt-3 animate-fade-in">
                    <div className="rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-24px_rgba(20,21,43,0.28)]">
                      <div className="grid grid-cols-3 gap-x-3">
                        {PILLARS.map((pillar) => (
                          <div key={pillar.id}>
                            <p className="px-2.5 pb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted/80">
                              {pillar.label}
                            </p>
                            <ul>
                              {servicesByPillar(pillar.id).map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="group/item flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-surface-2"
                                  >
                                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-pulse/10 text-pulse transition-colors group-hover/item:bg-pulse group-hover/item:text-white">
                                      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={SERVICE_ICONS[s.slug]} />
                                      </svg>
                                    </span>
                                    <span className="text-[0.84rem] font-medium leading-tight text-text/85 group-hover/item:text-text">
                                      {SERVICE_MENU_LABEL[s.slug] ?? s.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-line pt-2">
                        <Link
                          href="/services"
                          className="group/all flex items-center justify-between rounded-xl px-2.5 py-2 transition-colors hover:bg-surface-2"
                        >
                          <span className="text-[0.84rem] font-semibold text-text">Explore all services</span>
                          <span aria-hidden className="text-pulse transition-transform group-hover/all:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button href="/contact" variant="primary" size="md" className="hidden sm:inline-flex">
            Book a build call
            <span aria-hidden="true">→</span>
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-text lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-4 bg-current transition-all",
                  mobileOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-all",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-4 bg-current transition-all",
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="overflow-hidden border-t border-line bg-base lg:hidden animate-fade-in">
          <div className="container-page flex flex-col gap-1 py-4">
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-text"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" size="lg" className="mt-3 w-full">
              Book a build call →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
