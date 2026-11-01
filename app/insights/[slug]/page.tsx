import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { ZoneCloseUp } from "@/components/insights/ZoneCloseUp";
import { MetroDiagram } from "@/components/insights/MetroDiagram";
import { articles, getArticle, type ArticleSection } from "@/content/insights";
import { getLocality } from "@/content/localities";
import { whatsappLink, site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

function Block({ section }: { section: ArticleSection }) {
  return (
    <Reveal as="section" className="mt-12 first:mt-0">
      <h2 className="text-(length:--text-h3) leading-snug">{section.heading}</h2>
      {section.paragraphs.map((para) => (
        <p key={para.slice(0, 28)} className="text-muted mt-4 leading-relaxed">
          {para}
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((bullet) => {
            // "Green Line: runs through..." sets its lead-in apart.
            const split = bullet.search(/[:.] /);
            const hasLead = split > 0 && split < 30;
            return (
              <li key={bullet.slice(0, 28)} className="text-muted flex gap-3 leading-relaxed">
                <span aria-hidden="true" className="bg-accent mt-[0.7em] h-1 w-4 shrink-0 rounded-full" />
                <span>
                  {hasLead ? (
                    <>
                      <span className="text-fg font-medium">{bullet.slice(0, split + 1)}</span>
                      {bullet.slice(split + 1)}
                    </>
                  ) : (
                    bullet
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {section.visual === "metro" && <MetroDiagram />}
    </Reveal>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const locality = article.localityId ? getLocality(article.localityId) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    url: absoluteUrl(`/insights/${article.slug}`),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero eyebrow={article.tag} title={article.title} lede={article.excerpt}>
        <p className="text-faint mt-6 text-sm">
          {formatDate(article.date)} &middot; {article.readingMinutes} min read
        </p>
      </PageHero>

      {article.localityId ? (
        <Section>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <Reveal variant="image" className="lg:sticky lg:top-24 lg:self-start">
              <ZoneCloseUp id={article.localityId} />
            </Reveal>
            <div>
              {article.sections.map((section) => (
                <Block key={section.heading} section={section} />
              ))}
            </div>
          </div>
        </Section>
      ) : (
        <Section width="prose">
          {article.sections.map((section) => (
            <Block key={section.heading} section={section} />
          ))}
        </Section>
      )}

      {article.markets && (
        <Section tone="raised">
          <h2 className="text-(length:--text-h2) leading-tight">{article.marketsHeading}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {article.markets.map((market, i) => (
              <Reveal
                key={market.name}
                as="li"
                delay={(i % 3) * 70}
                className="border-line bg-surface rounded-(--radius-card) border p-6"
              >
                <h3 className="text-xl leading-snug">{market.name}</h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">{market.character}</p>
                <p className="text-accent-text mt-4 text-sm font-medium">{market.suits}</p>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {article.closing && (
        <Section width="prose">
          {article.closing.map((section) => (
            <Block key={section.heading} section={section} />
          ))}

          <Reveal className="border-line mt-14 border-t pt-8">
            <p className="font-display text-(length:--text-h3) leading-snug">
              Looking at {locality?.name ?? "this part of the city"}?
            </p>
            <p className="text-muted mt-2 leading-relaxed">
              Tell us what you have in mind and we&rsquo;ll help you work through it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={whatsappLink(
                  `Hi ${site.name}, I read your guide to ${locality?.name ?? article.title} and would like to talk.`,
                )}
                variant="brand"
              >
                Talk to us on WhatsApp
              </Button>
              <Button href="/insights" variant="secondary">
                All insights
              </Button>
            </div>
            <p className="text-faint mt-6 text-xs leading-relaxed">
              General guidance, not legal or financial advice. Metro timelines and project details
              change, so please verify them before making any commitment.{" "}
              <Link href="/#locations" className="underline underline-offset-4">
                Choose another location
              </Link>
              .
            </p>
          </Reveal>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
