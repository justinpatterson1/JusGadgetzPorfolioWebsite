import { cn } from "@/lib/cn";

type EyebrowProps = {
  /** Text only — the 24px rule is a pseudo-element, so this must stay the
      element's single child or the flex gap will space the wrong things. */
  children: string;
  /** Services centers its eyebrow. */
  centered?: boolean;
  className?: string;
};

/**
 * Section kicker — PRD 01 §1.3.
 *
 * The rule before the text is `::before`, not a sibling element, which is what
 * keeps `gap: 10px` spacing exactly rule-to-text.
 *
 * Case and tracking come from `--eyebrow-case` / `--eyebrow-tracking` rather
 * than a fixed `uppercase` utility, so the Tweaks `uppercaseEyebrows` control
 * flips every eyebrow on the page by writing one variable on <html> — no node
 * walking, no re-render. Defaults live in globals.css.
 */
export function Eyebrow({ children, centered, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "eyebrow mb-3.5 inline-flex items-center gap-2.5 text-eyebrow",
        "[text-transform:var(--eyebrow-case)]",
        /* Dark mode reads --accent-light, the palette's own "dark-mode text
           weight" (palettes.ts): plain accent is 3.4–3.8:1 on the dark
           surfaces on three palettes, too little for 11px text. The ink:
           coral retarget must still win inside Services, so it is restated
           under dark: to outrank it on variant count. */
        "text-accent dark:text-accent-light ink:text-coral dark:ink:text-coral",
        "before:h-px before:w-6 before:bg-accent before:content-[''] dark:before:bg-accent-light",
        "ink:before:bg-coral dark:ink:before:bg-coral",
        centered && "justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
