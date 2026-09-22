import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

import { projects, getProject, CATEGORY_LABELS, STATUS_LABELS } from "@/content/projects";
import { getLocality } from "@/content/localities";
import { site, whatsappLink } from "@/content/site";
import { formatArea, formatConfigurations, formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.name}, ${project.locationLabel}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const locality = project.localityId ? getLocality(project.localityId) : undefined;
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const specs = [
    { label: "Starting from", value: formatPrice(project.priceFrom) },
    { label: "Configurations", value: formatConfigurations(project.configurations) },
    { label: "Area", value: formatArea(project.areaSqft) },
    { label: "Possession", value: project.possession },
    { label: "Development", value: project.landArea },
    { label: "Status", value: project.status ? STATUS_LABELS[project.status] : null },
    { label: "RERA", value: project.rera },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value));

  return (
    <>
      <span hidden data-project-page={project.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.name, path: `/projects/${project.slug}` },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow={`${project.developer} · ${CATEGORY_LABELS[project.category]}`}
        title={project.name}
        lede={project.summary}
        image={{
          src: project.image,
          alt: "",
          transitionName: `project-image-${project.slug}`,
        }}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#enquire" size="lg" className="bg-accent text-ink hover:opacity-90">
            Enquire about this project
          </Button>
          <Button
            href={whatsappLink(`Hi ${site.name}, I'd like details on ${project.name}.`)}
            size="lg"
            variant="secondary"
          >
            WhatsApp us
          </Button>
        </div>
      </PageHero>

      <nav aria-label="Breadcrumb" className="border-line border-b">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-4 sm:px-6 lg:px-10">
          <ol className="text-faint flex flex-wrap items-center gap-2 text-xs">
            <li>
              <Link href="/" className="hover:text-accent-text inline-flex min-h-9 items-center transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects" className="hover:text-accent-text inline-flex min-h-9 items-center transition-colors">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-muted">
              {project.name}
            </li>
          </ol>
        </div>
      </nav>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-(length:--text-h2) leading-[1.1]">About the project</h2>
            {project.description.map((para) => (
              <p key={para.slice(0, 32)} className="text-muted mt-5 leading-relaxed">
                {para}
              </p>
            ))}

            <h3 className="mt-12 text-(length:--text-h3)">Highlights</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="border-line bg-surface text-fg flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed"
                >
                  <svg viewBox="0 0 24 24" className="text-accent mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>

            <figure className="mt-12">
              <div className="bg-raised relative aspect-16/9 overflow-hidden rounded-(--radius-card)">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-faint mt-3 text-xs">
                Developer imagery, indicative only.
              </figcaption>
            </figure>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-line bg-surface rounded-(--radius-card) border p-6 sm:p-7">
              <h2 className="eyebrow text-faint font-sans">At a glance</h2>

              {specs.length > 0 ? (
                <dl className="mt-5 space-y-3.5 text-sm">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="border-line flex items-baseline justify-between gap-4 border-b pb-3.5 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="numeric text-fg text-right font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-muted mt-5 text-sm leading-relaxed">
                  Pricing and configuration details for this project are shared on request.
                </p>
              )}

              {locality && (
                <div className="border-line mt-6 border-t pt-6">
                  <p className="text-faint text-[0.625rem] tracking-[0.14em] uppercase">
                    {locality.tag}
                  </p>
                  <Link
                    href={`/projects?locality=${locality.id}`}
                    className="text-accent-text mt-1 inline-flex min-h-9 items-center text-sm underline underline-offset-4"
                  >
                    More in {locality.name}
                  </Link>
                </div>
              )}

              <div className="border-line mt-6 border-t pt-6">
                <a
                  href={site.contact.phoneHref}
                  className="text-muted hover:text-fg inline-flex min-h-9 items-center text-sm transition-colors"
                >
                  Call {site.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="enquire" tone="raised" width="prose">
        <h2 className="text-(length:--text-h2) leading-tight">Enquire about {project.name}</h2>
        <p className="text-muted mt-4 leading-relaxed">
          Tell us what you need. We&rsquo;ll come back with availability and pricing, and with the
          parts of it that aren&rsquo;t so flattering.
        </p>
        <div className="mt-8">
          <EnquiryForm subject={`Enquiry: ${project.name}`} />
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <h2 className="text-(length:--text-h2) leading-tight">Also on our desk</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="flex">
                <ProjectCard project={p} className="w-full" />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/projects" variant="secondary">
              All projects
            </Button>
          </div>
        </Section>
      )}
    </>
  );
}
