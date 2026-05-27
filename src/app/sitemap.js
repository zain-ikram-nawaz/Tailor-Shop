import { getDesigns } from "@/db/db";

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const APP_URL = process.env.APP_URL || "http://localhost:3000";

  let designs = [];
  try {
    designs = await getDesigns(false);
  } catch (_) {}

  const staticRoutes = [
    { url: APP_URL, priority: 1, changeFrequency: "weekly" },
    { url: `${APP_URL}/calculator`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${APP_URL}/designs`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${APP_URL}/lead-form`, priority: 0.7, changeFrequency: "monthly" },
  ];

  const designRoutes = designs.map((d) => ({
    url: `${APP_URL}/designs/${d.slug}`,
    lastModified: new Date(d.updatedAt),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...designRoutes];
}
