import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-accent hover:text-ink",
  secondary:
    "border border-line bg-fg/5 text-fg hover:border-accent hover:bg-transparent hover:text-accent-text",
  ghost: "text-fg hover:text-accent-text",
};

// Comfortably above the 44px minimum touch target at every size.
const SIZES: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = SharedProps & { href: string; external?: boolean };
type ButtonAsButton = SharedProps & ComponentPropsWithoutRef<"button"> & { href?: never };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", children, className } = props;
  const classes = cx(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip the presentational props so only real button attributes are spread.
  const { variant: _variant, size: _size, children: _children, className: _class, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
