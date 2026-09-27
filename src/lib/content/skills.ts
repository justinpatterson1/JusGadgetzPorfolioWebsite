import type { ComponentType } from "react";

import {
  CodeIcon,
  DatabaseIcon,
  LayoutIcon,
  ServerIcon,
  TerminalIcon,
  type IconProps,
} from "@/components/icons";

export type SkillCategory = {
  title: string;
  /** The component itself, not a string name — no registry to keep in sync. */
  icon: ComponentType<IconProps>;
  /** Coral icon well instead of accent. */
  alt?: boolean;
  /**
   * Spans both columns. Set on the last category only, so an odd count ends
   * on a full-width card rather than a hole in the grid.
   */
  wide?: boolean;
  /** Chip labels. */
  items: readonly string[];
};

/**
 * Technical expertise — Prompt 15, design-system.md §7.5.
 *
 * Only what the portfolio's own experience and case studies back up: the
 * mobile category, Vue.js, GraphQL, Figma and Framer Motion are gone, and AWS
 * is "AWS / Cloud Fundamentals" because no certification has been earned yet
 * (it is listed as in progress under Education). No proficiency ratings.
 *
 * Layout: four categories in the 2×2 grid, then Engineering Practices spanning
 * both columns — they are concepts rather than tools (Prompt 15), so the odd
 * one out is also the one that reads as a different kind of list. `alt` sits on
 * cards 2 and 3, the true diagonal of the 2×2 (row-major, 2 and 4 are both the
 * right-hand column).
 */
export const SKILLS: readonly SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: LayoutIcon,
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Backend Development",
    icon: TerminalIcon,
    alt: true,
    items: [
      "Node.js",
      "Express",
      "Python",
      "Flask",
      "REST APIs",
      "Authentication & Authorization",
    ],
  },
  {
    title: "Databases & Data",
    icon: DatabaseIcon,
    alt: true,
    items: ["SQL", "SQL Server", "PostgreSQL", "Prisma", "Neon", "Supabase"],
  },
  {
    title: "DevOps & Automation",
    icon: ServerIcon,
    items: [
      "Git / GitHub",
      "Vercel",
      "Docker",
      "Jenkins",
      "Windows Task Scheduler",
      "PowerShell / Batch Automation",
      "AWS / Cloud Fundamentals",
    ],
  },
  {
    title: "Engineering Practices",
    icon: CodeIcon,
    wide: true,
    items: [
      "API Integration",
      "Database Design",
      "Business Process Automation",
      "Audit Logging",
      "Error Handling & Monitoring",
      "Secure Application Development",
      "Production Troubleshooting",
    ],
  },
] as const;
