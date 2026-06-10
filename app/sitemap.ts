import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/pulse",
    "/services",
    "/industries/pharmacy",
    "/work",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/pulse" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/pulse" ? 0.9 : 0.7,
  }));

  for (const s of SERVICES) {
    entries.push({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  for (const c of CASE_STUDIES) {
    entries.push({
      url: `${SITE.url}/work/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
