"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { PRIMARY_NAV, PRODUCT_MENU } from "@/content/nav";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductOpen(false);
  }, [pathname]);

  const productActive = pathname === "/product" || pathname.startsWith("/product/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen ? "glass" : "border-b border-transparent",
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between gap-6">
        <Wordmark />

        {/* desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <Link
              href="/product"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors",
                productActive ? "text-text" : "text-muted hover:text-text",
              )}
            >
              Product
              <span aria-hidden className="text-mint-dim">▾</span>
            </Link>

            {productOpen && (
              <div className="absolute left-0 top-full z-50 w-[560px] pt-3 animate-fade-in">
                <div className="rounded-xl border border-hairline bg-emerald-deep p-3 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.7)]">
                  <div className="grid grid-cols-2 gap-1">
                    {PRODUCT_MENU.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-emerald"
                      >
                        {item.id ? (
                          <span className="mt-0.5 font-mono text-[0.6875rem] text-mint-dim">{item.id}</span>
                        ) : (
                          <span className="mt-0.5 font-mono text-[0.6875rem] text-mint-dim">★</span>
                        )}
                        <span className="flex flex-col">
                          <span className="text-[0.86rem] font-medium text-text">{item.label}</span>
                          <span className="text-[0.72rem] text-muted">{item.sub}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {PRIMARY_NAV.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Button href="/book" variant="primary" size="md" className="hidden sm:inline-flex">
            Book a build call
            <span aria-hidden="true">→</span>
          </Button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-hairline text-text lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute left-0 h-0.5 w-4 bg-current transition-all", mobileOpen ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-all", mobileOpen && "opacity-0")} />
              <span className={cn("absolute left-0 h-0.5 w-4 bg-current transition-all", mobileOpen ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </nav>

      {/* mobile drawer — module numbers 01–05 as the index */}
      {mobileOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hairline bg-obsidian lg:hidden animate-fade-in">
          <div className="container-page flex flex-col gap-1 py-5">
            <p className="mono-label mb-1">Product</p>
            {PRODUCT_MENU.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-text">
                <span className="font-mono text-[0.6875rem] text-mint-dim">{item.id ?? "★"}</span>
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-hairline" />
            {PRIMARY_NAV.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-2 py-2.5 text-base text-text">
                {link.label}
              </Link>
            ))}
            <Button href="/book" variant="primary" size="lg" className="mt-3 w-full">
              Book a build call →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
