import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * The White Cloud Realty wordmark.
 *
 * Two files ship, prepared by scripts/prep-brand-logo.mjs: the artwork as
 * supplied (pale gold on the white cloud) for ink surfaces, and one with the
 * gold deepened for the cream page background, where the original pale gold
 * all but disappears. CSS in globals.css picks between them from `.on-ink`
 * and the active theme, so no JavaScript is involved and there is no swap
 * flicker on load.
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
  const sizing = cx("h-8 w-auto sm:h-9", className);

  const mark = (
    <>
      <Image
        src="/images/brand/wordmark-on-light.png"
        alt="White Cloud Realty"
        width={900}
        height={222}
        priority={priority}
        className={cx("logo-on-light", sizing)}
      />
      <Image
        src="/images/brand/wordmark-on-dark.png"
        alt=""
        aria-hidden="true"
        width={900}
        height={222}
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
