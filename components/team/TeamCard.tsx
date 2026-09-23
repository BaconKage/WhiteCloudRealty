import Image from "next/image";
import { initials, type TeamMember } from "@/content/team";
import { cx } from "@/lib/format";

/**
 * One person on the Meet the team page. Until a photo arrives the frame shows
 * the logo's own device — the white disc on ink — with the person's initials
 * set in it the way "Realty." sits in the logo, so the grid reads as designed
 * rather than as missing images.
 */
export function TeamCard({
  member,
  sizes = "(max-width: 1024px) 50vw, 30vw",
  className,
}: {
  member: TeamMember;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={cx("group", className)}>
      <div className="border-line relative aspect-4/5 overflow-hidden rounded-(--radius-card) border">
        {member.photo ? (
          <>
            <Image
              src={member.photo}
              alt={member.role ? `${member.name}, ${member.role}` : member.name}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[900ms] ease-(--ease-out-soft) group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(11_17_25/0.35),transparent_45%)]"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="bg-ink-deep absolute inset-0 grid place-items-center bg-[radial-gradient(70%_55%_at_50%_42%,rgb(255_255_255/0.07),transparent_70%)]"
          >
            <span className="font-display grid aspect-square w-[58%] place-items-center rounded-full bg-[#fcfcfd] text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] font-bold tracking-[-0.03em] text-[#020202] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.05]">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-4">
        <span className="font-display block text-lg leading-snug sm:text-xl">{member.name}</span>
        {member.role && <span className="text-accent-text mt-1 block text-sm">{member.role}</span>}
      </figcaption>
    </figure>
  );
}
