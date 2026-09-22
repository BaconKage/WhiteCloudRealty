import { testimonials, featuredTestimonial, shortTestimonials, initials } from "@/content/testimonials";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard, LinkedInGlyph } from "@/components/testimonials/TestimonialCard";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/Button";

/**
 * Renders nothing while content/testimonials.ts is empty, so the section can
 * never ship as an empty heading the way the old /testimonials page did.
 */
export function Testimonials({ compact = false }: { compact?: boolean }) {
  if (testimonials.length === 0) return null;

  const visibleTestimonials = compact ? shortTestimonials.slice(0, 2) : shortTestimonials;

  return (
    <Section id="testimonials" tone="raised">
      <SectionHeading
        eyebrow="In their words"
        title="Experiences that speak for us"
        lede={
          compact
            ? "Recommendations shared by clients and colleagues who have worked with Sayanti."
            : "Recommendations clients and colleagues wrote on LinkedIn. Reproduced here in full, nothing trimmed."
        }
        action={
          compact ? (
            <Button href="/about#testimonials" variant="secondary">
              Read all client stories
            </Button>
          ) : undefined
        }
      />

      {featuredTestimonial && (
        <Reveal className="mt-12 lg:mt-16">
          <figure
            className={`group on-ink bg-ink-deep relative isolate overflow-hidden rounded-(--radius-card) p-8 sm:p-10 ${
              compact ? "lg:p-10" : "lg:p-14"
            }`}
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(70%_100%_at_85%_0%,rgb(201_162_39/0.18),transparent_60%)] transition-opacity duration-700 group-hover:opacity-150"
            />
            <span
              aria-hidden="true"
              className="font-display text-accent/30 absolute top-6 right-8 text-[8rem] leading-none transition-transform duration-700 group-hover:scale-110 sm:text-[12rem]"
            >
              &rdquo;
            </span>

            <div className="relative max-w-3xl">
              <p className="font-display text-accent text-(length:--text-h3) leading-snug">
                {featuredTestimonial.highlight}
              </p>

              {!compact && (
                <blockquote className="mt-8 space-y-4">
                  {featuredTestimonial.quote.map((para) => (
                    <p key={para.slice(0, 28)} className="text-muted leading-relaxed">
                      {para}
                    </p>
                  ))}
                </blockquote>
              )}

              <figcaption
                className={`border-line flex flex-wrap items-center gap-4 border-t ${
                  compact ? "mt-8 pt-6" : "mt-10 pt-8"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="ring-accent/40 text-accent flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-base font-semibold ring-1 transition-transform duration-500 group-hover:scale-105"
                >
                  {initials(featuredTestimonial.name)}
                </span>
                <span>
                  <span className="text-fg block text-lg font-medium">
                    {featuredTestimonial.name}
                  </span>
                  <span className="text-muted block text-sm">
                    {[featuredTestimonial.role, featuredTestimonial.company]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  <span className="text-faint mt-1.5 flex items-center gap-2 text-xs">
                    <LinkedInGlyph />
                    {featuredTestimonial.relationship}
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={featuredTestimonial.date}>
                      {formatDate(featuredTestimonial.date)}
                    </time>
                  </span>
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      )}

      <ul className={`mt-6 grid gap-6 md:grid-cols-2 ${compact ? "" : "lg:grid-cols-3"}`}>
        {visibleTestimonials.map((t, i) => (
          <Reveal key={t.name} delay={(i % 3) * 90} as="li" className="flex">
            <TestimonialCard testimonial={t} className="w-full" />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
