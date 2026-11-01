import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { YieldCalculator } from "@/components/tools/YieldCalculator";
import { site, whatsappLink } from "@/content/site";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to White Cloud Realty about buying, investing in or selling property across Bengaluru. WhatsApp, call or send an enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...faqs])) }}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us what you are looking for"
        lede="A budget and an area is enough to start with."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-(length:--text-h2) leading-tight">Send an enquiry</h2>
            <p className="text-muted mt-4 leading-relaxed">
              Tell us roughly what you&rsquo;re after and we&rsquo;ll take it from there.
            </p>
            <div className="mt-8">
              <EnquiryForm subject="Website enquiry" />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-line bg-surface rounded-(--radius-card) border p-6 sm:p-7">
              <h2 className="eyebrow text-faint font-sans">Reach us directly</h2>

              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-muted">WhatsApp &amp; phone</dt>
                  <dd className="mt-1">
                    <a
                      href={site.contact.phoneHref}
                      className="text-fg hover:text-accent-text inline-flex min-h-9 items-center text-base font-medium transition-colors"
                    >
                      {site.contact.phoneDisplay}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-muted">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-fg hover:text-accent-text inline-flex min-h-9 items-center text-base font-medium break-all transition-colors"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>

                {site.contact.hours && (
                  <div>
                    <dt className="text-muted">Hours</dt>
                    <dd className="text-fg mt-1">{site.contact.hours}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-muted">Where we work</dt>
                  <dd className="text-fg mt-1">{site.region}</dd>
                </div>

                {site.contact.address ? (
                  <div>
                    <dt className="text-muted">Office</dt>
                    <dd className="mt-1">
                      <a
                        href={site.contact.address.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg hover:text-accent-text underline-offset-4 transition-colors hover:underline"
                      >
                        {site.contact.address.street}, {site.contact.address.locality},{" "}
                        {site.contact.address.city} {site.contact.address.postalCode}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-fg text-bg hover:bg-accent hover:text-ink inline-flex min-h-12 items-center justify-center rounded-full px-6 font-medium transition-colors"
                >
                  Message on WhatsApp
                </a>
                <a
                  href={site.social[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-line hover:border-accent hover:text-accent-text inline-flex min-h-12 items-center justify-center rounded-full border px-6 font-medium transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="calculator" tone="raised">
        <YieldCalculator />
      </Section>

      <Section width="prose">
        <h2 className="text-(length:--text-h2) leading-tight">Questions we get a lot</h2>
        <div className="mt-8 divide-y divide-(--color-line)">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="font-display hover:text-accent-text flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-lg leading-snug transition-colors sm:text-xl">
                {faq.question}
                <svg viewBox="0 0 24 24" className="text-accent h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="faq-answer text-muted pb-5 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
