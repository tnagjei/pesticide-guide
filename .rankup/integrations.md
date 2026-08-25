# 平台接入清单

状态规则：✅ 已验证，⬜ 待验证或待接入，❌ 明确不接。

| 类别 | 平台 | 状态 | 证据或下一步 | 最近核验 |
|---|---|---|---|---|
| 托管方分析 | Cloudflare Web Analytics | ⬜ | 公开首页未发现 `cloudflareinsights`；未查后台 | 2026-08-24 |
| 产品分析 | GA4 | ✅ | 首页 HTML 含 Google Analytics / Tag Manager 脚本 | 2026-08-24 |
| 行为分析 | Microsoft Clarity | ⬜ | 首页未发现 Clarity 脚本；未查后台 | 2026-08-24 |
| 外链视角 | Ahrefs Site Explorer | ⬜ | 未查 Ahrefs 后台 | 2026-08-24 |
| 外链视角 | Ahrefs Web Analytics | ⬜ | 首页未发现 Ahrefs Analytics 脚本；未查后台 | 2026-08-24 |
| 搜索平台 | Google Search Console | ✅ | `sitemaps.list` 只读 API 返回 1 条：`https://pesticideguide.online/sitemap.xml`；已抓取 `2026-08-24T09:47:22.285Z`；pending=false、errors=0、warnings=0 | 2026-08-24 |
| 搜索平台 | Bing Webmaster | ⬜ | 无法验证：OpenCLI 浏览器扩展未连接，`BING_WEBMASTER_API_KEY` 与 `BING_API_KEY` 均未配置；未执行提交 | 2026-08-24 |
| 搜索平台 | Yandex Webmaster | ✅ | 首页 HTML 含 `yandex-verification` | 2026-08-24 |
| 搜索平台 | Naver Search Advisor | ⬜ | 未发现本轮验证证据 | 2026-08-24 |
| 索引推送 | IndexNow | ✅ | `https://pesticideguide.online/21827c2c7616f2183a10dd7e52102ede.txt` HTTP 200；线上与本地原始字节一致；未执行提交 | 2026-08-24 |
| 品牌资产 | favicon / manifest / icons | ⬜ | 本轮未逐项请求资源路径 | 2026-08-24 |
| SEO 元素 | title / description / robots / OG | ✅ | 首页 title、description、canonical、robots 与 sitemap 均可读；OG 未单独核验 | 2026-08-24 |
| 结构化数据 | JSON-LD | ✅ | 首页 HTML 含 `application/ld+json` | 2026-08-24 |
| AI 就绪度 | is-agentic | ⬜ | 未运行扫描 | 2026-08-24 |
| 多语言 | hreflang | ❌ | 当前项目未观察到多语言路由；不启用该项 | 2026-08-24 |

本表只记录状态，不代表已完成任何外部提交。
