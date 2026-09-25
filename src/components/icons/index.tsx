import type { SVGProps } from "react";

/**
 * The icon set — design-system.md §6.
 *
 * Ten of the nineteen: the glyphs the sidebar and hero need. The rest arrive
 * with the prompts that consume them.
 *
 * Rules that apply to every icon here:
 * - `viewBox="0 0 24 24"`, always. Mixed viewBoxes make sizes stop agreeing.
 * - **No intrinsic size.** Callers set width/height inline or by a CSS rule on
 *   the parent; an icon with neither falls back to the browser's 300×150.
 * - `currentColor` only. That is how icons track the palette and theme for free.
 * - Props spread **last**, so a caller can override any attribute — including
 *   `className`, `style` and `aria-hidden`.
 * - `aria-hidden` by default: icons sit inside a control that owns the
 *   accessible name (coding-standards.md, Accessibility).
 *
 * Stroke weights come from the §6 table, which assigns them per *glyph* rather
 * than per use, because these glyphs get reused at other sizes elsewhere.
 */

export type IconProps = SVGProps<SVGSVGElement>;

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/* ---- 1.8 — category and navigation glyphs ---- */

export function HomeIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <path d="M3 10.75 12 3.5l9 7.25V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

export function UserIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
    </svg>
  );
}

export function LayoutIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </svg>
  );
}

export function CodeIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <path d="M9.5 8 5 12l4.5 4" />
      <path d="M14.5 8 19 12l-4.5 4" />
      <path d="M13.2 5.6 10.8 18.4" />
    </svg>
  );
}

/* ---- 1.9 — theme toggle ---- */

export function SunIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.9} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.6v2.2M12 19.2v2.2M21.4 12h-2.2M4.8 12H2.6M18.65 5.35l-1.56 1.56M6.91 17.09l-1.56 1.56M18.65 18.65l-1.56-1.56M6.91 6.91 5.35 5.35" />
    </svg>
  );
}

export function MoonIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.9} {...p}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/* ---- 2.0 — action glyphs, heavier so they hold up at small sizes ---- */

export function ArrowIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function DownloadIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} {...p}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m3.6 6.8 8.4 6.2 8.4-6.2" />
    </svg>
  );
}

export function BookmarkIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} {...p}>
      <path d="M6 4.5h12a1 1 0 0 1 1 1V21l-7-4.2L5 21V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}
