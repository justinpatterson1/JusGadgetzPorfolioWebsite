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
 */
export function accentVars(
  palette: PaletteName,
  mode: ThemeMode,
): Record<string, string> {
  const p = PALETTES[palette];
  return {
    "--accent": p.accent,
    "--accent-strong": mode === "dark" ? p.accentLight : p.accentStrong,
    "--accent-light": p.accentLight,
    "--accent-soft": p.accentSoft,
    "--co-coral": p.coral,
    "--co-coral-soft": p.coralSoft,
  };
}

/**
 * Apply theme, palette and tweaks to <html>. Client only.
 *
 * Keep the `--bg` removal in place: `tweakVars` writes an inline light-mode
 * background, and an inline style beats the `html[data-theme="dark"]` selector,
 * so dark mode has to clear it rather than override it.
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
