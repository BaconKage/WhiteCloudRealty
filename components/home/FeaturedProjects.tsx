import Link from "next/link";
import {
  CATEGORY_INCLUDES,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  projects,
  toSummary,
  type ProjectCategory,
} from "@/content/projects";
import { pillars, purpose } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** The client's property types (6 November), in her order. */
const TYPE_ICONS: Record<ProjectCategory, React.ReactNode> = {
  apartments: <path d="M6 20V4.5h12V20M3.5 20h17M9.5 8h1.5M13 8h1.5M9.5 11.5h1.5M13 11.5h1.5M10.5 20v-4.5h3V20" />,
  villas: <path d="M4 11.5 12 5l8 6.5M6.5 10v9.5h11V10M10 19.5v-5h4v5" />,
  plots: <path d="M4 18.5 8 6.5h8l4 12H4ZM6.7 12.5h10.6M12 6.5v12" />,
  farmhouses: <path d="M3.5 20h17M4.5 20v-7l5-4 5 4v7M8 20v-4h3v4M18.5 20v-5.5M18.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  commercial: <path d="M5 20V6.5l8-2V20M13 9.5l6 1.5v9M3.5 20h17M8 9h2M8 12.5h2M8 16h2M16 14h.01M16 17h.01" />,
  investment: <path d="M4 19.5h16M5.5 15l4.5-4.5 3.5 3L19 7.5M15 7.5h4v4" />,
};

/**
 * Property first: browse by type, then the projects themselves. Types with
 * nothing listed yet open a pre-written enquiry rather than an empty page.
 */
export function FeaturedProjects() {
  return (
    <Section tone="raised" id="properties">
      <SectionHeading
        eyebrow="Browse properties"
        title="What are you looking for?"
        lede={purpose}
        action={
          <Button href="/projects" variant="secondary">
            All projects
          </Button>
        }
      />

      <div className="mt-10">
        <p className="eyebrow text-accent-text">What sets us apart</p>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="border-line border-t pt-4">
              <span className="numeric text-accent-text text-sm font-semibold">0{i + 1}</span>
              <p className="font-display mt-1 text-lg leading-snug">{pillar.title}</p>
              <p className="text-muted mt-2 text-sm leading-relaxed">{pillar.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_ORDER.map((category) => {
          const type = { category, label: CATEGORY_LABELS[category], icon: TYPE_ICONS[category] };
          const count = projects.filter((p) => p.category === type.category).length;
          const content = (
            <>
              <span className="bg-brand text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {type.icon}
                </svg>
              </span>
              <span>
                <span className="font-display block text-lg leading-snug">{type.label}</span>
                <span className="text-muted block text-xs leading-snug">{CATEGORY_INCLUDES[category]}</span>
                <span className="text-faint mt-1 block text-xs">
                  {count > 0 ? `${count} on our desk` : "Ask us what’s available"}
                </span>
              </span>
            </>
          );
          const classes =
            "group border-line bg-surface hover:border-accent/60 flex h-full items-center gap-3 rounded-(--radius-card) border p-4 transition-colors";

          return (
            <li key={type.label}>
              {count > 0 ? (
                <Link href={`/projects?type=${type.category}`} className={classes}>
                  {content}
                </Link>
              ) : (
                <a
                  href={whatsappLink(`Hi ${site.name}, I'm looking for ${type.label.toLowerCase()} in Bengaluru. What's available?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 70} className="flex min-w-[85vw] snap-start sm:min-w-0">
            <ProjectCard project={toSummary(project)} priority={i < 3} className="w-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
