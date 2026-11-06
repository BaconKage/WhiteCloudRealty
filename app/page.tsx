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

/** The client's own service line, as sent on 6 November. */
const heroServices = [
  "Strategic Real Estate Advisory",
  "Residential Property Consulting",
  "Commercial Property Advisory",
  "Land Acquisition & Investment Advisory",
  "Buy • Sell • Rent Solutions",
  "Investor-Focused Property Strategy",
  "End-to-End Transaction Support",
  "Market Intelligence & Location Analytics",
  "Transparent, Client-First Advisory",
  "Portfolio Growth & Asset Optimization",
];

const heroProof = ["Residential", "Commercial", "Land"];

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
        lede={
          <span className="block text-[0.95rem] leading-relaxed sm:text-base">
            {heroServices.map((item, i) => (
              <span key={item}>
                {/* Spaces either side of the bar, so lines can break there. */}
                {i > 0 && (
                  <>
                    {" "}
                    <span
                      aria-hidden="true"
                      className="text-accent mx-1 hidden sm:inline"
                    >
                      |
                    </span>{" "}
                  </>
                )}
                <span className="block sm:inline sm:whitespace-nowrap">
                  {item}
                </span>
              </span>
            ))}
          </span>
        }
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

        <ul className="text-accent mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold sm:text-base">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-accent h-2 w-2 rounded-full"
              />
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
