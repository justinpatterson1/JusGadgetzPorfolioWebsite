/**
 * Tech ticker names — PRD 12, design-system.md §7.8.
 *
 * Order is **deliberately interleaved**, not alphabetical or grouped by
 * category: databases, infra and frameworks alternate so no run of similar
 * names passes at once.
 *
 * The loop speed was tuned for this length — roughly 2.4s per name (40s ÷ 17).
 * A much longer list scrolls each name past proportionally faster, so retune
 * `.ticker-track`'s duration in globals.css if the count changes much.
 */
export const TECHS: readonly string[] = [
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Figma",
  "Stripe",
  "Redis",
  "MongoDB",
  "Prisma",
  "React",
  "TypeScript",
  "Node.js",
  "Next.js",
  "TailwindCSS",
  "Python",
  "Supabase",
  "Firebase",
] as const;
