import Link from "next/link";
import { footerNav, site, whatsappLink } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink-deep">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)]">
          <div className="max-w-sm">
            <Logo />
            <p className="text-muted mt-5 leading-relaxed">{site.description}</p>

            <dl className="mt-7 space-y-2.5 text-sm">
              <div className="flex gap-3">
                <dt className="text-faint w-16 shrink-0">Call</dt>
                <dd>
                  <a
                    href={site.contact.phoneHref}
                    className="hover:text-accent inline-flex min-h-9 items-center transition-colors"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-faint w-16 shrink-0">Email</dt>
                <dd>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="hover:text-accent inline-flex min-h-9 items-center break-all transition-colors"
                  >
                    {site.contact.email}
                  </a>
                </dd>
              </div>
              {site.contact.hours && (
                <div className="flex gap-3">
                  <dt className="text-faint w-16 shrink-0">Hours</dt>
                  <dd className="text-muted">{site.contact.hours}</dd>
                </div>
              )}
              {site.contact.address && (
                <div className="flex gap-3">
                  <dt className="text-faint w-16 shrink-0">Office</dt>
                  <dd className="text-muted">
                    {site.contact.address.street}, {site.contact.address.locality},{" "}
                    {site.contact.address.city} {site.contact.address.postalCode}
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-ink inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium transition-opacity hover:opacity-90"
              >
                WhatsApp
              </a>
              {site.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-line hover:border-accent hover:text-accent inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="eyebrow font-sans text-accent">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted hover:text-accent group/f inline-flex min-h-9 items-center gap-1.5 text-sm transition-colors"
                      >
                        <span className="transition-transform duration-300 ease-(--ease-out-soft) group-hover/f:translate-x-1">
                          {link.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="-translate-x-1 opacity-0 transition-all duration-300 group-hover/f:translate-x-0 group-hover/f:opacity-100"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-line mt-14 border-t pt-8">
          <p className="text-faint max-w-4xl text-xs leading-relaxed">{site.disclaimer}</p>
          <div className="text-faint mt-6 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            {site.agentRera ? (
              <p>RERA registration: {site.agentRera}</p>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
