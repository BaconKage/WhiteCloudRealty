import { flushSync } from "react-dom";

type ViewTransitionHandle = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition: () => void;
};

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransitionHandle;
};

/**
 * How long a route change may hold the old page on screen waiting for the
 * new one. A View Transition freezes rendering until its update finishes, so
 * a slow route would otherwise look like the site had locked up.
 */
const MAX_ROUTE_WAIT_MS = 300;

/**
 * Runs a React state update inside a same-document View Transition, so the
 * browser animates between the before and after snapshots.
 *
 * `flag` is set as a `data-*` attribute on <html> for the life of the
 * transition, letting CSS style that one kind of transition (see globals.css)
 * without affecting route changes, which use the same API.
 *
 * Falls back to a plain update where View Transitions are unsupported or the
 * visitor prefers reduced motion.
 */
export function withViewTransition(update: () => void, flag?: string): void {
  const doc = document as TransitionDocument;

  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    update();
    return;
  }

  const root = document.documentElement;
  if (flag) root.dataset[flag] = "";

  const transition = doc.startViewTransition(() => {
    // The browser snapshots the new state as soon as this callback returns,
    // so React must commit synchronously inside it.
    flushSync(update);
  });

  transition.finished.finally(() => {
    if (flag) delete root.dataset[flag];
  });
}

/**
 * Runs a route change inside a View Transition, giving up on the animation if
 * the new page is not ready within MAX_ROUTE_WAIT_MS. Skipping ends the
 * rendering freeze at once, so the old page stays live and the new one simply
 * swaps in when it arrives — a normal navigation, never a frozen screen.
 *
 * Returns null when no transition was started (unsupported, or reduced
 * motion), so the caller can let the link navigate normally.
 */
export function navigateWithTransition(
  navigate: () => Promise<void>,
): { finished: Promise<void> } | null {
  const doc = document as TransitionDocument;

  if (
    !doc.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return null;
  }

  const transition = doc.startViewTransition(navigate);
  // Skipping rejects `ready` by design; without a handler that surfaces as an
  // uncaught error in the console.
  transition.ready.catch(() => undefined);
  const slow = window.setTimeout(() => transition.skipTransition(), MAX_ROUTE_WAIT_MS);
  transition.updateCallbackDone.then(
    () => window.clearTimeout(slow),
    () => window.clearTimeout(slow),
  );

  return { finished: transition.finished.catch(() => undefined) };
}
