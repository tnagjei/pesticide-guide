// input: 无
// output: PWA Web App Manifest 配置文件输出
// pos: 移动端 Web 应用与 PWA 规范入口（更新规则：文件变更需同步本注释与所属目录 README）

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: "Explore public pesticide monitoring data for familiar produce.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3eedf",
    theme_color: "#17352b",
  };
}
