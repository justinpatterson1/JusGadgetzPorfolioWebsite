import type { Project, ProjectDeco } from "@/lib/content/projects";

/**
 * The stand-in for a project screenshot — PRD 10.
 *
 * Three layers: a fixed gradient from `thumbClass`, a white SVG decoration at
 * 35% opacity, and the two-letter glyph on top.
 *
 * Every decoration shares `viewBox="0 0 400 250"` — 16:10, matching the
 * thumbnail's aspect ratio — with `preserveAspectRatio="xMidYMid slice"` so it
 * fills and crops instead of letterboxing. All fills are white at low alpha,
 * which is what lets one decoration sit over any of the three gradients (the
 * §2.4 SVG exception, as in the Hero's coder scene).
 *
 * Replaced wholesale when real screenshots arrive (open issue #6).
 */
export function ProjectThumb({ project }: { project: Project }) {
  return (
    <div className={`project-thumb ${project.thumbClass}`}>
      <svg
        className="project-deco"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <Deco kind={project.deco} />
      </svg>
      {/* Not a heading and not alt text: the glyph is decoration standing in for
          an image, and the card's real title sits directly below it. */}
      <div className="project-glyph" aria-hidden>
        {project.glyph}
      </div>
    </div>
  );
}

function Deco({ kind }: { kind: ProjectDeco }) {
  if (kind === "chart") return <ChartDeco />;
  if (kind === "phone") return <PhoneDeco />;
  return <AiDeco />;
}

/**
 * Two stacked area curves under seven data points.
 *
 * The point heights come from PRD 10's `cy = 150 - i*5 + Math.sin(i)*20` — a
 * gentle upward trend with sine jitter so they don't sit on a straight line —
 * but they are **written out rather than computed**. `Math.sin` is only
 * specified to be implementation-approximated, so its last bits may differ
 * between engines; literals keep the emitted SVG byte-identical everywhere and
 * cost nothing for seven fixed values.
 */
const CHART_POINTS = [
  { x: 40, cy: 150 },
  { x: 90, cy: 161.83 },
  { x: 140, cy: 158.19 },
  { x: 190, cy: 137.82 },
  { x: 240, cy: 114.86 },
  { x: 290, cy: 105.82 },
  { x: 340, cy: 114.41 },
] as const;

function ChartDeco() {
  return (
    <>
      <path
        d="M0,200 Q100,140 200,160 T400,90 L400,250 L0,250 Z"
        fill="rgba(255,255,255,0.18)"
      />
      <path
        d="M0,220 Q100,170 200,185 T400,130 L400,250 L0,250 Z"
        fill="rgba(255,255,255,0.12)"
      />
      {CHART_POINTS.map(({ x, cy }) => (
        <circle key={x} cx={x} cy={cy} r="3" fill="white" opacity="0.6" />
      ))}
    </>
  );
}

/** A phone wireframe. Alpha decreases down the stack (0.5 → 0.3) to imply depth. */
function PhoneDeco() {
  return (
    <>
      <rect
        x="160"
        y="50"
        width="80"
        height="150"
        rx="12"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
      />
      <rect x="170" y="68" width="60" height="8" rx="2" fill="rgba(255,255,255,0.5)" />
      <rect x="170" y="82" width="40" height="6" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="170" y="100" width="60" height="36" rx="6" fill="rgba(255,255,255,0.25)" />
      <rect x="170" y="144" width="60" height="8" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="170" y="158" width="44" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
    </>
  );
}

/**
 * An 80-dot field that looks random and is entirely deterministic.
 *
 * Positions come from **coprime multipliers against the viewBox dimensions** —
 * 37 shares no factors with 400, and 53 none with 250 — so the sequence visits
 * a wide spread of positions before it can repeat. Verified: all 80 positions
 * are distinct, and a 4×4 partition of the viewBox holds 4–7 dots per cell, so
 * there is no banding. Radius cycles 0.5 / 1.5 / 2.5 / 3.5.
 *
 * This is the pattern to copy for "random-looking" decoration. **A PRNG would
 * be wrong here** — even seeded, it invites a server/client mismatch, whereas
 * integer modular arithmetic is exact in every engine.
 */
const AI_DOTS = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 37) % 400,
  y: (i * 53) % 250,
  r: (i % 4) + 0.5,
}));

function AiDeco() {
  return (
    <>
      {AI_DOTS.map(({ x, y, r }) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill="rgba(255,255,255,0.4)"
        />
      ))}
    </>
  );
}
