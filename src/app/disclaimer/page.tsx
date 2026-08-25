// input: 无
// output: 网站免责声明页面（非医疗建议、数据局限性与来源变动说明，含 WebPage 结构化数据）
// pos: 网站合规声明与风险告知落地页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "Data & Health Disclaimer | Pesticide Guide Research",
  },
  description:
    "Read the medical and dietary disclaimer for Pesticide Guide. Understand data sampling boundaries, testing limits, and non-medical consumer guidance terms.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  const disclaimerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Data and Health Disclaimer",
    url: `${siteConfig.url}/disclaimer`,
    description:
      "Read the medical and dietary disclaimer for Pesticide Guide. Understand data sampling boundaries, testing limits, and non-medical consumer guidance terms.",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main className="content-page prose-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(disclaimerSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header>
        <p className="eyebrow">Use with context</p>
        <h1>Data and health disclaimer</h1>
      </header>
      <section>
        <h2>Not medical advice</h2>
        <p>
          Pesticide Guide provides educational comparisons. It does not diagnose
          disease, predict lifespan or recommend treatment.
        </p>
      </section>
      <section>
        <h2>Monitoring is not your individual exposure</h2>
        <p>
          Published samples represent particular foods, markets and years. They
          cannot establish what is present in a specific item you purchase.
        </p>
      </section>
      <section>
        <h2>Sources can change</h2>
        <p>
          Agencies revise files and definitions. Check the linked source before
          relying on a number for professional, regulatory or purchasing work.
        </p>
      </section>
    </main>
  );
}
