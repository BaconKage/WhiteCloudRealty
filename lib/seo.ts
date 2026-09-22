import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Vercel environment values are user-configurable and may occasionally be set
 * to a relative path such as `/`. Metadata URLs must always use an absolute
 * HTTP(S) origin, so ignore malformed values and fall back to the canonical
 * production domain instead of failing the entire static build.
 */
function resolveSiteOrigin(value: string | undefined): string {
  try {
    const url = new URL(value?.trim() || site.url);
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();

    return url.toString().replace(/\/$/, "");
  } catch {
    return site.url.replace(/\/$/, "");
  }
}

const BASE = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export function absoluteUrl(path = "/"): string {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Path to an image under /public, e.g. "/images/projects/foo.jpg". */
  image?: string;
};

/** Per-page metadata with canonical + Open Graph, consistently shaped. */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? "/images/og-default.jpg");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
