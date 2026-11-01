"use client";

import { useEffect, useRef } from "react";

/**
 * Selects an item when the URL points at it: on arrival from another page, on
 * back and forward, and on clicking an in-page link. Next's Link updates the URL
 * with pushState, which fires no hashchange, so clicks are watched directly.
 *
 * `prefix` lets one section's anchors read "#location-south" for the id "south".
 */
export function useHashSelection(ids: string[], select: (id: string) => void, prefix = "") {
  const latest = useRef({ ids, select, prefix });
  latest.current = { ids, select, prefix };

  useEffect(() => {
    const apply = (hash: string) => {
      const { ids, select, prefix } = latest.current;
      const id = hash.replace(/^#/, "").slice(prefix.length);
      if (hash.startsWith(`#${prefix}`) && ids.includes(id)) select(id);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href*='#']");
      if (anchor && anchor.pathname === window.location.pathname) apply(anchor.hash);
    };
    const fromUrl = () => apply(window.location.hash);

    fromUrl();
    window.addEventListener("hashchange", fromUrl);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromUrl);
      document.removeEventListener("click", onClick);
    };
  }, []);
}
