import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/format";

type ContainerProps = {
  children: ReactNode;
  /** `prose` narrows to a comfortable reading measure. */
  width?: "default" | "prose" | "wide";
  as?: ElementType;
  className?: string;
};

const WIDTHS = {
  default: "max-w-[1280px]",
  prose: "max-w-[72ch]",
  wide: "max-w-[1480px]",
} as const;

export function Container({ children, width = "default", as: Tag = "div", className }: ContainerProps) {
  return (
    <Tag className={cx("mx-auto w-full px-4 sm:px-6 lg:px-10", WIDTHS[width], className)}>
      {children}
    </Tag>
  );
}
