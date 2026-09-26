import { PALETTES, DEFAULT_PALETTE, type PaletteName } from "./palettes";
import { DEFAULT_TWEAKS, tweakVars, type Tweaks } from "./tweaks";

export type ThemeMode = "light" | "dark";

/** localStorage keys. Read by the pre-paint bootstrap script in the root layout. */
export const THEME_STORAGE_KEY = "jusdev-theme";
export const PALETTE_STORAGE_KEY = "jusdev-palette";

export const DEFAULT_THEME: ThemeMode = "light";

/**
 * The accent custom properties to write inline on <html> for a given palette.
 *
 * `--accent-strong` intentionally resolves to `accentLight` in dark mode — the
 * light-mode value is too dark to read on a dark surface (Prompt 00, dark mode).
 *
 * `--accent-glow` is not written here — globals.css derives it from
 * `--accent-light` so the alpha stays in one place.
 *
 * **The two soft tints are light-mode only.** In dark mode globals.css derives
 * them from `--accent` / `--co-coral` (a 20% mix into the dark surface), and
 * an inline value would beat that selector — the same trap as `--bg`. Writing
 * the palette's near-white tints unconditionally made every dark-mode icon
 * well, project tag and Hero pill render pale, on all four palettes.
 */
export const LIGHT_ONLY_VARS = ["--accent-soft", "--co-coral-soft"] as const;

export function accentVars(
  palette: PaletteName,
  mode: ThemeMode,
): Record<string, string> {
  const p = PALETTES[palette];
  return {
    "--accent": p.accent,
    "--accent-strong": mode === "dark" ? p.accentLight : p.accentStrong,
    "--accent-light": p.accentLight,
    "--co-coral": p.coral,
    ...(mode === "light" && {
      "--accent-soft": p.accentSoft,
      "--co-coral-soft": p.coralSoft,
    }),
  };
}

/**
 * Apply theme, palette and tweaks to <html>. Client only.
 *
 * Keep the removals in place: `tweakVars` writes an inline light-mode
 * background and `accentVars` writes the light-mode soft tints, and an inline
 * style beats the `html[data-theme="dark"]` selector, so dark mode has to
 * clear them rather than override them — including after a live light → dark
 * toggle, when the light values are already sitting on <html>.
 */
export function applyTheme(
  mode: ThemeMode,
  palette: PaletteName,
  tweaks: Tweaks = DEFAULT_TWEAKS,
): void {
  const root = document.documentElement;

  root.dataset.theme = mode;

  const vars = { ...accentVars(palette, mode), ...tweakVars(tweaks, mode) };
  for (const [name, value] of Object.entries(vars)) {
    root.style.setProperty(name, value);
  }

  if (mode === "dark") {
    root.style.removeProperty("--bg");
    for (const name of LIGHT_ONLY_VARS) root.style.removeProperty(name);
  }
}

/** Narrows an arbitrary stored string to a theme mode. */
export function parseMode(raw: string | null): ThemeMode {
  return raw === "dark" || raw === "light" ? raw : DEFAULT_THEME;
}

/** Narrows an arbitrary stored string to a known palette name. */
export function parsePalette(raw: string | null): PaletteName {
  return raw !== null && raw in PALETTES ? (raw as PaletteName) : DEFAULT_PALETTE;
}
