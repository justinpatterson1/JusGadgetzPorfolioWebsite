import { Hero } from "@/components/home/hero";
import { Sidebar } from "@/components/layout/sidebar";
import { Chip, Chips, Cta, Eyebrow, H2, Lede, Pill } from "@/components/ui";
import { PALETTES } from "@/lib/theme/palettes";

import { SpecimenControls } from "./specimen-controls";

/**
 * TEMPORARY — foundations specimen (Prompt 00).
 *
 * This page exists only so the token set, type scale and layout can be verified
 * by eye. The section prompts (01–08) replace it with the real composition of
 * Sidebar → Hero → About → Skills → Projects → Services → TechTicker → Footer.
 * Delete it then, along with SpecimenControls.
 *
 * `<Sidebar>` (prompt 01) and `<Hero>` (prompt 02) are the real thing and stay.
 * Everything below the controls block is still specimen.
 *
 * The `about` / `skills` / `projects` / `services` / `contact` ids below are
 * borrowed by the specimen so the rail's scrollspy and its 40px-offset scroll
 * have real targets before those sections exist. The names don't describe what
 * each block shows — they're stand-ins, and the real sections take them over.
 * `scroll-mt-10` is the 40px offset for plain anchor navigation, and every real
 * section will want it too.
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
      <Sidebar />

      <main>
        <Hero />

        {/* Specimen scaffolding, not part of the design. It sits directly under
            the Hero so the palette and tweak controls are in reach while
            checking that the illustration, orbs and orbit follow the accent. */}
        <section className="section pt-0">
          <div className="wrap">
            <p className="text-eyebrow uppercase text-accent-strong">
              Specimen controls
            </p>
            <p className="text-lede mt-2 max-w-xl text-ink-2">
              Temporary. Flip the theme, palette or tweaks and the whole page —
              hero included — should re-theme with no unstyled patches and no
              re-render.
            </p>
            <div className="mt-6">
              <SpecimenControls />
            </div>
          </div>
        </section>

        <section id="about" className="section scroll-mt-10">
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
        <section id="skills" className="section section-ink scroll-mt-10">
          <div className="wrap">
            {/* Inside .section-ink the eyebrow should flip accent -> coral
                (rule included) and the lede should drop to --on-ink-2. */}
            <Eyebrow>On a dark section</Eyebrow>
            <H2>On dark.</H2>
            <Lede>
              This lede and the eyebrow above it retarget themselves through the
              ink: variant — no props, no overrides.
            </Lede>
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

        <section id="projects" className="section scroll-mt-10">
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

        <section id="services" className="section scroll-mt-10">
          <div className="wrap">
            <Eyebrow>Primitives</Eyebrow>
            <H2>Primitives.</H2>
            <Lede>
              On a light section the eyebrow is accent; inside `.section-ink` it
              flips to coral. Hover every control below — each lifts 1px without
              nudging its neighbors.
            </Lede>

            <div className="mt-10 flex flex-col gap-10">
              <div>
                <code className="text-chip text-ink-3">Pill</code>
                <div className="mt-3">
                  <Pill>Available for freelance work</Pill>
                </div>
              </div>

              <div>
                <code className="text-chip text-ink-3">
                  Cta — accent / ghost / solid
                </code>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Cta variant="accent" href="#projects">
                    View My Work
                  </Cta>
                  <Cta variant="ghost" href="#">
                    Download Resume
                  </Cta>
                  <Cta variant="solid">Reserved base</Cta>
                </div>
              </div>

              <div>
                <code className="text-chip text-ink-3">Chips</code>
                <Chips className="mt-3">
                  {["React", "TypeScript", "Next.js", "Node", "Postgres"].map(
                    (tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ),
                  )}
                </Chips>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section scroll-mt-10">
          <div className="wrap">
            <h2 className="text-h2 text-ink">Palettes.</h2>
            <p className="text-lede mt-4 text-ink-3">
              Switch between them with the controls at the top of the page —
              every accent below is written on{" "}
              <code className="text-chip">&lt;html&gt;</code> at runtime, so
              nothing re-renders.
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
