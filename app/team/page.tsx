import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FounderCard } from "@/components/team/FounderCard";
import { TeamCard } from "@/components/team/TeamCard";
import { CtaBand } from "@/components/home/CtaBand";
import { founders, team } from "@/content/team";
import { ethos } from "@/content/founder";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet the team",
  description:
    "The people at White Cloud Realty: a Bengaluru advisory team working across residential, commercial and land, from the first brief to the final paperwork.",
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
        <div className="max-w-3xl">
          <p className="eyebrow text-accent-text">{ethos.eyebrow}</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">{ethos.title}</h2>
          <p className="text-muted mt-4 text-(length:--text-lede) leading-relaxed">{ethos.lede}</p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:gap-14">
          {founders.map((member, i) => (
            <Reveal key={member.name} delay={i * 100}>
              <FounderCard
                member={member}
                showContact
                action={i === 0 ? { label: "Read the founder’s letter", href: "/about#founders-desk" } : undefined}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <div className="max-w-2xl">
          <h2 className="text-(length:--text-h2) leading-[1.08]">The advisory team</h2>
          <p className="text-muted mt-4 text-(length:--text-lede) leading-relaxed">
            Discovery, site visits, negotiation, documentation and loan support, handled by people
            who know Bengaluru project by project.
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
