# 当前基线

观察日期：2026-08-24。外部数据只代表本次查询窗口，不代表永久状态。

## GSC

- Property：`sc-domain:pesticideguide.online`，来自仓库 `.gsc.json`。
- `final`，2026-07-01 至 2026-07-31：0 行，未返回展示或点击。
- `all`，2026-07-01 至 2026-08-23：4 个日期行；展示 2，点击 0，CTR 0，返回平均位置 14。
- `all` 元信息：`firstIncompleteDate=2026-08-23`。2026-08-23 数据不应当当作完整结论。

## 公开站点

- 首页、`/sources`、`/privacy`、`/robots.txt`、`/sitemap.xml`：HTTP 200。
- 线上 sitemap：77 个 `<loc>`；HTTP 200；SHA-256 `f8b39b3cbfced389e1153be6492530698e42246bd812ad97f7b744e5eac2d577`，2026-08-24T10:01:49Z。
- 线上 sitemap 的完整 URL 清单：见 `journal/2026-08-24-sitemap-status.md`。
- IndexNow key：HTTP 200；线上与本地原始字节一致，SHA-256 `93735e772dbfc7ee12ee74eaa1a5e51264050c569522c6773a0060bedd14fe0c`，2026-08-24T10:01:49Z。
- GSC sitemap：1 条，path 为线上 sitemap；lastDownloaded=`2026-08-24T09:47:22.285Z`，isPending=false，errors=0，warnings=0。
- Bing Webmaster sitemap：无法验证；浏览器扩展未连接且未配置 Bing API key。
- 首页包含 title、description、canonical、GA4/Tag Manager、Yandex verification 和 JSON-LD。

## 本地项目

- 项目 README 记录 69 条食品数据和 83 个静态路由历史构建结果；本轮未运行构建，不把历史构建结果当作本次验证结果。
- 本轮未运行测试、typecheck 或 build。
