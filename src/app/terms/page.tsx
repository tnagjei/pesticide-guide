// input: 无
// output: 网站服务条款页面（免责声明、知识产权与用户使用条款）
// pos: 网站法律合规与服务边界界定核心单页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service and legal conditions for accessing Pesticide Guide.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="content-page prose-page">
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

      <section>
        <h2>5. Modifications to Service</h2>
        <p>
          We reserve the right to modify, update, or discontinue features of the website at any time without prior notice.
        </p>
      </section>

      <section>
        <h2>6. Contact and Inquiries</h2>
        <p>
          For legal notices or questions regarding these terms, contact us at:{" "}
          <a href="mailto:contact@pesticideguide.online">contact@pesticideguide.online</a>.
        </p>
      </section>
    </main>
  );
}
