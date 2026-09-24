import { SidebarBrand } from "./sidebar-brand";
import { SidebarCta } from "./sidebar-cta";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "./theme-toggle";

/**
 * The fixed navigation rail — design-system.md §7.2.
 *
 * A server component holding four client children rather than one big client
 * component: only the pieces that need scroll position or theme state ship as
 * JavaScript (coding-standards.md, React/Next.js).
 *
 * Width comes from `--sidebar-w`, which Prompt 00 already narrows to 72px and
 * 64px at the two breakpoints — and the same variable drives the body's
 * `padding-left`, so the rail and the content offset can never disagree.
 *
 * It narrows rather than collapsing to a hamburger. That is deliberate
 * (open-issues.md #21): an icon rail is already compact.
 */
export function Sidebar() {
  return (
    <aside
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-w)] flex-col items-center border-r border-hair bg-bg-elev py-6 shadow-[0_0_40px_-28px_var(--shadow-lift)]"
    >
      <SidebarBrand />
      <SidebarNav />
      <div className="flex shrink-0 flex-col items-center gap-2">
        <ThemeToggle />
        <SidebarCta />
      </div>
    </aside>
  );
}
