# scripts
- 用途：存放官方监测数据抓取与离线处理脚本
- 关键入口：extract-data.mjs, generate-llms-full.mjs, submit-indexnow.mjs
- 边界/依赖：独立运行于 Node.js 环境，输出数据至 src/data/
> 一旦本目录内容变化，请更新本文件

## Files
- extract-data.mjs：官方监测数据提取与转换脚本
- generate-llms-full.mjs：全量大模型知识库文件（public/llms-full.txt）生成脚本
- submit-indexnow.mjs：全站 83 个静态路由 IndexNow 自动批量提交脚本
