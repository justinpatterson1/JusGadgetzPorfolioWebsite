import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";

import { PALETTES, DEFAULT_PALETTE } from "@/lib/theme/palettes";
import {
  DEFAULT_THEME,
  PALETTE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/lib/theme/theme";

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
 * Applies the stored theme and palette before first paint.
 *
 * Without this the page renders one frame of the light theme before the client
 * takes over, which is a visible flash on every dark-mode load. Palette values
 * are serialised from the same PALETTES constant the app uses, so the two can't
 * drift apart.
 */
const themeBootstrap = `
(function () {
  try {
    var root = document.documentElement;
    var palettes = ${JSON.stringify(PALETTES)};
    var mode = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_THEME)};
    var name = localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_PALETTE)};
    var p = palettes[name] || palettes[${JSON.stringify(DEFAULT_PALETTE)}];

    root.dataset.theme = mode === 'dark' ? 'dark' : 'light';
    root.style.setProperty('--accent', p.accent);
    root.style.setProperty('--accent-strong', mode === 'dark' ? p.accentLight : p.accentStrong);
    root.style.setProperty('--accent-light', p.accentLight);
    root.style.setProperty('--accent-soft', p.accentSoft);
    root.style.setProperty('--co-coral', p.coral);
    root.style.setProperty('--co-coral-soft', p.coralSoft);
  } catch (e) {
    /* storage unavailable — fall back to the light theme in globals.css */
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootstrap }}
        />
        {children}
      </body>
    </html>
  );
}
