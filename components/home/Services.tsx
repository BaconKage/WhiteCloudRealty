"use client";

import Image from "next/image";
import { useState } from "react";
import { getService, type Service } from "@/content/services";
import { whatsappLink } from "@/content/site";
import { useHashSelection } from "@/lib/useHashSelection";
import { cx } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/** Each path, with a photo of the kind of property it deals in. */
const PATHS = [
  { id: "buy", image: "/images/projects/bm-solcrest-4k.webp", icon: <path d="M4 11.5 12 5l8 6.5M6.5 10v9.5h11V10M10 19.5v-5h4v5" /> },
  { id: "sell", image: "/images/projects/nikoo-garden-estate-4k.webp", icon: <path d="M4 12 12 4h7v7l-8 8.5L4 12ZM15.5 8.5h.01" /> },
  { id: "rent", image: "/images/projects/white-lotus-amanvana-4k.webp", icon: <path d="M14.5 9.5a4.5 4.5 0 1 0-3.6 4.4L13 16h2v2h2v2h3v-3l-5.9-5.9a4.5 4.5 0 0 0 .4-1.6ZM9 8.5h.01" /> },
  { id: "invest", image: "/images/projects/avillion-farm-villas-4k.webp", icon: <path d="M4 19.5h16M5.5 15l4.5-4.5 3.5 3L19 7.5M15 7.5h4v4" /> },
  { id: "commercial", image: "/images/projects/leela-bhartiya-city-4k.webp", icon: <path d="M5 20V6.5l8-2V20M13 9.5l6 1.5v9M3.5 20h17M8 9h2M8 12.5h2M8 16h2M16 14h.01M16 17h.01" /> },
];
const IDS = PATHS.map((p) => p.id);

/**
 * What a visitor is here to do: buy, sell, rent, invest, or take on a
 * commercial brief. One at a time, so five long descriptions never have to be
 * read at once. Only the visible photo loads at first; another loads when a
 * tab is hovered, focused or touched, so it is usually there by the time of the
 * click and the page never pays for five photos up front. Loaded photos stay
 * mounted and only fade. Links elsewhere can open one with #buy, #rent and so on.
 */
export function Services() {
  const [activeId, setActiveId] = useState("buy");
  const [warm, setWarm] = useState<string[]>([]);
  const warmUp = (id: string) => setWarm((ids) => (ids.includes(id) ? ids : [...ids, id]));
  useHashSelection(IDS, setActiveId);
  const service = getService(activeId) as Service;

  return (
    <Section id="services">
      {IDS.map((id) => (
        <span key={id} id={id} aria-hidden="true" className="block" style={{ scrollMarginTop: "6rem" }} />
      ))}

      <SectionHeading eyebrow="What we do" title="Buy • Sell • Rent Solutions" />

      <div className="scrollbar-none -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {PATHS.map((path) => {
          const info = getService(path.id) as Service;
          const isActive = path.id === activeId;
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => setActiveId(path.id)}
              onPointerEnter={() => warmUp(path.id)}
              onFocus={() => warmUp(path.id)}
              onTouchStart={() => warmUp(path.id)}
              aria-pressed={isActive}
              className={cx(
                "flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,scale] duration-150 active:scale-95",
                isActive
                  ? "border-brand bg-brand text-ink"
                  : "border-line bg-surface text-muted hover:border-accent hover:text-fg",
              )}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {path.icon}
              </svg>
              {info.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="bg-raised relative aspect-16/10 overflow-hidden rounded-(--radius-card)">
          {PATHS.filter((path) => path.id === activeId || warm.includes(path.id)).map((path) => (
            <Image
              key={path.id}
              src={path.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={cx(
                "object-cover transition-opacity duration-300",
                path.id === activeId ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div key={service.id} aria-live="polite" className="animate-(--animate-pop-in)">
          <h3 className="text-(length:--text-h3) leading-snug">{service.title}</h3>
          <p className="text-muted mt-3 leading-relaxed">{service.lede}</p>

          <ul className="mt-5 space-y-2.5">
            {service.list.slice(0, 3).map((item) => (
              <li key={item} className="text-fg flex gap-3 text-sm leading-relaxed">
                <svg viewBox="0 0 24 24" className="text-accent mt-1 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Button
              href={whatsappLink(`Hi White Cloud Realty, I'd like to talk about: ${service.label}.`)}
              variant="brand"
            >
              {service.cta}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
