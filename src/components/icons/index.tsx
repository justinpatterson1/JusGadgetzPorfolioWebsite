import type { SVGProps } from "react";

/**
 * The icon set — design-system.md §6.
 *
 * The complete set: seventeen stroke glyphs and the three filled brand marks
 * at the bottom of the file.
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

/* `CodeIcon` is the chevrons-and-slash glyph; this is the shell window. They
   are easy to confuse — Skills uses this one for Backend Development. */
export function TerminalIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.4" />
      <path d="M6.8 9.6 9.8 12l-3 2.4" />
      <path d="M12.6 15h4.6" />
    </svg>
  );
}

export function PhoneIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.6 5.6h2.8" />
      <path d="M10.4 18.4h3.2" />
    </svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      {/* The two meridians are ellipses rather than arcs so the sphere still
          reads at 20px, where a single curved path flattens into the rim. */}
      <ellipse cx="12" cy="12" rx="4.1" ry="9.2" />
    </svg>
  );
}

export function CardIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
      <path d="M2.5 9.5h19" />
      <path d="M6.5 15h3.5" />
    </svg>
  );
}

/* Two stacked units rather than three: at 20px a third band closes the gaps
   and the glyph reads as a filled block. */
export function ServerIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <rect x="3" y="3.5" width="18" height="7.5" rx="2" />
      <rect x="3" y="13" width="18" height="7.5" rx="2" />
      <path d="M7 7.25h.01M7 16.75h.01" />
    </svg>
  );
}

/* The check is what makes this "Security Audits" rather than a generic badge. */
export function ShieldIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={1.8} {...p}>
      <path d="M12 2.8 4.5 5.6v5.9c0 4.6 3.1 8.2 7.5 9.7 4.4-1.5 7.5-5.1 7.5-9.7V5.6Z" />
      <path d="m8.8 12.1 2.3 2.3 4.2-4.4" />
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

/* Used at 13px in the Projects header CTA. The arrow and the corner bracket are
   separate paths so neither joins the other at a shared point — at 13px a
   single path reads as a smudge. */
export function ExternalIcon(p: IconProps) {
  return (
    <svg {...STROKE} strokeWidth={2} {...p}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5" />
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

/* ---- Filled brand marks ----

   The one exception to the stroke rules above: these are the brands' own
   marks, and §6 says never to redraw them as strokes. Paths are from Simple
   Icons (CC0), on the same 24×24 viewBox so sizes still agree. X is the
   current mark, not the bird. */

const FILL = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

export function LinkedInIcon(p: IconProps) {
  return (
    <svg {...FILL} {...p}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function XIcon(p: IconProps) {
  return (
    <svg {...FILL} {...p}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

export function GitHubIcon(p: IconProps) {
  return (
    <svg {...FILL} {...p}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
