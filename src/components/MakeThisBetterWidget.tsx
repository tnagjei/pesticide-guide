"use client";
// input: MakeThisBetter 项目公钥
// output: 在浏览器端初始化全站用户反馈组件
// pos: Next.js 全局布局中的客户端初始化组件（更新规则：文件变更需同步本注释与所属目录 README）

import { useEffect } from "react";
import { MakeThisBetter } from "makethisbetter";

export function MakeThisBetterWidget() {
  useEffect(() => {
    MakeThisBetter.init({
      projectKey: "mtb_proj_WIZguJE6PnTB5cN7yL_84XrtFccdEfd6",
      locale: "en",
      theme: "light",
      position: "right",
    });

    return () => MakeThisBetter.destroy();
  }, []);

  return null;
}
