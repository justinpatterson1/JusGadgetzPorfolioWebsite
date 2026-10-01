import Image from "next/image";
import Link from "next/link";

import { ArrowIcon, ExternalIcon } from "@/components/icons";
import { Cta, Eyebrow, H2, Lede, Reveal } from "@/components/ui";
import {
  CASE_STUDIES,
  caseStudyHref,
  type CaseStudy,
} from "@/lib/content/case-studies";
import { GITHUB_URL } from "@/lib/content/contact";

import { TagList } from "./tag-list";
import { WorkSlider } from "./work-slider";

/**
 * The plural of `CONFIDENTIALITY_NOTE` for the group of cards. Each
 * case-study page still carries Prompt 13's exact sentence.
 */
const GROUP_NOTE =
  "These case studies have been intentionally generalized to protect confidential business information.";

/**
 * Section 04 — Selected Work. Spec: context/features/13_SELECTED_WORK_CASE_STUDIES.md,
 * replacing the template projects built from 05-projects.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript.
 *
 * Two card shapes, on purpose, each group in its own slider (`WorkSlider`):
 * - **The public project** gets a wide card with its real screenshot, a live
 *   link and a case study. It is the one piece of work anyone can go and check,
 *   so it leads.
 * - **Professional work** gets compact text cards with no imagery at all.
 *   Screenshots would expose confidential systems and generated thumbnails
 *   would be decoration pretending to be evidence, so these say what they are
 *   — generalized — and link to their case study, never to code.
 *
 * Adding a project is one entry in `CASE_STUDIES`; the page and card follow.
 */
export function Work() {
  const featured = CASE_STUDIES.filter((study) => study.kind === "public");
  const professional = CASE_STUDIES.filter(
    (study) => study.kind === "proprietary",
  );

  return (
    <section id="work" className="section scroll-mt-10">
      <div className="wrap">
        {/* The only split header on the site. */}
        <Reveal className="projects-head">
          <div>
            <Eyebrow>Case Studies</Eyebrow>
            <H2>Selected Work.</H2>
            <Lede>
              Real-world applications, automation and systems I&apos;ve designed
              to solve business and operational problems.
            </Lede>
          </div>
          {/* `noopener noreferrer` because this leaves the site. */}
          <Cta
            variant="ghost"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            GitHub profile
            <ExternalIcon width={13} height={13} />
            <span className="sr-only"> (opens in a new tab)</span>
          </Cta>
        </Reveal>

        <div className="work-stack">
          <WorkSlider
            label="Public projects"
            variant="wide"
            count={featured.length}
            heading={
              <h3 className="work-group-title text-card-tag">
                Public projects
              </h3>
            }
          >
            {featured.map((study, i) => (
              <li
                key={study.slug}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${featured.length}`}
              >
                <FeaturedCard study={study} />
              </li>
            ))}
          </WorkSlider>

          {/* The slider is the one client piece here; the cards are
              server-rendered and passed in as children. */}
          <WorkSlider
            label="Professional work"
            variant="compact"
            count={professional.length}
            heading={
              <>
                <h3 className="work-group-title text-card-tag">
                  Professional work
                </h3>
                <p className="work-note text-label">{GROUP_NOTE}</p>
              </>
            }
          >
            {professional.map((study, i) => (
              <li
                key={study.slug}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${professional.length}`}
              >
                <CompactCard study={study} />
              </li>
            ))}
          </WorkSlider>
        </div>
      </div>
    </section>
  );
}

/** The wide public-project card: screenshot left, copy and actions right. */
function FeaturedCard({ study }: { study: CaseStudy }) {
  const { title, label, summary, tags, image, liveUrl } = study;

  return (
    <article className="work-feature">
      {image && (
        <Link
          href={caseStudyHref(study)}
          className="work-feature-media"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            sizes="(max-width: 980px) 100vw, 640px"
          />
        </Link>
      )}

      <div className="work-feature-body">
        <p className="work-label text-card-tag">{label}</p>
        {/* <h4>: it sits under the "Public projects" group <h3>, like the
            compact cards under "Professional work". */}
        <h4 className="work-title text-title-tight text-ink">{title}</h4>
        <p className="work-desc text-desc text-ink-3">{summary}</p>
        <TagList tags={tags} />

        <div className="work-actions">
          <Cta variant="accent" href={caseStudyHref(study)}>
            View Case Study
            <ArrowIcon width={14} height={14} />
            <span className="sr-only">: {title}</span>
          </Cta>
          {liveUrl && (
            <Cta
              variant="ghost"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
              <ExternalIcon width={13} height={13} />
              <span className="sr-only"> (opens in a new tab)</span>
            </Cta>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * A professional-work card. The whole card is clickable through the stretched
 * `::after` on its one link, so there is a single tab stop and a single,
 * descriptive link name — not a card-sized anchor wrapping a heading.
 */
function CompactCard({ study }: { study: CaseStudy }) {
  const { title, label, summary, tags } = study;

  return (
    <article className="work-card">
      <p className="work-label text-card-tag">{label}</p>
      <h4 className="work-title text-title-tight text-ink">{title}</h4>
      <p className="work-desc text-desc text-ink-3">{summary}</p>
      <TagList tags={tags} />
      <Link href={caseStudyHref(study)} className="work-card-link text-pill">
        Read Case Study
        <span className="sr-only">: {title}</span>
        <ArrowIcon width={12} height={12} />
      </Link>
    </article>
  );
}
