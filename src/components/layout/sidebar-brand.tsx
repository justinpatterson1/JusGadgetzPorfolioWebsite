"use client";

import type { MouseEvent } from "react";

import { scrollToSection } from "@/lib/scroll";

/**
 * The "J" wordmark tile — design-system.md §7.2.
 *
 * `--ink` ground with a `--bg` letter at rest, flipping to accent on hover
 * while the corner dot inverts the other way (accent → `--bg`). Both tokens
 * invert with the theme, so the tile reads in dark mode with no second rule.
 *
 * `text-bg` on an `--ink` ground is one of the cases the "never hardcode a
 * color" rule exists for: the literal would be white here and wrong in dark
 * mode.
 */
export function SidebarBrand() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    scrollToSection(null);
  };

  return (
    <a
      href="#"
      aria-label="JusDev — back to top"
      onClick={handleClick}
      className="group relative mb-9 flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink text-bg transition-colors duration-200 ease-hover hover:bg-accent hand:size-10"
    >
      <span aria-hidden className="text-title font-bold">
        J
      </span>
      <span
        aria-hidden
        className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-accent transition-colors duration-200 ease-hover group-hover:bg-bg"
      />
    </a>
  );
}
