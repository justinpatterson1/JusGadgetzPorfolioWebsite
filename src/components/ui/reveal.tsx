import type { ReactNode } from "react";

type RevealProps = {
  /** The element to render. Use `ul`/`ol` when the staggered children are
      list items, so the list keeps its semantics. */
  as?: "div" | "ul" | "ol";
  /** Stagger the direct children instead of revealing the block as one. */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Fades its content up once, the first time it scrolls into view.
 *
 * A server component that only marks the element: `data-reveal` for a block,
 * `data-reveal="stagger"` for a group whose direct children enter one after
 * another. The motion is CSS (see "Reveal" in globals.css); the one piece of
 * JavaScript is `RevealObserver`, mounted once in the root layout, which
 * flags each element `data-revealed` as it arrives.
 *
 * Nothing is hidden unless the pre-paint bootstrap has set
 * `data-reveal-ready` on `<html>` — it doesn't without IntersectionObserver or
 * under `prefers-reduced-motion` — so with JavaScript off, or motion reduced,
 * the content is simply there.
 *
 * Wrap a section's *contents*, never the `<section>` itself: the rail's
 * scrollspy and the in-page anchors measure section boxes, and a translated
 * section would report the wrong position until it had revealed.
 */
export function Reveal({
  as: Tag = "div",
  stagger = false,
  className,
  children,
}: RevealProps) {
  return (
    <Tag data-reveal={stagger ? "stagger" : ""} className={className}>
      {children}
    </Tag>
  );
}
