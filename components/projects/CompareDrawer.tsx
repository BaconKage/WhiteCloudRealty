"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { CATEGORY_LABELS } from "@/content/projects";
import { formatArea, formatConfigurations, formatPrice, cx } from "@/lib/format";

const ROWS: { label: string; get: (p: Project) => string | null }[] = [
  { label: "Developer", get: (p) => p.developer },
  { label: "Location", get: (p) => p.locationLabel },
  { label: "Type", get: (p) => CATEGORY_LABELS[p.category] },
  { label: "Starting from", get: (p) => formatPrice(p.priceFrom) },
  { label: "Configurations", get: (p) => formatConfigurations(p.configurations) },
  { label: "Area", get: (p) => formatArea(p.areaSqft) },
  { label: "Possession", get: (p) => p.possession },
  { label: "Development", get: (p) => p.landArea },
  { label: "RERA", get: (p) => p.rera },
];

/**
 * Side-by-side comparison, pinned to the bottom of the viewport. Collapsed it
 * is a slim bar showing what is selected; expanded it is a scrollable table.
 *
 * Rows where none of the selected projects has a value are dropped, so an
 * incomplete portfolio produces a short honest table instead of a grid of
 * dashes.
 */
export function CompareDrawer({
  projects,
  onRemove,
  onClear,
}: {
  projects: Project[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projects.length === 0) setExpanded(false);
  }, [projects.length]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

  if (projects.length === 0) return null;

  const rows = ROWS.filter((row) => projects.some((p) => row.get(p)));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6">
      <div
        ref={panelRef}
        className="border-line bg-surface mx-auto max-w-[1280px] overflow-hidden rounded-2xl border shadow-[0_-8px_40px_-16px_rgb(0_0_0_/_0.35)]"
      >
        <div className="flex items-center gap-3 p-3 sm:p-4">
          <p className="text-sm">
            <span className="numeric text-fg font-semibold">{projects.length}</span>
            <span className="text-muted"> selected to compare</span>
          </p>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClear}
              className="text-muted hover:text-fg min-h-11 px-3 text-sm transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="bg-fg text-bg hover:bg-accent hover:text-ink inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
            >
              {expanded ? "Hide" : "Compare"}
              <svg viewBox="0 0 24 24" className={cx("h-4 w-4 transition-transform", expanded && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 15l6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>

        {expanded && (
          <div className="border-line max-h-[65svh] overflow-auto border-t">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">Comparison of selected projects</caption>
              <thead>
                <tr>
                  <th scope="col" className="bg-surface sticky left-0 z-10 w-32 p-3 text-left align-bottom sm:w-40">
                    <span className="sr-only">Attribute</span>
                  </th>
                  {projects.map((p) => (
                    <th key={p.slug} scope="col" className="min-w-[12rem] p-3 text-left align-bottom">
                      <div className="bg-raised relative aspect-16/10 overflow-hidden rounded-lg">
                        <Image src={p.image} alt="" fill sizes="200px" className="object-cover" />
                      </div>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="font-display hover:text-accent-text mt-2 block text-base leading-snug font-medium transition-colors"
                      >
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => onRemove(p.slug)}
                        className="text-faint hover:text-fg mt-1 text-xs underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-line border-t">
                    <th scope="row" className="bg-surface text-muted sticky left-0 z-10 p-3 text-left font-medium">
                      {row.label}
                    </th>
                    {projects.map((p) => (
                      <td key={p.slug} className="numeric p-3 align-top">
                        {row.get(p) ?? <span className="text-faint">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
