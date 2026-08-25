# 技术与增长体检

观察日期：2026-08-24。

| 严重度 | 项目 | 状态 | 证据 | 下一步 |
|---|---|---|---|---|
| P0 | GSC 定稿数据不足 | open | 2026-07-01 至 2026-07-31 `final` 返回 0 行 | 等待完整窗口后再做趋势判断 |
| P1 | GSC 最近数据不完整 | open | `firstIncompleteDate=2026-08-23` | 查询时继续区分 `final` 与 `all` |
| P1 | sitemap 与本地路由数量需对账 | open | 线上 sitemap 77 个 URL；本轮未运行 build | 用生成产物和线上 sitemap 做一次完整 URL 对账 |
| P1 | 生产托管状态未实时确认 | open | README 记录 Vercel；未查 Vercel 后台 | 需要部署判断时再查后台或部署 API |
| P2 | 外部平台接入状态不完整 | open | GA4、Yandex、GSC 有公开/API 证据；其他平台未核验 | 按需逐项核验，不自动提交 |
| P2 | 关键词目标队列为空 | open | 未找到本轮日期匹配的关键词报告 | 先完成研究报告和验证，再生成执行计划 |

## 已确认

- 公开站点主要路径可访问。
- 首页有基础 SEO 元素和 JSON-LD。
- GSC API 只读授权可用，站点配置未被猜测或覆盖。

## 未做

- 未修改业务代码。
- 未运行测试、typecheck 或 build。
- 未部署。
- 未执行外链、IndexNow、站点地图提交或任何外部表单提交。

## 2026-08-24T10:01:49Z 实时回读

### 当前回读

- 线上 `https://pesticideguide.online/sitemap.xml`：HTTP 200，77 个 `<loc>`，完整 URL 清单见 `journal/2026-08-24-sitemap-status.md`；响应 SHA-256 为 `f8b39b3cbfced389e1153be6492530698e42246bd812ad97f7b744e5eac2d577`。
- IndexNow key：`https://pesticideguide.online/21827c2c7616f2183a10dd7e52102ede.txt` HTTP 200；线上与本地文件原始 33 字节完全一致，SHA-256 均为 `93735e772dbfc7ee12ee74eaa1a5e51264050c569522c6773a0060bedd14fe0c`。
- GSC sitemap：通过现有只读 OAuth 调用 `sitemaps.list` 返回 1 条；path 为线上 sitemap，lastSubmitted=`2026-08-21T10:44:53.863Z`，lastDownloaded=`2026-08-24T09:47:22.285Z`，isPending=false，errors=0，warnings=0。

### 无法验证

- Bing Webmaster sitemap：Rankup 的只读状态脚本因 OpenCLI 报 `unknown command 'browser'` 失败；`opencli doctor` 显示浏览器扩展未连接；本机未配置 `BING_WEBMASTER_API_KEY` 或 `BING_API_KEY`。因此状态为无法验证，不是“无 sitemap”。

### 本轮边界

- 未调用任何 `submit` 命令。
- 未修改业务代码、未部署、未提交 Git。
- 本轮仅更新与核验直接相关的 `.rankup/` 记录。
