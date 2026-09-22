"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, site, whatsappLink } from "@/content/site";
import { cx } from "@/lib/format";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // The open mobile panel needs the bar opaque and on normal theme tokens,
  // otherwise the panel inherits the ink palette and clashes with the page.
  const solid = scrolled || open;

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        "relative",
        // The hairline is an inset shadow, not a border: the hero cancels the
        // header's height with -mt-18, and a border would leave a 1px sliver
        // of page background above it.
        solid
          ? "bg-bg/90 shadow-[inset_0_-1px_0_var(--color-line),0_1px_24px_rgb(0_0_0_/_0.06)] backdrop-blur-xl"
          // Unscrolled, the bar floats over the ink hero every page opens with,
          // so it borrows the dark-surface tokens to stay legible.
          : "on-ink bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-[1280px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <Logo priority />

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cx(
                    "group/nav relative inline-flex min-h-11 items-center rounded-full px-4 text-sm transition-colors",
                    isActive(link.href) ? "text-fg font-medium" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "bg-accent absolute inset-x-4 bottom-2 h-px origin-center transition-transform duration-400 ease-(--ease-out-soft)",
                      isActive(link.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover/nav:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <ThemeToggle />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-fg text-bg hover:bg-accent hover:text-ink hidden min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors sm:inline-flex"
          >
            Talk to us
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="border-line text-fg inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="bg-bg h-[calc(100dvh-4.5rem)] overflow-y-auto lg:hidden"
      >
        <nav aria-label="Primary mobile" className="px-4 py-6 sm:px-6">
          <ul className="flex flex-col">
            {primaryNav.map((link) => (
              <li key={link.href} className="border-line border-b last:border-b-0">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cx(
                    "font-display flex min-h-14 items-center text-2xl",
                    isActive(link.href) ? "text-accent-text" : "text-fg",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-fg text-bg inline-flex min-h-12 items-center justify-center rounded-full px-6 font-medium"
            >
              Message us on WhatsApp
            </a>
            <a
              href={site.contact.phoneHref}
              className="border-line text-fg inline-flex min-h-12 items-center justify-center rounded-full border px-6 font-medium"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
