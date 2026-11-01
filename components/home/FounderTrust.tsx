import { ethos } from "@/content/founder";
import { founders } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FounderCard } from "@/components/team/FounderCard";
import { PerspectivesDiagram } from "@/components/about/PerspectivesDiagram";

/**
 * A concise trust bridge for the home page: the two founders side by side, and
 * what they bring to the firm together. The founder's full letter stays on
 * About, and the longer introductions on Meet the team.
 */
export function FounderTrust() {
  return (
    <section className="on-paper bg-bg py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal variant="section" className="editorial-section__inner">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent-text">Founder-led advisory</p>
            <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">
              A trusted adviser in your corner.
            </h2>
            <p className="text-muted mt-5 text-(length:--text-lede) leading-relaxed">
              {ethos.title} Different journeys, and one advisory that understands both sides of the
              market.
            </p>
          </div>

          <PerspectivesDiagram className="mt-10 lg:mt-12" />

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:mt-12 lg:gap-14">
            {founders.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <FounderCard
                  member={member}
                  action={i === 0 ? { label: "Read the founder’s letter", href: "/about#founders-desk" } : undefined}
                />
              </Reveal>
            ))}
          </div>

          <ul className="border-line mt-12 grid gap-4 border-t pt-8 sm:grid-cols-3">
            {ethos.pairs.map((pair, i) => (
              <Reveal key={pair.from} as="li" delay={i * 70}>
                <p className="font-display text-xl leading-snug">
                  {pair.from} <span className="text-accent-text">meets {pair.to}.</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
