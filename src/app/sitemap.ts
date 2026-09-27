import type { MetadataRoute } from "next";

import { CASE_STUDIES, caseStudyHref } from "@/lib/content/case-studies";
import { SITE_URL } from "@/lib/site-url";

/** sitemap.xml — the homepage and every case study (Prompt 21). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...CASE_STUDIES.map((study) => ({
      url: `${SITE_URL}${caseStudyHref(study)}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
