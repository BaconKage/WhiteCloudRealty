"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type RevealProps = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  variant?: "rise" | "clip" | "image" | "section";
  as?: ElementType;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  variant = "rise",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shown = useReveal(ref);

  return (
    <Tag
      ref={ref}
      data-reveal={shown ? "shown" : ""}
      data-reveal-variant={variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
