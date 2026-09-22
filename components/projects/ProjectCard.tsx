"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/content/projects";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/content/projects";
import { formatArea, formatConfigurations, formatPrice, cx } from "@/lib/format";

const warmedProjectRoutes = new Set<string>();

/**
 * The card does the work the old site's project list did not: it surfaces the
 * facts a buyer scans for. Every spec row is conditional, so a project with
 * nothing but a name and a blurb still renders cleanly instead of showing a
 * column of dashes.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const navigating = useRef(false);
  const price = formatPrice(project.priceFrom);
  const href = `/projects/${project.slug}`;
  const specs = [
    { label: "Configurations", value: formatConfigurations(project.configurations) },
    { label: "Area", value: formatArea(project.areaSqft) },
    { label: "Possession", value: project.possession },
    { label: "Development", value: project.landArea },
    { label: "RERA", value: project.rera },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value));

  const warmProject = useCallback(() => {
    if (warmedProjectRoutes.has(href)) return;

    warmedProjectRoutes.add(href);
    router.prefetch(href);

    // Next disables router prefetching in development. Warm the local route
    // explicitly so the very first click is not delayed by an on-demand build.
    if (process.env.NODE_ENV === "development") {
      void fetch(`${href}/`, { cache: "force-cache", priority: "low" }).catch(() => {
        warmedProjectRoutes.delete(href);
      });
    }
  }, [href, router]);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean };
    }).connection;

    if (connection?.saveData) return;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(warmProject, { timeout: 1200 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(warmProject, 250);
    return () => window.clearTimeout(handle);
  }, [warmProject]);

  const openProject = (event: MouseEvent<HTMLAnchorElement>) => {
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

    const transitionDocument = document as Document & {
      startViewTransition?: (
        update: () => void | Promise<void>,
      ) => { finished: Promise<void> };
    };

    if (!transitionDocument.startViewTransition) return;

    event.preventDefault();
    navigating.current = true;
    warmProject();

    const transition = transitionDocument.startViewTransition(async () => {
      router.push(href);
      await waitForProjectPage(project.slug);
    });

    transition.finished.then(
      () => {
        navigating.current = false;
      },
      () => {
        navigating.current = false;
      },
    );
  };

  return (
    <article
      data-project-card
      className={cx(
        "group border-line bg-surface relative flex flex-col overflow-hidden rounded-(--radius-card) border transition-[border-color,transform,box-shadow] duration-300",
        "hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_18px_44px_-24px_rgb(0_0_0_/_0.45)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-(--ease-out-soft) group-hover:scale-x-100"
      />

      <div className="bg-raised relative aspect-4/3 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ viewTransitionName: `project-image-${project.slug}` }}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[700ms] ease-(--ease-out-soft) group-hover:scale-[1.045]"
          />
        </div>
        {/* Darkens the image slightly on hover so the badges stay readable. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(11_17_25/0.45),transparent_45%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="bg-ink-deep/80 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.12em] text-white/90 uppercase backdrop-blur-sm">
            {project.developer}
          </span>
          {project.status && (
            <span className="bg-accent text-ink rounded-full px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.1em] uppercase">
              {STATUS_LABELS[project.status]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-faint text-xs tracking-wide">{CATEGORY_LABELS[project.category]}</p>

        <h3 className="mt-2 text-(length:--text-h3) leading-snug">
          <Link
            href={href}
            prefetch
            onPointerEnter={warmProject}
            onFocus={warmProject}
            onClick={openProject}
            className="before:absolute before:inset-0"
          >
            {project.name}
          </Link>
        </h3>

        <p className="text-muted mt-2 flex items-start gap-1.5 text-sm">
          <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
          {project.locationLabel}
        </p>

        <p className="text-muted mt-4 line-clamp-2 text-sm leading-relaxed">{project.summary}</p>

        {(price || specs.length > 0) && (
          <dl className="border-line mt-5 space-y-2 border-t pt-4 text-sm">
            {price && (
              <div className="flex items-baseline justify-between gap-3">
                <dt className="text-faint text-xs">Starting from</dt>
                <dd className="numeric text-accent-text font-semibold">{price}</dd>
              </div>
            )}
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-faint text-xs">{spec.label}</dt>
                <dd className="numeric text-fg text-right">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <p className="text-accent-text mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium">
          View project
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </p>
      </div>
    </article>
  );
}

/**
 * Resolve as soon as the App Router commits the destination. The timeout is
 * only a failsafe for a failed/very slow navigation; warmed routes resolve
 * immediately and never pay this duration.
 */
function waitForProjectPage(slug: string): Promise<void> {
  if (document.querySelector(`[data-project-page="${slug}"]`)) {
    return Promise.resolve();
  }

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
      if (document.querySelector(`[data-project-page="${slug}"]`)) finish();
    });
    const timeout = window.setTimeout(finish, 2600);

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
