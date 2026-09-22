import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { CtaBand } from "@/components/home/CtaBand";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Residential, township and managed-farmland developments across the North Bengaluru corridor, represented by White Cloud Realty.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects we represent"
        lede="Filter by type or by locality, then shortlist up to three and put them side by side. This is only part of what we transact, so if you don&rsquo;t see it here, ask."
      />

      <Section>
        <ProjectExplorer projects={projects} />
      </Section>

      <CtaBand />
    </>
  );
}
