"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `target` the first time the element scrolls into view.
 *
 * The real figure is the resting state, not zero: the server-rendered HTML
 * carries the true number — correct for search engines, for anyone without
 * JavaScript, and for copy-paste — and it only drops to zero at the instant
 * the climb begins. If the observer never fires (a hidden tab, a browser that
 * has stopped compositing) the visitor is left looking at the right number
 * rather than a stuck zero.
 *
 * Under reduced motion it never moves at all.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        setValue(0);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — quick off the mark, settles gently.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
