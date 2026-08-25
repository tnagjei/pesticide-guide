// input: 无
// output: 网站联系我们与反馈页面（数据纠错、学术交流与媒体联络渠道）
// pos: 建立用户与搜索引擎对网站运营主体的直接沟通渠道（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Pesticide Guide | Data Feedback & Editorial",
  },
  description:
    "Contact the Pesticide Guide research team for dataset corrections, agricultural citations, scientific feedback, and general consumer safety inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Pesticide Guide | Data Feedback & Editorial",
    description:
      "Contact the Pesticide Guide research team for dataset corrections, agricultural citations, scientific feedback, and general consumer safety inquiries.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [{ url: "/og-card.jpg", width: 1200, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Pesticide Guide | Data Feedback & Editorial",
    description:
      "Contact the Pesticide Guide research team for dataset corrections, agricultural citations, scientific feedback, and general consumer safety inquiries.",
    images: ["/og-card.jpg"],
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Pesticide Guide",
    url: `${siteConfig.url}/contact`,
    description:
      "Contact the Pesticide Guide research team for dataset corrections, agricultural citations, scientific feedback, and general consumer safety inquiries.",
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
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
      />
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
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
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
