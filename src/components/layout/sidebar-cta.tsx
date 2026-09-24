"use client";

import type { MouseEvent } from "react";

import { ArrowIcon } from "@/components/icons";
import { scrollToSection } from "@/lib/scroll";

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
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    scrollToSection("contact");
  };

  return (
    <a
      href="#contact"
      aria-label="Let's Talk"
      onClick={handleClick}
      className="group relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-[background-color,translate] duration-200 ease-hover hover:-translate-y-0.5 hover:bg-accent-strong hand:size-10.5"
    >
      <ArrowIcon width={18} height={18} />
      <SidebarTooltip>Let&apos;s Talk</SidebarTooltip>
    </a>
  );
}
