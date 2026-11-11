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

/**
 * The client's landing description (11 November), under the headline; her
 * service line sits in its own panel beside it. Her sign-off ("White Cloud Realty / Your Search. Our
 * Expertise.") is left out because the headline right above already says it.
 */
const heroIntro = [
  "But finding a property isn’t the same as making the right real estate decision.",
  "A good advisor helps you look beyond the listing, evaluating the location, pricing, developer, legal considerations, future potential and negotiation opportunity before you commit.",
  "Because the real value of real estate advice isn’t showing you more properties.",
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
          <>
            <p className="text-lg font-semibold sm:text-xl">You can find a property online.</p>
            <div className="border-accent/70 text-fg/80 mt-3 max-w-[40rem] space-y-2 border-l-2 pl-5 text-[0.95rem] leading-relaxed sm:text-base">
              {heroIntro.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="text-accent font-medium">
                It’s helping you avoid the wrong ones, recognize the right one, and negotiate it well.
              </p>
            </div>
          </>
        }
        aside={
          <div className="rounded-(--radius-card) border border-white/12 bg-[rgb(11_17_25/0.62)] p-6 backdrop-blur-md">
            <p className="eyebrow text-accent">What we offer</p>
            <ul className="mt-3 divide-y divide-white/10">
              {heroServices.map((item) => (
                <li key={item} className="text-fg/85 flex items-center gap-3 py-2 text-sm">
                  <span aria-hidden="true" className="bg-accent h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-4 border-t border-white/10 pt-4 text-accent flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-2 w-2 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
          </div>
        }
        image={{
          src: "/images/projects/bm-solcrest-4k.webp",
          alt: "",
        }}
      >
        <div className="mt-9 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
          <div className="lg:w-[30rem]">
            <HeroSearch />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/#locations" variant="brand">
              Choose your location
            </Button>
            <Button href={whatsappLink()} variant="secondary">
              WhatsApp us
            </Button>
          </div>
        </div>

        {/* Below xl the services panel is hidden, so they show here instead. */}
        <div className="xl:hidden">
          <ul className="mt-7 text-accent flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          {heroProof.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="bg-accent h-2 w-2 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
          <p className="eyebrow text-faint mt-7">What we offer</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {heroServices.map((item) => (
              <li
                key={item}
                className="text-fg/85 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
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
