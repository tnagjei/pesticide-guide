import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://pesticideguide.online/sitemap.xml",
    host: "https://pesticideguide.online",
  };
}
