import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { CorridorStrip } from "@/components/home/CorridorStrip";
import { Services } from "@/components/home/Services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CorridorMap } from "@/components/home/CorridorMap";
import { BuyerRoute } from "@/components/home/BuyerRoute";
import { FounderTrust } from "@/components/home/FounderTrust";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { projects } from "@/content/projects";
import { partners } from "@/content/partners";

const heroProof = [
  "North Bengaluru specialists",
  `${projects.length} projects on our desk`,
  `${partners.length} developer partners`,
];

export default function HomePage() {
  return (
    <>
      <PageHero
        size="full"
        eyebrow="Strategic real estate advisory · North Bengaluru"
        title={
          <>
            Your search.
            <br />
            <span className="text-accent">Our expertise.</span>
          </>
        }
        lede="Independent guidance across residential, commercial and land in North Bengaluru — from the first brief to the final paperwork."
        image={{
          src: "/images/projects/bm-solcrest-4k.webp",
          alt: "",
        }}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Tell us your brief
          </Button>
          <Button href="/projects" size="lg" variant="secondary">
            Browse projects
          </Button>
        </div>

        <ul className="text-muted mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-1.5 w-1.5 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <CorridorStrip />
      <FeaturedProjects />
      <Services />
      <CorridorMap />
      <BuyerRoute />
      <FounderTrust />
      <Partners />
      <Testimonials compact />
      <CtaBand />
    </>
  );
}
