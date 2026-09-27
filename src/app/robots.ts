import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

/**
 * robots.txt — Prompt 21. Production is indexable. Vercel preview deployments
 * are not, so a preview URL can never be indexed alongside the real site.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
