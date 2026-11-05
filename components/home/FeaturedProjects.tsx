import Link from "next/link";
import { projects, toSummary, type ProjectCategory } from "@/content/projects";
import { pillars, purpose } from "@/content/services";
import { site, whatsappLink } from "@/content/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/** The categories on the firm's Instagram highlights, in the same order. */
const PROPERTY_TYPES: { label: string; category: ProjectCategory; icon: React.ReactNode }[] = [
  {
    label: "Plots",
    category: "plots",
    icon: <path d="M4 18.5 8 6.5h8l4 12H4ZM6.7 12.5h10.6M12 6.5v12" />,
  },
  {
    label: "Apartments",
    category: "apartments",
    icon: <path d="M6 20V4.5h12V20M3.5 20h17M9.5 8h1.5M13 8h1.5M9.5 11.5h1.5M13 11.5h1.5M10.5 20v-4.5h3V20" />,
  },
  {
    label: "Villas",
    category: "villas",
    icon: <path d="M4 11.5 12 5l8 6.5M6.5 10v9.5h11V10M10 19.5v-5h4v5" />,
  },
  {
    label: "Villaments",
    category: "villaments",
    icon: <path d="M4 20V9l6-4 6 4M10 20v-8h10v8M3 20h18M13.5 15.5h3M6.5 12h1M6.5 15.5h1" />,
  },
  {
    label: "Commercial",
    category: "commercial",
    icon: <path d="M5 20V6.5l8-2V20M13 9.5l6 1.5v9M3.5 20h17M8 9h2M8 12.5h2M8 16h2M16 14h.01M16 17h.01" />,
  },
];

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

      <ul className="scrollbar-none -mx-4 mt-12 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5">
        {PROPERTY_TYPES.map((type) => {
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
                <span className="text-faint block text-xs">
                  {count > 0 ? `${count} on our desk` : "Ask us what’s available"}
                </span>
              </span>
            </>
          );
          const classes =
            "group border-line bg-surface hover:border-accent/60 flex h-full items-center gap-3 rounded-(--radius-card) border p-4 transition-colors";

          return (
            <li key={type.label} className="min-w-[14rem] sm:min-w-0">
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
