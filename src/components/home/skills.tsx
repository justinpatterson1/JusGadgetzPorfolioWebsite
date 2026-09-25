import { Chip, Chips, Eyebrow, H2, Lede } from "@/components/ui";
import { SKILLS, type SkillCategory } from "@/lib/content/skills";

/**
 * Section 03 — Skills. Spec: context/features/04-skills.md, with the anatomy in
 * context/features/design/09-skills.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript. The
 * four-part card hover is entirely CSS.
 *
 * The section's own padding and gradient live on `.skills-section` in
 * globals.css rather than as inline styles or utilities — see the comment on
 * that rule: it has to be both unlayered and doubled to survive PRD 00's 640px
 * override.
 */
export function Skills() {
  return (
    <section id="skills" className="section skills-section scroll-mt-10">
      <div className="wrap">
        <Eyebrow>Toolbox</Eyebrow>
        <H2>Skills Acquired.</H2>
        <Lede>
          A comprehensive toolkit for building modern, scalable applications.
        </Lede>

        <div className="skills-grid">
          {SKILLS.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One category card.
 *
 * Keyed on `title` rather than the index PRD 09 uses. The titles are unique and
 * it costs nothing, so there is no reason to depend on `SKILLS` never being
 * reordered.
 *
 * `<h3>` for the title, not a styled div: these are four real subheadings under
 * the section's H2, and the outline should say so.
 */
function SkillCard({ category }: { category: SkillCategory }) {
  const { title, icon: Icon, alt, items } = category;

  return (
    <div className="skill-card">
      <div className="skill-head">
        <div className={alt ? "skill-icon skill-icon-alt" : "skill-icon"}>
          <Icon className="size-5" />
        </div>
        <h3 className="text-title text-ink">{title}</h3>
      </div>

      <Chips>
        {items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </Chips>
    </div>
  );
}
