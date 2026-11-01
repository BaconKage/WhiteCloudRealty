"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTRO_DURATION_MS = 1700;

const LOGO_LAYER = { width: 960, height: 369, priority: true } as const;

/**
 * A short, brand-led hard-load introduction built from the official logo, on
 * its orange: the cloud blooms in, "Realty." rises into it, "White Cloud" slides out from
 * behind it, then the camera pushes through the cloud into the page.
 *
 * It plays once per browser tab: the head script in app/layout.tsx marks
 * <html data-intro="seen"> on later loads, and CSS hides the overlay before
 * paint. Because this component lives in the root layout it also persists
 * through App Router navigation, so it never slows movement around the site.
 */
export function SiteIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (
      document.documentElement.dataset.intro === "seen" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(false);
      return;
    }

    const timeout = window.setTimeout(() => setVisible(false), INTRO_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__logo">
        <Image
          {...LOGO_LAYER}
          alt=""
          src="/images/brand/intro-words.png"
          className="site-intro__layer site-intro__layer--words"
        />
        <Image
          {...LOGO_LAYER}
          alt=""
          src="/images/brand/intro-disc.png"
          className="site-intro__layer site-intro__layer--disc"
        />
        <div className="site-intro__realty-mask">
          <Image
            {...LOGO_LAYER}
            alt=""
            src="/images/brand/intro-realty.png"
            className="site-intro__layer site-intro__layer--realty"
          />
        </div>
      </div>
    </div>
  );
}
