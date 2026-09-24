/**
 * Joins class names, dropping falsy values.
 *
 * Deliberately not `tailwind-merge` — nothing here needs conflict resolution,
 * and a portfolio with eight primitives doesn't need the dependency. If a
 * primitive ever needs a caller to *override* one of its own utilities rather
 * than add to them, revisit this.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
