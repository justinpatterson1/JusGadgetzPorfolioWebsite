"use client";

import { useEffect, useState, type MouseEvent } from "react";

import { NAV_ITEMS } from "@/lib/content/nav";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";

import { SidebarTooltip } from "./sidebar-tooltip";

/** project_overview.md §6.3 — both values are the contract, not taste. */
const SPY_OFFSET = 140;
const HOME_THRESHOLD = 200;

/**
 * Returns the id of the section currently in view, or null for Home.
 *
 * Reads layout on scroll rather than using IntersectionObserver: the rule is
 * "the section whose top has passed `scrollY + 140`", which is a comparison
 * against a moving line, not an intersection ratio. Expressing it directly is
 * both shorter and exactly what §6.3 specifies.
 *
 * Measurements are taken inside a rAF so a burst of scroll events collapses
 * into one read per frame.
 */
function useScrollSpy(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;

      if (y < HOME_THRESHOLD) {
        setActiveId(null);
        return;
      }

      let current: string | null = null;
      for (const item of NAV_ITEMS) {
        if (item.id === null) continue;
        const el = document.getElementById(item.id);
        /* section not built yet (prompts 02–08) — skip, don't guess */
        if (el === null) continue;
        /* §6.3 phrases this in document coordinates — "the section whose top
           has passed scrollY + 140" — which reduces to a viewport-relative
           comparison, since documentTop <= scrollY + 140 ⟺ rect.top <= 140. */
        if (el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return activeId;
}

/**
 * The rail's navigation group — design-system.md §7.2.
 *
 * Real anchors rather than buttons: they are in-page navigation, so they should
 * be focusable, openable in a new tab, and still work with JavaScript off. The
 * click handler only exists to add the 40px offset and the smooth easing, and
 * defers to the browser when a modifier key is held.
 */
export function SidebarNav() {
  const activeId = useScrollSpy();

  const handleClick =
    (id: string | null) => (event: MouseEvent<HTMLAnchorElement>) => {
      /* let the browser handle new-tab / new-window clicks */
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      scrollToSection(id);
    };

  return (
    <nav aria-label="Sections" className="flex flex-1 items-center">
      <ul className="m-0 flex w-full list-none flex-col items-center gap-2 p-0">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeId === item.id;

          return (
            <li
              key={item.label}
              className="relative flex w-full justify-center"
            >
              {/* 3×22px accent bar on the rail's own left edge, not the tile's.
                  The <li> spans the full rail, so `left-0` lands there at every
                  breakpoint without re-deriving the tile inset. */}
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5.5 w-0.75 -translate-y-1/2 rounded-r-full bg-accent"
                />
              )}

              <a
                href={item.id === null ? "#" : `#${item.id}`}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onClick={handleClick(item.id)}
                className={cn(
                  "group relative flex size-12 items-center justify-center rounded-xl hand:size-10.5",
                  "transition-colors duration-200 ease-hover",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-ink-3 hover:bg-accent-soft hover:text-ink",
                )}
              >
                <Icon width={20} height={20} />
                <SidebarTooltip>{item.label}</SidebarTooltip>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
