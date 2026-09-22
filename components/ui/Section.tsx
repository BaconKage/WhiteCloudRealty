import type { ReactNode } from "react";
import { cx } from "@/lib/format";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** `ink` paints the brand dark panel and flips tokens via `.on-ink`. */
  tone?: "default" | "raised" | "ink";
  width?: "default" | "prose" | "wide";
  /** Drop the horizontal container when a child needs to bleed full-width. */
  bleed?: boolean;
  className?: string;
};

const TONES = {
  default: "bg-bg",
  raised: "bg-raised",
  ink: "on-ink bg-ink-deep",
} as const;

export function Section({
  children,
  id,
  tone = "default",
  width = "default",
  bleed = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(TONES[tone], "editorial-section py-14 sm:py-18 lg:py-24", className)}
      style={id ? { scrollMarginTop: "5.5rem" } : undefined}
    >
      {bleed ? (
        <Reveal variant="section" className="editorial-section__inner">
          {children}
        </Reveal>
      ) : (
        <Container width={width}>
          <Reveal variant="section" className="editorial-section__inner">
            {children}
          </Reveal>
        </Container>
      )}
    </section>
  );
}
