"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M5 12.5v5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-5" />
  </svg>
);

/**
 * Shares a project page. Phones (and browsers that support it) get the
 * system share sheet, so WhatsApp, Messages and the rest are one tap away;
 * elsewhere the link is copied, with a short confirmation. The URL is built
 * from the current address, so it is always the domain the visitor is on.
 */
export function ShareButton({
  title,
  path,
  variant = "icon",
  className,
}: {
  title: string;
  path: string;
  /** "icon" is the round button on cards; "button" is the labelled one on project pages. */
  variant?: "icon" | "button";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function share() {
    const url = new URL(path, window.location.origin).href;
    const text = `${title} - White Cloud Realty`;

    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
        return;
      } catch (error) {
        // Closing the share sheet is not an error worth falling back from.
        if ((error as DOMException)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // No share sheet and no clipboard: hand it to WhatsApp instead.
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener");
    }
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={share}
        className={cx(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-sm font-semibold transition-[background-color,border-color,scale] hover:border-white/50 hover:bg-white/10 active:scale-[0.97]",
          className,
        )}
      >
        <ShareIcon />
        <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${title}`}
      className={cx(
        "border-line text-fg hover:border-accent hover:text-accent-text relative z-10 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[border-color,color,scale] active:scale-90",
        className,
      )}
    >
      <ShareIcon />
      <span
        aria-live="polite"
        className={cx(
          "bg-fg text-bg pointer-events-none absolute bottom-full mb-2 rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-[opacity,translate] duration-200",
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {copied ? "Link copied" : ""}
      </span>
    </button>
  );
}
