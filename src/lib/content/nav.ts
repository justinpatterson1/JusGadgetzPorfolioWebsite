import type { ComponentType } from "react";

import {
  BookmarkIcon,
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
 * The sidebar rail's navigation — design-system.md §7.2.
 *
 * **Order dependency:** this must stay in the same order as the sections in
 * `src/app/page.tsx` (project_overview.md §6.3). The scrollspy walks the list
 * top to bottom and takes the last section whose top has passed the offset, so
 * a list out of order highlights the wrong icon.
 *
 * Every id except Home's belongs to a section from prompts 02–08 that does not
 * exist yet. Missing targets are handled rather than assumed away: the
 * scrollspy skips ids it can't find and a click on a dead link does nothing.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: null, label: "Home", icon: HomeIcon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "skills", label: "Skills", icon: LayoutIcon },
  { id: "projects", label: "Projects", icon: BookmarkIcon },
  { id: "services", label: "Services", icon: CodeIcon },
  { id: "contact", label: "Contact", icon: MailIcon },
] as const;
