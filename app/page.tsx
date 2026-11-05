import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { HeroSearch } from "@/components/home/HeroSearch";
import { LocationStrip } from "@/components/home/LocationStrip";
import { Welcome } from "@/components/home/Welcome";
import { Services } from "@/components/home/Services";
import { Stats } from "@/components/home/Stats";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LocationFinder } from "@/components/home/LocationFinder";
import { BuyerRoute } from "@/components/home/BuyerRoute";
import { FounderTrust } from "@/components/home/FounderTrust";
import { Partners } from "@/components/home/Partners";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { whatsappLink } from "@/content/site";

const heroProof = ["Buy · Sell · Rent", "Residential · Commercial · Land", "RERA registered"];

export default function HomePage() {
  return (
    <>
      <PageHero
        size="full"
        eyebrow="Strategic real estate advisory · Bengaluru"
        title={
          <>
            Your search.
            <br />
            <span className="text-accent">Our expertise.</span>
          </>
        }
        lede="Advice on buying, selling and renting residential, commercial and land, all across Bengaluru — from the first brief to the final paperwork."
        image={{
          src: "/images/projects/bm-solcrest-4k.webp",
          alt: "",
        }}
      >
        <div className="mt-8">
          <HeroSearch />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button href="/#locations" variant="brand">
            Choose your location
          </Button>
          <Button href={whatsappLink()} variant="secondary">
            WhatsApp us
          </Button>
        </div>

        <ul className="text-fg mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-1.5 w-1.5 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <LocationStrip />
      <FeaturedProjects />
      <Partners />
      <Stats />
      <Welcome />
      <LocationFinder />
      <Services />
      <BuyerRoute />
      <FounderTrust />
      <Testimonials compact />
      <CtaBand />
    </>
  );
}
