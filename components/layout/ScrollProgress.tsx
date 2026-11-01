"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet Swiss-editorial reading rule that tracks the document position. The
 * page height is only re-read when something resizes: reading it on every
 * scroll would force a layout each frame.
 */
export function ScrollProgress() {
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let max = 0;

    const paint = () => {
      frame = 0;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      line.current?.style.setProperty("--scroll-progress", String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      onScroll();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    const observer = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (observer) observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="site-scroll-progress" aria-hidden="true">
      <span ref={line} />
    </div>
  );
}
