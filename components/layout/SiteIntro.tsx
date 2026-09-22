"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTRO_DURATION_MS = 1200;

/**
 * A short, brand-led hard-load introduction. Because this component lives in
 * the root layout it mounts for a fresh visit or reload, but persists through
 * App Router navigation so it never slows movement around the site.
 */
export function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), INTRO_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__content">
        <svg
          viewBox="0 0 204 132"
          className="site-intro__cloud"
          role="presentation"
        >
          <path
            className="site-intro__cloud-outline"
            pathLength="1"
            d="M51 105c-22 0-36-14-36-35 0-20 15-35 35-36C58 15 76 5 98 5c27 0 48 17 53 41 21 0 38 15 38 35 0 15-12 24-31 24H51Z"
          />
          <path
            className="site-intro__cloud-fill"
            d="M51 105c-22 0-36-14-36-35 0-20 15-35 35-36C58 15 76 5 98 5c27 0 48 17 53 41 21 0 38 15 38 35 0 15-12 24-31 24H51Z"
          />
          <rect className="site-intro__gold-line" x="55" y="121" width="94" height="7" rx="3.5" />
        </svg>

        <div className="site-intro__brand">
          <Image
            src="/images/brand/wordmark-on-dark.png"
            alt=""
            width={900}
            height={222}
            priority
            className="h-auto w-[min(72vw,21rem)]"
          />
        </div>
      </div>
    </div>
  );
}
