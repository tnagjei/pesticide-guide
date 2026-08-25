# scripts
- 用途：保存本项目需要重复执行的 Rankup 操作脚本。
- 关键入口：当前没有项目级可执行脚本；本项目实际复用下方全局入口。
- 边界/依赖：脚本不得保存凭据；重复操作首次跑通后再固化。下列记录只描述已执行或明确未执行的入口。
> 一旦本目录内容变化，请更新本文件与 INDEX.md

## 入口清单

| 入口 | 最近验证 | 参数列表 | 登录态要求 | 输出位置 | 已知限制 |
|---|---|---|---|---|---|
| `/Users/tangjei/.agents/skills/rankup/scripts/is-agentic.mjs` | 2026-08-24 | `scan <domain> --save --project <root>`；另有 `diff <domain>`、`history <domain>` | 不需要项目登录态；调用公开报告服务 | `.rankup/agentic/<domain>/<date>.json` | 优先读取已有报告；没有报告时通过 CLI 触发扫描；分数不代表流量或收录 |
| `/Users/tangjei/.local/bin/gsc` | 2026-08-24 | `query --start <YYYY-MM-DD> --end <YYYY-MM-DD> --dimensions <list> --data-state <final|all> --type web` | 需要全局只读 OAuth；站点从仓库 `.gsc.json` 读取 | 默认输出终端；需要保存时使用 `--output <path>` | `final` 与 `all` 必须分开解释；近期 `all` 数据可能不完整 |
| `/Users/tangjei/.agents/skills/rankup/scripts/webmaster-sitemap.mjs` | 2026-08-24 | `gsc|bing status --property <id>` 或 `--site <url> --sitemap <url>`；支持 `submit`，本项目本轮未执行 | 需要用户浏览器已登录；依赖 OpenCLI Browser Bridge | 默认输出终端；状态证据写入 `.rankup/audit.md`、`baseline.md`、`integrations.md` | 当前 OpenCLI 扩展未连接；`status` 失败不能推断平台没有 sitemap |
| `/Users/tangjei/.agents/skills/rankup/scripts/indexnow-submit.mjs` | 2026-08-24（仅核验 key，未运行提交） | `--site <url>`、`--sitemap <url>` 或显式 URL 列表；提交命令禁止在本记录中自动执行 | 不需要登录态；需要在线 key 文件 | 默认输出终端；本项目 key 证据写入 `.rankup/audit.md` 和 `infrastructure.md` | key 在线不等于已提交或已收录；本项目本轮未调用提交接口 |

## 本项目已验证的输出

- AI Agent 基线：`.rankup/agentic/pesticideguide.online/2026-08-24.json`，75/100，扫描时间 2026-08-24T10:15:05Z。
- GSC sitemap：只读 API 结果写入 `.rankup/audit.md`、`.rankup/baseline.md` 和 `.rankup/integrations.md`。
- sitemap 与 IndexNow key：线上回读证据写入 `.rankup/journal/2026-08-24-sitemap-status.md`。

## 登录与安全边界

- 不在项目内保存 GSC OAuth、浏览器 Cookie、Bing API key 或其他令牌。
- GSC 凭据只在 `/Users/tangjei/.config/gsc-api/` 全局目录使用。
- GSC/Bing sitemap 的 `submit` 是外部写操作，必须单独授权；本项目本轮未执行。

## Files

- README.md：目录职责与当前脚本清单。
