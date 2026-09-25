import { ExternalIcon } from "@/components/icons";
import { Cta, Eyebrow, H2, Lede } from "@/components/ui";
import { PROJECTS, type Project } from "@/lib/content/projects";

import { ProjectThumb } from "./project-thumb";

/** Where "View all projects" goes — open issue #9, decided 2026-09-25. */
const ALL_PROJECTS_URL = "https://github.com/justinpatterson1";

/**
 * Section 04 — Projects. Spec: context/features/05-projects.md, with the
 * anatomy in context/features/design/10-projects.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript.
 *
 * The cards are **deliberately not interactive**, which closes open issues #8
 * and #11. PRD 10 ships a `cursor: pointer` on a card that is not a link and a
 * pair of bare `<svg>` action icons with no role, label or handler, and flags
 * both itself: "Do not ship both." Since the project data is still sample
 * content (#6) with no real URLs behind it, the honest resolution is to make
 * nothing look clickable — the cursor is gone and the two action icons with it.
 * Adding a `url` to `PROJECTS` is what brings them back, as real links.
 */
export function Projects() {
  return (
    <section id="projects" className="section scroll-mt-10">
      <div className="wrap">
        {/* The only split header on the site. */}
        <div className="projects-head">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <H2>Featured Projects.</H2>
            <Lede>
              A selection of projects that showcase my passion for building
              clean, efficient, and user-centric solutions.
            </Lede>
          </div>
          {/* `noopener noreferrer` because this leaves the site. */}
          <Cta
            variant="ghost"
            href={ALL_PROJECTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            View all projects
            <ExternalIcon width={13} height={13} />
          </Cta>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One project card.
 *
 * `<article>` rather than a div: each card is a self-contained summary that
 * would still make sense lifted out of the page (PRD 10). The title is an `<h3>`
 * under the section's H2, matching Skills.
 */
function ProjectCard({ project }: { project: Project }) {
  const { title, desc, tags } = project;

  return (
    <article className="project">
      <ProjectThumb project={project} />

      <div className="project-body">
        <h3 className="project-title text-title-tight text-ink">{title}</h3>
        <p className="project-desc text-desc text-ink-3">{desc}</p>

        {/* Not <Chips>. Project tags are metadata, chips are a browsable
            inventory, and PRD 10 makes them look different on purpose:
            square-ish rather than pill, accent-tinted rather than neutral, and
            no hover, because there is nothing to hover toward. */}
        <ul className="project-tags">
          {tags.map((tag) => (
            <li key={tag} className="project-tag text-tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
