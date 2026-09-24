/**
 * Accent palettes — PRD 00 §3.
 *
 * Construction rule for a new palette: pick a hue H, then
 *   accent       oklch(0.5–0.62  0.16–0.24  H)
 *   accentStrong same hue, L −0.10, C +0.01..0.03   (light-mode text weight)
 *   accentLight  same hue, L ≈ 0.76–0.80, C ≈ 0.13–0.16 (dark-mode text weight)
 *   accentSoft   same hue, L ≈ 0.96, C ≈ 0.04       (light-mode tint)
 *   coral        complementary-ish hue, L ≈ 0.70, C ≈ 0.16–0.18
 */

export type Palette = {
  accent: string;
  accentStrong: string;
  accentLight: string;
  accentSoft: string;
  coral: string;
  coralSoft: string;
};

export const PALETTES = {
  Violet: {
    accent: "oklch(0.55 0.24 295)",
    accentStrong: "oklch(0.45 0.27 290)",
    accentLight: "oklch(0.78 0.16 295)",
    accentSoft: "oklch(0.96 0.04 295)",
    coral: "oklch(0.72 0.18 35)",
    coralSoft: "oklch(0.97 0.04 50)",
  },
  Cobalt: {
    accent: "oklch(0.52 0.22 255)",
    accentStrong: "oklch(0.42 0.24 252)",
    accentLight: "oklch(0.76 0.15 255)",
    accentSoft: "oklch(0.96 0.04 255)",
    coral: "oklch(0.72 0.16 50)",
    coralSoft: "oklch(0.97 0.04 60)",
  },
  Sunset: {
    accent: "oklch(0.62 0.21 25)",
    accentStrong: "oklch(0.52 0.22 22)",
    accentLight: "oklch(0.8 0.14 30)",
    accentSoft: "oklch(0.96 0.04 30)",
    coral: "oklch(0.7 0.18 290)",
    coralSoft: "oklch(0.96 0.04 290)",
  },
  Forest: {
    accent: "oklch(0.5 0.16 160)",
    accentStrong: "oklch(0.4 0.17 160)",
    accentLight: "oklch(0.76 0.13 160)",
    accentSoft: "oklch(0.95 0.04 160)",
    coral: "oklch(0.7 0.18 40)",
    coralSoft: "oklch(0.96 0.04 50)",
  },
} as const satisfies Record<string, Palette>;

export type PaletteName = keyof typeof PALETTES;

export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

export const DEFAULT_PALETTE: PaletteName = "Violet";
