"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Flips `data-theme` on <html>. With no stored preference the site follows the
 * OS, which is handled entirely in CSS — this only kicks in once the visitor
 * makes a choice, and that choice is remembered per browser.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = safeGet();
    const active =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(active);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("wcr-theme", next);
    } catch {
      // Private browsing or blocked storage — the choice just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`border-line text-muted hover:border-accent hover:text-accent-text inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${className ?? ""}`}
      aria-label={
        theme === null
          ? "Switch colour theme"
          : `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      }
      aria-pressed={theme === "dark"}
    >
      {/* Both glyphs render; CSS shows the one matching the active theme so the
          button never flashes the wrong icon before hydration. */}
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="hidden h-[18px] w-[18px] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
      </svg>
    </button>
  );
}

function safeGet(): Theme | null {
  try {
    const v = localStorage.getItem("wcr-theme");
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
}
