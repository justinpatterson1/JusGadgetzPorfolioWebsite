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
 * The `eyebrow` class name is kept so the Tweaks `uppercaseEyebrows` toggle
 * (PRD 15) can find these nodes. It carries no styling of its own.
 */
export function Eyebrow({ children, centered, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "eyebrow mb-3.5 inline-flex items-center gap-2.5 text-eyebrow uppercase",
        "text-accent ink:text-coral",
        "before:h-px before:w-6 before:bg-accent before:content-[''] ink:before:bg-coral",
        centered && "justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
