// input: 无
// output: 网站服务条款页面（免责声明、知识产权与用户使用条款）
// pos: 网站法律合规与服务边界界定核心单页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    absolute: "Terms of Service & Data Licensing | Pesticide Guide",
  },
  description:
    "Read the Terms of Service and data licensing conditions for Pesticide Guide. Understand acceptable use, intellectual property rights, and public data terms.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service & Data Licensing | Pesticide Guide",
    description:
      "Read the Terms of Service and data licensing conditions for Pesticide Guide. Understand acceptable use, intellectual property rights, and public data terms.",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    images: [{ url: "/og-card.jpg", width: 1200, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service & Data Licensing | Pesticide Guide",
    description:
      "Read the Terms of Service and data licensing conditions for Pesticide Guide. Understand acceptable use, intellectual property rights, and public data terms.",
    images: ["/og-card.jpg"],
  },
};

export default function TermsPage() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: `${siteConfig.url}/terms`,
    description:
      "Read the Terms of Service and data licensing conditions for Pesticide Guide. Understand acceptable use, intellectual property rights, and public data terms.",
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
          __html: JSON.stringify(termsSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header>
        <p className="eyebrow">Legal & Terms</p>
        <h1>Terms of Service</h1>
        <p>Last updated: August 21, 2026</p>
      </header>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Pesticide Guide (pesticideguide.online), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this site.
        </p>
      </section>

      <section>
        <h2>2. Informational and Educational Purpose Only</h2>
        <p>
          All information, scores, coordinate maps, and chemical analyses provided on this website are derived from publicly available government and academic datasets (including the USDA PDP, EFSA, CFIA, and Tufts University Food Compass 2.0). They are offered strictly for educational and general consumer informational purposes.
        </p>
        <p>
          Nothing on this website constitutes medical, nutritional, or toxicological diagnosis or treatment. For personal health decisions, always consult a qualified healthcare provider or registered dietitian.
        </p>
      </section>

      <section>
        <h2>3. Accuracy and Limitations of Data</h2>
        <p>
          While we strive for scientific rigor in translating laboratory records, agricultural samples vary widely across geographic harvest locations, seasons, and farming practices. We do not warrant that all datasets reflect real-time conditions of specific retail produce items.
        </p>
        <p>
          For full mathematical methodology and source registries, please review our{" "}
          <Link href="/methodology">Methodology</Link> and{" "}
          <Link href="/sources">Data Sources</Link>.
        </p>
      </section>

      <section>
        <h2>4. Intellectual Property</h2>
        <p>
          The site design, interactive 2D atlas implementation, software code, and comparative scoring algorithms are protected by copyright. Government monitoring raw datasets remain under their respective public domain or open government licenses.
        </p>
      </section>
      <section id="data-license">
        <h2>5. Data License</h2>
        <p>
          The derived food-level comparisons, labels, and snapshot presented by
          Pesticide Guide are distributed under these Terms of Service. The
          underlying government and academic source datasets are not relicensed
          by Pesticide Guide and remain subject to their respective licenses.
          Follow the source links on the <Link href="/sources">Data Sources</Link>
          page for the applicable source terms.
        </p>
      </section>

      <section>
        <h2>6. Modifications to Service</h2>
        <p>
          We reserve the right to modify, update, or discontinue features of the website at any time without prior notice.
        </p>
      </section>

      <section>
        <h2>7. Contact and Inquiries</h2>
        <p>
          For legal notices or questions regarding these terms, contact us at:{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </section>
    </main>
  );
}
