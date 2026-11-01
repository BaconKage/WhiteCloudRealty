"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { developingCorridors, getLocality, localities } from "@/content/localities";
import { projects } from "@/content/projects";
import { site, whatsappLink } from "@/content/site";
import { articles } from "@/content/insights";
import { cx } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const INTENTS = ["Buy", "Sell", "Rent"] as const;
const ASSETS = ["Residential", "Commercial", "Land"] as const;

const CENTRE = 200;
const HUB_RADIUS = 58;
const RING_ROAD_RADIUS = 106;

/** The city's edge: a circle with a little irregularity, so it reads as a place. */
function edgeRadius(bearing: number): number {
  const a = (bearing * Math.PI) / 180;
  return 150 + 9 * Math.sin(3 * a + 0.6) + 5 * Math.sin(5 * a + 2.1);
}

function point(bearing: number, radius: number): [number, number] {
  const a = (bearing * Math.PI) / 180;
  return [CENTRE + radius * Math.sin(a), CENTRE - radius * Math.cos(a)];
}

const fmt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** One zone: an outer edge and an inner edge, walked in opposite directions. */
function wedgePath(from: number, to: number): string {
  const end = to > from ? to : to + 360;
  const outer: string[] = [];
  const inner: string[] = [];
  for (let b = from; b < end; b += 3) {
    outer.push(fmt(point(b, edgeRadius(b))));
    inner.unshift(fmt(point(b, HUB_RADIUS)));
  }
  outer.push(fmt(point(end, edgeRadius(end))));
  inner.unshift(fmt(point(end, HUB_RADIUS)));
  return `M${outer.join("L")}L${inner.join("L")}Z`;
}

/** Where a zone's label sits, as percentages of the map. */
function labelPosition(from?: number, to?: number): { left: string; top: string } {
  if (from === undefined || to === undefined) return { left: "50%", top: "50%" };
  const end = to > from ? to : to + 360;
  const [x, y] = point((from + end) / 2, 106);
  return { left: `${x / 4}%`, top: `${y / 4}%` };
}

/** The roads out of the city. Labels near an edge anchor inwards to stay on the map. */
const ROADS: { bearing: number; label: string; anchor: "start" | "middle" | "end"; dy?: number; dx?: number }[] = [
  { bearing: 8, label: "Devanahalli", anchor: "middle" },
  { bearing: 80, label: "Whitefield", anchor: "end", dy: -9, dx: 15 },
  { bearing: 150, label: "Hosur", anchor: "start" },
  { bearing: 196, label: "Kanakapura", anchor: "middle", dy: 4 },
  { bearing: 242, label: "Mysuru", anchor: "end" },
  { bearing: 304, label: "Tumakuru", anchor: "end" },
];

/** Worked out once: these never change, and the panel re-renders on every click. */
const WEDGES = localities
  .filter((l) => l.from !== undefined)
  .map((l) => ({ id: l.id, d: wedgePath(l.from!, l.to!) }));
const LABELS = localities.map((l) => ({
  id: l.id,
  name: l.name,
  shortName: l.shortName,
  position: labelPosition(l.from, l.to),
}));

/**
 * The signature section: pick a part of Bengaluru and what you need there, and
 * it turns into a pre-written message to the team.
 *
 * The map is decorative SVG, with wedges a pointer can click; every zone is
 * also a real HTML button over it, so the whole thing is keyboard-navigable and
 * screen-reader legible. Links elsewhere can open a zone with #location-<id>.
 */
export function LocationFinder() {
  const [activeId, setActiveId] = useState("north");
  const [intent, setIntent] = useState<(typeof INTENTS)[number]>("Buy");
  const [asset, setAsset] = useState<(typeof ASSETS)[number]>("Residential");

  useEffect(() => {
    const fromHash = () => {
      const match = window.location.hash.match(/^#location-(.+)$/);
      if (match && getLocality(match[1])) setActiveId(match[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

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

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ROADS.map((road) => {
                const [x1, y1] = point(road.bearing, edgeRadius(road.bearing));
                const [x2, y2] = point(road.bearing, 172);
                const [tx, ty] = point(road.bearing, 184);
                return (
                  <g key={road.label}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f5f3ee" strokeOpacity="0.16" strokeWidth="1" />
                    <text
                      x={tx + (road.dx ?? 0)}
                      y={ty + 3 + (road.dy ?? 0)}
                      textAnchor={road.anchor}
                      fill="#f5f3ee"
                      fillOpacity="0.5"
                      fontSize="9"
                    >
                      {road.label}
                    </text>
                  </g>
                );
              })}

              {WEDGES.map((wedge) => (
                <path
                  key={wedge.id}
                  d={wedge.d}
                  onClick={() => setActiveId(wedge.id)}
                  className={cx(
                    "cursor-pointer stroke-[#0b1119] stroke-[2.5] transition-[fill] duration-150",
                    wedge.id === active.id
                      ? "fill-brand"
                      : "fill-[rgb(245_243_238/0.09)] hover:fill-[rgb(245_243_238/0.2)]",
                  )}
                />
              ))}

              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={RING_ROAD_RADIUS}
                fill="none"
                stroke="#f5f3ee"
                strokeOpacity="0.28"
                strokeWidth="1"
                strokeDasharray="4 4"
                pointerEvents="none"
              />

              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={HUB_RADIUS - 2}
                onClick={() => setActiveId("central")}
                className={cx(
                  "cursor-pointer transition-[fill] duration-150",
                  active.id === "central" ? "fill-brand" : "fill-[#1b2634] hover:fill-[#253141]",
                )}
              />

              {/* The airport, at the far end of NH-44. */}
              <g transform={`translate(${point(8, 163).join(" ")})`} pointerEvents="none">
                <circle r="9" fill="#0b1119" stroke="#ff761e" strokeWidth="1.2" />
                <path
                  d="M0 -5.5 L1.3 -1.6 L5 0.6 L5 1.8 L1.2 0.8 L1 3.6 L2.3 4.6 L2.3 5.5 L0 4.9 L-2.3 5.5 L-2.3 4.6 L-1 3.6 L-1.2 0.8 L-5 1.8 L-5 0.6 L-1.3 -1.6 Z"
                  fill="#ff761e"
                />
              </g>
            </svg>

            <ul className="pointer-events-none absolute inset-0">
              {LABELS.map((l) => {
                const isActive = l.id === active.id;
                return (
                  <li key={l.id} className="absolute" style={l.position}>
                    <button
                      type="button"
                      onClick={() => setActiveId(l.id)}
                      aria-pressed={isActive}
                      className={cx(
                        "pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 sm:text-sm",
                        isActive ? "text-ink font-semibold" : "text-fg hover:text-accent",
                      )}
                    >
                      <span aria-hidden="true">{l.shortName}</span>
                      <span className="sr-only">{l.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
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
