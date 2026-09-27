/**
 * Who the site is about — the single source for the name, title and location,
 * shared by the Hero, About, the page metadata and the case-study pages, so the
 * identity cannot drift between them (Prompt 22, Content Consistency).
 */

export const PERSON_NAME = "Justin Patterson";

export const PERSON_TITLE = "Software Developer & Systems Analyst";

export const PERSON_LOCATION = "Trinidad & Tobago";

/**
 * TODO(Justin): the resume PDF. Drop it in `public/` (e.g.
 * `public/justin-patterson-resume.pdf`) and set this to its path — the Hero's
 * "Download Resume" button appears as soon as this is non-null.
 *
 * Deliberately `null` rather than `"#"`: a button that goes nowhere is the kind
 * of dead CTA Prompt 19 removes, and no resume asset exists in the repo yet
 * (open-issues.md #5).
 */
export const RESUME_URL: string | null = null;
