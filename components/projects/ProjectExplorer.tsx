"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { CATEGORY_LABELS } from "@/content/projects";
import { localities } from "@/content/localities";
import { ProjectCard } from "./ProjectCard";
import { CompareDrawer } from "./CompareDrawer";
import { cx } from "@/lib/format";
import { withViewTransition } from "@/lib/viewTransition";

const MAX_COMPARE = 3;

type ExplorerProps = { projects: Project[] };

/**
 * Filterable project grid with a comparison tray.
 *
 * The locality filter can be pre-set from a link (`/projects?locality=...`),
 * which is how the corridor strip and map hand off. That is read from
 * `location.search` in an effect rather than via `useSearchParams`, which in
 * an export build would push the whole page behind a Suspense boundary.
 */
export function ProjectExplorer({ projects }: ExplorerProps) {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [localityId, setLocalityId] = useState<string | "all">("all");
  const [query, setQuery] = useState("");
  const [compare, setCompare] = useState<string[]>([]);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("locality");
    if (param && localities.some((l) => l.id === param)) setLocalityId(param);
  }, []);

  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [projects],
  );
  const usedLocalities = useMemo(
    () => localities.filter((l) => projects.some((p) => p.localityId === l.id)),
    [projects],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (localityId !== "all" && p.localityId !== localityId) return false;
      if (!q) return true;
      return [p.name, p.developer, p.locationLabel, p.summary]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [projects, category, localityId, query]);

  const filtered = category !== "all" || localityId !== "all" || query.trim() !== "";

  function toggleCompare(slug: string) {
    setCompare((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : current.length >= MAX_COMPARE
          ? current
          : [...current, slug],
    );
  }

  function reset() {
    withViewTransition(() => {
      setCategory("all");
      setLocalityId("all");
      setQuery("");
    }, "filtering");
  }

  // Filter chips re-flow the grid inside a View Transition: cards that stay
  // glide to their new slots, the rest fade out or in. Typing in the search
  // box updates directly, since animating every keystroke would lag.
  const filterTo = (apply: () => void) => withViewTransition(apply, "filtering");

  return (
    <>
      <div className="border-line bg-surface rounded-(--radius-card) border p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="project-search" className="text-muted mb-2 block text-sm font-medium">
              Search
            </label>
            <div className="relative">
              <svg viewBox="0 0 24 24" className="text-faint pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l4.5 4.5" />
              </svg>
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Project, developer or area"
                className="border-line bg-bg text-fg placeholder:text-faint focus:border-accent min-h-12 w-full rounded-full border pr-4 pl-11 outline-none transition-[border-color,box-shadow] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
              />
            </div>
          </div>

          <FilterRow
            legend="Property type"
            options={[
              { value: "all", label: "All types" },
              ...categories.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
            ]}
            value={category}
            onChange={(v) => filterTo(() => setCategory(v as ProjectCategory | "all"))}
          />

          <FilterRow
            legend="Locality"
            options={[
              { value: "all", label: "All localities" },
              ...usedLocalities.map((l) => ({ value: l.id, label: l.name })),
            ]}
            value={localityId}
            onChange={(v) => filterTo(() => setLocalityId(v))}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p aria-live="polite" className="text-muted text-sm">
          Showing <span className="numeric text-fg font-semibold">{results.length}</span> of{" "}
          <span className="numeric">{projects.length}</span> projects
        </p>
        {filtered && (
          <button
            type="button"
            onClick={reset}
            className="text-accent-text min-h-11 text-sm underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Keeps the outline going h1 -> h2 -> h3 (the card titles) rather than
          skipping a level. */}
      <h2 className="sr-only">Matching projects</h2>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project, i) => (
            <li
              key={project.slug}
              data-filter-slot
              style={{ "--filter-slot": `project-slot-${project.slug}` } as CSSProperties}
              className="relative flex"
            >
              <ProjectCard project={project} priority={i < 3} className="w-full" />
              <CompareToggle
                checked={compare.includes(project.slug)}
                disabled={!compare.includes(project.slug) && compare.length >= MAX_COMPARE}
                projectName={project.name}
                onChange={() => toggleCompare(project.slug)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-line mt-6 rounded-(--radius-card) border border-dashed p-12 text-center">
          <p className="text-(length:--text-h3) font-display">Nothing matches that yet</p>
          <p className="text-muted mx-auto mt-3 max-w-md leading-relaxed">
            What&rsquo;s listed here is only part of what we transact. Tell us what you&rsquo;re
            after and we&rsquo;ll bring you things that never make it onto a website.
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-accent-text mt-5 min-h-11 text-sm underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}

      <CompareDrawer
        projects={projects.filter((p) => compare.includes(p.slug))}
        onRemove={toggleCompare}
        onClear={() => setCompare([])}
      />
    </>
  );
}

type FilterRowProps = {
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
};

function FilterRow({ legend, options, value, onChange }: FilterRowProps) {
  return (
    // `min-w-0` is required: a fieldset defaults to `min-inline-size: min-content`,
    // which makes it refuse to shrink and pushes the whole page sideways.
    <fieldset className="min-w-0">
      <legend className="text-muted mb-2 text-sm font-medium">{legend}</legend>
      <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={cx(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm whitespace-nowrap transition-[background-color,border-color,color,transform] active:scale-95",
              value === option.value
                ? "border-fg bg-fg text-bg font-medium"
                : "border-line text-muted hover:border-accent hover:text-accent-text",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Sits above the card's stretched link, which is why it needs its own stacking
 * context — otherwise the card's `before:inset-0` anchor would swallow clicks.
 */
function CompareToggle({
  checked,
  disabled,
  projectName,
  onChange,
}: {
  checked: boolean;
  disabled: boolean;
  projectName: string;
  onChange: () => void;
}) {
  return (
    <label
      className={cx(
        "absolute right-3 bottom-3 z-10 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3 text-xs font-medium transition-[background-color,border-color,color,transform] active:scale-95",
        checked
          ? "border-accent bg-accent text-ink"
          : "border-line bg-surface text-muted hover:border-accent",
        disabled && "cursor-not-allowed opacity-45",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {checked ? <path d="M4 12.5l5 5L20 6.5" /> : <path d="M12 5v14M5 12h14" />}
      </svg>
      Compare
      <span className="sr-only">{projectName}</span>
    </label>
  );
}
