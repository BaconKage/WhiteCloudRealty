import { site } from "@/content/site";
import { welcome } from "@/content/founder";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<string, React.ReactNode> = {
  "Residential Real Estate": <path d="M4 11.5 12 5l8 6.5M6.5 10v8.5h11V10M10 18.5v-5h4v5" />,
  "Commercial Real Estate": (
    <path d="M5 19.5V6.5l8-2v15M13 9.5l6 1.5v8.5M3.5 19.5h17M8 9h2M8 12.5h2M8 16h2M16 13.5h.01M16 16.5h.01" />
  ),
  "Land Advisory": <path d="M3.5 18.5h17M5 18.5l4.5-7 3.5 4.5 2.5-3 4 5.5M15.5 7.5a2 2 0 1 0 .01 0" />,
};

/** The firm's own description of itself, from its welcome slide. */
export function Welcome() {
  return (
    <Section id="welcome">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="eyebrow text-accent-text">{welcome.eyebrow}</p>
          <p className="font-display mt-4 text-(length:--text-h2) leading-[1.16] font-medium tracking-tight text-balance">
            We are a <span className="text-accent-text">Strategic Real Estate Advisory</span> firm
            committed to helping individuals, families, and businesses navigate the property
            landscape with <span className="text-accent-text">clarity, confidence,</span> and{" "}
            <span className="text-accent-text">long-term value.</span>
          </p>
          <p className="text-muted mt-6 max-w-2xl text-(length:--text-lede) leading-relaxed">
            {welcome.closer}
          </p>

          <dl className="border-line mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6 text-sm">
            <div>
              <dt className="text-faint text-xs">Call</dt>
              <dd>
                <a
                  href={site.contact.phoneHref}
                  className="hover:text-accent-text inline-flex min-h-9 items-center font-medium transition-colors"
                >
                  {site.contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-faint text-xs">Mail</dt>
              <dd>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-accent-text inline-flex min-h-9 items-center font-medium break-all transition-colors"
                >
                  {site.contact.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:pt-8">
          <ul className="grid gap-3">
            {welcome.verticals.map((vertical, i) => (
              <Reveal
                key={vertical}
                as="li"
                delay={i * 70}
                className="border-line bg-surface flex items-center gap-4 rounded-(--radius-card) border p-4"
              >
                <span className="bg-brand text-ink flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[vertical]}
                  </svg>
                </span>
                <span className="font-display text-lg leading-snug">{vertical}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={220} className="on-ink bg-ink-deep mt-3 rounded-(--radius-card) px-5 py-6 text-center">
            <p className="font-display text-(length:--text-h3) tracking-tight">
              {welcome.intents.map((intent, i) => (
                <span key={intent}>
                  {i > 0 && (
                    <span aria-hidden="true" className="text-accent mx-3">
                      &middot;
                    </span>
                  )}
                  {intent}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
