"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Article } from "@/content/insights";
import { formatDate } from "@/lib/format";
import { ZoneThumb } from "@/components/home/ZoneThumb";

/**
 * The area guides as a slider: swipe on phones, arrows on wider screens. It is
 * a plain scroll container with snap points, so it also works with a trackpad,
 * a keyboard or no JavaScript at all.
 */
export function GuideSlider({ guides }: { guides: Article[] }) {
  const rail = useRef<HTMLUListElement>(null);

  const step = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: direction * ((card?.clientWidth ?? 320) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        {[-1, 1].map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => step(direction as 1 | -1)}
            aria-label={direction < 0 ? "Previous guides" : "Next guides"}
            className="border-line hover:border-accent text-fg flex h-11 w-11 items-center justify-center rounded-full border transition-[border-color,scale] active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={direction < 0 ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
            </svg>
          </button>
        ))}
      </div>

      <ul
        ref={rail}
        className="scrollbar-none -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {guides.map((guide) => (
          <li
            key={guide.slug}
            className="on-ink bg-ink-deep group relative isolate flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-(--radius-card) p-7 sm:w-[46%] lg:w-[31.5%]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(80%_100%_at_90%_0%,rgb(255_118_30/0.24),transparent_65%)]"
            />
            {guide.localityId && <ZoneThumb id={guide.localityId} className="h-20 w-auto self-start" />}
            <p className="text-accent mt-5 text-xs font-medium tracking-wide">{guide.tag}</p>
            <h3 className="mt-2 text-(length:--text-h3) leading-snug">
              <Link href={`/insights/${guide.slug}`} className="before:absolute before:inset-0">
                {guide.title}
              </Link>
            </h3>
            <p className="text-muted mt-3 line-clamp-3 text-sm leading-relaxed">{guide.excerpt}</p>
            <p className="text-faint mt-auto pt-5 text-sm">
              {formatDate(guide.date)} &middot; {guide.readingMinutes} min read
              <span
                aria-hidden="true"
                className="text-accent ml-3 inline-block transition-[translate] duration-200 group-hover:translate-x-1"
              >
                Read &rarr;
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
