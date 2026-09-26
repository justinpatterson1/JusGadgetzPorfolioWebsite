import { Eyebrow } from "@/components/ui";
import { TECHS } from "@/lib/content/techs";

/**
 * Section 06 — Tech ticker. Spec: context/features/07-tech-ticker.md, with the
 * anatomy in context/features/design/12-tech-ticker.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript — the
 * marquee is a CSS animation. No `id`: this band is not a nav destination. Not
 * a `.section` either; it has its own lighter 80px padding.
 *
 * The track holds the list **twice** and translates by exactly −50%, one
 * copy's width, so at the end of each cycle copy 2 sits where copy 1 started
 * and the reset is invisible. The second copy is `aria-hidden` — it exists
 * only to fill the loop, and a screen reader should hear seventeen names, not
 * thirty-four.
 */
export function TechTicker() {
  return (
    <section className="ticker-section">
      <div className="wrap">
        <div className="flex justify-center">
          <Eyebrow>Powered by modern technologies</Eyebrow>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            <TechList />
            <TechList hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One copy of the list. `hidden` marks the duplicate — `aria-hidden` rather
 * than the `hidden` attribute, which would remove it from layout and break the
 * loop.
 */
function TechList({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="ticker-list" aria-hidden={hidden || undefined}>
      {TECHS.map((tech) => (
        <li key={tech} className="tech-item text-tech">
          {tech}
        </li>
      ))}
    </ul>
  );
}
