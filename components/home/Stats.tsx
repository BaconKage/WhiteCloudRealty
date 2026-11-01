import Link from "next/link";
import { localities } from "@/content/localities";
import { partners } from "@/content/partners";
import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Every figure is counted from the content files, so the band can never drift
 * out of step with the rest of the site. Nothing here is a claim we cannot
 * point at somewhere on the page.
 */
const stats = [
  { value: localities.length, label: "Parts of Bengaluru", href: "/#locations" },
  { value: new Set(localities.flatMap((l) => l.markets)).size, label: "Micro-markets covered", href: "/#locations" },
  { value: partners.length, label: "Developer partners", href: "/#partners" },
  { value: testimonials.length, label: "Client recommendations", href: "/#testimonials" },
];

export function Stats() {
  return (
    <section aria-label="At a glance" className="on-ink bg-ink border-line border-y">
      <Container className="py-10 lg:py-12">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} as="li">
              <Link href={stat.href} className="group block">
                <span className="numeric font-display text-fg block text-4xl leading-none transition-[translate] duration-200 group-hover:-translate-y-0.5 sm:text-5xl">
                  <Counter to={stat.value} />
                </span>
                <span className="text-muted group-hover:text-fg mt-3 block text-sm transition-colors">
                  {stat.label}
                </span>
                <span
                  aria-hidden="true"
                  className="bg-brand mt-3 block h-0.5 w-8 origin-left transition-transform duration-200 group-hover:scale-x-[3]"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
