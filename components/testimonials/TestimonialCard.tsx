"use client";

import { useId, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import { initials } from "@/content/testimonials";
import { formatDate, cx } from "@/lib/format";

/**
 * A single recommendation.
 *
 * The highlight line carries the card; the full text is collapsed behind a
 * disclosure so a column of five does not become a wall. The full quote is
 * always in the DOM — only its height is animated — so it stays searchable
 * and readable to assistive tech.
 */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const hasMore =
    testimonial.quote.length > 1 || testimonial.quote.join(" ").length > 240;

  return (
    <figure
      className={cx(
        "group border-line bg-surface relative flex flex-col overflow-hidden rounded-(--radius-card) border p-6 transition-all duration-400 sm:p-7",
        "hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_18px_44px_-24px_rgb(0_0_0_/_0.35)]",
        className,
      )}
    >
      {/* Gold wash that warms the card on hover. */}
      <span
        aria-hidden="true"
        className="from-accent/8 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="font-display text-accent/25 relative text-5xl leading-[0.6] transition-transform duration-500 group-hover:scale-110"
      >
        &ldquo;
      </span>

      {testimonial.highlight && (
        <p className="font-display text-fg relative mt-4 text-lg leading-snug sm:text-xl">
          {testimonial.highlight}
        </p>
      )}

      <blockquote
        id={panelId}
        className={cx(
          "relative grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-soft)",
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          {testimonial.quote.map((para) => (
            <p key={para.slice(0, 28)} className="text-muted mt-3 text-sm leading-relaxed first:mt-0">
              {para}
            </p>
          ))}
        </div>
      </blockquote>

      {hasMore && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="text-accent-text relative mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-medium"
        >
          {open ? "Show less" : "Read the full recommendation"}
          <svg
            viewBox="0 0 24 24"
            className={cx("h-4 w-4 transition-transform duration-400", open && "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      <figcaption className="border-line relative mt-auto flex items-center gap-3 border-t pt-5">
        <span
          aria-hidden="true"
          className="ring-accent/30 bg-raised text-accent-text flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 transition-transform duration-400 group-hover:scale-105"
        >
          {initials(testimonial.name)}
        </span>
        <span className="min-w-0">
          <span className="text-fg block font-medium">{testimonial.name}</span>
          <span className="text-muted block text-sm">
            {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
          </span>
        </span>
      </figcaption>

      <p className="text-faint relative mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <LinkedInGlyph />
        <span>{testimonial.relationship}</span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={testimonial.date}>{formatDate(testimonial.date)}</time>
      </p>
    </figure>
  );
}

export function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
