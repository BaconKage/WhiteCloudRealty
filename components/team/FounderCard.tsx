import Image from "next/image";
import { site } from "@/content/site";
import { telHref, type TeamMember } from "@/content/team";
import { Button } from "@/components/ui/Button";

/**
 * One of the two founders: portrait, title, a short introduction and how to
 * reach them. Shown side by side on the home page and on Meet the team.
 */
export function FounderCard({
  member,
  action,
  showContact = false,
}: {
  member: TeamMember;
  /** An extra button beside LinkedIn, such as a link to the founder's letter. */
  action?: { label: string; href: string };
  showContact?: boolean;
}) {
  const phone = member.phone ?? site.contact.phoneDisplay;

  return (
    <article className="flex h-full flex-col">
      <figure className="group relative">
        <div className="border-line bg-raised relative aspect-4/5 overflow-hidden rounded-(--radius-card) border shadow-[0_24px_60px_-32px_rgb(0_0_0_/_0.45)]">
          {member.photo && (
            <Image
              src={member.photo}
              alt={`${member.name}, ${member.role} of ${site.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover object-top transition-transform duration-[900ms] ease-(--ease-out-soft) group-hover:scale-[1.04]"
            />
          )}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_17_25/0.78),transparent_42%)]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span className="font-display block text-xl leading-snug text-white sm:text-2xl">
              {member.name}
            </span>
            <span className="text-brand mt-1 block text-sm font-medium">{member.role}</span>
          </figcaption>
        </div>
      </figure>

      {member.bio && <p className="text-muted mt-5 leading-relaxed">{member.bio}</p>}

      {showContact && (
        <dl className="mt-5 space-y-1 text-sm">
          <div className="flex gap-3">
            <dt className="text-faint w-12 shrink-0">Call</dt>
            <dd>
              <a
                href={telHref(phone)}
                className="hover:text-accent-text inline-flex min-h-9 items-center font-medium transition-colors"
              >
                {phone}
              </a>
            </dd>
          </div>
          {member.email && (
            <div className="flex gap-3">
              <dt className="text-faint w-12 shrink-0">Mail</dt>
              <dd>
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-accent-text inline-flex min-h-9 items-center font-medium break-all transition-colors"
                >
                  {member.email}
                </a>
              </dd>
            </div>
          )}
        </dl>
      )}

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        {action && <Button href={action.href}>{action.label}</Button>}
        {member.linkedin && (
          <Button href={member.linkedin} variant="secondary">
            Connect on LinkedIn
          </Button>
        )}
      </div>
    </article>
  );
}
