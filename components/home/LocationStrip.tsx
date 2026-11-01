import { localities } from "@/content/localities";
import { ZoneThumb, ZoneThumbDefs } from "./ZoneThumb";

/**
 * The seven parts of the city, directly under the hero. Each one opens that
 * zone in the Choose your location section further down the page. Plain
 * anchors, not Link: the map listens for hashchange, which pushState never fires.
 */
export function LocationStrip() {
  return (
    <section
      aria-label="Choose your location"
      className="on-ink bg-ink border-line border-y py-7 sm:py-8 lg:py-10"
    >
      <ZoneThumbDefs />
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-5">
          <p className="eyebrow text-accent">Choose your location</p>
          <p className="text-faint text-[0.625rem] tracking-[0.14em] uppercase lg:hidden">
            Swipe to explore
          </p>
        </div>

        <div className="scrollbar-none -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0">
          {localities.map((locality) => (
            <a
              key={locality.id}
              href={`#location-${locality.id}`}
              className="border-line hover:border-accent/60 hover:bg-fg/5 group flex min-h-21 min-w-[12.5rem] shrink-0 snap-start items-center gap-3 rounded-xl border px-3 py-3 transition-colors lg:min-w-0 lg:flex-col lg:items-start"
            >
              <ZoneThumb id={locality.id} className="h-12 w-auto shrink-0 lg:h-16" />
              <span className="min-w-0">
                <span className="group-hover:text-accent block text-sm font-medium transition-colors">
                  {locality.shortName}
                </span>
                <span className="text-faint block text-xs leading-snug">
                  {locality.markets.slice(0, 2).join(", ")}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
