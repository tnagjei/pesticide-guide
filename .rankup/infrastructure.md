# 基础设施

| 项目 | 当前状态 | 证据与日期 |
|---|---|---|
| 生产域名 | `pesticideguide.online` 可访问 | 首页、关键页、robots.txt、sitemap.xml HTTP 200，2026-08-24 |
| 托管方 | Vercel（项目 README 记录） | 本地 README，未查询 Vercel 后台，2026-08-24 |
| DNS A | `198.18.0.160` | `dig A pesticideguide.online`，2026-08-24；该结果不是托管方归属证明 |
| DNS CNAME | 未返回 | `dig CNAME pesticideguide.online`，2026-08-24 |
| sitemap | 在线生成，77 个 URL | `https://pesticideguide.online/sitemap.xml`，2026-08-24 |
| robots | 在线返回 200 | `https://pesticideguide.online/robots.txt`，2026-08-24 |

## 未验证

- Vercel 项目、部署 SHA、环境变量和生产部署记录。
- Cloudflare zone、缓存、Web Analytics 与 Workers 资源。
- DNS 记录是否来自真实公网解析；当前 A 记录处于保留地址段，不能据此推断托管归属。
