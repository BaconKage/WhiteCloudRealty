"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { navigateWithTransition } from "@/lib/viewTransition";

/** Routes already requested, so hovering the nav repeatedly costs nothing. */
const warmedRoutes = new Set<string>();

/**
 * Gives ordinary internal links the same native cross-document-feeling fade
 * as project cards. Project cards opt out here because they own a richer
 * shared-image transition.
 *
 * It also starts loading a page the moment the pointer settles on a link to
 * it (or a finger touches it), so by the click the page is usually ready and
 * the transition can run without waiting.
 */
export function RouteTransitionController() {
  const router = useRouter();
  const navigating = useRef(false);

  useEffect(() => {
    const internalLink = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return null;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin) return null;

      return { anchor, destination, current };
    };

    const warm = (event: Event) => {
      const link = internalLink(event.target);
      if (!link || link.destination.pathname === link.current.pathname) return;

      const path = link.destination.pathname;
      if (warmedRoutes.has(path)) return;
      warmedRoutes.add(path);
      router.prefetch(path);

      // Next disables prefetching in development, where each route is also
      // compiled on first request; warm it directly so the click is instant.
      if (process.env.NODE_ENV === "development") {
        void fetch(path, { priority: "low" }).catch(() => warmedRoutes.delete(path));
      }
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        navigating.current
      ) {
        return;
      }

      const link = internalLink(event.target);
      if (
        !link ||
        link.anchor.closest("[data-project-card]") ||
        link.anchor.dataset.noRouteTransition !== undefined
      ) {
        return;
      }

      const { destination, current } = link;

      // In-page anchors should retain the browser's native smooth scroll.
      if (destination.pathname === current.pathname && destination.search === current.search) {
        return;
      }

      const transition = navigateWithTransition(async () => {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`);
        await waitForPage(destination.pathname);
      });
      if (!transition) return;

      event.preventDefault();
      navigating.current = true;
      transition.finished.finally(() => {
        navigating.current = false;
      });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("touchstart", warm);
      document.removeEventListener("focusin", warm);
    };
  }, [router]);

  return null;
}

function waitForPage(pathname: string): Promise<void> {
  const ready = () =>
    document.querySelector<HTMLElement>("[data-page-path]")?.dataset.pagePath === pathname;

  if (ready()) return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      window.clearTimeout(timeout);
      resolve();
    };
    const observer = new MutationObserver(() => {
      if (ready()) finish();
    });
    // A backstop only: navigateWithTransition drops the animation long before
    // this, so the page is never held frozen while it waits.
    const timeout = window.setTimeout(finish, 3000);

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
