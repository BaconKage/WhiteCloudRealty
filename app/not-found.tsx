import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/content/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="That page has moved on"
        lede="The link is probably an old one. A few pages got renamed when we rebuilt the site."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg" className="bg-accent text-ink hover:opacity-90">
            Back to home
          </Button>
          <Button href="/projects" size="lg" variant="secondary">
            Browse projects
          </Button>
        </div>
      </PageHero>

      <Section width="prose">
        <h2 className="text-(length:--text-h3)">Try one of these</h2>
        <ul className="mt-6 divide-y divide-(--color-line)">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-fg hover:text-accent-text flex min-h-14 items-center justify-between gap-4 transition-colors"
              >
                {link.label}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
