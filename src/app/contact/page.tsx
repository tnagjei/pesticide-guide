// input: 无
// output: 网站联系我们与反馈页面（数据纠错、学术交流与媒体联络渠道）
// pos: 建立用户与搜索引擎对网站运营主体的直接沟通渠道（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Pesticide Guide editorial and scientific data team.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="content-page prose-page">
      <header>
        <p className="eyebrow">Get in touch</p>
        <h1>Contact & Feedback</h1>
        <p>
          We welcome feedback, scientific citations, data correction submissions, and partnership inquiries.
        </p>
      </header>

      <section>
        <h2>Direct Editorial & Scientific Inquiries</h2>
        <p>
          If you are an agricultural researcher, laboratory analyst, or consumer who noticed an anomaly in our data mappings, please email our lead research inbox:
        </p>
        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
          <a href="mailto:contact@pesticideguide.online">contact@pesticideguide.online</a>
        </p>
        <p>
          We aim to review and verify all public dataset discrepancies within 2 business days.
        </p>
      </section>

      <section>
        <h2>Submitting Data Corrections</h2>
        <p>
          When submitting a correction or requesting an additional produce item, please provide:
        </p>
        <ul>
          <li>The specific crop name and common variety</li>
          <li>Link to the official regulatory testing dataset (e.g., USDA PDP, EFSA annual report)</li>
          <li>Sample year and national market reference</li>
        </ul>
      </section>

      <section>
        <h2>Key Project Documentation</h2>
        <p>
          Before submitting questions about scoring weights or sample normalization, check our comprehensive documentation:
        </p>
        <ul>
          <li>
            <Link href="/methodology">Methodology & Toxicological Scoring</Link>
          </li>
          <li>
            <Link href="/sources">Official Government Source Registries</Link>
          </li>
          <li>
            <Link href="/disclaimer">Data & Health Disclaimer</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
