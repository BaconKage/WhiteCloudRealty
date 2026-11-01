"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/**
 * Search from the hero, handing off to the projects page. It is a real GET
 * form, so it still works before hydration or with JavaScript off.
 */
export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/projects?q=${encodeURIComponent(q)}` : "/projects");
  }

  return (
    <form
      action="/projects/"
      method="get"
      role="search"
      onSubmit={onSubmit}
      className="focus-within:border-brand flex max-w-xl items-center gap-2 rounded-full border border-white/30 bg-[rgb(11_17_25/0.86)] p-1.5 transition-colors"
    >
      <svg viewBox="0 0 24 24" className="text-faint ml-3.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5" />
      </svg>
      <label htmlFor="hero-search" className="sr-only">
        Search by project, developer or area
      </label>
      <input
        id="hero-search"
        name="q"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search project, developer or area"
        className="text-fg placeholder:text-faint min-h-11 w-full min-w-0 bg-transparent text-sm outline-none sm:text-base"
      />
      <button
        type="submit"
        className="bg-brand text-ink hover:bg-fg hover:text-bg min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-[background-color,color,translate,scale] active:scale-[0.96] sm:px-6"
      >
        Search
      </button>
    </form>
  );
}
