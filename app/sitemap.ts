import type { MetadataRoute } from "next";
import { SITE } from "@/lib/utils";
import { MODULES } from "@/content/modules";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/product", priority: 0.9, freq: "monthly" },
    { path: "/platform", priority: 0.8, freq: "monthly" },
    { path: "/why-ssvp", priority: 0.8, freq: "monthly" },
    { path: "/security", priority: 0.8, freq: "monthly" },
    { path: "/roi", priority: 0.8, freq: "monthly" },
    { path: "/pilot", priority: 0.9, freq: "monthly" },
    { path: "/book", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/services", priority: 0.4, freq: "monthly" },
    { path: "/investors", priority: 0.4, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  for (const m of MODULES) {
    entries.push({
      url: `${SITE.url}/product/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
