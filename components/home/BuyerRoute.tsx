import { buyerRoute } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function BuyerRoute() {
  return (
    <Section id="how-we-work">
      <SectionHeading
        eyebrow="How we work"
        title="From brief to keys"
        lede="No pressure and no hard sell. You give us a brief, we measure things against it honestly, and somebody stays in your corner once the paperwork starts."
      />

      <ol className="mt-12 grid gap-px lg:mt-16 lg:grid-cols-3">
        {buyerRoute.map((step, i) => (
          <Reveal
            key={step.step}
            delay={i * 110}
            as="li"
            className="group border-line bg-surface hover:bg-raised relative overflow-hidden border p-7 transition-colors duration-500 sm:p-9 lg:rounded-none lg:first:rounded-l-(--radius-card) lg:last:rounded-r-(--radius-card)"
          >
            <span
              aria-hidden="true"
              className="bg-accent absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-x-100"
            />

            <span className="numeric font-display text-accent/35 group-hover:text-accent/70 text-5xl leading-none transition-colors duration-500">
              {step.step}
            </span>
            <h3 className="mt-5 text-(length:--text-h3) leading-snug">{step.title}</h3>
            <p className="text-muted mt-3 leading-relaxed">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
