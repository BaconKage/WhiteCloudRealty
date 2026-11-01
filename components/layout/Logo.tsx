import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/format";

/**
 * The White Cloud Realty logo: white "White Cloud" beside a white disc holding
 * a black "Realty.", on a flat orange tile. The artwork has a transparent
 * background (see scripts/prep-brand-logo.mjs) and the tile is drawn in CSS, so
 * it stays sharp and reads the same on every surface in both themes.
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
  const mark = (
    <span className={cx("bg-brand inline-flex rounded-lg px-2.5 py-1 sm:px-3", className)}>
      <Image
        src="/images/brand/wordmark.png"
        alt="White Cloud Realty"
        width={360}
        height={139}
        priority={priority}
        className="h-10 w-auto sm:h-11"
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="group/logo inline-flex min-h-11 items-center rounded-lg transition-transform duration-300 hover:scale-[1.03]"
      aria-label="White Cloud Realty — home"
    >
      {mark}
    </Link>
  );
}
