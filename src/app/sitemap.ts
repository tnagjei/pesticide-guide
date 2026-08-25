// input: getAllFoods()
// output: 网站 sitemap.xml 索引数据
// pos: 搜索引擎站点地图生成入口（更新规则：文件变更需同步本注释与所属目录 README）

import type { MetadataRoute } from "next";
import { getAllFoods } from "@/lib/data";
import { slugifyFood } from "@/lib/food";
import { siteConfig } from "@/lib/siteConfig";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/methodology", "/sources", "/about", "/disclaimer", "/privacy", "/terms", "/contact"];
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
