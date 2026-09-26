import type { ComponentType } from "react";

import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  XIcon,
  type IconProps,
} from "@/components/icons";

/**
 * Contact details — PRD 13, design-system.md §7.9.
 *
 * **Launch blocker (open-issues.md #3 and #4).** Everything here except the
 * GitHub username is a placeholder, decided 2026-09-25: ship the layout now,
 * fill these in before launch. They live in this one file so that filling
 * them in is one edit, not a hunt through the markup.
 */

/** Placeholder — the real address goes here. Both the pill and the Email row read it. */
export const CONTACT_EMAIL = "hello@example.com";

/**
 * Taken from the git remote, not confirmed by the owner (open-issues.md #9).
 * Shared with Projects' "View all projects" so the two cannot drift apart.
 */
export const GITHUB_URL = "https://github.com/justinpatterson1";

export type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
  /** Opens in a new tab with `noopener noreferrer`. False for `mailto:`. */
  external: boolean;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "LinkedIn",
    /* Placeholder — replace with the real profile URL. */
    href: "https://www.linkedin.com/in/your-handle",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Twitter / X",
    /* Placeholder — replace with the real profile URL. */
    href: "https://x.com/your-handle",
    icon: XIcon,
    external: true,
  },
  { label: "GitHub", href: GITHUB_URL, icon: GitHubIcon, external: true },
  {
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: MailIcon,
    external: false,
  },
] as const;
