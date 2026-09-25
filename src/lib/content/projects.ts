/** Which SVG decoration `<ProjectThumb>` draws over the gradient. */
export type ProjectDeco = "chart" | "phone" | "ai";

export type Project = {
  title: string;
  /** One to two sentences. Longer breaks card height parity across the row. */
  desc: string;
  /** Three or four. Five wraps to a third row and the cards stop aligning. */
  tags: readonly string[];
  /** Two uppercase letters, drawn at 96px over the thumbnail. */
  glyph: string;
  /** One of the three fixed gradients in globals.css. */
  thumbClass: "project-thumb-1" | "project-thumb-2" | "project-thumb-3";
  deco: ProjectDeco;
};

/**
 * Featured projects — PRD 10, design-system.md §7.6.
 *
 * **This is sample content** ([open-issues.md](../../../context/open-issues.md)
 * #6). The copy is the prototype's and the thumbnails are generated, so nothing
 * here describes real work yet.
 *
 * `glyph`, `thumbClass` and `deco` exist only because there are no screenshots.
 * When real imagery lands this is the first section to change: add an `image`
 * field, drop those three and `<ProjectThumb>` with them, and the card body is
 * untouched. Source images 16:10, at least 800×500 — PRD 10 has the markup.
 *
 * Deliberately **no `url` field.** The cards are inert by decision (2026-09-25):
 * nothing here is a real, linkable project, so nothing is dressed up as one.
 * Adding `url` is what re-enables the card link and the external-link action.
 */
export const PROJECTS: readonly Project[] = [
  {
    title: "E-Commerce Dashboard",
    desc: "A comprehensive analytics dashboard for online retailers with real-time data visualization and inventory management.",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    glyph: "EC",
    thumbClass: "project-thumb-1",
    deco: "chart",
  },
  {
    title: "FinTech Mobile App",
    desc: "Secure mobile banking application featuring biometric authentication and instant peer-to-peer transfers.",
    tags: ["React Native", "TypeScript", "Firebase", "Stripe"],
    glyph: "FT",
    thumbClass: "project-thumb-2",
    deco: "phone",
  },
  {
    title: "AI Content Generator",
    desc: "SaaS platform leveraging OpenAI's GPT-4 to help marketers generate high-quality blog posts and social media copy.",
    tags: ["Next.js", "OpenAI API", "Tailwind", "Prisma"],
    glyph: "AI",
    thumbClass: "project-thumb-3",
    deco: "ai",
  },
] as const;
