import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { TagList } from "@/components/home/tag-list";
import { ArrowIcon, ExternalIcon, GitHubIcon } from "@/components/icons";
import { Cta, Eyebrow, Lede } from "@/components/ui";
import {
  CONFIDENTIALITY_NOTE,
  type CaseStudy,
  type Titled,
} from "@/lib/content/case-studies";

import { ArchitectureDiagram } from "./architecture-diagram";

/** Prompt 14's nine sections, in order. `id`s double as the contents links. */
const SECTIONS = [
  { id: "overview", title: "Overview" },
  { id: "problem", title: "The Problem" },
  { id: "solution", title: "The Solution" },
  { id: "architecture", title: "Architecture" },
  { id: "decisions", title: "Key Engineering Decisions" },
  { id: "challenges", title: "Challenges" },
  { id: "reliability", title: "Reliability & Security" },
  { id: "impact", title: "Results & Impact" },
  { id: "technologies", title: "Technologies" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * The reusable case-study page — Prompt 14.
 *
 * Every case study renders through this one template from its `CASE_STUDIES`
 * record, so adding a project is data, not layout.
 *
 * Public and proprietary work differ only where they must: a public project
 * gets its screenshot, live link and repository link; a proprietary one gets
 * the confidentiality notice in their place and never a code link.
 *
 * Reading comfort (Prompt 14): a 720px measure, prose broken into short
 * paragraphs, lists and titled cards rather than long blocks, and a sticky
 * contents list on wide screens.
 */
export function CaseStudyView({ study }: { study: CaseStudy }) {
  const isPublic = study.kind === "public";

  const body: Record<SectionId, ReactNode> = {
    overview: <Paragraphs items={study.overview} />,
    problem: <Paragraphs items={study.problem} />,
    solution: (
      <>
        <p className="cs-p">{study.solution.intro}</p>
        <Bullets items={study.solution.points} />
      </>
    ),
    architecture: <ArchitectureDiagram architecture={study.architecture} />,
    decisions: <TitledList items={study.decisions} />,
    challenges: <TitledList items={study.challenges} />,
    reliability: <TitledList items={study.reliability} grid />,
    impact: <Bullets items={study.impact} />,
    technologies: <TagList tags={study.technologies} />,
  };

  return (
    <article>
      <header className="cs-head">
        <div className="wrap">
          <Link href="/#work" className="cs-back text-pill">
            <ArrowIcon width={14} height={14} className="rotate-180" />
            Selected Work
          </Link>

          <Eyebrow>{isPublic ? "Case Study" : "Case Study · Professional work"}</Eyebrow>
          <h1 className="cs-title text-h2 text-ink">{study.title}</h1>
          <Lede>{study.summary}</Lede>

          <div className="mt-6">
            <TagList tags={study.tags} />
          </div>

          {isPublic ? (
            (study.liveUrl || study.repoUrl) && (
              <div className="cs-actions">
                {study.liveUrl && (
                  <Cta
                    variant="accent"
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                    <ExternalIcon width={13} height={13} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </Cta>
                )}
                {study.repoUrl && (
                  <Cta
                    variant="ghost"
                    href={study.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon width={14} height={14} />
                    View Source
                    <span className="sr-only"> on GitHub (opens in a new tab)</span>
                  </Cta>
                )}
              </div>
            )
          ) : (
            <p className="cs-notice text-label">{CONFIDENTIALITY_NOTE}</p>
          )}

          {study.image && (
            <div className="cs-shot">
              <Image
                src={study.image.src}
                width={study.image.width}
                height={study.image.height}
                alt={study.image.alt}
                sizes="(max-width: 1264px) 100vw, 1200px"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
        </div>
      </header>

      <div className="wrap cs-layout">
        <nav aria-label="Case study sections" className="cs-toc">
          <p className="cs-toc-title text-card-tag">Contents</p>
          <ol>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-label">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-body">
          {SECTIONS.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="cs-section scroll-mt-10"
            >
              <p className="cs-num text-card-tag" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 id={`${section.id}-title`} className="cs-h2 text-stat text-ink">
                {section.title}
              </h2>
              {body[section.id]}
            </section>
          ))}

          <Link href="/#work" className="cs-back cs-back-end text-pill">
            <ArrowIcon width={14} height={14} className="rotate-180" />
            Back to Selected Work
          </Link>
        </div>
      </div>
    </article>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return items.map((text) => (
    <p key={text} className="cs-p">
      {text}
    </p>
  ));
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="cs-bullets">
      {items.map((text) => (
        <li key={text}>{text}</li>
      ))}
    </ul>
  );
}

/** Titled cards; `grid` lays them out two-up on wide screens. */
function TitledList({ items, grid }: { items: readonly Titled[]; grid?: boolean }) {
  return (
    <ul className={grid ? "cs-cards cs-cards-grid" : "cs-cards"}>
      {items.map((item) => (
        <li key={item.title} className="cs-card">
          <h3 className="text-title-tight text-ink">{item.title}</h3>
          <p className="mt-2 text-desc-loose text-ink-2">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
