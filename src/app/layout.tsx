// input: 全局页面子组件 children
// output: 网站根布局模板（含全局 Header, Footer, SEO 元数据、联系信息与 GA4）
// pos: Next.js 全局 HTML/Body 容器（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MakeThisBetterWidget } from "@/components/MakeThisBetterWidget";
import "./globals.css";

const siteUrl = "https://pesticideguide.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Produce Pesticide Guide | 2026 Residue Load & Organic Buying Data",
    template: "%s | Pesticide Guide",
  },
  description:
    "Compare 69 fruits, vegetables, and legumes using 184,000+ official pesticide residue lab tests (USDA, EFSA) and Food Compass 2.0 nutrition scores.",
  other: {
    "yandex-verification": "699bc0992432499d",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pesticide Guide - Compare Produce by Pesticide Load",
    description:
      "Explore 69 fruits, vegetables and legumes across 9 international markets using official USDA, EFSA and CFIA laboratory pesticide monitoring records.",
    url: siteUrl,
    siteName: "Pesticide Guide",
    images: [{ url: "/og-card.jpg", width: 1200, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pesticide Guide - Produce Pesticide Residue Atlas",
    description:
      "Compare 69 produce items using 184,000+ official laboratory pesticide monitoring records across 9 international markets.",
    images: ["/og-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Pesticide Guide home">
            <span className="brand-mark" aria-hidden="true">
              PG
            </span>
            <span>Pesticide Guide</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/methodology">Methodology</Link>
            <Link href="/sources">Sources</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        {children}
        <MakeThisBetterWidget />
       <footer className="site-footer">
         <div>
           <strong>Pesticide Guide</strong>
           <p>Public monitoring data, made easier to inspect.</p>
           <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "6px" }}>
              © {new Date().getFullYear()} Pesticide Guide · Contact:{" "}
              <a href="mailto:contact@pesticideguide.online" style={{ color: "inherit", textDecoration: "underline" }}>
                contact@pesticideguide.online
              </a>
           </p>
         </div>
         <nav aria-label="Footer navigation">
           <Link href="/methodology">Methodology</Link>
           <Link href="/sources">Sources</Link>
           <Link href="/about">About</Link>
           <Link href="/privacy">Privacy</Link>
           <Link href="/terms">Terms</Link>
           <Link href="/contact">Contact</Link>
           <Link href="/disclaimer">Disclaimer</Link>
           <a href="https://pesticide-guide.makethisbetter.dev" target="_blank" rel="noopener noreferrer">
             Feedback
           </a>
         </nav>
       </footer>
      </body>
      <GoogleAnalytics gaId="G-CHT0MX5QK1" />
    </html>
  );
}
