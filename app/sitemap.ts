import type { MetadataRoute } from "next";

const SITE = "https://kataloji-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/menu`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
