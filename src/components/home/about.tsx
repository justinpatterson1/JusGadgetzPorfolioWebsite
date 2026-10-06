import Image from "next/image";

import { Eyebrow, H2, Lede, Reveal } from "@/components/ui";
import { PERSON_NAME } from "@/lib/content/profile";

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
      {/* One block: the photo and copy arrive together. */}
      <Reveal className="wrap">
        <div className="grid grid-cols-[0.85fr_1.15fr] items-center gap-[72px] lap:grid-cols-1 lap:gap-10">
          {/* 72px is the widest gap on the site — the decorations extend 22px
              past the frame on both diagonals and need the room. */}
          <div className="photo-wrap lap:mx-auto lap:w-full lap:max-w-[400px]">
            <div className="photo-deco photo-deco-1" aria-hidden />
            <div className="photo-deco photo-deco-2" aria-hidden />
            <div className="photo-frame">
              {/* `fill` sizes to the positioned .photo-frame, and the frame's
                  `img` rule in globals.css covers it edge to edge. The source
                  is 3:4 and the frame 4:5, so `cover` trims ~3% off the top
                  and bottom — the full figure stays in. `sizes` tracks the
                  column: up to 400px stacked, about 480px beside the copy. */}
              <Image
                src="/images/about/justin.jpeg"
                alt={`${PERSON_NAME} standing in a resort pool, with palm trees in the background`}
                fill
                sizes="(max-width: 980px) 400px, 480px"
              />
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
      </Reveal>
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
