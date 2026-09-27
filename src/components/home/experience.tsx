import { BriefcaseIcon } from "@/components/icons";
import { Eyebrow, H2, Lede } from "@/components/ui";
import { ROLES, type Role } from "@/lib/content/experience";

/**
 * Section 03 — Professional Experience. Spec:
 * context/features/12_PROFESSIONAL_EXPERIENCE.md.
 *
 * Sits between About and Selected Work so professional evidence comes before
 * the projects and the skills list (Prompt 20's narrative order).
 *
 * A compact résumé-style card rather than a timeline: there is one role, and a
 * timeline with one stop is a line with a dot on it. Kept deliberately smaller
 * than Selected Work (Prompt 12) — one card, no imagery.
 *
 * New design surface with no PRD under features/design/, so it is composed
 * from existing values: the Skills card surface and radius, the 42px icon well,
 * and the section rhythm of `.section`.
 */
export function Experience() {
  return (
    <section id="experience" className="section scroll-mt-10">
      <div className="wrap">
        <Eyebrow>Experience</Eyebrow>
        <H2>Professional Experience.</H2>
        <Lede>
          Building and supporting software, integrations and automated
          workflows used in real business operations.
        </Lede>

        <div className="xp-list">
          {ROLES.map((role) => (
            <RoleCard key={role.title} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleCard({ role }: { role: Role }) {
  const { title, sector, summary, highlights } = role;

  return (
    <article className="xp-card">
      <div>
        <div className="xp-icon">
          <BriefcaseIcon className="size-5" />
        </div>
        <h3 className="text-title text-ink">{title}</h3>
        {/* The sector, not the employer — see ROLES. A `period` goes on this
            line once one is supplied. */}
        <p className="xp-sector text-pill">{sector}</p>
        <p className="text-desc-loose text-ink-2">{summary}</p>
      </div>

      <ul className="xp-highlights">
        {highlights.map((item) => (
          <li key={item} className="text-desc text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
