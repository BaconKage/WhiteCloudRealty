import Link from "next/link";
import { projects } from "@/content/projects";
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
  { value: projects.length, label: "Projects on our desk", href: "/projects" },
  { value: partners.length, label: "Developer partners", href: "/about#partners" },
  { value: localities.length, label: "Corridor localities", href: "/#corridor" },
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
                <span className="numeric font-display text-accent block text-4xl leading-none transition-transform duration-400 ease-(--ease-spring) group-hover:-translate-y-0.5 sm:text-5xl">
                  <Counter to={stat.value} />
                </span>
                <span className="text-muted group-hover:text-fg mt-3 block text-sm transition-colors">
                  {stat.label}
                </span>
                <span
                  aria-hidden="true"
                  className="bg-accent mt-3 block h-px w-8 origin-left scale-x-100 transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-x-[3]"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
