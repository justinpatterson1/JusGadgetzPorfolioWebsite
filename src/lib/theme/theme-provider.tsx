"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { PaletteName } from "./palettes";
import { readPreference, subscribe, writePreference } from "./preferences";
import {
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  applyTheme,
  parseMode,
  parsePalette,
  type ThemeMode,
} from "./theme";
import { TWEAKS_STORAGE_KEY, parseTweaks, type Tweaks } from "./tweaks";

type ThemeContextValue = {
  mode: ThemeMode;
  palette: PaletteName;
  tweaks: Tweaks;
  /** False during SSR and the hydration render, when the defaults are showing. */
  ready: boolean;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: PaletteName) => void;
  setTweaks: (patch: Partial<Tweaks>) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Subscribes to one stored preference. Returns null on the server. */
function useStored(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => readPreference(key),
    () => null,
  );
}

/**
 * Exposes theme, palette and tweak state, and mirrors it onto <html>.
 *
 * This provider does **not** close the dark-mode flash — the pre-paint script
 * in the root layout does that, before React exists. The provider's job is the
 * other half: giving controls (the sidebar theme toggle, any tweaks surface) a
 * single place to read and write those preferences afterwards.
 *
 * State is read straight out of localStorage rather than copied into
 * `useState`, so there is no window where React's idea of the theme and the
 * stored one disagree, and no effect that has to reconcile them.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const mode = parseMode(useStored(THEME_STORAGE_KEY));
  const palette = parsePalette(useStored(PALETTE_STORAGE_KEY));
  const rawTweaks = useStored(TWEAKS_STORAGE_KEY);
  const tweaks = useMemo(() => parseTweaks(rawTweaks), [rawTweaks]);

  /* Push the resolved preferences onto <html>. Skipped until hydration so the
     defaults can't overwrite what the bootstrap correctly applied pre-paint. */
  useEffect(() => {
    if (!ready) return;
    applyTheme(mode, palette, tweaks);
  }, [ready, mode, palette, tweaks]);

  const setMode = useCallback((next: ThemeMode) => {
    writePreference(THEME_STORAGE_KEY, next);
  }, []);

  const toggleMode = useCallback(() => {
    const current = parseMode(readPreference(THEME_STORAGE_KEY));
    writePreference(THEME_STORAGE_KEY, current === "dark" ? "light" : "dark");
  }, []);

  const setPalette = useCallback((next: PaletteName) => {
    writePreference(PALETTE_STORAGE_KEY, next);
  }, []);

  /* Re-read before merging rather than closing over `tweaks`, so two controls
     changed in the same tick can't clobber each other. */
  const setTweaks = useCallback((patch: Partial<Tweaks>) => {
    const current = parseTweaks(readPreference(TWEAKS_STORAGE_KEY));
    writePreference(TWEAKS_STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      palette,
      tweaks,
      ready,
      toggleMode,
      setMode,
      setPalette,
      setTweaks,
    }),
    [mode, palette, tweaks, ready, toggleMode, setMode, setPalette, setTweaks],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

/** Throws outside the provider — a silent default would mean a dead toggle. */
export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (value === null) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return value;
}
