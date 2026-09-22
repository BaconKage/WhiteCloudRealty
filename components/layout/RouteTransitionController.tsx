"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type TransitionDocument = Document & {
  startViewTransition?: (
    update: () => void | Promise<void>,
  ) => { finished: Promise<void> };
};

/**
 * Gives ordinary internal links the same native cross-document-feeling fade
 * as project cards. Project cards opt out here because they own a richer
 * shared-image transition.
 */
export function RouteTransitionController() {
  const router = useRouter();
  const navigating = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        navigating.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.closest("[data-project-card]") ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noRouteTransition !== undefined ||
        (anchor.target && anchor.target !== "_self")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      if (destination.origin !== current.origin) return;

      // In-page anchors should retain the browser's native smooth scroll.
      if (
        destination.pathname === current.pathname &&
        destination.search === current.search
      ) {
        return;
      }

      const transitionDocument = document as TransitionDocument;
      if (!transitionDocument.startViewTransition) return;

      event.preventDefault();
      navigating.current = true;
      document.documentElement.dataset.routeTransition = "native";

      const transition = transitionDocument.startViewTransition(async () => {
        router.push(`${destination.pathname}${destination.search}${destination.hash}`);
        await waitForPage(destination.pathname);
      });

      transition.finished.finally(() => {
        navigating.current = false;
        delete document.documentElement.dataset.routeTransition;
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
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
    const timeout = window.setTimeout(finish, 900);

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
