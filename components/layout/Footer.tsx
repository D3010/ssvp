import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { PulseLine } from "@/components/ui/PulseLine";
import { FOOTER_NAV } from "@/content/nav";
import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2/50">
      <div className="container-wide py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm text-muted text-pretty">
              AI systems that do real work — and stream the results live.
            </p>
            <div className="mt-5">
              <PulseLine variant="footer" />
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block font-mono text-sm text-ice hover:text-text"
            >
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-14">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}</p>
          <p className="font-mono text-xs tracking-wide text-muted/70">
            {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
