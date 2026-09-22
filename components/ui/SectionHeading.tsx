import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  /** Slot for a "view all" link that sits opposite the title on wide screens. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      variant="clip"
      className={cx(
        "flex flex-col gap-5",
        Boolean(action) && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && <p className="eyebrow text-accent-text">{eyebrow}</p>}
        <h2 className={cx("text-(length:--text-h2) leading-[1.08]", eyebrow && "mt-3")}>{title}</h2>
        {lede && <p className="mt-4 text-(length:--text-lede) leading-relaxed text-muted">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
