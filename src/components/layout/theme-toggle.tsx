"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/lib/theme/theme-provider";

import { SidebarTooltip } from "./sidebar-tooltip";

/**
 * Light/dark switch — design-system.md §7.2, §8.
 *
 * Both glyphs are always rendered and stacked; the inactive one rotates ±90°,
 * scales to .6 and fades out over .35s on `--ease-theme`. Cross-fading beats
 * swapping which icon is mounted, because a mounted element can animate and an
 * unmounted one can only appear.
 *
 * The transition names `rotate` and `scale`, not `transform`: Tailwind v4 emits
 * those as individual CSS properties, and a `transform` entry would match
 * nothing — leaving the icons to jump between states while only the fade eased.
 *
 * Goes through `useTheme()` rather than writing `data-theme` itself — the
 * provider owns persistence and the pre-paint script in the root layout owns
 * the first frame. A second writer here would reintroduce open-issues.md #2.
 *
 * The label names the *next* state (design-system.md §11). Before hydration the
 * stored preference is unreadable, so `ready` gates it: announcing "Switch to
 * dark mode" to someone already in dark mode is worse than saying nothing.
 */
export function ThemeToggle() {
  const { mode, ready, toggleMode } = useTheme();
  const dark = mode === "dark";
  const label = dark ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={ready ? `Switch to ${label.toLowerCase()}` : "Switch theme"}
      className="group relative flex size-12 items-center justify-center rounded-xl border border-hair bg-surface-2 text-ink-3 transition-colors duration-200 ease-hover hover:text-ink hand:size-10.5"
    >
      {/* a fixed-size box so the two absolutely-positioned glyphs have
          something to center in, and the button never reflows mid-swap */}
      <span className="relative block size-4.75">
        <SunIcon
          width={19}
          height={19}
          className={`absolute inset-0 transition-[opacity,rotate,scale] duration-350 ease-theme ${
            dark ? "rotate-90 scale-60 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <MoonIcon
          width={19}
          height={19}
          className={`absolute inset-0 transition-[opacity,rotate,scale] duration-350 ease-theme ${
            dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-60 opacity-0"
          }`}
        />
      </span>
      <SidebarTooltip>{label}</SidebarTooltip>
    </button>
  );
}
