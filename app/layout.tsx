import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { FloatingContact } from "@/components/cta/FloatingContact";
import { SiteIntro } from "@/components/layout/SiteIntro";
import { PageTransition } from "@/components/layout/PageTransition";
import { RouteTransitionController } from "@/components/layout/RouteTransitionController";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} — Strategic Real Estate Advisory, North Bengaluru`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: [
    "real estate advisory Bengaluru",
    "North Bengaluru property",
    "Devanahalli apartments",
    "KIADB Aerospace Park",
    "Hennur apartments",
    "property consultant Bangalore",
  ],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: absoluteUrl("/"),
    title: `${site.name} — Strategic Real Estate Advisory`,
    description: site.description,
    images: [{ url: absoluteUrl("/images/og-default.jpg"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1119" },
  ],
};

/**
 * Resolves the theme before first paint so there is no flash of the wrong
 * palette, and keeps `data-theme` always present so the `dark:` variant is
 * reliable. With no stored choice it tracks the OS, live.
 *
 * It also marks whether the brand intro has already played in this tab, so a
 * reload skips straight to the page (see SiteIntro). Deciding here, before
 * paint, is what stops the overlay flashing up for a frame.
 */
const THEME_SCRIPT = `
(function(){
  try {
    var stored = localStorage.getItem('wcr-theme');
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var apply = function(t){ document.documentElement.setAttribute('data-theme', t); };
    apply(stored === 'dark' || stored === 'light' ? stored : (mq.matches ? 'dark' : 'light'));
    if (!stored) mq.addEventListener('change', function(e){ apply(e.matches ? 'dark' : 'light'); });
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  try {
    if (sessionStorage.getItem('wcr-intro')) document.documentElement.setAttribute('data-intro', 'seen');
    else sessionStorage.setItem('wcr-intro', '1');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <SiteIntro />
        <ScrollProgress />
        <RouteTransitionController />
        <SkipLink />
        <Header />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
