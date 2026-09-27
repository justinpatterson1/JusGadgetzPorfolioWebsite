import type { ComponentType } from "react";

import {
  ChatIcon,
  DatabaseIcon,
  GlobeIcon,
  LinkIcon,
  ServerIcon,
  TerminalIcon,
  type IconProps,
} from "@/components/icons";

export type Service = {
  /** 1–4 words. */
  title: string;
  /** One sentence, ~15–25 words. */
  desc: string;
  /** The component itself, not a string name — no registry to keep in sync. */
  icon: ComponentType<IconProps>;
  /** The promoted card. Exactly one entry carries it. */
  featured?: boolean;
};

/**
 * Services — Prompt 16, design-system.md §7.7. Copy is verbatim from the prompt.
 *
 * Only what can be delivered today: no mobile apps, no security audits, no
 * payment-provider list, and no "expert" self-description. Payment work that
 * *is* real — WiPay card payments and a bank-transfer flow — is shown where it
 * can be checked, in the SherryBerries case study.
 *
 * **`featured` sits on index 1 on purpose.** In the 3×2 grid that is the
 * top-row center — read first, flanked on both sides. Backend Systems & APIs
 * carries it because it is the strongest area the rest of the site evidences.
 *
 * Keep the count at six: it fills 3 × 2, 2 × 3 and 1 × 6 cleanly.
 */
export const SERVICES: readonly Service[] = [
  {
    title: "Web Application Development",
    desc: "Full-stack websites and web applications designed around real business requirements, from responsive interfaces to backend logic and databases.",
    icon: GlobeIcon,
  },
  {
    title: "Backend Systems & APIs",
    desc: "Backend services, REST APIs, authentication, database integration and third-party service integrations.",
    icon: ServerIcon,
    featured: true,
  },
  {
    title: "Business Process Automation",
    desc: "Automating repetitive workflows, recurring data processing and operational tasks using scripts, APIs, databases and scheduled processes.",
    icon: TerminalIcon,
  },
  {
    title: "Database Solutions",
    desc: "SQL database development, data processing, reporting workflows and database-backed application functionality.",
    icon: DatabaseIcon,
  },
  {
    title: "System Integration",
    desc: "Connecting applications, APIs, databases and external services into reliable end-to-end workflows.",
    icon: LinkIcon,
  },
  {
    title: "Technical Consulting",
    desc: "Practical guidance on application architecture, technology selection, automation opportunities and software implementation.",
    icon: ChatIcon,
  },
] as const;
