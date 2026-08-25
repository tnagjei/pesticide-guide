// input: 无
// output: 网站关于页面（项目宗旨、定位与非医疗声明，含 AboutPage 结构化数据）
// pos: 网站品牌与可信度介绍落地页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "About Pesticide Guide | Produce Safety & Data Mission",
  },
  description:
    "Learn how Pesticide Guide translates 184,000+ public chemical lab tests into produce safety profiles, nutrition scores, and smart grocery shopping guides.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Pesticide Guide",
    url: `${siteConfig.url}/about`,
    description:
      "Learn how Pesticide Guide translates 184,000+ public chemical lab tests into produce safety profiles, nutrition scores, and smart grocery shopping guides.",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.contactEmail,
    },
  };

  return (
    <main className="content-page prose-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header>
        <p className="eyebrow">About the project</p>
        <h1>A clearer way to inspect produce monitoring data</h1>
        <p>
          Pesticide Guide turns dense public records into food profiles,
          cross-market comparisons and an interactive field map.
        </p>
      </header>
      <section>
        <h2>What this site is for</h2>
        <p>
          Most residue datasets are organised for analysts, not shoppers. This
          site keeps the underlying sources visible while making the comparison
          layer easier to browse.
        </p>
      </section>
      <section>
        <h2>What this site does not decide</h2>
        <p>
          A detection is not automatically a safety failure. A score cannot
          account for your diet, preparation method, health history or local
          product. Use the guide to ask better questions, not to replace
          professional advice.
        </p>
      </section>
    </main>
  );
}
