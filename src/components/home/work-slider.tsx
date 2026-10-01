"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { ArrowIcon } from "@/components/icons";

/**
 * A Selected Work slider — a scroll-snap track with previous / next arrows.
 * Used twice: the wide public-project cards (one per view) and the compact
 * professional-work cards (two per view, one ≤980px).
 *
 * The track is an ordinary horizontally scrolling list, so it still works with
 * JavaScript off, by swipe, trackpad and shift-scroll, and a keyboard user
 * tabbing to a card's link scrolls it into view. This component only adds the
 * two buttons and the position readout, which is why it is the only client
 * piece of Selected Work — the cards themselves are server-rendered children.
 * Cards per view come from CSS (`variant`), and the component measures them
 * rather than assuming, so the readout is right at every width.
 *
 * The arrows step one card and **wrap**: next from the last position returns to
 * the first, previous from the first goes to the last, so the buttons never
 * dead-end. Steps honour `prefers-reduced-motion`, like `scrollToSection`.
 */
export function WorkSlider({
  label,
  variant,
  heading,
  count,
  children,
}: {
  /** The carousel's accessible name, e.g. "Professional work". */
  label: string;
  /** `wide`: one card per view. `compact`: two, one below 980px. */
  variant: "wide" | "compact";
  /** The group title and note, laid out beside the arrows. */
  heading: ReactNode;
  /** Number of cards, for the position readout. */
  count: number;
  /** The cards, as `<li>`s. */
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const [first, setFirst] = useState(0);
  const [perView, setPerView] = useState(1);
  /* What the live region says. Set only by the arrow buttons — the visible
     readout also follows swipes and resizes, and announcing every one of
     those would talk over whatever the user is reading. */
  const [announcement, setAnnouncement] = useState("");

  /* Which card is leftmost, and how many fit — re-read on scroll and resize so
     the readout follows swipes as well as clicks. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const step = stepOf(track);
      if (step === 0) return;
      setFirst(Math.round(track.scrollLeft / step));
      setPerView(Math.max(1, Math.round((track.clientWidth + gapOf(track)) / step)));
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    const max = track.scrollWidth - track.clientWidth;
    /* 2px slack for fractional scroll positions at non-integer zoom */
    const atEnd = track.scrollLeft >= max - 2;
    const atStart = track.scrollLeft <= 2;

    let target: number;
    if (direction === 1 && atEnd) {
      target = 0;
      track.scrollTo({ left: 0, behavior });
    } else if (direction === -1 && atStart) {
      target = count - perView;
      track.scrollTo({ left: max, behavior });
    } else {
      target = first + direction;
      track.scrollBy({ left: direction * stepOf(track), behavior });
    }
    /* The destination, known now — the smooth scroll hasn't landed yet. */
    setAnnouncement(formatPosition(clamp(target, 0, count - perView), perView, count));
  };

  const position = formatPosition(first, perView, count);
  /* Nothing to slide when every card already fits (a wide screen, or a short
     list) — hide the arrows rather than offer buttons that do nothing. */
  const scrollable = perView < count;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* Scroll reveals (see <Reveal>, which can't carry the track's ref):
          the head row arrives as a block and the cards stagger in. The
          track's 12px/44px block padding leaves room for the rise inside its
          scroll clip. */}
      <div className="work-slider-head" data-reveal="">
        <div>{heading}</div>

        {scrollable && (
          <div className="work-slider-controls">
            <p className="work-slider-pos text-label" aria-hidden>
              {position}
            </p>
            <p className="sr-only" aria-live="polite">
              {announcement}
            </p>
            <button
              type="button"
              className="work-slider-btn"
              aria-label="Previous project"
              aria-controls={trackId}
              onClick={() => go(-1)}
            >
              <ArrowIcon width={16} height={16} className="rotate-180" />
            </button>
            <button
              type="button"
              className="work-slider-btn"
              aria-label="Next project"
              aria-controls={trackId}
              onClick={() => go(1)}
            >
              <ArrowIcon width={16} height={16} />
            </button>
          </div>
        )}
      </div>

      <ul
        id={trackId}
        ref={trackRef}
        className={`work-track work-track-${variant}`}
        data-reveal="stagger"
      >
        {children}
      </ul>
    </div>
  );
}

/** The position readout for the card at index `first`, e.g. "2–3 of 3". */
function formatPosition(first: number, perView: number, count: number): string {
  if (perView >= count) return `All ${count} shown`;
  if (perView === 1) return `${first + 1} of ${count}`;
  return `${first + 1}–${Math.min(count, first + perView)} of ${count}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** The track's column gap in px — the space between two cards. */
function gapOf(track: HTMLElement): number {
  return parseFloat(getComputedStyle(track).columnGap) || 0;
}

/** One step: a card's width plus the gap after it. */
function stepOf(track: HTMLElement): number {
  const card = track.firstElementChild as HTMLElement | null;
  return card ? card.getBoundingClientRect().width + gapOf(track) : 0;
}
