"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true once the element has scrolled into view.
 *
 * Deliberately returns state rather than writing `data-reveal` onto the node
 * directly: React renders that attribute, so mutating it from an effect makes
 * the DOM disagree with React's own tree and throws a hydration mismatch the
 * next time the subtree renders.
 *
 * Elements start visible in CSS and are only hidden inside a
 * `prefers-reduced-motion: no-preference` block (see globals.css), so a
 * visitor with motion reduced — or with JS disabled — sees the finished
 * layout immediately and never a blank page.
 */
export function useReveal(ref: RefObject<HTMLElement | null>): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return shown;
}
