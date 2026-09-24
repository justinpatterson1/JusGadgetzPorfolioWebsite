"use client";

import { PALETTE_NAMES, type PaletteName } from "@/lib/theme/palettes";
import { useTheme } from "@/lib/theme/theme-provider";
import { HEADLINE_WEIGHT_MAX, HEADLINE_WEIGHT_MIN } from "@/lib/theme/tweaks";

/**
 * TEMPORARY — live controls for the foundations specimen.
 *
 * Not the Tweaks panel: project_overview.md §3 defers that dev overlay, and
 * this ships with the specimen page rather than with the site. It exists so
 * theme, palette and the three tweaks can be verified by eye before any real
 * control surface exists, and it doubles as the reference for how the sidebar's
 * theme toggle should consume `useTheme`.
 *
 * Deleted along with the specimen page when the real sections land.
 */
export function SpecimenControls() {
  const { mode, palette, tweaks, ready, toggleMode, setPalette, setTweaks } =
    useTheme();

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-hair bg-bg-elev p-5">
      <label className="flex items-center gap-2 text-label text-ink-2">
        <span>Theme</span>
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-full border border-hair-2 px-3 py-1.5 text-cta text-ink transition-colors duration-[180ms] ease-hover hover:border-accent hover:text-accent"
        >
          {/* Before hydration the stored preference isn't readable, so the
              label would be a guess — say nothing rather than the wrong thing. */}
          {ready ? `${mode} → ${mode === "dark" ? "light" : "dark"}` : "…"}
        </button>
      </label>

      <label className="flex items-center gap-2 text-label text-ink-2">
        <span>Palette</span>
        <select
          value={palette}
          onChange={(e) => setPalette(e.target.value as PaletteName)}
          className="rounded-full border border-hair-2 bg-transparent px-3 py-1.5 text-cta text-ink"
        >
          {PALETTE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-label text-ink-2">
        <input
          type="checkbox"
          checked={tweaks.warmBg}
          onChange={(e) => setTweaks({ warmBg: e.target.checked })}
        />
        <span>Warm background</span>
      </label>

      <label className="flex items-center gap-2 text-label text-ink-2">
        <input
          type="checkbox"
          checked={tweaks.uppercaseEyebrows}
          onChange={(e) => setTweaks({ uppercaseEyebrows: e.target.checked })}
        />
        <span>Uppercase eyebrows</span>
      </label>

      <label className="flex items-center gap-2 text-label text-ink-2">
        <span>Headline weight</span>
        <input
          type="range"
          min={HEADLINE_WEIGHT_MIN}
          max={HEADLINE_WEIGHT_MAX}
          step={100}
          value={tweaks.headlineWeight}
          onChange={(e) => setTweaks({ headlineWeight: Number(e.target.value) })}
        />
        <span className="tabular-nums text-ink">{tweaks.headlineWeight}</span>
      </label>
    </div>
  );
}
