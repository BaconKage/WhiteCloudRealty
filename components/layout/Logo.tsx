import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * The official White Cloud Realty logo: "White Cloud" set beside a disc — the
 * cloud — with "Realty." knocked out of it.
 *
 * Two files ship, prepared by scripts/prep-brand-logo.mjs: the artwork as
 * supplied (white words, white disc) for ink surfaces, and a reversed copy
 * (ink words, ink disc, paper "Realty.") for the cream page, where the
 * original would vanish. CSS in globals.css picks between them from `.on-ink`
 * and the active theme, so no JavaScript is involved and there is no swap
 * flicker on load.
 *
 * The disc takes the full height of the artwork and the lettering only about
 * a fifth of it, so the logo is sized taller than a plain wordmark would be.
 */
export function Logo({
  className,
  href = "/",
  priority = false,
}: {
  className?: string;
  href?: string | null;
  priority?: boolean;
}) {
  const sizing = cx("h-12 w-auto sm:h-14", className);

  const mark = (
    <>
      <Image
        src="/images/brand/wordmark-on-light.png"
        alt="White Cloud Realty"
        width={640}
        height={246}
        priority={priority}
        className={cx("logo-on-light", sizing)}
      />
      <Image
        src="/images/brand/wordmark-on-dark.png"
        alt=""
        aria-hidden="true"
        width={640}
        height={246}
        priority={priority}
        className={cx("logo-on-dark", sizing)}
      />
    </>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="group/logo inline-flex min-h-11 items-center rounded-sm transition-transform duration-300 hover:scale-[1.03]"
      aria-label="White Cloud Realty — home"
    >
      {mark}
    </Link>
  );
}
