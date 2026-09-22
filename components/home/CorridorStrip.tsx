import Link from "next/link";
import { corridorSpine } from "@/content/localities";
import { projects } from "@/content/projects";

/**
 * A band of the corridor's localities, directly under the hero. Counts are
 * derived from the portfolio, never hand-written, so they cannot drift.
 */
export function CorridorStrip() {
  const entries = corridorSpine.map((locality) => ({
    ...locality,
    count: projects.filter((p) => p.localityId === locality.id).length,
  }));

  return (
    <section
      aria-label="Localities we cover"
      className="on-ink bg-ink border-line border-y py-7 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-5">
          <p className="eyebrow text-accent">Localities we cover</p>
          <p className="text-faint text-[0.625rem] tracking-[0.14em] uppercase lg:hidden">
            Swipe to explore
          </p>
        </div>

        <div className="scrollbar-none -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:px-0">
          {entries.map((locality) => (
            <Link
              key={locality.id}
              href={`/projects?locality=${locality.id}`}
              className="border-line hover:border-accent/60 hover:bg-fg/5 group flex min-h-21 min-w-[16rem] shrink-0 snap-start flex-col justify-center gap-1 rounded-xl border px-4 py-3 transition-colors sm:min-w-[18rem] lg:min-w-0"
            >
              <span className="text-faint text-[0.625rem] tracking-[0.14em] uppercase">
                {locality.tag}
              </span>
              <span className="group-hover:text-accent flex items-baseline justify-between gap-3 text-sm font-medium transition-colors">
                {locality.name}
                {locality.count > 0 && (
                  <span className="numeric text-accent text-xs">{locality.count}</span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
