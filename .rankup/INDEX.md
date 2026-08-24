# Rankup 项目索引

- 项目：Pesticide Guide
- 最近更新：2026-08-24T09:03:42Z
- 当前阶段：7，已上线站点的搜索与增长基线初始化
- 上一个完成的关卡：阶段 6，公开站点可访问，2026-08-24 核验首页、关键页面、robots.txt 与 sitemap.xml
- 下一步动作：先确认 GSC 的 final 数据何时出现，再决定是否进入内容与索引观察计划
- 当前阻塞：GSC 定稿数据暂无 2026-07 月数据；外部托管后台、Bing、Ahrefs、Clarity、IndexNow 未在本轮核验

## 推荐读取顺序

1. PROJECT.md
2. architecture.md
3. infrastructure.md
4. integrations.md
5. baseline.md
6. audit.md
7. plan.md

## 文件状态

| 文件 | 内容 | 最近核对 | 状态 |
|---|---|---|---|
| PROJECT.md | 产品目标与边界 | 2026-08-24 | current |
| architecture.md | Next.js 应用与数据边界 | 2026-08-24 | current |
| infrastructure.md | Vercel、域名与线上路径 | 2026-08-24 | partially-verified |
| integrations.md | 平台接入状态 | 2026-08-24 | partially-verified |
| baseline.md | SEO、索引与访问基线 | 2026-08-24 | current |
| audit.md | 当前风险与证据 | 2026-08-24 | current |
| plan.md | 当前计划与阻塞 | 2026-08-24 | current |
| roadmap.md | 长期方向与放弃条件 | 2026-08-24 | initial |
| keywords.md | 关键词目标清单 | 2026-08-24 | pending-research |

## 最近变化

- 2026-08-24：首次创建 `.rankup/` 项目记忆；未修改业务代码、未部署、未提交 Git。
- 2026-08-24：GSC `final` 查询 2026-07-01 至 2026-07-31 返回 0 行；`all` 查询返回 2 次展示、0 点击，首个不完整日期为 2026-08-23。
- 2026-08-24：公开首页、关键页面、robots.txt 与 sitemap.xml 均返回 HTTP 200；sitemap 返回 77 个 URL。

## 项目脚本

- 当前没有新增项目级 Rankup 脚本。
- 全局 GSC 入口：`/Users/tangjei/.local/bin/gsc`，读取仓库根目录 `.gsc.json`。
