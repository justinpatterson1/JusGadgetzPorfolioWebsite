import { PALETTES, type PaletteName } from "./palettes";

export type ThemeMode = "light" | "dark";

/** localStorage keys. Read by the pre-paint bootstrap script in the root layout. */
export const THEME_STORAGE_KEY = "jusdev-theme";
export const PALETTE_STORAGE_KEY = "jusdev-palette";

export const DEFAULT_THEME: ThemeMode = "light";

/**
 * The accent custom properties to write inline on <html> for a given palette.
 *
 * `--accent-strong` intentionally resolves to `accentLight` in dark mode — the
 * light-mode value is too dark to read on a dark surface (PRD 00 §3).
 *
 * `--accent-glow` is not written here — globals.css derives it from
 * `--accent-light` so the alpha stays in one place.
 *
 * `--bg` is deliberately NOT returned here. The light theme writes it inline and
 * inline styles beat the `html[data-theme="dark"]` selector, so dark mode must
 * *remove* it rather than override it. See `applyTheme`.
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
 * Apply theme + palette to <html>. Safe to call on the client only.
 *
 * Keep the `--bg` removal in place: without it, the inline light-mode value
 * wins over the dark theme block and the page background stays light.
 */
export function applyTheme(mode: ThemeMode, palette: PaletteName): void {
  const root = document.documentElement;

  root.dataset.theme = mode;

  for (const [name, value] of Object.entries(accentVars(palette, mode))) {
    root.style.setProperty(name, value);
  }

  if (mode === "dark") {
    root.style.removeProperty("--bg");
  }
}
