import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/home/CtaBand";
import { ZoneThumb, ZoneThumbDefs } from "@/components/home/ZoneThumb";
import { localities } from "@/content/localities";
import { projects } from "@/content/projects";
import { guides } from "@/content/insights";
import { GuideSlider } from "@/components/insights/GuideSlider";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "A plain-language guide to Bengaluru's property market, area by area. What holds each part of the city up, and where to look.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Bangalore, explained"
        lede="The city, one part at a time. What holds each zone up, the micro-markets in it, and what we are representing there."
      />

      <Section>
        <h2 className="text-(length:--text-h2) leading-tight">Guides</h2>
        <p className="text-muted mt-3 max-w-2xl leading-relaxed">
          Every part of Bengaluru, one guide at a time.
        </p>
        <div className="mt-6">
          <ZoneThumbDefs />
          <GuideSlider guides={guides} />
        </div>
      </Section>

      <Section tone="raised">
        <h2 className="text-(length:--text-h2) leading-tight">Every part of the city</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {localities.map((locality, i) => {
            const here = projects.filter((p) => p.localityId === locality.id);
            const guide = guides.find((a) => a.localityId === locality.id);

            return (
              <Reveal
                key={locality.id}
                delay={(i % 2) * 80}
                as="article"
                className="border-line bg-surface flex flex-col rounded-(--radius-card) border p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-accent-text text-xs font-medium tracking-wide">{locality.tag}</p>
                    <h3 className="mt-3 text-(length:--text-h3) leading-snug">{locality.name}</h3>
                  </div>
                  <ZoneThumb id={locality.id} className="h-20 w-auto shrink-0" />
                </div>
                <p className="text-muted mt-3 leading-relaxed">{locality.blurb}</p>

                <ul className="mt-5 space-y-2">
                  {locality.anchors.map((anchor) => (
                    <li key={anchor} className="text-fg flex items-center gap-3 text-sm">
                      <span aria-hidden="true" className="bg-accent h-1 w-4 shrink-0 rounded-full" />
                      {anchor}
                    </li>
                  ))}
                </ul>

                <p className="text-faint mt-5 mb-5 text-sm leading-relaxed">
                  {locality.markets.join(", ")}
                </p>

                <div className="border-line mt-auto flex flex-wrap gap-x-5 border-t pt-4 text-sm">
                  {guide && (
                    <Link
                      href={`/insights/${guide.slug}`}
                      className="text-accent-text inline-flex min-h-11 items-center font-medium underline underline-offset-4"
                    >
                      Read the guide
                    </Link>
                  )}
                  {here.length > 0 && (
                    <Link
                      href={`/projects?locality=${locality.id}`}
                      className="text-accent-text inline-flex min-h-11 items-center font-medium underline underline-offset-4"
                    >
                      {here.length} project{here.length === 1 ? "" : "s"} here
                    </Link>
                  )}
                  <Link
                    href={`/#location-${locality.id}`}
                    className="text-muted hover:text-accent-text inline-flex min-h-11 items-center underline underline-offset-4 transition-colors"
                  >
                    Ask us about this area
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
