import { UserIcon } from "@/components/icons";
import { Eyebrow, H2, Lede } from "@/components/ui";

/**
 * Section 02 — About. Spec: context/features/03-about.md, with the anatomy in
 * context/features/design/08-about.md.
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
              {/* To use the real photo, delete this placeholder and drop in:
                    <Image src="/me.jpg" alt="Justin Sheppard" fill sizes="400px" />
                  (next/image, per coding-standards.md — `fill` needs the
                  positioned parent .photo-frame already provides). The frame's
                  `img` rule in globals.css makes it cover edge to edge with no
                  further CSS. Source image: 4:5 portrait, at least 800×1000,
                  subject centered horizontally — `cover` crops from the edges.
                  Tracked as open-issues.md #7. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
                <UserIcon className="size-14 text-accent-strong opacity-55" />
                {/* Monospace is the point: it reads as a developer
                    instruction rather than as designed content. */}
                <code className="rounded-lg border border-hair bg-bg-elev px-3.5 py-2 font-mono text-[12px] text-ink-2">
                  insert photo: me.jpg
                </code>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>About me</Eyebrow>
            <H2>A solutions-focused builder, from Trinidad &amp; Tobago.</H2>
            <Lede>
              My expertise spans frontend development, backend architecture,
              APIs, and database engineering. I specialize in building scalable
              applications that are reliable and performance-driven — and I
              excel at automating processes and streamlining workflows to
              improve efficiency.
            </Lede>
            <Lede className="mt-3.5">
              Every project I take on is approached with the same lens: build
              platforms designed for real impact and sustainable growth.
            </Lede>

            {/* Four tiles, hardcoded rather than mapped: there are exactly four
                and they are not expected to grow. If they ever become dynamic,
                extract an ABOUT_FACTS constant alongside SKILLS and SERVICES.

                No hover state — these are facts, not controls. */}
            <dl className="mt-8 grid grid-cols-2 gap-5 hand:grid-cols-1">
              <Fact value="5+ years" label="Shipping production code" />
              <Fact value="Full Stack" label="Frontend, backend & infra" />
              <Fact value="Remote-first" label="Working across timezones" />
              <Fact value="Open Source" label="Contributing & maintaining" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One fact tile.
 *
 * `<dl>`/`<dt>`/`<dd>` rather than divs: each tile is a term and its
 * description, which is exactly what a description list is for, and it gives
 * the pairing to assistive tech for free.
 *
 * The value slot holds short accent phrases, not only numerals. Keep each
 * under ~13 characters or the tiles fall out of alignment.
 */
function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[14px] border border-hair bg-bg-elev px-5 py-[18px]">
      <dt className="text-bullet text-accent">{value}</dt>
      <dd className="mt-0.5 text-label text-ink-3">{label}</dd>
    </div>
  );
}
