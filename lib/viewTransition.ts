import { flushSync } from "react-dom";

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

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

