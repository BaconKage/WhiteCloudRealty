"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cityMap } from "@/content/cityMap";
import { developingCorridors, getLocality, localities } from "@/content/localities";
import { projects } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { articles } from "@/content/insights";
import { cx } from "@/lib/format";
import { useHashSelection } from "@/lib/useHashSelection";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const ZONE_IDS = localities.map((l) => l.id);
const METRO = [
  { name: "Purple", colour: "#b76be8" },
  { name: "Green", colour: "#2fbf71" },
  { name: "Yellow", colour: "#efca3e" },
];
const INTENTS = ["Buy", "Sell", "Rent"] as const;
const ASSETS = ["Residential", "Commercial", "Land"] as const;

const LANDMARK_COLOURS: Record<string, string> = {
  water: "#8cc0e0",
  park: "#7fbf9b",
  road: "#a9b8c9",
  airport: "#f5f3ee",
};

/** A dark outline behind map text, so it stays readable over the roads. */
const HALO = { paintOrder: "stroke", stroke: "#0a1018", strokeWidth: 5, strokeLinejoin: "round" } as const;

/**
 * The signature section: pick a part of Bengaluru and what you need there, and
 * it turns into a pre-written message to the team.
 *
 * The map is real: a pre-rendered image of the city's roads, lakes and metro
 * from OpenStreetMap, with zones and labels drawn over it (see
 * scripts/make-city-map.mjs). Pre-rendering keeps it as cheap as any photo,
 * where a live map would add a heavy script and dozens of tile requests.
 *
 * Zones can be clicked directly, and each is also a real HTML button, so the
 * map works by keyboard and screen reader. Links elsewhere can open a zone with
 * #location-<id>.
 */
