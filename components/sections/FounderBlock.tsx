import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FounderBlock() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>THE ANTI-AGENCY</Eyebrow>
          <h2 className="mt-5 text-[length:var(--text-h2)] text-balance">
            Built by an engineer, not an account manager.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted text-pretty">
            SSVP is founder-led and engineering-first. The person scoping your
            system is the person who writes the code — trained in AI/ML at
            Stevens Institute of Technology, with production healthcare AI already
            shipped. No account managers translating your problem into a slide
            deck. <span className="text-text">You talk to the builder.</span>
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/about" variant="ghost">
              Read the full story →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
