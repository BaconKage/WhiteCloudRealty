import { site } from "@/content/site";
import type { Project } from "@/content/projects";
import { absoluteUrl } from "./seo";

/**
 * Structured data. Only fields backed by real values are emitted - an empty
 * `address` or a null price is omitted rather than serialised as null, which
 * search engines treat as a malformed entity.
 */

export function organizationJsonLd() {
  const address = site.contact.address;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${absoluteUrl("/")}#organization`,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    telephone: site.contact.phoneDisplay,
    email: site.contact.email,
    ...(site.gstin && { taxID: site.gstin }),
    areaServed: { "@type": "Place", name: site.region },
    founder: [site.founder, site.coFounder].map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
    sameAs: site.social.map((s) => s.href),
    openingHours: "Mo-Su 10:00-19:00",
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.street,
        addressLocality: address.locality,
        addressRegion: address.state,
        postalCode: address.postalCode,
        addressCountry: "IN",
      },
    }),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: project.name,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    ...(project.image && { image: absoluteUrl(project.image) }),
    address: {
      "@type": "PostalAddress",
      addressLocality: project.locationLabel,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    ...(project.areaSqft && {
      floorSize: {
        "@type": "QuantitativeValue",
        minValue: project.areaSqft[0],
        maxValue: project.areaSqft[1],
        unitCode: "FTK",
      },
    }),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
