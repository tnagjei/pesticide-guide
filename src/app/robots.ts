// input: 无
// output: 网站搜索引擎与 AI 爬虫权限控制策略对象
// pos: 爬虫与索引控制入口文件（更新规则：文件变更需同步本注释与所属目录 README）

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/"],
      },
      {
        userAgent: [
          "GPTBot",
          "Claude-Web",
          "Anthropic-AI",
          "PerplexityBot",
          "GoogleOther",
          "DuckAssistBot",
        ],
        allow: ["/", "/food/", "/sources/", "/methodology/", "/about/"],
        disallow: ["/private/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
