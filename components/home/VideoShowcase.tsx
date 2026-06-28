import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Product demo showcase.
 *
 * Pass `src` (e.g. "/art/demo.mp4") to render a real, optimized background
 * video — muted, looped, autoplay, lazy (`preload="none"` + poster). With no
 * `src` it renders an animated placeholder so the section, layout, and motion
 * are live until footage is dropped into /public/art. See /public/art/README.md.
 */
export function VideoShowcase({ src, poster }: { src?: string; poster?: string }) {
  return (
    <section className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mb-10 flex flex-col items-center gap-4 text-center">
          <Eyebrow accent="pulse">See it in action</Eyebrow>
          <h2 className="max-w-2xl text-[length:var(--text-h2)] text-balance">
            Watch an AI agent work a real shift
          </h2>
          <p className="max-w-xl text-lg text-muted text-pretty">
            From inbound call to captured refill to a line on the ledger — the whole loop,
            with no staff touch.
          </p>
        </Reveal>

        <Reveal>
          <div className="panel panel-pulse relative mx-auto aspect-video max-w-4xl overflow-hidden">
            {/* faux app chrome */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-line/60 bg-white/70 px-4 py-2.5 backdrop-blur-sm">
              <span className="size-2.5 rounded-full bg-danger/60" />
              <span className="size-2.5 rounded-full bg-[#f5b301]/70" />
              <span className="size-2.5 rounded-full bg-pulse/60" />
              <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                pulse.ssvp — live demo
              </span>
            </div>

            {src ? (
              <video
                className="size-full object-cover"
                src={src}
                poster={poster}
                muted
                loop
                autoPlay
                playsInline
                preload="none"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                {/* animated brand field */}
                <div
                  aria-hidden
                  className="absolute inset-0 animate-gradient-pan bg-[linear-gradient(120deg,color-mix(in_srgb,var(--brand-1)_16%,white),color-mix(in_srgb,var(--brand-3)_20%,white),white)]"
                />
                <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
                {/* light sweep */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-scan bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] blur-md"
                />
                {/* play button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <span className="relative grid size-20 place-items-center rounded-full bg-white/85 shadow-[0_18px_50px_-16px_color-mix(in_srgb,var(--brand-2)_60%,transparent)] backdrop-blur">
                    <span aria-hidden className="absolute inset-0 rounded-full bg-pulse/25 animate-ping-slow" />
                    <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 text-pulse" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="rounded-full border border-line bg-white/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted backdrop-blur">
                    90-sec demo · coming soon
                  </span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
