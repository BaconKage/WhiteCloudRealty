import Image from "next/image";
import { founderLetter } from "@/content/founder";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A concise trust bridge for the home page. The complete founder letter stays
 * on About; this version introduces the person behind the advisory without
 * turning the home page back into a long-form biography.
 */
export function FounderTrust() {
  const portrait = site.founder.portrait;

  return (
    <section className="on-paper bg-bg py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal
          variant="section"
          className="editorial-section__inner grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16"
        >
          {portrait && (
            <Reveal variant="image" as="figure" className="relative mx-auto w-full max-w-md lg:max-w-none">
              <span
                aria-hidden="true"
                className="bg-accent/20 absolute -inset-3 -z-10 rounded-[1.5rem] blur-2xl"
              />
              <div className="border-line bg-raised relative aspect-4/5 overflow-hidden rounded-(--radius-card) border shadow-[0_24px_60px_-32px_rgb(0_0_0_/_0.45)]">
                <Image
                  src={portrait}
                  alt={`${site.founder.name}, ${site.founder.role} of ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_17_25/0.62),transparent_52%)]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block text-lg font-medium">{site.founder.name}</span>
                  <span className="text-[#e2bd4a] block text-sm">{site.founder.role}</span>
                </figcaption>
              </div>
            </Reveal>
          )}

          <div>
            <Reveal>
              <p className="eyebrow text-accent-text">Founder-led advisory</p>
              <h2 className="mt-3 max-w-2xl text-(length:--text-h2) leading-[1.08]">
                A trusted adviser in your corner.
              </h2>
              <p className="text-muted mt-5 max-w-2xl text-(length:--text-lede) leading-relaxed">
                Sayanti Majumdar founded White Cloud Realty around a simple idea: property
                decisions should be led by clarity and context, never pressure.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <blockquote className="border-accent font-display text-fg mt-8 max-w-2xl border-l-2 pl-6 text-(length:--text-h3) leading-snug">
                “{founderLetter.pullQuote}”
              </blockquote>
            </Reveal>

            <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
              <Button href="/about#founders-desk">Meet the founder</Button>
              <Button href={site.founder.linkedin} variant="secondary">
                Connect on LinkedIn
              </Button>
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
