/**
 * Smooth-scrolls to a section, or to the top when `id` is null.
 *
 * The 40px offset (design-system.md §7.2) keeps a section's eyebrow clear of
 * the viewport edge instead of butting against it.
 *
 * `html { scroll-behavior: smooth }` in globals.css covers anchor navigation,
 * and the reduced-motion guard there turns it off — but that guard does not
 * reach `window.scrollTo({ behavior: "smooth" })`, so the preference is checked
 * again here. Without this, reduced-motion users still get the animated scroll.
 */
export const SCROLL_OFFSET = 40;

export function scrollToSection(id: string | null): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

  if (id === null) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  /* The section's prompt hasn't run yet — do nothing rather than scroll to 0. */
  if (target === null) return;

  const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior });
}
