# 应用架构

## 当前形态

- 框架：Next.js 16 App Router，静态生成站点。
- 页面：首页、食品动态详情页、methodology、sources、about、disclaimer、privacy、terms、contact。
- SEO 入口：`src/app/layout.tsx`、`src/app/sitemap.ts`、`src/app/robots.ts`。
- 交互入口：`src/components/FoodExplorer.tsx`。
- 数据入口：`src/data/foods.json`、`src/lib/data.ts`、`src/lib/food.ts`。

## 数据边界

- 食品记录由本地 JSON 提供，页面通过 TypeScript 逻辑生成排序、详情和结构化数据。
- 公开页面只应表达项目计算出的相对比较结果，不应伪装成官方榜单或个人医疗判断。
- 反馈组件由 `src/components/MakeThisBetterWidget.tsx` 接入；本轮未核对第三方后台状态。

## 验证范围

- 本轮读取源码、路由清单、package.json 和线上公开页面。
- 未运行 build、未修改业务代码、未部署。
