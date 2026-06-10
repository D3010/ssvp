"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { PRIMARY_NAV } from "@/content/nav";
import { PILLARS, servicesByPillar } from "@/content/services";
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
          ? "glass border-b border-white/[0.07]"
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

                {isServices && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-surface p-3 shadow-2xl shadow-black/40">
                          {PILLARS.map((pillar) => (
                            <div key={pillar.id} className="rounded-xl p-2">
                              <p className="px-2 pb-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                                {pillar.label}
                              </p>
                              <ul className="space-y-0.5">
                                {servicesByPillar(pillar.id).map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={`/services/${s.slug}`}
                                      className="block rounded-lg px-2 py-1.5 text-[0.8125rem] text-muted transition-colors hover:bg-surface-2 hover:text-text"
                                    >
                                      {s.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button href="/contact" variant="primary" size="md" magnetic className="hidden sm:inline-flex">
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-base lg:hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
