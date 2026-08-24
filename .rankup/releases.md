# 发布记录

## 初始化前线上状态 — 2026-08-24

- 环境：production
- 变更：无；本次只创建项目级 `.rankup/` 记忆。
- 部署目标：Vercel（来自项目 README，未查后台）
- 数据迁移：无
- 线上验证：首页、`/sources`、`/privacy`、`/robots.txt`、`/sitemap.xml` HTTP 200。
- 监控：未建立本轮观察窗口。
- 回滚点：无需回滚业务代码；删除本次新建 `.rankup/` 前需用户明确授权。
- 证据：`baseline.md` 与本次命令输出。
- 结论：partially-verified；公开访问已核验，部署后台和发布 SHA 未核验。
