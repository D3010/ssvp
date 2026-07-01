import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { PulseLine } from "@/components/ui/PulseLine";
import { FOOTER_NAV } from "@/content/nav";
import { SITE } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-obsidian">
      <div className="container-wide py-16">
        {/* the one-liner, set large */}
        <p className="max-w-4xl text-[length:var(--text-h3)] font-display leading-tight text-text text-balance">
          Invisible in the workflow. <span className="text-mint">Visible in the log.</span>
        </p>
        <div className="mt-6">
          <PulseLine variant="divider" className="opacity-50" />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-4 text-sm text-muted text-pretty">
              An AI technician that runs unseen on top of PrimeRx — pharmacist-verified, edge-bound, controlled substances excluded.
            </p>
            <a href={`mailto:${SITE.email}`} className="mt-5 inline-block font-mono text-sm text-mint hover:text-text">
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <p className="mono-label">{col.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted transition-colors hover:text-text">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* content-integrity microcopy — permanent (Part K.6) */}
        <p className="mt-12 max-w-3xl text-xs text-muted/70">
          Figures marked illustrative show their arithmetic; re-run them with your store&apos;s volumes. Verify each PBM&apos;s current provider-manual standards.
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-hairline pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.legalName}</p>
          <p className="font-mono text-xs tracking-wide text-muted/70">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
