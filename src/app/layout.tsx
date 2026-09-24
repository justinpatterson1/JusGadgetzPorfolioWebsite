import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { PALETTES, DEFAULT_PALETTE } from "@/lib/theme/palettes";
import {
  DEFAULT_THEME,
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/lib/theme/theme";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import {
  BG_COOL,
  BG_WARM,
  DEFAULT_TWEAKS,
  HEADLINE_WEIGHT_MAX,
  HEADLINE_WEIGHT_MIN,
  TWEAKS_STORAGE_KEY,
} from "@/lib/theme/tweaks";

import "./globals.css";

/**
 * Poppins is not a variable font, so the weights are enumerated.
 * 400 body · 500 nav/labels/buttons · 600 card titles, stat numbers, eyebrows ·
 * 700 h1/h2/brand. 300 and 800 are headroom for the Tweaks headline-weight
 * slider (range 500–800) — PRD 00 §1.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "JusDev. — Full Stack Developer",
  description:
    "Justin Sheppard is a full stack developer in Trinidad and Tobago, building fast, considered web applications end to end.",
};

/**
 * Applies the stored theme, palette and tweaks before first paint.
 *
 * Without this the page renders one frame of the light theme before the client
 * takes over, which is a visible flash on every dark-mode load (open-issues #2).
 * Palette values and tweak defaults are serialised from the same constants the
 * app uses, so the script and `applyTheme` can't drift apart.
 *
 * It runs before React exists, so it can't import `applyTheme` — the variable
 * writes below are deliberately a hand-rolled duplicate of `accentVars` +
 * `tweakVars`. Change one, change the other.
 */
const themeBootstrap = `
(function () {
  try {
    var root = document.documentElement;
    var palettes = ${JSON.stringify(PALETTES)};
    var mode = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_THEME)};
    var name = localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_PALETTE)};
    var p = palettes[name] || palettes[${JSON.stringify(DEFAULT_PALETTE)}];
    var dark = mode === 'dark';

    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--accent-strong', dark ? p.accentLight : p.accentStrong);
    root.style.setProperty('--accent-light', p.accentLight);
    root.style.setProperty('--accent-soft', p.accentSoft);
    root.style.setProperty('--co-coral', p.coral);
    root.style.setProperty('--co-coral-soft', p.coralSoft);

    var t = ${JSON.stringify(DEFAULT_TWEAKS)};
    try {
      var saved = JSON.parse(localStorage.getItem(${JSON.stringify(TWEAKS_STORAGE_KEY)}) || 'null');
      if (saved && typeof saved === 'object') {
        if (typeof saved.warmBg === 'boolean') t.warmBg = saved.warmBg;
        if (typeof saved.uppercaseEyebrows === 'boolean') t.uppercaseEyebrows = saved.uppercaseEyebrows;
        if (typeof saved.headlineWeight === 'number') {
          t.headlineWeight = Math.min(${HEADLINE_WEIGHT_MAX}, Math.max(${HEADLINE_WEIGHT_MIN}, Math.round(saved.headlineWeight)));
        }
      }
    } catch (e) { /* malformed tweaks — keep the defaults */ }

    root.style.setProperty('--headline-weight', String(t.headlineWeight));
    root.style.setProperty('--eyebrow-case', t.uppercaseEyebrows ? 'uppercase' : 'none');
    root.style.setProperty('--eyebrow-tracking', t.uppercaseEyebrows ? '0.22em' : '0.04em');

    /* light mode only: an inline --bg would beat the dark theme's selector */
    if (dark) {
      root.style.removeProperty('--bg');
    } else {
      root.style.setProperty('--bg', t.warmBg ? ${JSON.stringify(BG_WARM)} : ${JSON.stringify(BG_COOL)});
    }
  } catch (e) {
    /* storage unavailable — fall back to the light theme in globals.css */
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {/* A plain <script>, not next/script. `beforeInteractive` keeps an
            inline script in the RSC payload rather than emitting it into the
            static HTML, so it runs after hydration — far too late to stop the
            flash. This one is parsed and executed before the body content that
            follows it, which is the whole point. */}
        <script
          id="theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
