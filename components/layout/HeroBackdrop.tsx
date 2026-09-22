"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * The hero photograph, drifting slightly slower than the page.
 *
 * The image is rendered 18% taller than its frame so there is headroom to
 * move into and no gap appears at either edge. Parallax is skipped entirely
 * under reduced motion, and the transform runs off rAF so a fast scroll never
 * queues more work than a frame can take.
 */
export function HeroBackdrop({
  src,
  transitionName,
}: {
  src: string;
  transitionName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        // Only move while the panel is anywhere near the viewport.
        if (top > window.innerHeight || top + height < 0) return;
        setOffset(Math.max(-top, 0) * 0.16);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[118%] will-change-transform"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          viewTransitionName: transitionName,
        }}
      >
        <Image src={src} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
