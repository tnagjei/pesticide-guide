import type { MetadataRoute } from "next";
import { getAllFoods } from "@/lib/data";
import { slugifyFood } from "@/lib/food";

const baseUrl = "https://pesticideguide.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/methodology", "/sources", "/about", "/disclaimer"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date("2026-08-20"),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...getAllFoods().map((food) => ({
      url: `${baseUrl}/food/${slugifyFood(food.name)}`,
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
