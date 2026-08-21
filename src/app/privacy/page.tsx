// input: 无
// output: 网站隐私政策页面（GDPR/CCPA 合规说明、Cookie 及数据处理政策）
// pos: 网站法律合规与搜索引擎信任背书核心单页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy and data protection practices for Pesticide Guide users.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="content-page prose-page">
      <header>
        <p className="eyebrow">Legal & Compliance</p>
        <h1>Privacy Policy</h1>
        <p>Last updated: August 21, 2026</p>
      </header>

      <section>
        <h2>1. Overview and Commitment</h2>
        <p>
          Pesticide Guide (pesticideguide.online) values your privacy. We are an educational, public health data platform designed to help consumers explore official produce monitoring data. We do not sell, rent, or monetize your personal information.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          <strong>Usage Data:</strong> We may collect anonymous, aggregated technical metrics (such as browser type, referring URLs, screen resolution, and pages visited) to optimize site performance and mobile responsiveness.
        </p>
        <p>
          <strong>Direct Communications:</strong> If you contact us via email, we retain your email address and message contents solely to respond to your inquiry, data correction request, or feedback.
        </p>
      </section>

      <section>
        <h2>3. Cookies and Local Storage</h2>
        <p>
          We use minimal local storage or functional session cookies to remember your interface preferences (such as selected international market filter in the Food Explorer). We do not deploy invasive third-party cross-site advertising trackers.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Services & Hosting</h2>
        <p>
          Our static website is hosted on secure global content delivery networks (Cloudflare / Vercel). These infrastructure providers process basic request logs (IP addresses, request headers) strictly for network security, DDoS prevention, and content delivery.
        </p>
      </section>

      <section>
        <h2>5. Your Rights (GDPR & CCPA)</h2>
        <p>
          Regardless of your jurisdiction, you have the right to access, correct, or request deletion of any personal communications sent to us. Because we do not maintain user accounts or persistent visitor profiles, no personal profiles are stored on our servers.
        </p>
      </section>

      <section>
        <h2>6. Contact Regarding Privacy</h2>
        <p>
          If you have questions or data rights requests, please contact our data privacy officer at:{" "}
          <a href="mailto:contact@pesticideguide.online">contact@pesticideguide.online</a>.
        </p>
      </section>
    </main>
  );
}
