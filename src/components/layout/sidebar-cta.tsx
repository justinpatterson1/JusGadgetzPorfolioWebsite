"use client";

import { ArrowIcon } from "@/components/icons";
import { useSectionLink } from "@/lib/use-section-link";

import { SidebarTooltip } from "./sidebar-tooltip";

/**
 * "Let's Talk" — design-system.md §7.2.
 *
 * Accent tile, white arrow, `--accent-strong` and a 2px lift on hover. The lift
 * is a transform, so it can't nudge the toggle above it.
 *
 * Literal `white` on the arrow is deliberate and one of the exceptions
 * coding-standards.md allows: this sits on an accent fill in both themes, and
 * `--bg` would invert it to near-black in dark mode.
 */
export function SidebarCta() {
  /* `local`: every page renders the footer, so #contact is always in-page. */
  const link = useSectionLink("contact", { local: true });

  return (
    <a
      {...link}
      aria-label="Let's Talk"
      className="group relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-[background-color,translate] duration-200 ease-hover hover:-translate-y-0.5 hover:bg-accent-strong hand:size-10.5"
    >
      <ArrowIcon width={18} height={18} />
      <SidebarTooltip>Let&apos;s Talk</SidebarTooltip>
    </a>
  );
}
