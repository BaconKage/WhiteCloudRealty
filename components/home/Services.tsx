import { getService, type Service } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/content/site";

/**
 * What a visitor is actually here to do: buy, sell, rent, invest, or take on a
 * commercial brief. Buy, invest and sell keep the old home page's copy.
 */
const ORDER = ["buy", "sell", "rent", "invest", "commercial"];

export function Services() {
  const services = ORDER.map(getService).filter((s): s is Service => Boolean(s));

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title="Buy. Sell. Rent. And commercial too."
        lede="A home, an income-generating asset or a commercial investment. Start with the outcome; we will help you work backwards to the right move."
      />

      <p className="text-faint mt-7 text-xs lg:hidden">Swipe to see all five &rarr;</p>

      <div className="scrollbar-none -mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-6 lg:gap-7 lg:overflow-visible lg:px-0 lg:pb-0">
        {services.map((service, i) => (
          <Reveal
            key={service.id}
            delay={i * 90}
            as="article"
            className={`group border-line bg-surface hover:border-accent/50 relative flex min-w-[85vw] snap-start flex-col overflow-hidden rounded-(--radius-card) border p-6 transition-[border-color,translate,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-28px_rgb(0_0_0_/_0.4)] sm:min-w-[22rem] sm:p-8 lg:min-w-0 ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            <span
              aria-hidden="true"
              className="from-accent/8 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <span
              id={service.id}
              className="numeric text-accent-text relative text-sm font-semibold transition-transform duration-400 ease-(--ease-spring) group-hover:-translate-y-0.5"
              style={{ scrollMarginTop: "6rem" }}
            >
              0{i + 1}
            </span>

            <p className="eyebrow text-accent-text relative mt-4 font-sans">{service.label}</p>
            <h3 className="relative mt-2 text-(length:--text-h3) leading-snug">{service.title}</h3>
            <p className="text-muted mt-4 leading-relaxed">{service.lede}</p>

            <ul className="mt-7 space-y-3">
              {service.list.slice(0, 3).map((item) => (
                <li key={item} className="text-muted flex gap-3 text-sm leading-relaxed">
                  <svg viewBox="0 0 24 24" className="text-accent mt-1 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            {/* mt-auto keeps the three cards' buttons on one line despite
                different amounts of copy above them. */}
            <div className="mt-auto pt-7">
              <Button
                href={whatsappLink(`Hi White Cloud Realty, I'd like to talk about: ${service.label}.`)}
                variant="secondary"
              >
                {service.cta}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
