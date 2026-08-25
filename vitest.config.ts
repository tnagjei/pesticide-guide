// input: 无
// output: Vitest 自动化单元测试框架配置文件
// pos: 本地测试运行器配置文件（更新规则：文件变更需同步根目录 README）

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
