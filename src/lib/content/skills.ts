import type { ComponentType } from "react";

import {
  GlobeIcon,
  LayoutIcon,
  PhoneIcon,
  TerminalIcon,
  type IconProps,
} from "@/components/icons";

export type SkillCategory = {
  title: string;
  /** The component itself, not a string name — no registry to keep in sync. */
  icon: ComponentType<IconProps>;
  /**
   * Coral icon well instead of accent. Set on categories 2 and 4 so the two
   * coral wells sit on a diagonal of the 2×2 grid.
   */
  alt?: boolean;
  /** Chip labels. Four to six reads well; past eight the cards stop aligning. */
  items: readonly string[];
};

/**
 * Skills categories — PRD 09, design-system.md §7.5.
 *
 * **Keep the count even.** The grid is 2×2; a fifth category makes it 2+2+1
 * with the last card alone in the left column. If an odd count is ever wanted,
 * give the last card `grid-column: 1 / -1` rather than leaving the hole.
 *
 * `alt` on exactly categories 2 and 4 is the only place coral appears in the
 * light half of the page. The diagonal is what keeps it from looking arbitrary,
 * so reordering this list means re-deciding which two carry it.
 */
export const SKILLS: readonly SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: LayoutIcon,
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vue.js",
    ],
  },
  {
    title: "Backend Development",
    icon: TerminalIcon,
    alt: true,
    items: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "GraphQL",
      "Express",
      "Supabase",
    ],
  },
  {
    title: "Mobile & Native",
    icon: PhoneIcon,
    items: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)"],
  },
  {
    title: "DevOps & Tools",
    icon: GlobeIcon,
    alt: true,
    items: ["Docker", "AWS", "CI/CD", "Git", "Vercel", "Figma"],
  },
] as const;
