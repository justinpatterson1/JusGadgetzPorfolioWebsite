import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/icons";
import { Cta, HeroLede, Pill } from "@/components/ui";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/content/contact";
import { PERSON_TITLE, RESUME_URL } from "@/lib/content/profile";

import { CoderScene } from "./coder-scene";
import { HeroBackground } from "./hero-background";

/** The two profile links beside the CTAs — Prompt 10, real URLs only. */
const HERO_LINKS = [
  { label: "GitHub", href: GITHUB_URL, icon: GitHubIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: LinkedInIcon },
] as const;

/**
 * Section 01 — the hero. Spec: context/features/10_HERO_SECTION.md, layered on
 * the build from 02-hero.md and design/05-hero.md.
 *
 * It carries **no `id`**: it is the top of the page, and the rail's "Home" item
 * targets `null` rather than an element (see `NAV_ITEMS`). The scrollspy treats
 * anything above 200px of scroll as Home, so an id here would be redundant and
 * would give the offset-scroll a target it doesn't want.
 *
 * Everything in this section is static markup, so it stays a server component
 * and ships no JavaScript — the ambient motion is entirely CSS.
 *
 * The copy is prose, not repeated records, so it lives inline rather than in
 * `src/lib/content/` (coding-standards.md, Content).
 */
export function Hero() {
  return (
    <section className="hero">
      <HeroBackground />

      {/* z-2 over the background's z-0. `.hero` isolates, so these values can't
          reach the sidebar's z-50. */}
      <div className="wrap relative z-[2]">
        <div className="grid grid-cols-[1.15fr_0.85fr] items-center gap-[60px] lap:grid-cols-1 lap:gap-12">
          <div>
            {/* The professional title, above the fold (Prompt 10). */}
            <Pill>{PERSON_TITLE}</Pill>

            {/* Three designed lines, as block spans rather than `<br />` so
                they can flow on phones (see `.hero-line`). The `{" "}`s keep a
                space between them when they go inline. Only "problems" is
                accented: `.accent` is inline-block, so accenting "business
                problems" as one unit could not wrap on a narrow screen. */}
            <h1 className="hero-title m-0 mt-[22px] mb-6 text-hero text-ink">
              <span className="hero-line">Building software</span>{" "}
              <span className="hero-line">that solves real</span>{" "}
              <span className="hero-line">
                business <span className="accent">problems</span>
              </span>
            </h1>

            <HeroLede>
              I&apos;m a Software Developer and Systems Analyst from Trinidad
              &amp; Tobago, building full-stack applications, backend systems,
              business automation and data-driven solutions. I turn complex
              workflows into reliable software using modern web technologies,
              APIs and databases.
            </HeroLede>

            {/* flex-wrap, not shrink: on narrow screens the row wraps rather
                than squeezing the buttons. */}
            <div className="flex flex-wrap items-center gap-[14px]">
              <Cta variant="accent" href="#work">
                View My Work
                <ArrowIcon width={14} height={14} />
              </Cta>
              {/* Rendered only once a real PDF is configured — see RESUME_URL
                  in lib/content/profile.ts (open-issues.md #5). */}
              {RESUME_URL !== null && (
                <Cta variant="ghost" href={RESUME_URL} download>
                  Download Resume
                  <DownloadIcon width={14} height={14} />
                </Cta>
              )}

              <ul className="m-0 flex list-none gap-2 p-0">
                {HERO_LINKS.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="hero-social"
                    >
                      <Icon width={18} height={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The card holds its 4:5 ratio at every width, which makes it very
              tall once it goes full-width in one column — hence the cap below
              980px. */}
          <div className="hero-card lap:mx-auto lap:w-full lap:max-w-[420px]">
            <CoderScene />
          </div>
        </div>
      </div>
    </section>
  );
}
