import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type H2Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Section headline — PRD 01 §1.4.
 *
 * `text-balance` is required, not cosmetic: these headlines are short, and an
 * unbalanced last line reads as an accident.
 *
 * Copy convention: every section headline ends in a period, matching the
 * `JusDev.` wordmark. "Skills Acquired." / "Featured Projects."
 *
 * Color is inherited rather than set, so the headline picks up `--on-ink`
 * automatically inside a dark section.
 */
export function H2({ children, className, id }: H2Props) {
  return (
    <h2 id={id} className={cn("h2 m-0 mb-4 text-h2 text-balance", className)}>
      {children}
    </h2>
  );
}
