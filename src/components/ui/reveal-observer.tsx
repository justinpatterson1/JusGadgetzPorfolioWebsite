"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Flags every `[data-reveal]` element `data-revealed` the first time it
 * scrolls into view, then stops watching it — reveals run once, never again
 * on scroll-back. Mounted once in the root layout; renders nothing.
 *
 * The bottom root margin makes an element count as arrived when its top has
 * cleared the last 15% of the viewport. That is the "10–20% visible" trigger
 * expressed against the viewport rather than as an intersection ratio, which
 * a section taller than the screen could never reach.
 *
 * Re-scans on every route change, because a client-side navigation brings in
 * new `[data-reveal]` elements (the homepage, or the footer on a case study).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Set by the pre-paint bootstrap. Absent means nothing was hidden — or the
    // bootstrap's fallback timer gave up waiting for this effect.
    if (!("revealReady" in root.dataset)) return;
    // Tells that fallback timer the observer is running.
    root.dataset.revealLive = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
