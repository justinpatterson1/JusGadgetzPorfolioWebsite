import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type CtaVariant = "solid" | "accent" | "ghost";

/**
 * Shared shape. The 8px gap owns the spacing between an icon and the label —
 * icons are sized inline (`width={14}`, 13 in Projects) and never given a
 * margin of their own (PRD 01 §1.6).
 *
 * The transition lists `translate`, not `transform`: Tailwind v4 emits the
 * individual `translate` / `rotate` / `scale` properties rather than a composed
 * `transform`, so a `transform` entry here matches nothing and the hover lift
 * snaps instead of easing.
 */
const BASE =
  "cta inline-flex items-center gap-2 rounded-full px-[22px] py-[11px] text-cta transition-[translate,background-color,color,border-color] duration-[180ms] ease-hover hover:-translate-y-px";

const VARIANTS: Record<CtaVariant, string> = {
  /* Reserved — not currently used by any section. */
  solid: "bg-ink text-bg hover:bg-accent",
  /* Literal `white`: this text must stay white in both themes, and --bg would
     invert it. One of the five hardcoded-color exceptions PRD 00 allows. */
  accent: "bg-accent text-white hover:bg-accent-strong",
  ghost:
    "border border-hair-2 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-bg",
};

type CtaOwnProps = {
  variant?: CtaVariant;
  children: ReactNode;
  className?: string;
};

type CtaAsLink = CtaOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type CtaAsButton = CtaOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type CtaProps = CtaAsLink | CtaAsButton;

/**
 * Button primitive — PRD 01 §1.6.
 *
 * Renders an `<a>` when given an `href`, otherwise a `<button>`. Both Hero CTAs
 * are links (an in-page anchor and a resume PDF), so plain `<a>` is correct;
 * swap in `next/link` if a real route ever needs one.
 *
 * The 1px hover lift is a transform, so it never reflows its neighbors.
 */
export function Cta({
  variant = "solid",
  children,
  className,
  ...rest
}: CtaProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
