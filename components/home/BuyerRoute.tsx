import { journey } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: React.ReactNode[] = [
  <path key="brief" d="M7 3.5h7.5L18 7v13.5H7ZM14 3.5V7.5h4M10 12h5M10 15.5h5" />,
  <path key="list" d="M9.5 6.5h10M9.5 12h10M9.5 17.5h10M4.5 6.5l1 1 2-2.5M4.5 12l1 1 2-2.5M4.5 17.5l1 1 2-2.5" />,
  <path key="visit" d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11ZM12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />,
  <path key="deal" d="M8 13l3.5 3.5a1.8 1.8 0 0 0 2.5 0l5-5a1.8 1.8 0 0 0 0-2.5L16 6h-4L9 8.5M3 8l3-2 5 5-2.5 2.5L3 10" />,
  <path key="paper" d="M6.5 20.5V5.5a2 2 0 0 1 2-2h9v15a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-2h11v2M10 8h4M10 11.5h4" />,
  <path key="keys" d="M14.5 9.5a4.5 4.5 0 1 0-3.6 4.4L13 16h2v2h2v2h3v-3l-5.9-5.9a4.5 4.5 0 0 0 .4-1.6ZM9 8.5h.01" />,
];

/**
 * From brief to keys, as a route rather than a page of paragraphs. The line
 * draws itself on arrival, along the row on wide screens and down the column on
 * phones.
 */
export function BuyerRoute() {
  return (
    <Section id="how-we-work">
      <SectionHeading
        eyebrow="How we work"
        title="From brief to keys"
        lede="No pressure and no hard sell, and somebody stays in your corner once the paperwork starts."
      />

      <Reveal variant="section" className="relative mt-10 lg:mt-14">
        <ol className="relative grid gap-6 lg:grid-cols-6 lg:gap-4">
          <span aria-hidden="true" className="journey-track">
            <span className="journey-fill" />
          </span>

          {journey.map((stop, i) => (
            <Reveal
              key={stop.title}
              as="li"
              delay={i * 110}
              className="group relative flex items-start gap-4 lg:block"
            >
              <span className="bg-brand text-ink relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-[0_0_0_6px_var(--color-bg)] transition-[scale] duration-200 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[i]}
                </svg>
              </span>
              <span className="block lg:mt-4">
                <span className="font-display block text-lg leading-snug">{stop.title}</span>
                <span className="text-muted mt-1 block text-sm leading-relaxed">{stop.note}</span>
              </span>
            </Reveal>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
