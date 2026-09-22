"use client";

import Link from "next/link";
import { useState } from "react";
import { localities, corridorSpine, getLocality } from "@/content/localities";
import { projects } from "@/content/projects";
import { useInView } from "@/lib/useInView";
import { cx } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";

/** The main corridor line, city end to airport. */
const SPINE =
  "M12 78 C 20 71, 24 70, 30 64 C 38 56, 43 55, 50 50 C 58 44, 62 42, 68 36 C 76 29, 80 26, 87 20";
/** The branch out to the larger land parcels off the built corridor. */
const BRANCH = "M50 50 C 54 60, 58 70, 66 76";

/**
 * The signature section: the North Bengaluru airport corridor, drawn as a
 * route from the city out to the terminals, with each locality a node.
 *
 * The map is decorative SVG; every interactive node is a real HTML button
 * positioned over it, so the whole thing is keyboard-navigable and
 * screen-reader legible without any SVG focus gymnastics. Below `md` the map
 * is hidden and the same buttons render as a scrollable chip row.
 */
export function CorridorMap() {
  const [activeId, setActiveId] = useState(corridorSpine[0].id);
  // The route draws itself the first time the map is seen.
  const { ref: mapRef, seen } = useInView<HTMLDivElement>(0.3);
  const active = getLocality(activeId) ?? localities[0];
  const activeProjects = projects.filter((p) => p.localityId === active.id);

  return (
    <section
      id="corridor"
      className="on-ink bg-ink-deep py-16 sm:py-20 lg:py-28"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      <Reveal
        variant="section"
        className="editorial-section__inner mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Our ground</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">
            The North Bengaluru corridor, end to end
          </h2>
          <p className="text-muted mt-4 text-(length:--text-lede) leading-relaxed">
            Hebbal out to the terminals. Infrastructure, jobs and housing all turned up here at
            roughly the same time, which is rarer than it sounds, and it is the ground we know
            best.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div ref={mapRef} className="relative hidden aspect-5/4 md:block lg:aspect-4/3">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="corridor-line" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#d9b441" stopOpacity="0.25" />
                  <stop offset="55%" stopColor="#d9b441" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#d9b441" stopOpacity="1" />
                </linearGradient>
                <pattern id="corridor-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M8 0H0V8" fill="none" stroke="#f5f3ee" strokeOpacity="0.045" strokeWidth="0.3" />
                </pattern>
              </defs>

              <rect width="100" height="100" fill="url(#corridor-grid)" />

              <circle cx="6" cy="90" r="17" fill="#f5f3ee" fillOpacity="0.05" />
              <circle cx="6" cy="90" r="11" fill="#f5f3ee" fillOpacity="0.05" />

              <path
                d={BRANCH}
                fill="none"
                stroke="#f5f3ee"
                strokeOpacity="0.2"
                strokeWidth="0.6"
                strokeDasharray="1.6 1.8"
                strokeLinecap="round"
                className={cx("transition-opacity duration-1000 delay-[1200ms]", seen ? "opacity-100" : "opacity-0")}
              />
              <path
                d={SPINE}
                fill="none"
                stroke="url(#corridor-line)"
                strokeWidth="1.1"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                style={{ "--draw-length": 1 } as React.CSSProperties}
                className={cx(seen ? "animate-(--animate-draw)" : "[stroke-dashoffset:1]")}
              />

              <g
                transform="translate(93 11)"
                fill="#d9b441"
                fillOpacity="0.85"
                className={cx("transition-opacity duration-700 delay-[1600ms]", seen ? "opacity-100" : "opacity-0")}
              >
                <path d="M0 3.2 L3.4 1.3 L3.4 -0.2 L0 1.1 L-2.4 -0.6 L-2.4 -2 L-3.4 -1.4 L-3.4 2.4 L-2.4 2.9 L-2.4 1.6 L0 2.9 Z" transform="rotate(-38)" />
              </g>
            </svg>

            <ul className="absolute inset-0">
              {localities.map((locality) => {
                const isActive = locality.id === active.id;
                const count = projects.filter((p) => p.localityId === locality.id).length;
                // Nodes near the right edge put their label on the left, or it
                // would push the page sideways at tablet widths.
                const labelLeft = locality.x > 62;

                return (
                  <li
                    key={locality.id}
                    className="absolute"
                    style={{ left: `${locality.x}%`, top: `${locality.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveId(locality.id)}
                      onMouseEnter={() => setActiveId(locality.id)}
                      onFocus={() => setActiveId(locality.id)}
                      aria-pressed={isActive}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3"
                    >
                      <span className="sr-only">
                        {locality.name}
                        {count > 0 ? ` — ${count} project${count === 1 ? "" : "s"}` : ""}
                      </span>
                      <span className="relative block h-3 w-3">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="bg-accent absolute inset-0 animate-(--animate-pulse-ring) rounded-full"
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={cx(
                            "relative block h-3 w-3 rounded-full ring-1 transition-all duration-300",
                            isActive
                              ? "bg-accent ring-accent shadow-[0_0_0_7px_rgb(217_180_65/0.18)]"
                              : "bg-ink-deep ring-accent/60 group-hover:scale-125 group-hover:bg-accent/60",
                          )}
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[0.6875rem] leading-tight font-medium whitespace-nowrap transition-colors duration-300",
                          labelLeft ? "right-full mr-2 text-right" : "left-full ml-2 text-left",
                          isActive ? "text-accent" : "text-muted",
                        )}
                      >
                        {locality.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="text-faint absolute bottom-1 left-1 text-[0.625rem] tracking-[0.14em] uppercase">
              Bengaluru city
            </p>
          </div>

          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:hidden">
            {localities.map((locality) => (
              <button
                key={locality.id}
                type="button"
                onClick={() => setActiveId(locality.id)}
                aria-pressed={locality.id === active.id}
                className={cx(
                  "min-h-11 shrink-0 rounded-full border px-4 text-sm whitespace-nowrap transition-colors",
                  locality.id === active.id
                    ? "border-accent bg-accent text-ink font-medium"
                    : "border-line text-muted",
                )}
              >
                {locality.name}
              </button>
            ))}
          </div>

          <div
            aria-live="polite"
            className="border-line bg-fg/4 rounded-(--radius-card) border p-6 sm:p-8"
          >
            <p className="eyebrow text-accent">{active.tag}</p>
            <h3 className="mt-3 text-(length:--text-h3) leading-snug">{active.name}</h3>
            <p className="text-muted mt-4 leading-relaxed">{active.blurb}</p>

            <ul className="mt-6 space-y-2.5">
              {active.anchors.map((anchor) => (
                <li key={anchor} className="text-fg flex items-center gap-3 text-sm">
                  <span aria-hidden="true" className="bg-accent h-1 w-4 shrink-0 rounded-full" />
                  {anchor}
                </li>
              ))}
            </ul>

            <div className="border-line mt-7 border-t pt-6">
              {activeProjects.length > 0 ? (
                <>
                  <p className="text-faint text-xs tracking-wide">
                    {activeProjects.length} project{activeProjects.length === 1 ? "" : "s"} we
                    represent here
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {activeProjects.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/projects/${p.slug}`}
                          className="border-line hover:border-accent hover:text-accent inline-flex min-h-9 items-center rounded-full border px-3 text-sm transition-colors"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-muted text-sm">
                  Nothing listed here right now.{" "}
                  <Link href="/contact" className="text-accent underline underline-offset-4">
                    Tell us what you are looking for
                  </Link>{" "}
                  and we will bring you options.
                </p>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
