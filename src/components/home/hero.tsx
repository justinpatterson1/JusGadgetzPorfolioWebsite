import { ArrowIcon, DownloadIcon } from "@/components/icons";
import { Cta, HeroLede, Pill } from "@/components/ui";

import { CoderScene } from "./coder-scene";
import { HeroBackground } from "./hero-background";

/**
 * Section 01 — the hero. Spec: context/features/02-hero.md, with the layout and
 * copy detail from context/features/design/05-hero.md.
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
            <Pill>Available for freelance work</Pill>

            {/* The line breaks are hard `<br />`, not wrapping. The three-line
                shape is the design, not a consequence of the measure — at any
                width this stays three lines. */}
            <h1 className="hero-title m-0 mt-[22px] mb-6 text-hero text-ink">
              Building digital
              <br />
              experiences with
              <br />
              <span className="accent">purpose</span>
            </h1>

            <HeroLede>
              I&apos;m a Full Stack Developer from the Caribbean isles of
              Trinidad and Tobago, passionate about building exceptional digital
              experiences. I help businesses launch, grow, and establish a
              strong online presence through modern web solutions.
            </HeroLede>

            {/* flex-wrap, not shrink: below ~420px the two buttons stack rather
                than squeeze. */}
            <div className="flex flex-wrap gap-[14px]">
              <Cta variant="accent" href="#projects">
                View My Work
                <ArrowIcon width={14} height={14} />
              </Cta>
              {/* Placeholder — open-issues.md #5 tracks linking a real PDF. */}
              <Cta variant="ghost" href="#">
                Download Resume
                <DownloadIcon width={14} height={14} />
              </Cta>
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
