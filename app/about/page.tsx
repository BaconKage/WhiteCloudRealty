import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FoundersDesk } from "@/components/about/FoundersDesk";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { aboutIntro, ethos } from "@/content/founder";
import { pillars, verticals } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description:
    "White Cloud Realty is a strategic real estate advisory firm covering residential, commercial and land across Bengaluru. Buying, selling and renting, handled end to end.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Clarity, confidence, long-term value" lede={aboutIntro.lede} />

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

              <div className="border-line bg-raised relative aspect-4/3 overflow-hidden rounded-(--radius-card) border shadow-[0_24px_60px_-32px_rgb(0_0_0_/_0.45)]">
                <Image
                  src="/images/projects/white-lotus-amanvana-4k.webp"
                  alt="White Lotus Amanvana: a brick and concrete building with planted terraces, one of the projects White Cloud Realty represents."
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover transition-transform duration-[1100ms] ease-(--ease-out-soft) group-hover:scale-[1.035]"
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
              <p className="text-muted mt-2 text-sm leading-relaxed">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-3xl">
          <p className="eyebrow text-accent">{ethos.eyebrow}</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">{ethos.title}</h2>
          <p className="text-muted mt-5 text-(length:--text-lede) leading-relaxed">{ethos.lede}</p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {ethos.pairs.map((pair, i) => (
            <Reveal
              key={pair.from}
              as="li"
              delay={i * 70}
              className="border-line bg-surface rounded-(--radius-card) border p-6"
            >
              <p className="font-display text-xl leading-snug">
                {pair.from} <span className="text-accent">meets {pair.to}.</span>
              </p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Button href="/team" variant="brand">
            Meet the team
          </Button>
          <p className="font-display text-lg">{ethos.people}</p>
        </div>
      </Section>

      <Section tone="raised">
        <h2 className="text-(length:--text-h2) leading-[1.08]">What sets us apart</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 70}
              className="border-line bg-surface rounded-(--radius-card) border p-7"
            >
              <span className="numeric text-accent/40 font-display text-4xl leading-none">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-(length:--text-h3) leading-snug">{pillar.title}</h3>
              <p className="text-muted mt-3 leading-relaxed">{pillar.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="border-line bg-bg mt-10 rounded-(--radius-card) border border-dashed p-8 text-center">
          <p className="font-display text-(length:--text-h3) leading-snug">{aboutIntro.openTo}</p>
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
