import type { ComponentType } from "react";

import {
  BookmarkIcon,
  BriefcaseIcon,
  CodeIcon,
  HomeIcon,
  LayoutIcon,
  MailIcon,
  UserIcon,
  type IconProps,
} from "@/components/icons";

export type NavItem = {
  /** The section's element id, or null for the top of the page. */
  id: string | null;
  /** Doubles as the tooltip text and the control's accessible name. */
  label: string;
  icon: ComponentType<IconProps>;
};

/**
 * The sidebar rail's navigation — design-system.md §7.2, Prompt 20.
 *
 * **Order dependency:** this must stay in the same order as the sections in
 * `src/app/page.tsx` (project_overview.md §6.3). The scrollspy walks the list
 * top to bottom and takes the last section whose top has passed the offset, so
 * a list out of order highlights the wrong icon.
 *
 * Education (`#education`, between Services and Contact) is deliberately not a
 * rail item — Prompt 20 allows dropping it when the nav gets crowded, and seven
 * tiles is already the most the rail holds. While it is on screen the rail
 * keeps Services highlighted, which is the section it follows.
 *
 * The rail is the only navigation at every width (it narrows, never becomes a
 * hamburger — §4), so this one list is both the desktop and the mobile nav.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: null, label: "Home", icon: HomeIcon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "experience", label: "Experience", icon: BriefcaseIcon },
  { id: "work", label: "Work", icon: BookmarkIcon },
  { id: "skills", label: "Skills", icon: LayoutIcon },
  { id: "services", label: "Services", icon: CodeIcon },
  { id: "contact", label: "Contact", icon: MailIcon },
] as const;
