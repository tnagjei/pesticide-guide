// input: 全局页面子组件 children
// output: 网站根布局模板（含全局 Header, Footer, SEO 元数据与联系信息）
// pos: Next.js 全局 HTML/Body 容器（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import Link from "next/link";
import { MakeThisBetterWidget } from "@/components/MakeThisBetterWidget";
import "./globals.css";

const siteUrl = "https://pesticideguide.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pesticide Guide | Compare Produce by Pesticide Load",
    template: "%s | Pesticide Guide",
  },
  description:
    "Compare 69 fruits, vegetables and legumes using public pesticide monitoring records and Food Compass 2.0 nutrition scores.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pesticide Guide",
    description:
      "A field guide to pesticide monitoring data for 69 familiar foods.",
    url: siteUrl,
    siteName: "Pesticide Guide",
    images: [{ url: "/og-card.jpg", width: 1200, height: 800 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pesticide Guide",
    description:
      "Compare public pesticide monitoring data across 69 familiar foods.",
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
    </html>
  );
}
