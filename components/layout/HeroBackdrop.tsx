"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The hero photograph, drifting slightly slower than the page.
 *
 * The image is rendered 18% taller than its frame so there is headroom to
 * move into and no gap appears at either edge. Parallax is skipped entirely
 * under reduced motion. The offset is written straight to the element, at most
 * once a frame: it changes constantly while scrolling, so it should never cost
 * a React render or a layout read. Heroes always open the page, so the scroll
 * position alone gives the offset.
 */
export function HeroBackdrop({
  src,
  transitionName,
}: {
  src: string;
  transitionName?: string;
}) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastY = -1;
    const apply = () => {
      frame = 0;
      const y = window.scrollY;
      // Past the hero there is nothing to move.
      if (y === lastY || (y > window.innerHeight * 1.5 && lastY > window.innerHeight * 1.5)) return;
      lastY = y;
      if (layer.current) layer.current.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
      <div
        ref={layer}
        className="absolute inset-x-0 top-0 h-[118%] will-change-transform"
        style={{ viewTransitionName: transitionName }}
      >
        <Image src={src} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
