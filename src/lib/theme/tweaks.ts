/**
 * Runtime tweaks — Prompt 00, "Other tweaks".
 *
 * These are the three non-palette controls the foundation spec names: warm vs
 * cool light background, headline weight, and uppercase eyebrows. Like the
 * palette, each one is delivered as a CSS custom property written on <html>,
 * so flipping one re-renders nothing — the browser just re-resolves variables.
 *
 * The Tweaks *panel* that drives these is deliberately not built here; see
 * project_overview.md §3, which marks the dev overlay optional. This module is
 * the model and the plumbing, ready for whatever surfaces it.
 */

import type { ThemeMode } from "./theme";

/** The two light-mode page backgrounds. Dark mode ignores both. */
export const BG_WARM = "#fbf9f6";
export const BG_COOL = "#f5f6f8";

/** Inclusive bounds for the headline weight slider. */
export const HEADLINE_WEIGHT_MIN = 500;
export const HEADLINE_WEIGHT_MAX = 800;

export type Tweaks = {
  /** false swaps the light-mode page background to the cool neutral. */
  warmBg: boolean;
  /** Applied to the hero h1 and every section h2. */
  headlineWeight: number;
  /** Off drops eyebrows to sentence case and loosens tracking to 0.04em. */
  uppercaseEyebrows: boolean;
};

export const DEFAULT_TWEAKS: Tweaks = {
  warmBg: true,
  headlineWeight: 700,
  uppercaseEyebrows: true,
};

export const TWEAKS_STORAGE_KEY = "jusdev-tweaks";

/**
 * The custom properties a set of tweaks writes on <html>.
 *
 * `--bg` is returned for the light theme only. Inline styles beat the
 * `html[data-theme="dark"]` selector, so in dark mode the caller must *remove*
 * the property rather than override it — see `applyTheme`.
 */
export function tweakVars(
  tweaks: Tweaks,
  mode: ThemeMode,
): Record<string, string> {
  const vars: Record<string, string> = {
    "--headline-weight": String(clampWeight(tweaks.headlineWeight)),
    "--eyebrow-case": tweaks.uppercaseEyebrows ? "uppercase" : "none",
    "--eyebrow-tracking": tweaks.uppercaseEyebrows ? "0.22em" : "0.04em",
  };

  if (mode === "light") {
    vars["--bg"] = tweaks.warmBg ? BG_WARM : BG_COOL;
  }

  return vars;
}

/** Keeps a stored or user-supplied weight inside the slider's range. */
export function clampWeight(weight: number): number {
  if (!Number.isFinite(weight)) return DEFAULT_TWEAKS.headlineWeight;
  return Math.min(HEADLINE_WEIGHT_MAX, Math.max(HEADLINE_WEIGHT_MIN, Math.round(weight)));
}

/**
 * Coerces whatever came out of localStorage into a valid Tweaks object.
 *
 * Storage is user-writable and survives deploys, so a stale or hand-edited
 * value must not be able to write garbage into a CSS variable.
 */
export function parseTweaks(raw: string | null): Tweaks {
  if (!raw) return DEFAULT_TWEAKS;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return DEFAULT_TWEAKS;

    const t = parsed as Partial<Record<keyof Tweaks, unknown>>;
    return {
      warmBg: typeof t.warmBg === "boolean" ? t.warmBg : DEFAULT_TWEAKS.warmBg,
      headlineWeight:
        typeof t.headlineWeight === "number"
          ? clampWeight(t.headlineWeight)
          : DEFAULT_TWEAKS.headlineWeight,
      uppercaseEyebrows:
        typeof t.uppercaseEyebrows === "boolean"
          ? t.uppercaseEyebrows
          : DEFAULT_TWEAKS.uppercaseEyebrows,
    };
  } catch {
    return DEFAULT_TWEAKS;
  }
}
