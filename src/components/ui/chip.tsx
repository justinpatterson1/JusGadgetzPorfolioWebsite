import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Tag token — PRD 01 §1.8. Used by Skills.
 *
 * Literal `white` on hover for the same reason as `Cta`'s accent variant:
 * --bg would invert it in dark mode.
 *
 * Not interactive despite the hover state — it's a label, not a control. If a
 * chip ever needs to filter or link, make it a real button or anchor rather
 * than adding a click handler here.
 */
export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "chip rounded-full border border-hair bg-surface-2 px-3 py-1.5 text-chip text-ink-2",
        "transition-all duration-[180ms] ease-hover",
        "hover:-translate-y-px hover:border-accent hover:bg-accent hover:text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Wrapper for a row of chips.
 *
 * `relative` is load-bearing: it lifts the row above the skill card's
 * `::before` gradient overlay (PRD 09).
 */
export function Chips({ children, className }: ChipProps) {
  return (
    <div className={cn("chips relative flex flex-wrap gap-2", className)}>
      {children}
    </div>
  );
}
