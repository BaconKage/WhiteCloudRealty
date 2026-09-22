"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { cx } from "@/lib/format";

/**
 * Persistent contact affordances.
 *
 * A single, persistent WhatsApp action. Keeping one floating control avoids
 * covering card copy on phones and leaves the page's other enquiry paths to
 * the header and in-page calls to action.
 *
 * Hidden until the visitor has scrolled past the hero so it never covers the
 * first thing they see.
 */
export function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${site.name} on WhatsApp`}
      className={cx(
        "fixed right-4 bottom-4 z-40 flex h-13 w-13 items-center justify-center gap-2 rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-12px_rgb(0_0_0_/_0.55)] transition-all duration-300 ease-(--ease-spring) hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgb(0_0_0_/_0.6)] sm:right-6 sm:bottom-6 lg:h-12 lg:w-auto lg:px-5",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.17-1.35a9.94 9.94 0 0 0 4.87 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2m0 1.82c2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.76c0 4.5-3.66 8.15-8.16 8.15a8.2 8.2 0 0 1-4.15-1.14l-.3-.18-3.08.81.82-3-.2-.31a8.1 8.1 0 0 1-1.26-4.34c0-4.5 3.66-8.14 8.17-8.14m-3.2 4.2c-.15 0-.4.06-.6.28-.21.22-.8.78-.8 1.9s.82 2.2.93 2.36c.12.15 1.6 2.45 3.89 3.43.54.24.96.38 1.29.48.54.18 1.04.15 1.43.9.44-.07 1.34-.55 1.53-1.08.19-.53.19-.98.13-1.08-.05-.1-.2-.15-.42-.27-.22-.11-1.34-.66-1.55-.73-.2-.08-.36-.11-.5.1-.16.23-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.95-.35-1.8-1.11-.67-.6-1.12-1.33-1.25-1.55-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.37.07-.15.03-.28-.02-.39-.06-.11-.5-1.23-.69-1.68-.18-.44-.36-.38-.5-.38z" />
      </svg>
      <span className="hidden text-sm font-semibold lg:inline">WhatsApp us</span>
    </a>
  );
}
