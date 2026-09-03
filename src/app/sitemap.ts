import type { MetadataRoute } from "next";
import { SERVICES, PRODUCTS, POSTS } from "@/lib/data";
import { SITE } from "@/lib/seo";

/** Generated from the same arrays the pages render, so a new service, product, or
 *  post is in the sitemap the moment it exists — nothing to remember to update. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statics: MetadataRoute.Sitemap = (
    [
      { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE.url}/software`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${SITE.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
      { url: `${SITE.url}/career`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${SITE.url}/faq`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${SITE.url}/process`, changeFrequency: "yearly", priority: 0.5 },
    ] satisfies MetadataRoute.Sitemap
  ).map((e) => ({ ...e, lastModified: now }));

  return [
    ...statics,
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/software/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
