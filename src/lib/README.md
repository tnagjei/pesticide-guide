# lib
- 用途：提供数据加载、农残评级算法、象限布局演算、全站元信息配置与测试用例
- 关键入口：siteConfig.ts, data.ts, food.ts, types.ts
- 边界/依赖：读取 src/data/foods.json
> 一旦本目录内容变化，请更新本文件

## Files
- siteConfig.ts：全站统一站点元信息、SEO 默认配置与联系方式对象
- data.ts：官方监测数据快照加载与内页查询
- food.ts：农残清洁度换算、采购决策判断与 2D 坐标排布算法
- types.ts：果蔬数据、市场维度与监测源的 TypeScript 类型定义
- data.test.ts：数据完整性与快照格式自动化单元测试
- food.test.ts：决策算法与象限布局自动化单元测试
