"use client";

import { useCountUp } from "@/lib/useCountUp";

export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, value } = useCountUp(to);

  // One node, one number. The count settles on the real value, so there is no
  // visually-hidden duplicate to double up in text extraction or on copy.
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
