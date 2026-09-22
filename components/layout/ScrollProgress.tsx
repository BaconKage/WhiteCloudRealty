"use client";

import { useEffect, useRef } from "react";

/** A quiet Swiss-editorial reading rule that tracks the document position. */
export function ScrollProgress() {
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
        line.current?.style.setProperty("--scroll-progress", String(progress));
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const observer = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    if (observer) observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="site-scroll-progress" aria-hidden="true">
      <span ref={line} />
    </div>
  );
}
