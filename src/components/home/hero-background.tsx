/**
 * The hero's four ambient layers — design-system.md §7.3,
 * context/features/design/06-hero-background.md.
 *
 * Pure CSS: no canvas, no JS, no state, so this stays a server component and
 * ships no JavaScript at all. The layer styling lives in `globals.css` under
 * class names the reduced-motion guard already knows about; only the nine
 * particle placements are here, because they are one-off data rather than
 * style.
 *
 * Painted in DOM order, back to front: grid, orbs, orbit, particles. The whole
 * stack is `pointer-events: none` via `.hero-bg`, so nothing here can swallow a
 * click meant for a CTA.
 */

/**
 * Position and phase for the nine particles.
 *
 * The delays are **negative**, which is the whole technique: a negative delay
 * starts an animation already in progress, so `-4s` begins at the four-second
 * mark of the 14s loop. Every particle is therefore at a different point in the
 * same cycle on the very first frame. Positive delays would leave all nine
 * frozen at origin, then visibly stagger into motion.
 *
 * Positions are scattered across every quadrant with no two within ~10% of each
 * other.
 */
const PARTICLES: readonly { className: string; left: string; top: string; delay: string }[] = [
  { className: "particle", left: "12%", top: "22%", delay: "0s" },
  { className: "particle small", left: "28%", top: "78%", delay: "-2s" },
  { className: "particle coral", left: "62%", top: "18%", delay: "-4s" },
  { className: "particle ring", left: "78%", top: "62%", delay: "-6s" },
  { className: "particle small", left: "42%", top: "12%", delay: "-1s" },
  { className: "particle", left: "88%", top: "34%", delay: "-3s" },
  { className: "particle small coral", left: "8%", top: "58%", delay: "-5s" },
  { className: "particle ring", left: "52%", top: "82%", delay: "-7s" },
  { className: "particle small", left: "68%", top: "48%", delay: "-8s" },
] as const;

export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden>
      <div className="hero-grid-bg" />

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="hero-orbit" />

      <div className="hero-particles">
        {PARTICLES.map((p, i) => (
          <span
            /* Index as key: this list is a fixed constant that is never
               reordered, filtered or appended to. */
            key={i}
            className={p.className}
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>
    </div>
  );
}
