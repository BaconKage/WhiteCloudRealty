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
          className="relative mt-9 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max animate-(--animate-marquee) items-center">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center"
              >
                {partners.map((partner) => (
                  <li key={partner.name} className="flex w-44 shrink-0 items-center justify-center px-3 sm:w-52">
                    <Image
                      src={partner.logo}
                      alt={copy === 0 ? partner.name : ""}
                      width={partner.width}
                      height={partner.height}
                      className="box-content h-auto max-h-12 w-auto max-w-[9rem] rounded-lg bg-white object-contain p-2 transition-[scale] duration-200 hover:scale-105"
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
