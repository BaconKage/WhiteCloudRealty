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
  variant = "tile",
}: {
  className?: string;
  href?: string | null;
  priority?: boolean;
  /** "pill" is the compact capsule used inside the nav bar. */
  variant?: "tile" | "pill";
}) {
  const mark = (
    <span
      className={cx(
        "bg-brand inline-flex",
        variant === "pill"
          ? "rounded-full py-1 pr-1.5 pl-3.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]"
          : "rounded-lg px-2.5 py-1 sm:px-3",
        className,
      )}
    >
      <Image
        src="/images/brand/wordmark.png"
        alt="White Cloud Realty"
        width={360}
        height={139}
        priority={priority}
        className={variant === "pill" ? "h-8 w-auto" : "h-10 w-auto sm:h-11"}
      />
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="group/logo inline-flex min-h-10 items-center rounded-full transition-transform duration-300 hover:scale-[1.03]"
      aria-label="White Cloud Realty - home"
    >
      {mark}
    </Link>
  );
}
