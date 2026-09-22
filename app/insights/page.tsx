import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/home/CtaBand";
import { localities } from "@/content/localities";
import { projects } from "@/content/projects";
import { articles } from "@/content/insights";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "A plain-language guide to the North Bengaluru airport corridor. What holds each locality up, and what is being built there.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="North Bengaluru, explained"
        lede="The corridor, one locality at a time. What holds each one up, and what we happen to be representing there."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {localities.map((locality, i) => {
            const here = projects.filter((p) => p.localityId === locality.id);

            return (
              <Reveal
                key={locality.id}
                delay={(i % 2) * 80}
                as="article"
                className="border-line bg-surface flex flex-col rounded-(--radius-card) border p-7"
              >
                <p className="text-accent-text text-[0.625rem] tracking-[0.14em] uppercase">
                  {locality.tag}
                </p>
                <h2 className="mt-3 text-(length:--text-h3) leading-snug">{locality.name}</h2>
                <p className="text-muted mt-3 leading-relaxed">{locality.blurb}</p>

                <ul className="mt-5 space-y-2">
                  {locality.anchors.map((anchor) => (
                    <li key={anchor} className="text-fg flex items-center gap-3 text-sm">
                      <span aria-hidden="true" className="bg-accent h-1 w-4 shrink-0 rounded-full" />
                      {anchor}
                    </li>
                  ))}
                </ul>

                <div className="border-line mt-auto border-t pt-5">
                  {here.length > 0 ? (
                    <Link
                      href={`/projects?locality=${locality.id}`}
                      className="text-accent-text inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4"
                    >
                      {here.length} project{here.length === 1 ? "" : "s"} here
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="text-muted hover:text-accent-text inline-flex min-h-11 items-center text-sm underline underline-offset-4 transition-colors"
                    >
                      Ask us what is available here
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {articles.length > 0 ? (
        <Section tone="raised">
          <h2 className="text-(length:--text-h2) leading-tight">Articles</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li
                key={article.slug}
                className="border-line bg-surface rounded-(--radius-card) border p-6"
              >
                <p className="text-accent-text text-[0.625rem] tracking-[0.14em] uppercase">
                  {article.tag}
                </p>
                <h3 className="mt-3 text-(length:--text-h3) leading-snug">
                  <Link href={`/insights/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">{article.excerpt}</p>
                <p className="text-faint mt-5 text-xs">
                  {formatDate(article.date)} &middot; {article.readingMinutes} min read
                </p>
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        <Section tone="raised" width="prose">
          <div className="border-line rounded-(--radius-card) border border-dashed p-10 text-center">
            <h2 className="text-(length:--text-h3)">Written pieces are on the way</h2>
            <p className="text-muted mx-auto mt-3 max-w-md leading-relaxed">
              For now, if you want a read on a particular project or a particular pocket of the
              corridor, the fastest thing is just to ask.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Ask a question</Button>
              <Button href="/projects" variant="secondary">
                Browse projects
              </Button>
            </div>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
