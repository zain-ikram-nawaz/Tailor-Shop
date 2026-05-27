export default function robots() {
  const APP_URL = process.env.APP_URL || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/login", "/api/"],
    },
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
