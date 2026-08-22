# app
- 用途：Next.js 16 App Router 路由目录，提供静态生成（SSG）页面与 SEO 结构化输出
- 关键入口：page.tsx, layout.tsx, food/[slug]/page.tsx
- 边界/依赖：依赖 src/components/FoodExplorer.tsx 与 src/lib/
> 一旦本目录内容变化，请更新本文件

## Files
- page.tsx：网站首页（首屏 2D 罗盘与二屏 SEO 结构化指南）
- layout.tsx：全站通用布局、元数据、导航、GA4 与 MakeThisBetter 反馈入口
- globals.css：全站全局 CSS 样式表与 2D 罗盘动画
- food/[slug]/page.tsx：69 种果蔬独立详情页与市场对比
- methodology/page.tsx：官方农残计算方法论页面
- sources/page.tsx：官方实验室数据源权威列表
- about/page.tsx：项目背景与团队介绍
- disclaimer/page.tsx：数据限制与免责声明
 - privacy/page.tsx：隐私政策与合规页面
 - terms/page.tsx：服务条款与法律责任边界页面
 - contact/page.tsx：联系我们与数据纠错反馈页面
- robots.ts / sitemap.ts / manifest.ts / public/*.txt：SEO 爬虫、站点地图、IndexNow 密钥与 PWA 配置
