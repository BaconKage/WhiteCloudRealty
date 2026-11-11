"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { primaryNav, site, whatsappLink } from "@/content/site";
import { cx } from "@/lib/format";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type Tone = "dark" | "light";

/** Rough perceived lightness (0 to 1) of a computed CSS colour, or null if transparent. */
function lightness(color: string): number | null {
  const n = color.match(/-?[\d.]+%?/g)?.map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : +v));
  if (!n) return null;
  if (color.startsWith("rgb")) {
    if (n.length > 3 && n[3] < 0.5) return null;
    return (0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2]) / 255;
  }
  if (color.startsWith("color(srgb")) {
    if (n.length > 3 && n[3] < 0.5) return null;
    return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  }
  if (color.startsWith("oklch") || color.startsWith("oklab")) {
    if (n.length > 3 && n[3] < 0.5) return null;
    return n[0] > 1 ? n[0] / 100 : n[0];
  }
  return null;
}

/**
 * Whether the page directly under the bar is dark or light, read from the
 * first solid background beneath it. The glass takes its tint from that, the
 * way Apple's does: smoky over dark content, clear over light.
 */
function toneBehind(header: HTMLElement | null): Tone {
  for (const el of document.elementsFromPoint(6, 36)) {
    if (header?.contains(el)) continue;
    for (let node: Element | null = el; node; node = node.parentElement) {
      const l = lightness(getComputedStyle(node).backgroundColor);
      if (l !== null) return l < 0.5 ? "dark" : "light";
    }
  }
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("dark");
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Re-read what is under the bar as the page scrolls, resizes, changes theme
  // or changes route. One check per frame at most.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTone(toneBehind(headerRef.current)));
    };
    update();
    // Pages fade in after navigation, and the first visit opens behind the
    // logo intro, so check again once those animations have finished.
    const late = window.setTimeout(update, 450);
    const afterIntro = window.setTimeout(update, 3200);
    window.addEventListener("animationend", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    const themeWatch = new MutationObserver(update);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.clearTimeout(afterIntro);
      window.removeEventListener("animationend", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      themeWatch.disconnect();
    };
  }, [pathname]);

  // Close the mobile panel whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes, focus returns to the trigger, and the page behind is locked.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    // Lock the page on <html>, not <body>. With <html> already clipping
    // overflow, hidden on <body> turns it into its own scroll box: the sticky
    // header then un-sticks back to the top of the page, and focusing the
    // first link scrolled the whole page up to reach it.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Dark glass gets the light-on-dark tokens; light glass keeps the page's own.
  const toneClass = tone === "dark" ? "on-ink" : "";

  return (
    // The header strip is see-through and lets clicks pass around the capsule.
    <header ref={headerRef} className="pointer-events-none sticky top-0 z-50 h-18">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center px-3 sm:px-4 lg:px-8">
        <div
          data-tone={tone}
          className={cx(
            "liquid-glass pointer-events-auto relative z-10 flex h-[3.25rem] w-full items-center gap-3 rounded-full px-1.5",
            toneClass,
          )}
        >
          <Logo priority variant="pill" />

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cx(
                      "group/nav relative inline-flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-200",
                      isActive(link.href) ? "text-fg" : "text-fg/70 hover:text-fg",
                    )}
                  >
                    {link.label}
                    {/* The orange underline: grows from the centre on hover,
                        and stays under the current page. */}
                    <span
                      aria-hidden="true"
                      className={cx(
                        "bg-accent absolute inset-x-3.5 bottom-1 h-px origin-center transition-transform duration-400 ease-(--ease-out-soft)",
                        isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <ThemeToggle />
            {/* The website's main call to action: the number itself, one tap away. */}
            <a
              href={site.contact.phoneHref}
              aria-label={`Call ${site.contact.phoneDisplay}`}
              className="bg-brand text-ink hidden h-10 items-center justify-center gap-2 rounded-full text-[0.8125rem] font-semibold whitespace-nowrap shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] transition-[filter,scale] hover:brightness-105 active:scale-[0.96] min-[360px]:inline-flex max-sm:w-10 sm:px-4"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6.6 3.5h2.6l1.5 4.3-2 1.6a12.5 12.5 0 0 0 5.9 5.9l1.6-2 4.3 1.5v2.6a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
              </svg>
              <span className="max-sm:hidden">{site.contact.phoneDisplay}</span>
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="text-fg hover:bg-fg/[0.08] inline-flex h-10 w-10 items-center justify-center rounded-full transition-[background-color,scale] active:scale-90 lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {/* Two bars that fold into a cross, rather than an icon swap. */}
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path
                  d="M4 12h16"
                  className={cx(
                    "origin-center transition-transform duration-300",
                    open ? "rotate-45" : "-translate-y-1",
                  )}
                />
                <path
                  d="M4 12h16"
                  className={cx(
                    "origin-center transition-transform duration-300",
                    open ? "-rotate-45" : "translate-y-1",
                  )}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tapping anywhere outside the open panel closes it. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cx(
          "fixed inset-0 bg-black/25 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile panel. Always rendered so it can animate; `inert` and
          `invisible` take it out of the tab order and accessibility tree
          while closed. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        inert={!open}
        data-tone={tone}
        className={cx(
          "liquid-glass liquid-glass--panel pointer-events-auto fixed inset-x-3 top-[4.5rem] z-10 max-h-[calc(100dvh-5.5rem)] origin-top overflow-y-auto overscroll-contain rounded-[1.75rem] duration-300 ease-(--ease-out-soft) sm:inset-x-4 lg:hidden",
          toneClass,
          // Visibility flips at once on open, so the first link can take focus
          // immediately, but waits out the fade on close.
          open
            ? "visible scale-100 opacity-100 transition-[opacity,translate,scale]"
            : "invisible -translate-y-1 scale-[0.97] opacity-0 transition-[opacity,translate,scale,visibility]",
        )}
      >
        <nav
          aria-label="Primary mobile"
          className="px-3 py-3"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul className="flex flex-col gap-0.5">
            {primaryNav.map((link, i) => (
              <li
                key={link.href}
                style={{ "--i": i } as CSSProperties}
                className={cx(
                  "transition-[opacity,translate] duration-400",
                  // Links cascade in on open; on close they leave together.
                  open
                    ? "translate-y-0 opacity-100 delay-[calc(var(--i)*30ms+50ms)]"
                    : "translate-y-2 opacity-0",
                )}
              >
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cx(
                    "font-display flex min-h-13 items-center rounded-2xl px-4 text-[1.375rem] transition-colors",
                    isActive(link.href) ? "bg-fg/[0.08] text-accent-text" : "text-fg active:bg-fg/[0.06]",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 grid grid-cols-2 gap-2 px-1 pb-1">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-fg text-bg inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold"
            >
              WhatsApp us
            </a>
            <a
              href={site.contact.phoneHref}
              className="bg-brand text-ink inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold"
            >
              Call us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
