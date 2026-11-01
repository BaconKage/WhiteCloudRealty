"use client";

import { useEffect, useState, type RefObject } from "react";

const onReveal = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

/**
 * One observer for every revealed element. Everything that enters the viewport
 * in a frame arrives in a single callback, so React commits those state changes
 * together rather than restyling the page once per element.
 */
function sharedObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onReveal.get(entry.target)?.();
        onReveal.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    // Fire just before the element is fully on screen, so it is already
    // settling as it arrives rather than starting late.
    { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
  );
  return observer;
}

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
 * visitor with motion reduced sees the finished layout immediately and never a
 * blank page.
 */
export function useReveal(ref: RefObject<HTMLElement | null>): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    onReveal.set(el, () => setShown(true));
    const shared = sharedObserver();
    shared.observe(el);
    return () => {
      onReveal.delete(el);
      shared.unobserve(el);
    };
  }, [ref]);

  return shown;
}
