import { PALETTES } from "@/lib/theme/palettes";

/**
 * TEMPORARY — foundations specimen (PRD 00).
 *
 * This page exists only so the token set, type scale and layout can be verified
 * by eye. PRD 14 replaces it with the real composition of Hero → About →
 * Skills → Projects → Services → TechTicker → Footer. Delete it then.
 *
 * To check dark mode before the theme toggle exists (PRD 04), run in the
 * console:  document.documentElement.dataset.theme = 'dark'
 */

const SURFACE_TOKENS = [
  ["--bg", "page background"],
  ["--bg-elev", "cards, sidebar, ticker band"],
  ["--surface-2", "inset wells: chips, theme toggle"],
  ["--bg-ink", "full-bleed dark sections"],
  ["--bg-ink-soft", "cards sitting on --bg-ink"],
];

const INK_TOKENS = ["--ink", "--ink-2", "--ink-3", "--ink-4"];
const ON_INK_TOKENS = ["--on-ink", "--on-ink-2", "--on-ink-3"];

const ACCENT_TOKENS = [
  ["--accent", "fills, active states, links"],
  ["--accent-strong", "accent text on light surfaces"],
  ["--accent-soft", "tinted backgrounds"],
  ["--co-coral", "secondary punch, one per section"],
  ["--co-coral-soft", "coral tint"],
];

const TYPE_SCALE = [
  ["text-hero", "Building things for the web."],
  ["text-h2", "Skills Acquired."],
  ["text-h2-lg", "Let's work together."],
  ["text-tech", "TypeScript"],
  ["text-stat", "28"],
  ["text-bullet", "04"],
  ["text-title", "Skill card title"],
  ["text-title-tight", "Project card title"],
  ["text-lede", "A lede paragraph sits at 17px with a 1.65 line height."],
  ["text-mail", "hello@example.com"],
  ["text-link", "Footer link"],
  ["text-cta", "Get in touch"],
  ["text-desc", "Project description copy at 14px, 1.6 line height."],
  ["text-desc-loose", "Service description copy at 14px, 1.65 line height."],
  ["text-pill", "Available for work"],
  ["text-label", "Bullet label"],
  ["text-chip", "React"],
  ["text-tag", "Next.js"],
];

const UPPERCASE_SCALE = [
  ["text-eyebrow", "What I do"],
  ["text-card-tag", "Currently"],
  ["text-stat-label", "Years shipping"],
];

function Swatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-12 shrink-0 rounded-lg border border-hair-2"
        style={{ background: `var(${token})` }}
      />
      <div className="min-w-0">
        <code className="text-chip text-ink">{token}</code>
        {note ? <p className="text-label text-ink-3">{note}</p> : null}
      </div>
    </div>
  );
}

export default function FoundationsSpecimen() {
  return (
    <>
      {/* Placeholder for the fixed rail (PRD 03) so the body offset reads as
          intentional during review. */}
      <div
        aria-hidden
        className="fixed inset-y-0 left-0 z-10 w-[var(--sidebar-w)] border-r border-hair bg-bg-elev"
      />

      <main>
        <section className="section">
          <div className="wrap">
            <p className="text-eyebrow uppercase text-accent-strong">
              PRD 00 — Foundations
            </p>
            <h1 className="text-hero mt-4 text-ink">Tokens, type, layout.</h1>
            <p className="text-lede mt-6 max-w-xl text-ink-2">
              A temporary specimen page. Every value below reads a token — flip{" "}
              <code className="text-chip">data-theme</code> on{" "}
              <code className="text-chip">&lt;html&gt;</code> and the whole page
              should re-theme with no unstyled patches.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="text-h2 text-ink">Surfaces.</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 lap:grid-cols-2 hand:grid-cols-1">
              {SURFACE_TOKENS.map(([token, note]) => (
                <Swatch key={token} token={token} note={note} />
              ))}
            </div>

            <h2 className="text-h2 mt-16 text-ink">Accents.</h2>
            <div className="mt-8 grid grid-cols-3 gap-6 lap:grid-cols-2 hand:grid-cols-1">
              {ACCENT_TOKENS.map(([token, note]) => (
                <Swatch key={token} token={token} note={note} />
              ))}
            </div>

            <h2 className="text-h2 mt-16 text-ink">Ink ramp.</h2>
            <div className="mt-8 flex flex-col gap-2">
              {INK_TOKENS.map((token) => (
                <p key={token} style={{ color: `var(${token})` }}>
                  <code className="text-chip">{token}</code> — the quick brown
                  fox jumps over the lazy dog.
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* The --on-ink ramp does not invert in dark mode; this block should
            look near-identical in both themes. */}
        <section className="section section-ink">
          <div className="wrap">
            <h2 className="text-h2 text-on-ink">On dark.</h2>
            <div className="mt-8 flex flex-col gap-2">
              {ON_INK_TOKENS.map((token) => (
                <p key={token} style={{ color: `var(${token})` }}>
                  <code className="text-chip">{token}</code> — the quick brown
                  fox jumps over the lazy dog.
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-hair-dark bg-bg-ink-soft p-6">
              <p className="text-card-tag uppercase text-on-ink-3">
                bg-ink-soft
              </p>
              <p className="text-lede text-on-ink-2">
                A card sitting on a dark section.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="text-h2 text-ink">Type scale.</h2>
            <p className="text-lede mt-4 text-ink-3">
              Size, weight, tracking and line height travel together in one
              token.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              {TYPE_SCALE.map(([cls, sample]) => (
                <div key={cls}>
                  <code className="text-chip text-ink-3">{cls}</code>
                  <p className={`${cls} text-ink`}>{sample}</p>
                </div>
              ))}
              {UPPERCASE_SCALE.map(([cls, sample]) => (
                <div key={cls}>
                  <code className="text-chip text-ink-3">{cls}</code>
                  <p className={`${cls} uppercase text-ink`}>{sample}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="text-h2 text-ink">Palettes.</h2>
            <p className="text-lede mt-4 text-ink-3">
              Static reference. Switching them at runtime is PRD 04 / 14.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-6 lap:grid-cols-2 hand:grid-cols-1">
              {Object.entries(PALETTES).map(([name, p]) => (
                <div key={name}>
                  <p className="text-title text-ink">{name}</p>
                  <div className="mt-3 flex gap-2">
                    {[p.accent, p.accentStrong, p.accentLight, p.coral].map(
                      (value) => (
                        <div
                          key={value}
                          className="size-10 rounded-lg border border-hair-2"
                          style={{ background: value }}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
