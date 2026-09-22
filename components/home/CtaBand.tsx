import { site, whatsappLink } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section className="on-ink bg-ink-deep relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_85%_0%,rgb(201_162_39/0.2),transparent_65%)]"
      />
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal
          variant="section"
          className="editorial-section__inner grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end"
        >
          <div>
            <p className="eyebrow text-accent">Start a conversation</p>
            <h2 className="mt-4 max-w-2xl text-(length:--text-h2) leading-[1.06]">
              Tell us what you are looking for.
            </h2>
            <p className="text-muted mt-5 max-w-xl text-(length:--text-lede) leading-relaxed">
              A budget and an area is enough to start. We&rsquo;ll come back with options that are
              worth your time, and we&rsquo;ll be straight with you about what&rsquo;s wrong with
              each one.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Button href="/contact" size="lg" className="bg-accent text-ink hover:bg-accent hover:opacity-90">
              Send an enquiry
            </Button>
            <Button href={whatsappLink()} size="lg" variant="secondary">
              WhatsApp {site.contact.phoneDisplay}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
