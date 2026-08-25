// input: params.slug (单品路由参数)
// output: 69 种果蔬单品深度评级与 SEO 页面（含 3 秒购买结论、清洗指南、官方实验室检测数据与同类推荐）
// pos: 网站长尾流量承接与核心转化落地页（更新规则：文件变更需同步本注释与所属目录 README）

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FoodVisual } from "@/components/FoodVisual";
import { getAllFoods, getFoodBySlug, getSource } from "@/lib/data";
import {
  buyingVerdict,
  confidenceLevel,
  foodDescription,
  pesticideLabel,
  slugifyFood,
} from "@/lib/food";

export function generateStaticParams() {
  return getAllFoods().map((food) => ({ slug: slugifyFood(food.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const food = getFoodBySlug((await params).slug);
  if (!food) return {};

  const title =
    food.name.length > 12
      ? `${food.name} Pesticide Residue & Buying Guide (2026)`
      : `${food.name} Pesticide Residue & Organic Buying Guide (2026)`;

  const rec =
    food.score >= 70
      ? "Prioritize organic due to thin skin and residue."
      : food.score >= 40
        ? "Conventional is fine; wash well to lower residue."
        : "Conventional is safe; thick peel minimizes residue.";

  let desc = `Official lab data for ${food.name.toLowerCase()}: pesticide load ${food.score}/100 (${food.samples.toLocaleString("en-US")} tests). ${rec} View chemicals and washing tips.`;
  if (desc.length < 140) {
    desc = `Official lab data for ${food.name.toLowerCase()}: pesticide residue load ${food.score}/100 (${food.samples.toLocaleString("en-US")} tests). ${rec} View chemicals and washing tips.`;
  }

  return {
    title: {
      absolute: title,
    },
    description: desc,
    alternates: { canonical: `/food/${slugifyFood(food.name)}` },
    openGraph: {
      title: `${food.name} Pesticide Residue & Nutrition Data`,
      description: desc,
      images: ["/og-card.jpg"],
    },
  };
}

export default async function FoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const food = getFoodBySlug((await params).slug);
  if (!food) notFound();

  const allFoods = getAllFoods();
  const sameCategory = allFoods.filter((item) => item.category === food.category);
  const sortedByCategoryPesticide = [...sameCategory].sort((a, b) => b.score - a.score);
  const categoryRank = sortedByCategoryPesticide.findIndex((item) => item.code === food.code) + 1;

  const related = sameCategory.filter((item) => item.code !== food.code).slice(0, 6);
  const verdict = buyingVerdict(food);

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${food.name} pesticide monitoring profile`,
    description: foodDescription(food),
    dateModified: "2026-08-20",
    license: "https://pesticideguide.online/terms#data-license",
    creator: { "@type": "Organization", name: "Pesticide Guide" },
   variableMeasured: [
     "Pesticide load score",
     "Pesticide detection rate",
     "Benchmark coverage",
     "Food Compass 2.0 score",
   ],
 };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Produce Atlas",
        item: "https://pesticideguide.online",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${food.category.charAt(0).toUpperCase() + food.category.slice(1)}s`,
        item: "https://pesticideguide.online/#explorer",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: food.name,
        item: `https://pesticideguide.online/food/${slugifyFood(food.name)}`,
      },
    ],
  };

  const isThinSkinned = ["fruit", "vegetable"].includes(food.category) && food.score >= 40;

  return (
    <main className="content-page food-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetSchema).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Food Map & Atlas</Link>
        <span>/</span>
        <Link href="/#explorer">{food.category.toUpperCase()}S</Link>
        <span>/</span>
        <span>{food.name}</span>
      </nav>

      {/* Hero Header */}
      <header className="food-hero">
        <span className="food-hero-emoji" aria-hidden="true">
          <FoodVisual emoji={food.emoji} name={food.name} size={64} />
        </span>
        <div className="food-hero-details">
          <div className="food-hero-eyebrows">
            <span className="eyebrow">{food.category} Data Profile</span>
            <span className="rank-badge">
              #{categoryRank} of {sameCategory.length} in {food.category}s
            </span>
          </div>
          <h1>{food.name}</h1>
          <p>{foodDescription(food)}</p>
        </div>
        <span className={`evidence-badge evidence-${confidenceLevel(food).toLowerCase()}`}>
          {confidenceLevel(food)} Evidence
        </span>
      </header>

      {/* 3-Second Shopper Verdict Banner */}
      <section className={`food-verdict-banner verdict-tone-${verdict.tone}`} aria-label="Buying Recommendation">
        <div className="verdict-banner-content">
          <div className="verdict-banner-badge">{verdict.badge}</div>
          <p className="verdict-banner-text">
            <strong>Shopping Verdict: </strong>
            {verdict.recommendation}
          </p>
        </div>
        <Link className="button button-secondary button-recall" href="/#explorer">
          Compare on Live Compass ↗
        </Link>
      </section>

      {/* 4 Key Metrics Strip */}
      <section className="metric-strip" aria-label="Key metrics">
        <div>
          <span>Pesticide Load</span>
          <strong className={`metric-val-${verdict.tone}`}>{food.score}</strong>
          <small>{pesticideLabel(food)} (0=clean, 100=max)</small>
        </div>
        <div>
          <span>Food Compass 2.0</span>
          <strong>{food.healthSourceScore}</strong>
          <small>{food.healthMatchType} nutritional match</small>
        </div>
        <div>
          <span>Monitoring Samples</span>
          <strong>{food.samples.toLocaleString("en-US")}</strong>
          <small>
            {food.firstYear}–{food.lastYear} lab tests
          </small>
        </div>
        <div>
          <span>Benchmark Coverage</span>
          <strong>{food.benchmarkCoverage}%</strong>
          <small>of detected residue load</small>
        </div>
      </section>

      {/* Practical Washing & Preparation Guide */}
      <section className="washing-guide-card">
        <div className="washing-header">
          <span className="washing-icon" aria-hidden="true">💧</span>
          <div>
            <p className="eyebrow">Preparation & Safety</p>
            <h2>How to wash and prepare {food.name.toLowerCase()}</h2>
          </div>
        </div>
        <div className="washing-body">
          <p>
            {isThinSkinned
              ? `Because ${food.name.toLowerCase()} has higher surface permeability, synthetic pesticides easily adhere to the skin. To reduce exposure by up to 80–90%, soak in a 1% baking soda water solution (1 tsp baking soda per 2 cups cold water) for 12 to 15 minutes, then rinse vigorously under running water.`
              : `For ${food.name.toLowerCase()}, pesticide penetration into the edible portion is relatively low. Wash thoroughly under cool running water for 30 seconds before peeling or slicing to prevent transferring surface contaminants onto clean kitchen tools.`}
          </p>
        </div>
      </section>

      {/* Market Comparison & Sparse Sample Disclosure */}
      <div className="content-columns">
        <section>
          <div className="section-title-wrap">
            <p className="eyebrow">Market Comparison</p>
            <h2>How {food.name.toLowerCase()} varies by market</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Market</th>
                  <th>Load Score</th>
                  <th>Samples Tested</th>
                  <th>Detection Rate</th>
                  <th>Reliability</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(food.marketData)
                  .filter(([key]) => !key.includes("organic") && !key.includes("conventional"))
                  .map(([key, market]) => {
                    const isSparse = market.samples < 30;
                    return (
                      <tr key={key}>
                        <th>{key.toUpperCase()}</th>
                        <td>
                          <strong>{market.score}</strong>
                        </td>
                        <td>{market.samples.toLocaleString("en-US")}</td>
                        <td>{market.detected}%</td>
                        <td>
                          {isSparse ? (
                            <span className="badge-sparse" title="Sample size under 30. Low statistical certainty.">
                              ⚠️ Sparse ({market.samples})
                            </span>
                          ) : (
                            <span className="badge-reliable">✓ Solid ({market.samples})</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <p className="table-note">
            ⚠️ <strong>Data Note:</strong> Markets marked with <em>Sparse</em> have under 30 official laboratory samples in the public record. A 0% detection in sparse tests does not guarantee absolute absence of residue in that region.
          </p>
        </section>

        <aside className="method-card">
          <p className="eyebrow">Toxicology Context</p>
          <h2>Comparison, not medical risk</h2>
          <p>
            The load score compares {food.name.toLowerCase()} relative to other produce in this database. A residue detection does not automatically mean a single sample exceeds legal safety limits or poses acute harm.
          </p>
          <Link href="/methodology">Read the full testing methodology →</Link>
        </aside>
      </div>

      {/* Residue Drivers */}
      <section>
        <p className="eyebrow">Chemical Residue Breakdown</p>
        <h2>Primary chemicals detected on {food.name.toLowerCase()}</h2>
        <div className="residue-grid">
          {food.topResidues.length > 0 ? (
            food.topResidues.slice(0, 4).map((residue) => (
              <article key={residue.code}>
                <h3>{residue.name}</h3>
                <dl>
                  <div>
                    <dt>Detection Rate</dt>
                    <dd>{residue.detected}%</dd>
                  </div>
                  <div>
                    <dt>Benchmark Usage</dt>
                    <dd>{residue.benchmarkUse}%</dd>
                  </div>
                </dl>
                <small>{residue.benchmarkType} toxicity benchmark</small>
              </article>
            ))
          ) : (
            <p className="no-residues-note">
              No individual chemical compounds exceeded the high-risk reporting threshold for this crop.
            </p>
          )}
        </div>
      </section>

      {/* Official Monitoring Sources */}
      <section>
        <p className="eyebrow">Public Evidence Trail</p>
        <h2>Official monitoring sources for {food.name.toLowerCase()}</h2>
        <div className="source-list">
          {food.sources.map((reference) => {
            const source = getSource(reference.id);
            if (!source) return null;
            return (
              <a href={source.url} key={reference.id} rel="noreferrer" target="_blank">
                <div>
                  <strong>{source.country}</strong>
                  <span>{source.name}</span>
                </div>
                <small>
                  {reference.samples.toLocaleString("en-US")} samples ·{" "}
                  {reference.years.at(0)}–{reference.years.at(-1)} ↗
                </small>
              </a>
            );
          })}
        </div>
      </section>

      {/* Related Category Produce */}
      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore Peer Produce</p>
            <h2>More {food.category}s in the guide</h2>
          </div>
          <Link className="button button-secondary" href="/#explorer">
            Back to Interactive Map →
          </Link>
        </div>
        <div className="related-links">
          {related.map((item) => {
            const v = buyingVerdict(item);
            return (
              <Link href={`/food/${slugifyFood(item.name)}`} key={item.code} className="peer-link-card">
                <span aria-hidden="true" className="peer-emoji">
                  <FoodVisual emoji={item.emoji} name={item.name} size={28} />
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <small className={`verdict-text verdict-${v.tone}`}>Load {item.score} · {v.badge}</small>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
