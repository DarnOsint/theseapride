import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/bukola/", "/api/"],
    },
    sitemap: "https://theseapride.vercel.app/sitemap.xml",
  };
}
