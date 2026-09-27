import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

import { scrollToSection } from "./scroll";

/**
 * Link props for a homepage section, correct on every route.
 *
 * On the homepage it is an in-page anchor whose click adds the 40px offset and
 * smooth easing. Anywhere else (the case-study pages) the section isn't in the
 * document, so it becomes a plain `/#id` link that loads the homepage at that
 * section — `scroll-mt-10` on the target gives the same offset on arrival.
 *
 * `local` sections exist on every page (the footer's `#contact`), so those stay
 * in-page everywhere.
 *
 * Modifier clicks are left to the browser, so new-tab and new-window work.
 */
export function useSectionLink(
  id: string | null,
  { local = false }: { local?: boolean } = {},
) {
  const onHome = usePathname() === "/";
  const inPage = onHome || local;

  const hash = id === null ? "#" : `#${id}`;
  const href = inPage ? hash : id === null ? "/" : `/${hash}`;

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!inPage) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    scrollToSection(id);
  };

  return { href, onClick };
}
