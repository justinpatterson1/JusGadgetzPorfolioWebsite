# Justin Patterson — Portfolio

The personal site of Justin Patterson, Software Developer & Systems Analyst
(Trinidad & Tobago): a single-page portfolio plus a case-study page for each
project.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.
Every route is prerendered as static HTML.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/app/` | Routes: the homepage, `/work/[slug]` case studies, 404, `robots.txt`, `sitemap.xml` |
| `src/components/home/` | Homepage sections, in page order |
| `src/components/layout/` | The fixed sidebar rail and theme toggle |
| `src/components/work/` | The case-study template and architecture diagram |
| `src/components/ui/` | Shared primitives (headings, CTAs, chips, scroll reveal) |
| `src/lib/content/` | **All site copy and links** — edit here, not in the markup |
| `src/lib/theme/` | Light/dark theme and accent palettes |
| `src/app/globals.css` | Design tokens, component styles, motion |

Adding a project is one entry in `src/lib/content/case-studies.ts`; its card
and its `/work/<slug>` page follow from it.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and robots. Falls back to Vercel's production URL, then localhost. |

Security headers (CSP, HSTS and friends) are set in `next.config.ts`.

## Before launch

Values that are deliberately `null` until real ones exist — the UI hides
whatever they would drive rather than showing placeholders:

- `CONTACT_EMAIL` — `src/lib/content/contact.ts`
- `RESUME_URL` — `src/lib/content/profile.ts`
