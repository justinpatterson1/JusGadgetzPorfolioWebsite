import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type PillProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Status badge — PRD 01 §1.7.
 *
 * The dot's pulse animates box-shadow *spread* only (keyframes in globals.css),
 * never a transform or a size — so the dot's layout box stays fixed and the
 * label beside it can't shift. The resting 4px halo is set here so the dot
 * still reads correctly under `prefers-reduced-motion`, where the loop stops.
 */
export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "pill inline-flex items-center gap-2 rounded-full px-3.5 py-[7px] text-pill",
        "border border-[color-mix(in_oklab,var(--accent)_20%,transparent)]",
        "bg-accent-soft text-accent-strong",
        className,
      )}
    >
      <span
        aria-hidden
        className="dot size-[7px] shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)] animate-pulse-dot"
      />
      {children}
    </span>
  );
}
