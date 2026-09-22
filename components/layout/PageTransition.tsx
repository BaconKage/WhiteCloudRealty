"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** A small fallback entrance for browsers without native View Transitions. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} data-page-path={pathname} className="route-page">
      {children}
    </div>
  );
}
