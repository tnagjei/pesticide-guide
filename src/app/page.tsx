// input: getSnapshot(), getAllFoods(), getExplorerFoods()
// output: 网站首页（含首屏全交互式 2D 农残与长寿营养罗盘及二屏 SEO 结构化指南）
// pos: 网站主入口，承接核心用户交互与搜索引擎收录（更新规则：文件变更需同步本注释与所属目录 README）

import Link from "next/link";
import { FoodExplorer } from "@/components/FoodExplorer";
import { getAllFoods, getExplorerFoods, getSnapshot } from "@/lib/data";
import { buyingVerdict, slugifyFood } from "@/lib/food";

export default function HomePage() {
  const snapshot = getSnapshot();
  const foods = getAllFoods();

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pesticide Guide - Interactive Produce Residue & Longevity Atlas",
    url: "https://pesticideguide.online",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    description:
      "Interactive 2D food map and guide comparing official pesticide monitoring records and Food Compass 2.0 nutrition scores for 69 fruits and vegetables.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does organic produce contain zero pesticides?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. Organic farming prohibits synthetic chemical pesticides, but certified organic farms may use approved natural, botanical, or mineral treatments. Monitoring tests show organic produce has significantly fewer synthetic pesticide residues and lower total load compared to conventional produce.",
        },
      },
      {
        "@type": "Question",
        name: "How can I effectively remove pesticide residue from produce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Peer-reviewed research shows soaking produce in a 1% baking soda (sodium bicarbonate) solution for 10 to 15 minutes followed by running water rinse removes up to 80-96% of surface pesticide residues like phosmet and thiabendazole, outperforming plain tap water.",
        },
      },
      {
        "@type": "Question",
        name: "Should I avoid eating produce if I cannot afford organic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Health organizations and dietary scientists agree that the proven health benefits of consuming fruits and vegetables far outweigh the trace risks of pesticide residues. Wash conventional produce thoroughly and prioritize organic purchases for the Dirty Dozen items.",
        },
      },
      {
        "@type": "Question",
        name: "How are the pesticide load scores calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The score aggregates official government residue monitoring programs (USDA Pesticide Data Program, EFSA European monitoring, CFIA Canada) across 184,000+ laboratory samples, factoring in detection frequency, multiple residues, and EPA chronic/acute reference benchmarks.",
        },
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero & Interactive Tool Section (Above the Fold) */}
      <section className="hero-tool-section">
        <div className="hero-headline-wrap">
          <p className="eyebrow">Official Laboratory Data · 2026 Edition</p>
          <h1>Know what is on your produce before you shop.</h1>
          <p className="hero-lede">
            Explore 69 fruits, vegetables, and legumes across 9 international markets.
            Instantly compare laboratory-tested pesticide load, longevity nutrition scores, and organic buying recommendations.
          </p>
        </div>

        {/* The Core Interactive Explorer (2D Coordinate Food Map) */}
        <div id="explorer" className="explorer-container-root">
          <FoodExplorer
            foods={getExplorerFoods()}
            markets={snapshot.meta.markets}
          />
        </div>
      </section>

      {/* Section 2: Shopper's Action Matrix & Clean vs Dirty Guide */}
      <section className="content-section shopper-guide-section" aria-labelledby="guide-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Smart Grocery Strategy</p>
            <h2 id="guide-title">When to buy organic vs save money</h2>
          </div>
          <p>
            Not all produce requires an organic premium. Use pesticide monitoring data to maximize your health and grocery budget.
          </p>
        </div>

        <div className="guide-cards-grid">
          <article className="guide-card card-warning">
            <div className="guide-card-header">
              <span className="card-badge badge-warning">PRIORITIZE ORGANIC</span>
              <h3>Thin-Skinned & Leafy Produce</h3>
            </div>
            <p>
              Berries, leafy greens, and soft-skinned fruits (Strawberries, Spinach, Kale, Bell Peppers, Celery) absorb agricultural sprays directly into their edible flesh.
            </p>
            <ul className="guide-check-list">
              <li>High detection rates (often 80%+ of samples contain multiple residues)</li>
              <li>Pesticides penetrate below the surface peel and cannot be washed off completely</li>
              <li>Organic alternatives show 80–95% lower synthetic residue load</li>
            </ul>
          </article>

          <article className="guide-card card-success">
            <div className="guide-card-header">
              <span className="card-badge badge-success">BUY CONVENTIONAL & SAVE</span>
              <h3>Thick-Skinned & Protected Produce</h3>
            </div>
            <p>
              Produce with thick protective peels, outer husks, or natural wax coatings (Avocado, Sweet Corn, Pineapple, Onions, Papaya) naturally block chemical absorption.
            </p>
            <ul className="guide-check-list">
              <li>Low detection frequency (over 65% of samples show zero detectable residue)</li>
              <li>Outer peel is discarded before human consumption</li>
              <li>Conventional versions provide excellent nutrition at lower retail cost</li>
            </ul>
          </article>

          <article className="guide-card card-info">
            <div className="guide-card-header">
              <span className="card-badge badge-info">SCIENTIFIC WASHING</span>
              <h3>Baking Soda Soak Protocol</h3>
            </div>
            <p>
              Water alone leaves hydrophobic pesticide residues behind. A 1% baking soda solution degrades chemical compounds significantly faster.
            </p>
            <ul className="guide-check-list">
              <li>Mix 1 teaspoon of baking soda per 2 cups of cool tap water</li>
              <li>Submerge produce for 12 to 15 minutes with gentle agitation</li>
              <li>Rinse thoroughly under running water before slicing or eating</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Section 3: Data Methodology & Metrics Explanation */}
      <section className="content-section reading-grid" aria-labelledby="read-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Methodology & Science</p>
            <h2 id="read-title">Three metrics, grounded in public science</h2>
          </div>
          <p>
            We translate complex toxicological and nutritional data into transparent consumer metrics without marketing bias.
          </p>
        </div>
        <article>
          <span className="index-number">01</span>
          <h3>Pesticide Load Score</h3>
          <p>
            A relative score (0 to 100) calculated from laboratory-tested chemical concentrations, detection frequency, and EPA toxicological benchmarks. Lower score means cleaner produce.
          </p>
        </article>
        <article>
          <span className="index-number">02</span>
          <h3>Food Compass Score</h3>
          <p>
            Tufts University Food Compass 2.0 score (0 to 100) evaluating 54 nutrient attributes across 9 health domains. Higher score reflects richer nutrient density and positive longevity association.
          </p>
        </article>
        <article>
          <span className="index-number">03</span>
          <h3>Evidence Quality Index</h3>
          <p>
            Transparently displays sample size (184,077 total monitoring tests) and benchmark coverage percentage, distinguishing deeply tested staple crops from limited-sample niche items.
          </p>
        </article>
      </section>

      {/* Section 4: Frequently Asked Questions (SEO Structured Data) */}
      <section className="content-section faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Common Questions</p>
            <h2 id="faq-title">Produce safety and residue FAQs</h2>
          </div>
        </div>

        <div className="faq-accordion-list">
          <details className="faq-item" open>
            <summary className="faq-question">
              <strong>Does organic produce contain zero pesticides?</strong>
              <span className="faq-toggle-icon" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>
                Not always. Organic agriculture strictly prohibits synthetic chemical pesticides, but certified organic farms are permitted to use approved biological, botanical, or mineral treatments (such as copper sulfate or Bacillus thuringiensis). Official monitoring tests demonstrate that organic produce has drastically fewer synthetic pesticide residues and a 80-95% lower total pesticide load compared to conventional produce.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              <strong>How can I effectively remove pesticide residue from fruits and vegetables?</strong>
              <span className="faq-toggle-icon" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>
                Peer-reviewed research from the University of Massachusetts demonstrated that soaking produce in a 1% baking soda (sodium bicarbonate) solution for 10 to 15 minutes removes significantly more surface residues (such as thiabendazole and phosmet) than plain tap water or commercial produce washes. Always follow with a thorough cold water rinse.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              <strong>Should I avoid eating fruits and vegetables if organic is too expensive?</strong>
              <span className="faq-toggle-icon" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>
                Absolutely not. Leading health and dietary authorities emphasize that the proven cardiovascular and longevity benefits of consuming fresh fruits and vegetables far outweigh the trace risks of pesticide residue. If budget is a factor, buy conventional produce from the Clean Fifteen list and wash thoroughly.
              </p>
            </div>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              <strong>Where does the monitoring data come from?</strong>
              <span className="faq-toggle-icon" aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>
                All data is aggregated from official government food safety testing programs, including the USDA Pesticide Data Program (PDP) in the United States, the European Food Safety Authority (EFSA) across EU member nations, the UK Pesticide Residues in Food (PRiF) committee, and the Canadian Food Inspection Agency (CFIA).
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Section 5: Full 69 Produce Directory (Internal Link Grid for SEO) */}
      <section className="content-section food-index" aria-labelledby="food-index-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Produce Directory</p>
            <h2 id="food-index-title">Browse all 69 produce profiles</h2>
          </div>
          <p>Click any item to inspect detailed market comparisons, residue chemical drivers, and official testing reports.</p>
        </div>

        <div className="food-link-grid">
          {foods.map((food) => {
            const v = buyingVerdict(food);
            return (
              <Link
                className="food-index-card"
                href={`/food/${slugifyFood(food.name)}`}
                key={food.code}
              >
                <span className="food-index-emoji" aria-hidden="true">{food.emoji}</span>
                <div className="food-index-meta">
                  <strong>{food.name}</strong>
                  <div className="food-index-badges">
                    <span className={`badge-mini badge-mini-${v.tone}`}>Load {food.score}</span>
                    <small>{food.samples.toLocaleString("en-US")} tests</small>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

