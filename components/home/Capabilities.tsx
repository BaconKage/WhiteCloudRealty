import { capabilities, verticals } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Asset classes plus the full capability list. The capability list has only
 * ever existed in the firm's printed collateral, never on the website.
 */
export function Capabilities() {
  return (
    <Section tone="raised">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="eyebrow text-accent-text">Residential · Commercial · Land</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">
            Buy. Sell. Rent.
            <br />
            Across every asset class.
          </h2>

          <div className="mt-10 space-y-8">
            {verticals.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <h3 className="text-accent-text font-sans text-sm font-semibold tracking-wide uppercase">
                  {v.title}
                </h3>
                <p className="text-muted mt-2 leading-relaxed">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="border-line bg-surface rounded-(--radius-card) border p-7 sm:p-9">
          <h3 className="eyebrow text-faint font-sans">What we handle</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c} className="text-fg flex items-start gap-3 text-sm leading-relaxed">
                <svg viewBox="0 0 24 24" className="text-accent mt-[0.3rem] h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
