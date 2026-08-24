// input: getSnapshot(), getSourceGroups()
// output: 数据源目录页与 Dataset 结构化数据
// pos: 公开数据来源和许可边界（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import { getSnapshot, getSourceGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Data Sources",
  description:
    "Official pesticide monitoring and nutrition sources used by Pesticide Guide.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const sources = getSourceGroups();
  const { meta } = getSnapshot();
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Pesticide Guide produce monitoring snapshot",
    description:
      "A food-level comparison snapshot derived from public pesticide monitoring records and Food Compass 2.0.",
    dateModified: meta.generatedAt,
    license: "https://pesticideguide.online/terms#data-license",
    url: "https://pesticideguide.online/sources",
    variableMeasured: [
      "Sample count",
      "Pesticide detection rate",
      "Pesticide load score",
      "Benchmark coverage",
    ],
  };

  return (
    <main className="content-page prose-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetSchema).replace(/</g, "\\u003c"),
        }}
      />
      <header>
        <p className="eyebrow">Evidence register</p>
        <h1>Every source behind the guide</h1>
        <p>
          The current snapshot covers {meta.sampleCount.toLocaleString("en-US")}{" "}
          scored samples and {meta.contextSampleCount.toLocaleString("en-US")}{" "}
          context samples. Source years and coverage vary by food.
        </p>
      </header>
      <div className="source-directory">
        {sources.map((source, index) => (
          <a href={source.url} key={source.id} rel="noreferrer" target="_blank">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="eyebrow">{source.country}</p>
              <h2>{source.name}</h2>
            </div>
            <strong aria-hidden="true">↗</strong>
          </a>
        ))}
      </div>
    </main>
  );
}
