import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PulseLine } from "@/components/ui/PulseLine";
import { Button } from "@/components/ui/Button";

/**
 * Designed 404 (Server Component). Lives inside the root layout, so it renders
 * its own centered section. One h1. Noir: mono 404, the signature pulse line,
 * a route home and a route to the product.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="tabular font-mono text-[clamp(4rem,18vw,10rem)] font-semibold leading-none text-mint/25">
          404
        </span>

        <div className="mt-6">
          <Eyebrow accent="pulse">READ-BACK FAILED</Eyebrow>
        </div>

        <h1 className="mt-5 max-w-2xl text-[length:var(--text-h2)] font-semibold text-balance text-text">
          This page slipped through verification.
        </h1>

        <div className="mt-7 w-full max-w-xs">
          <PulseLine variant="underline" className="mx-auto" />
        </div>

        <p className="mt-7 max-w-md text-lg text-muted text-pretty">
          Every write on SSVP is read back and compared before it counts — and
          this URL didn&rsquo;t match anything on record. Let&rsquo;s get you back
          to something real.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Back to home
            <span aria-hidden="true">→</span>
          </Button>
          <Link
            href="/product"
            className="font-mono text-sm uppercase tracking-[0.12em] text-mint transition-colors hover:text-text"
          >
            See the five modules
          </Link>
        </div>
      </div>
    </section>
  );
}
