import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type LedeProps = {
  children: ReactNode;
  /** Services centers its lede within the column. */
  centered?: boolean;
  className?: string;
};

/**
 * Section subheading — PRD 01 §1.5.
 *
 * The 600px cap holds the measure at roughly 70 characters. Inside a dark
 * section the color drops to `--on-ink-2` via the `ink:` variant.
 */
export function Lede({ children, centered, className }: LedeProps) {
  return (
    <p
      className={cn(
        "lede max-w-[600px] text-lede text-ink-2 ink:text-on-ink-2",
        centered && "mx-auto",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The Hero's variant — PRD 01 §1.5.
 *
 * Same type and color as `Lede`, but a narrower measure and a bottom margin
 * for the CTA row beneath it. Kept separate rather than bolted onto `Lede` as
 * props, because the spec treats it as its own class.
 */
export function HeroLede({ children, className }: LedeProps) {
  return (
    <p
      className={cn(
        "hero-lede mb-8 max-w-[540px] text-lede text-ink-2",
        className,
      )}
    >
      {children}
    </p>
  );
}