export function LocationFinder() {
  const [activeId, setActiveId] = useState("north");
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>("Buy");
  const [asset, setAsset] = useState<(typeof ASSETS)[number]>("Residential");

  useHashSelection(ZONE_IDS, setActiveId, "location-");

  const active = getLocality(activeId) ?? localities[0];
  const activeProjects = projects.filter((p) => p.localityId === active.id);
  const guide = articles.find((a) => a.localityId === active.id);
  const message = `Hi ${site.name}, I'd like to ${intent.toLowerCase()} ${
    asset === "Land" ? "land" : `${asset.toLowerCase()} property`
  } in ${active.name}. Can you help?`;

  return (
    <section
      id="locations"
      className="on-ink bg-ink-deep relative py-16 sm:py-20 lg:py-28"
      style={{ scrollMarginTop: "5.5rem" }}
    >
      {localities.map((l) => (
        <span
          key={l.id}
          id={`location-${l.id}`}
          aria-hidden="true"
          className="absolute top-0"
          style={{ scrollMarginTop: "5.5rem" }}
        />
      ))}

      <Reveal
        variant="section"
        className="editorial-section__inner mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">All of Bengaluru</p>
          <h2 className="mt-3 text-(length:--text-h2) leading-[1.08]">
            Choose your location. <span className="text-accent">We&rsquo;ll help.</span>
          </h2>
          <p className="text-muted mt-4 text-(length:--text-lede) leading-relaxed">
            Pick a part of the city and tell us what you need there. Residential, commercial or
            land; buying, selling or renting.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="mx-auto w-full max-w-[36rem]">
            <div
              className="border-line relative overflow-hidden rounded-(--radius-card) border"
              style={{ aspectRatio: `${cityMap.width} / ${cityMap.height}` }}
            >
              <Image
                src="/images/map/bengaluru.webp"
                alt="Map of Bengaluru showing its main roads, lakes, parks and metro lines."
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />

              <svg
                viewBox={`0 0 ${cityMap.width} ${cityMap.height}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {cityMap.zones.map((zone) => (
                  <path
                    key={zone.id}
                    d={zone.d}
                    onClick={() => setActiveId(zone.id)}
                    className={cx(
                      "cursor-pointer transition-[fill,stroke] duration-150",
                      zone.id === active.id
                        ? "fill-[rgb(255_118_30/0.36)] stroke-[#ff761e] stroke-[2.5]"
                        : "fill-[rgb(255_255_255/0.05)] stroke-[rgb(255_255_255/0.5)] stroke-[1.4] hover:fill-[rgb(255_255_255/0.16)]",
                    )}
                  />
                ))}

                <g className="pointer-events-none max-md:hidden" fontSize="17">
                  {cityMap.landmarks.map((l) => (
                    <text
                      key={l.name}
                      x={l.x}
                      y={l.y}
                      textAnchor={l.anchor ?? "middle"}
                      fill={LANDMARK_COLOURS[l.kind]}
                      fontStyle={l.kind === "water" ? "italic" : undefined}
                      style={HALO}
                    >
                      {l.name}
                    </text>
                  ))}
                </g>

                <g transform={`translate(${cityMap.airport.x} ${cityMap.airport.y})`} className="pointer-events-none">
                  <circle r="15" fill="#0a1018" stroke="#ff761e" strokeWidth="2" />
                  <path
                    transform="scale(1.7)"
                    d="M0 -5.5 L1.3 -1.6 L5 0.6 L5 1.8 L1.2 0.8 L1 3.6 L2.3 4.6 L2.3 5.5 L0 4.9 L-2.3 5.5 L-2.3 4.6 L-1 3.6 L-1.2 0.8 L-5 1.8 L-5 0.6 L-1.3 -1.6 Z"
                    fill="#ff761e"
                  />
                </g>

                {/* The chosen zone's neighbourhoods, where they really are. */}
                <g key={active.id} className="pointer-events-none animate-(--animate-pop-in)">
                  {(cityMap.markets[active.id] ?? []).map((m) => (
                    <g key={m.name}>
                      <circle cx={m.x} cy={m.y} r="5.5" fill="#fff" stroke="#0a1018" strokeWidth="2" />
                      {m.lx !== undefined && (
                        <text
                          x={m.lx}
                          y={m.ly}
                          textAnchor={m.anchor}
                          fontSize="19"
                          fontWeight="500"
                          fill="#fff"
                          className="max-md:hidden"
                          style={HALO}
                        >
                          {m.name}
                        </text>
                      )}
                    </g>
                  ))}
                </g>
              </svg>

              <ul className="pointer-events-none absolute inset-0">
                {cityMap.zones.map((zone) => {
                  const zoneInfo = getLocality(zone.id);
                  const isActive = zone.id === active.id;
                  return (
                    <li
                      key={zone.id}
                      className="absolute"
                      style={{ left: `${zone.label.left}%`, top: `${zone.label.top}%` }}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(zone.id)}
                        aria-pressed={isActive}
                        className={cx(
                          "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-[background-color,border-color,color] duration-150 sm:text-sm",
                          isActive
                            ? "border-brand bg-brand text-ink"
                            : "text-fg hover:border-brand border-white/25 bg-[rgb(10_16_24/0.82)]",
                        )}
                      >
                        <span aria-hidden="true">{zoneInfo?.shortName}</span>
                        <span className="sr-only">{zoneInfo?.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <ul className="text-muted mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <li className="text-faint">Metro</li>
              {METRO.map((line) => (
                <li key={line.name} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-[3px] w-4 rounded-full" style={{ background: line.colour }} />
                  {line.name} Line
                </li>
              ))}
            </ul>

            <p className="text-faint mt-1.5 text-[0.6875rem] leading-relaxed">
              Zones are indicative. Map data &copy;{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                OpenStreetMap contributors
              </a>
              .
            </p>
          </div>

          <div className="border-line bg-fg/4 rounded-(--radius-card) border p-6 sm:p-8">
            <div key={active.id} aria-live="polite" className="animate-(--animate-pop-in)">
              <p className="text-accent text-xs font-medium tracking-wide">{active.tag}</p>
              <h3 className="mt-2 text-(length:--text-h3) leading-snug">{active.name}</h3>
              <p className="text-muted mt-3 leading-relaxed">{active.blurb}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {active.markets.map((market) => (
                  <li key={market} className="border-line text-fg rounded-full border px-3 py-1 text-xs">
                    {market}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-line mt-6 grid gap-4 border-t pt-6">
              <Choice legend="I want to" options={INTENTS} value={intent} onChange={setIntent} />
              <Choice legend="Looking at" options={ASSETS} value={asset} onChange={setAsset} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={whatsappLink(message)} variant="brand" size="lg">
                Help me in {active.shortName}
              </Button>
              <Button href={site.contact.phoneHref} variant="secondary" size="lg">
                Call {site.contact.phoneDisplay}
              </Button>
            </div>

            {(activeProjects.length > 0 || guide) && (
              <p className="text-muted mt-5 text-sm">
                {guide && (
                  <Link href={`/insights/${guide.slug}`} className="text-accent underline underline-offset-4">
                    Read our guide to {active.name}
                  </Link>
                )}
                {guide && activeProjects.length > 0 && " · "}
                {activeProjects.length > 0 && (
                  <Link
                    href={`/projects?locality=${active.id}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {activeProjects.length} project{activeProjects.length === 1 ? "" : "s"} on our desk here
                  </Link>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="border-line mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-6">
          <p className="eyebrow text-accent mr-1">Developing corridors</p>
          {developingCorridors.map((corridor) => (
            <span key={corridor} className="text-muted text-sm">
              {corridor}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-faint mb-2 text-xs">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cx(
              "min-h-10 rounded-full border px-3.5 text-sm transition-[background-color,border-color,color,translate,scale] active:scale-95",
              value === option
                ? "border-brand bg-brand text-ink font-medium"
                : "border-line text-muted hover:border-accent hover:text-fg",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
