import Image from "next/image";
import { founderLetter } from "@/content/founder";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The founder's letter, given the room it deserves. On the old site it sat
 * collapsed behind a "Show More" link halfway down the home page.
 *
 * The portrait slot is optional — see the TODO on site.founder.portrait. With
 * no photo the layout falls back to a single wide column rather than leaving
 * an empty frame.
 */
export function FoundersDesk() {
  const portrait = site.founder.portrait;

  return (
    <section
      id="founders-desk"
      className="on-ink bg-ink-deep relative isolate overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_12%_10%,rgb(201_162_39/0.14),transparent_60%)]"
      />

      <Container>
        <Reveal>
          <p className="eyebrow text-accent">{founderLetter.eyebrow}</p>
        </Reveal>

        <div
          className={
            portrait
              ? "mt-10 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:gap-16"
              : "mt-10"
          }
        >
          {portrait && (
            <Reveal variant="image" as="figure" className="lg:sticky lg:top-28 lg:self-start">
              <div className="group border-line relative aspect-square overflow-hidden rounded-(--radius-card) border">
                <Image
                  src={portrait}
                  alt={`${site.founder.name}, ${site.founder.role} of ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover transition-transform duration-[900ms] ease-(--ease-out-soft) group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(11_17_25/0.55),transparent_55%)]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-lg font-medium text-[#f5f3ee]">
                    {site.founder.name}
                  </span>
                  <span className="text-accent block text-sm">{site.founder.role}</span>
                </figcaption>
              </div>
            </Reveal>
          )}

          <div className={portrait ? "" : "max-w-4xl"}>
            <Reveal>
              <h2 className="text-(length:--text-h2) leading-[1.06]">{founderLetter.greeting}</h2>
            </Reveal>

            <Reveal delay={80}>
              <blockquote className="border-accent font-display text-accent mt-8 border-l-2 pl-6 text-(length:--text-h3) leading-snug">
                {founderLetter.pullQuote}
              </blockquote>
            </Reveal>

            <div className="mt-8 max-w-[68ch] space-y-5">
              {founderLetter.paragraphs.map((para, i) => (
                <Reveal key={para.slice(0, 28)} delay={Math.min(i, 3) * 60} as="p">
                  <span className="text-muted block leading-relaxed">{para}</span>
                </Reveal>
              ))}
            </div>

            <Reveal className="border-line mt-10 border-t pt-8">
              <p className="text-muted text-sm">{founderLetter.signOff}</p>
              <p className="font-display mt-2 text-(length:--text-h3) leading-none">
                {founderLetter.name}
              </p>
              <p className="text-accent mt-2 text-sm">{founderLetter.role}</p>
              <a
                href={site.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
