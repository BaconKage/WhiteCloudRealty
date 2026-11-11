import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FoundersDesk } from "@/components/about/FoundersDesk";
import { PerspectivesDiagram } from "@/components/about/PerspectivesDiagram";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { aboutIntro, ethos } from "@/content/founder";
import Image from "next/image";
import { pillars, verticals } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "White Cloud Realty is a strategic real estate advisory firm covering residential, commercial and land across Bengaluru. Buying, selling and renting, handled end to end.",
  path: "/about",
});

const PILLAR_ICONS: React.ReactNode[] = [
  <path
    key="route"
    d="M6 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM18 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM8.5 16.5H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"
  />,
  <path
    key="docs"
    d="M7 3.5h7.5L18 7v13.5H7ZM14 3.5V7.5h4M10 12h5M10 15.5h5"
  />,
  <path key="finance" d="M4 19.5h16M5.5 15l4.5-4.5 3.5 3L19 7.5M15 7.5h4v4" />,
  <path key="home" d="M4 11.5 12 5l8 6.5M6.5 10v9.5h11V10M10 19.5v-5h4v5" />,
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Clarity, confidence, long-term value"
        lede={aboutIntro.lede}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div className="max-w-[56ch]">
            {aboutIntro.paragraphs.map((para) => (
              <p
                key={para.slice(0, 28)}
                className="text-muted mt-6 text-(length:--text-lede) leading-relaxed first:mt-0"
              >
                {para}
              </p>
            ))}
          </div>

          <Reveal delay={120} variant="image">
            <figure className="group relative">
              {/* Soft orange bloom behind the frame, so the picture sits on the
                  page rather than being pasted onto it. */}
              <span
                aria-hidden="true"
                // Inset stays inside the 16px mobile gutter, or the bloom pushes
                // the page sideways; it opens up once there is room.
                className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_45%,rgb(255_118_30/0.22),transparent_72%)] blur-2xl sm:-inset-5"
              />

              {/* 3:2 is the graphic's own shape, so none of its text is cropped. */}
              <div className="border-line bg-raised relative aspect-[3/2] overflow-hidden rounded-(--radius-card) border shadow-[0_24px_60px_-32px_rgb(0_0_0_/_0.45)]">
                <Image
                  src="/images/about/welcome-to-white-cloud-realty.webp"
                  alt="Welcome to White Cloud Realty: a strategic real estate advisory for residential, commercial and land, to buy, sell or rent. A hand holds house keys beside a model home, with the city skyline behind."
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>
        </div>

        <div className="border-line mt-16 grid gap-8 border-t pt-12 sm:grid-cols-3 lg:mt-20">
          {verticals.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <h2 className="text-accent-text font-sans text-sm font-semibold tracking-wide uppercase">
                {v.title}
              </h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {v.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">{ethos.eyebrow}</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">
            {ethos.title}
          </h2>
          <p className="text-muted mt-5 text-(length:--text-lede) leading-relaxed">
            {ethos.lede}
          </p>
        </div>

        <PerspectivesDiagram className="mt-10" />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {ethos.voices.map((voice, i) => (
            <Reveal key={voice.name} as="figure" delay={i * 80}>
              <blockquote className="border-accent font-display border-l-2 pl-5 text-lg leading-snug">
                &ldquo;{voice.quote}&rdquo;
              </blockquote>
              <figcaption className="text-accent mt-3 pl-5 text-sm">
                {voice.name}
              </figcaption>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/team" variant="brand">
            Meet the team
          </Button>
          <p className="font-display text-lg">{ethos.people}</p>
        </div>
      </Section>

      <Section tone="raised">
        <h2 className="text-(length:--text-h2) leading-[1.08]">
          What sets us apart
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 70}
              className="border-line bg-surface rounded-(--radius-card) border p-7"
            >
              <span className="bg-brand text-ink flex h-11 w-11 items-center justify-center rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {PILLAR_ICONS[i]}
                </svg>
              </span>
              <h3 className="mt-4 text-(length:--text-h3) leading-snug">
                {pillar.title}
              </h3>
              <p className="text-muted mt-3 leading-relaxed">{pillar.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="border-line bg-bg mt-10 rounded-(--radius-card) border border-dashed p-8 text-center">
          <p className="font-display text-(length:--text-h3) leading-snug">
            {aboutIntro.openTo}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Start a conversation</Button>
            <Button href="/projects" variant="secondary">
              See our projects
            </Button>
          </div>
        </Reveal>
      </Section>

      <FoundersDesk />
      <Partners />
      <Testimonials />
      <CtaBand />
    </>
  );
}
