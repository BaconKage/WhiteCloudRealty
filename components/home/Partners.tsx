import Image from "next/image";
import { partners } from "@/content/partners";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Developer logo wall. Duplicated once and translated by -50% for a seamless
 * marquee; the copy is hidden from assistive tech so the names are not read
 * out twice. The animation is disabled under reduced-motion (globals.css),
 * leaving a static, scrollable row.
 */
export function Partners() {
  return (
    <section id="partners" className="border-line border-y py-14 lg:py-18" style={{ scrollMarginTop: "5.5rem" }}>
      <Reveal variant="section" className="editorial-section__inner">
        <Container>
          <p className="eyebrow text-faint text-center">
            Transacting with India&rsquo;s leading developers
          </p>
        </Container>

        <div
          className="group relative mt-9 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-(--animate-marquee) items-center group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center"
              >
                {partners.map((partner) => (
                  <li key={partner.name} className="flex w-40 shrink-0 items-center justify-center px-6 sm:w-48">
                    <Image
                      src={partner.logo}
                      alt={copy === 0 ? partner.name : ""}
                      width={partner.width}
                      height={partner.height}
                      className="h-auto max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-500 ease-(--ease-out-soft) hover:scale-110 hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
