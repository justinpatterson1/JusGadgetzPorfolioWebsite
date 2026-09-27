/**
 * The site's canonical origin, for `metadataBase`, canonical URLs, the sitemap
 * and robots.txt (Prompt 21).
 *
 * Never hardcoded, because the production domain has not been confirmed:
 * 1. `NEXT_PUBLIC_SITE_URL`, when set — the explicit answer. TODO(Justin): set
 *    it in the Vercel project once the domain is final.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL`, which Vercel provides at build time —
 *    the project's real production domain, not a guess.
 * 3. localhost, for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
