import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TeamCard } from "@/components/team/TeamCard";
import { CtaBand } from "@/components/home/CtaBand";
import { founder, team } from "@/content/team";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet the team",
  description:
    "The people at White Cloud Realty: a Bengaluru advisory team working across residential, commercial and land in North Bengaluru, from the first brief to the final paperwork.",
  path: "/team",
});

const companyLinkedin = site.social.find((s) => s.label === "LinkedIn")?.href;

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        title="The people behind your search"
        lede="A Bengaluru advisory team working across residential, commercial and land, with the same people beside you from the first brief to the final paperwork."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <Reveal variant="image" as="figure" className="group">
            <div className="border-line relative aspect-4/5 overflow-hidden rounded-(--radius-card) border shadow-[0_24px_60px_-32px_rgb(0_0_0_/_0.45)] sm:aspect-square lg:aspect-4/5">
              {founder.photo && (
                <Image
                  src={founder.photo}
                  alt={`${founder.name}, ${founder.role} of ${site.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[900ms] ease-(--ease-out-soft) group-hover:scale-[1.04]"
                />
              )}
            </div>
          </Reveal>

          <div className="max-w-[56ch]">
            <Reveal>
              <p className="eyebrow text-accent-text">{founder.role}</p>
              <h2 className="mt-4 text-(length:--text-h2) leading-[1.06]">{founder.name}</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-muted mt-6 text-(length:--text-lede) leading-relaxed">{founder.bio}</p>
            </Reveal>
            <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
              <Button href="/about#founders-desk">Read the founder&rsquo;s letter</Button>
              <Button href={site.founder.linkedin} variant="secondary">
                Connect on LinkedIn
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="raised">
        <div className="max-w-2xl">
          <h2 className="text-(length:--text-h2) leading-[1.08]">The advisory team</h2>
          <p className="text-muted mt-4 text-(length:--text-lede) leading-relaxed">
            Discovery, site visits, negotiation, documentation and loan support, handled by people
            who know North Bengaluru project by project.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} as="li" delay={(i % 3) * 80}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>

        {companyLinkedin && (
          <Reveal className="border-line bg-bg mt-14 flex flex-col gap-6 rounded-(--radius-card) border border-dashed p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-(length:--text-h3) leading-snug">
                We&rsquo;re growing.
              </p>
              <p className="text-muted mt-2 leading-relaxed">
                Openings are posted on our LinkedIn page first.
              </p>
            </div>
            <Button href={companyLinkedin} variant="secondary" className="shrink-0">
              Follow White Cloud Realty
            </Button>
          </Reveal>
        )}
      </Section>

      <CtaBand />
    </>
  );
}
