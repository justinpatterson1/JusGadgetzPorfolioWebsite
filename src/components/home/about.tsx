import { Eyebrow, H2, Lede } from "@/components/ui";
import {
  PERSON_LOCATION,
  PERSON_NAME,
  PERSON_TITLE,
} from "@/lib/content/profile";

/**
 * Section 02 — About. Spec: context/features/11_ABOUT_SECTION.md, layered on
 * the build from 03-about.md and design/08-about.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript.
 *
 * The column ratio is **0.85 / 1.15**, the deliberate mirror of the Hero's
 * 1.15 / 0.85: the Hero leads with copy on the left, About leads with the image
 * on the left, and inverting the ratio keeps the copy column dominant in both.
 *
 * The copy is prose rather than repeated records, so it lives inline (the
 * exception coding-standards.md names, alongside the Hero and Footer).
 */
export function About() {
  return (
    <section id="about" className="section scroll-mt-10">
      <div className="wrap">
        <div className="grid grid-cols-[0.85fr_1.15fr] items-center gap-[72px] lap:grid-cols-1 lap:gap-10">
          {/* 72px is the widest gap on the site — the decorations extend 22px
              past the frame on both diagonals and need the room. */}
          <div className="photo-wrap lap:mx-auto lap:w-full lap:max-w-[400px]">
            <div className="photo-deco photo-deco-1" aria-hidden />
            <div className="photo-deco photo-deco-2" aria-hidden />
            <div className="photo-frame">
              {/* No photo exists in the repo, so the frame is an identity card
                  rather than an empty slot (Prompt 10: no placeholder text, no
                  broken image, no stock or generated person). To use a real
                  photo, replace this block with:
                    <Image src="/me.jpg" alt={PERSON_NAME} fill sizes="400px" />
                  (next/image — `fill` needs the positioned parent .photo-frame
                  already provides, and the frame's `img` rule in globals.css
                  covers it edge to edge). Source image: 4:5 portrait, at least
                  800×1000, subject centered. Tracked as open-issues.md #7. */}
              <div className="photo-id">
                <div className="photo-id-mark" aria-hidden>
                  JP
                </div>
                <p className="text-title text-ink">{PERSON_NAME}</p>
                <p className="mt-1 text-label text-ink-3">{PERSON_TITLE}</p>
                <p className="photo-id-place text-pill">{PERSON_LOCATION}</p>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>About me</Eyebrow>
            <H2>Software development meets business problem-solving.</H2>
            <Lede>
              I&apos;m a software developer and systems analyst with a
              background in IT, financial technology and business systems. My
              work spans full-stack development, backend systems, APIs,
              database engineering and process automation.
            </Lede>
            <Lede className="mt-3.5">
              I enjoy solving the problems that sit between software and
              operations, whether that means building an application,
              integrating external systems, automating a repetitive workflow or
              turning complex business rules into reliable software.
            </Lede>

            {/* Four capability tiles (Prompt 11) in place of the old
                statistics — no years-of-experience figure and no open-source
                claim, since neither is backed by anything on the site.
                Hardcoded rather than mapped: there are exactly four.

                No hover state — these are facts, not controls. */}
            <dl className="mt-8 grid grid-cols-2 gap-5 hand:grid-cols-1">
              <Fact value="Full Stack" label="Frontend & backend development" />
              <Fact value="Business Systems" label="Automation & integrations" />
              <Fact value="Data" label="SQL & database engineering" />
              <Fact value="Production" label="Deployment & support" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One capability tile.
 *
 * `<dl>`/`<dt>`/`<dd>` rather than divs: each tile is a term and its
 * description, which is exactly what a description list is for, and it gives
 * the pairing to assistive tech for free.
 */
function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[14px] border border-hair bg-bg-elev px-5 py-[18px]">
      <dt className="text-bullet text-accent">{value}</dt>
      <dd className="mt-0.5 text-label text-ink-3">{label}</dd>
    </div>
  );
}
