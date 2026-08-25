// input: 无
// output: 网站 404 自定义错误缺省页面
// pos: 错误路由兜底展示（更新规则：文件变更需同步本注释与所属目录 README）

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-page not-found">
      <p className="eyebrow">404 · specimen not found</p>
      <h1>That food is not in this field guide.</h1>
      <Link className="button button-primary" href="/">
        Return to the food map
      </Link>
    </main>
  );
}
