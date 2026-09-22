import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FeaturedProjects() {
  return (
    <Section tone="raised">
      <SectionHeading
        eyebrow="Currently representing"
        title="Projects on our desk"
        lede="Developments we have walked ourselves. We can tell you about the masterplan and the micro-market, and about whatever the brochure decided to leave out."
        action={
          <Button href="/projects" variant="secondary">
            All projects
          </Button>
        }
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {featuredProjects.slice(0, 3).map((project, i) => (
          <Reveal key={project.slug} delay={i * 70} className="flex">
            <ProjectCard project={project} priority={i < 3} className="w-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
