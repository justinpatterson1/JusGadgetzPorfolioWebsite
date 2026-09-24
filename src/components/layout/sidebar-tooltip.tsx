import { cn } from "@/lib/cn";

/**
 * The rail's hover label — design-system.md §7.2.
 *
 * An `--ink` pill with `--bg` text and a left arrow, 14px to the right of the
 * tile, sliding in 6px over .15s. Both tokens invert with the theme, so the
 * pill stays legible in dark mode without a second rule.
 *
 * Revealed on `group-focus-visible` as well as `group-hover` — a tooltip that
 * only answers the mouse leaves a keyboard user with six unlabelled icons
 * (open-issues.md #12).
 *
 * `pointer-events-none` matters: at 14px away the pill would otherwise sit
 * under the cursor on its way out and re-trigger its own parent's hover.
 */
export function SidebarTooltip({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-full top-1/2 z-10 ml-3.5",
        "-translate-y-1/2 -translate-x-1.5 opacity-0",
        "whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-label text-bg",
        "transition-[opacity,translate] duration-150 ease-hover",
        "group-hover:translate-x-0 group-hover:opacity-100",
        "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
        className,
      )}
    >
      {/* the arrow: a 4px border box with only its right edge painted */}
      <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-ink" />
      {children}
    </span>
  );
}
