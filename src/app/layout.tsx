import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { RevealObserver } from "@/components/ui/reveal-observer";
import { PERSON_NAME, PERSON_TITLE } from "@/lib/content/profile";
import { SITE_URL } from "@/lib/site-url";
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
 * 700 h1/h2/brand. Nothing else is loaded: there is no Tweaks panel, so the
 * headline-weight range is held to the weights the site already ships
 * (HEADLINE_WEIGHT_MIN/MAX). Add 800 back here if that range ever widens.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const SITE_TITLE = `${PERSON_NAME} | ${PERSON_TITLE}`;
const SITE_DESCRIPTION =
  "Software Developer and Systems Analyst from Trinidad & Tobago specializing in full-stack applications, backend systems, APIs, database solutions and business process automation.";

/**
 * Site metadata — Prompt 21. Case-study pages override the title (through the
 * template), description, canonical and Open Graph fields.
 *
 * No Open Graph image at the root: there is no real site-wide preview image,
 * and Prompt 21 rules out referencing one that doesn't exist. No JSON-LD
 * either — the site never had any, and Prompt 21 only asks to update it.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${PERSON_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: PERSON_NAME,
  authors: [{ name: PERSON_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: PERSON_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_TT",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
  /* Opt in to scroll reveals (<Reveal>, RevealObserver). Content is hidden
     only under this flag, so without IntersectionObserver, with motion
     reduced, or with scripts off, every section simply renders visible. Its
     own try: it must not depend on storage being available. */
  try {
    if ('IntersectionObserver' in window &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var html = document.documentElement;
      html.dataset.revealReady = '';
      /* Safety net: if the app's JavaScript never starts (a failed chunk, a
         hydration error, a blocked script), RevealObserver never marks
         anything revealed. Turn reveals off rather than leave every section
         below the hero invisible. */
      setTimeout(function () {
        if (!('revealLive' in html.dataset)) delete html.dataset.revealReady;
      }, 4000);
    }
  } catch (e) { /* leave reveals off — content stays visible */ }

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
    root.style.setProperty('--co-coral', p.coral);
    /* light mode only — dark mode derives both tints in globals.css, and an
       inline value would beat that selector (see LIGHT_ONLY_VARS) */
    if (!dark) {
      root.style.setProperty('--accent-soft', p.accentSoft);
      root.style.setProperty('--co-coral-soft', p.coralSoft);
    }

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
        <RevealObserver />
      </body>
    </html>
  );
}
