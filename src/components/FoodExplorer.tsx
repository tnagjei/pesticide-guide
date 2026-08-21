"use client";
// input: foods (Food[]), markets (Market[])
// output: 仿原版高保真全交互式农残与长寿营养四象限罗盘图 (High-fidelity Interactive 2D Food Map)
// pos: 首页首屏核心交互容器，支持国家切换、种植模式过滤、即时气泡图检索与抽屉详情（更新规则：文件变更需同步本注释与所属目录 README）

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FoodVisual } from "@/components/FoodVisual";
import {
  buyingVerdict,
  confidenceLevel,
  filterFoods,
  layoutFoods,
  longevityScore,
  marketFood,
  slugifyFood,
} from "@/lib/food";
import type { Food, Market } from "@/lib/types";

interface FoodExplorerProps {
  foods: Food[];
  markets: Market[];
}

export function FoodExplorer({ foods, markets }: FoodExplorerProps) {
  const [marketId, setMarketId] = useState("all");
  const [modeId, setModeId] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const market = markets.find((item) => item.id === marketId) ?? markets[0];
  const productionModes = market.productionModes ?? [];
  const mode =
    productionModes.find((item) => item.id === modeId) ?? productionModes[0];
  const dataKey = mode?.dataKey ?? marketId;

  useEffect(() => {
    setSelectedCode(null);
  }, [dataKey]);

  const activeFoods = useMemo(
    () =>
      filterFoods(foods, query, dataKey)
        .map((food) => marketFood(food, dataKey))
        .filter((food): food is Food => Boolean(food)),
    [dataKey, foods, query],
  );

  const points = useMemo(() => layoutFoods(activeFoods), [activeFoods]);

  const selected = useMemo(() => {
    if (!selectedCode) return null;
    const base = foods.find((f) => f.code === selectedCode);
    if (!base) return null;
    return marketFood(base, dataKey) ?? base;
  }, [dataKey, foods, selectedCode]);

  const verdict = selected ? buyingVerdict(selected) : null;

  return (
    <div className="map-experience-root">
      {/* 1. Dedicated Control Toolbar (Clean, Unobstructed Above The 2D Canvas) */}
      <div className="map-control-toolbar">
        {/* Country Selector Pills */}
        <div className="source-filter-bar" role="group" aria-label="Select Country Data Source">
          {markets.map((item) => (
            <button
              aria-label={`${item.label} pesticide data`}
              aria-pressed={marketId === item.id}
              className="source-btn"
              key={item.id}
              onClick={() => {
                setMarketId(item.id);
                setModeId("all");
                setSelectedCode(null);
              }}
              type="button"
            >
              <span aria-hidden="true">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Middle: Production Mode Filter (All / Organic / Non-organic) */}
        {productionModes.length > 0 ? (
          <div className="mode-filter-bar" role="group" aria-label="Production Method">
            {productionModes.map((item) => (
              <button
                aria-pressed={modeId === item.id}
                className="mode-toggle-btn"
                key={item.id}
                onClick={() => {
                  setModeId(item.id);
                }}
                type="button"
              >
                {item.emoji ? <span aria-hidden="true">{item.emoji} </span> : null}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}

        {/* Right: Expandable Search Input */}
        <div className="search-box-wrap">
          <span className="search-symbol" aria-hidden="true">⌕</span>
          <input
            aria-label="Find a food on the map"
            className="search-field"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search produce..."
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="Clear search"
              className="search-reset-btn"
              onClick={() => setQuery("")}
              type="button"
            >
              ×
            </button>
          ) : null}
        </div>
      </div>

      {/* 2. The 2D Interactive Quadrant Chart (100% Unobstructed Canvas) */}
      <div className="interactive-quadrant-chart" aria-label="Interactive 2D Produce Map">
        {/* Four Quadrant Gradients */}
        <div className="quadrant-grid-bg" aria-hidden="true">
          <div className="quadrant-box q-nw" />
          <div className="quadrant-box q-ne" />
          <div className="quadrant-box q-sw" />
          <div className="quadrant-box q-se" />
        </div>

        {/* Subtle Crosshair Lines */}
        <div className="chart-crosshair-lines" aria-hidden="true" />

        {/* Four Corner Intuitive Labels */}
        <div className="corner-quadrant-labels" aria-hidden="true">
          <div className="corner-tag corner-nw">
            <strong>HIGH LONGEVITY</strong>
            <span>Best for longevity + most pesticide</span>
          </div>
          <div className="corner-tag corner-ne" data-best="true">
            <strong>BEST OVERALL</strong>
            <span>Best for longevity + least pesticide</span>
          </div>
          <div className="corner-tag corner-sw">
            <strong>LOWEST OVERLAP</strong>
            <span>Normal for longevity + most pesticide</span>
          </div>
          <div className="corner-tag corner-se">
            <strong>LOW PESTICIDE</strong>
            <span>Normal for longevity + least pesticide</span>
          </div>
        </div>

        {/* Axis Direction Indicators */}
        <div className="chart-axes-indicators" aria-hidden="true">
          <span className="axis-least-pesticide">
            Least pesticide <b aria-hidden="true">→</b>
          </span>
          <span className="axis-best-longevity">
            Best longevity <b aria-hidden="true">→</b>
          </span>
        </div>

        {/* Food Points Layer */}
        <ul className="produce-point-layer">
          {points.map(({ food, x, y }) => (
            <li
              key={food.code}
              style={{ "--pt-x": `${x}%`, "--pt-y": `${y}%` } as React.CSSProperties}
            >
              <button
                aria-label={`${food.name}: pesticide load ${food.score} out of 100, Longevity Score ${longevityScore(food)} out of 100`}
                className="produce-point-btn"
                data-confidence={confidenceLevel(food)}
                data-selected={selectedCode === food.code}
                onClick={() => setSelectedCode(food.code)}
                type="button"
              >
                <span className="produce-visual" aria-hidden="true">
                  <FoodVisual emoji={food.emoji} name={food.name} size={34} />
                </span>
                <span className="produce-tooltip-name">{food.name}</span>
              </button>
            </li>
          ))}
        </ul>

        {activeFoods.length === 0 ? (
          <div className="empty-search-alert">
            <p>No produce found matching &ldquo;{query}&rdquo; in this dataset.</p>
            <button className="button button-secondary" onClick={() => setQuery("")} type="button">
              Reset search
            </button>
          </div>
        ) : null}
      </div>

      {/* 3. Rich Slide-over Detail Drawer / Mobile BottomSheet */}
      {selected && verdict ? (
        <div
          className="drawer-backdrop"
          onClick={() => setSelectedCode(null)}
        >
          <div
            aria-labelledby="drawer-title"
            aria-modal="true"
            className="food-slide-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            {/* Top Close Bar */}
            <div className="drawer-topbar">
              <button
                aria-label="Close food details"
                className="drawer-close-circle"
                onClick={() => setSelectedCode(null)}
                type="button"
              >
                ×
              </button>
            </div>

            {/* Hero Header */}
            <div className="drawer-hero-section">
              <span className="drawer-emoji-box" aria-hidden="true">
                <FoodVisual emoji={selected.emoji} name={selected.name} size={58} />
              </span>
              <div className="drawer-hero-text">
                <span className="drawer-cat-pill">{selected.category} · {market.country}</span>
                <h2 id="drawer-title">{selected.name}</h2>
              </div>
            </div>

            {/* Verdict Action Card */}
            <div className={`drawer-verdict-card verdict-${verdict.tone}`}>
              <div className="verdict-pill-header">{verdict.badge}</div>
              <p className="verdict-advice">{verdict.recommendation}</p>
            </div>

            {/* 3 Key Metric Grid */}
            <div className="drawer-metric-boxes">
              <div className="m-card">
                <span className="m-card-label">Pesticide Load</span>
                <strong className={`m-card-val m-val-${verdict.tone}`}>{selected.score}</strong>
                <small className="m-card-hint">0 (Clean) – 100 (Max)</small>
              </div>
              <div className="m-card">
                <span className="m-card-label">Longevity Score</span>
                <strong className="m-card-val">{longevityScore(selected)}</strong>
                <small className="m-card-hint">Food Compass 2.0</small>
              </div>
              <div className="m-card">
                <span className="m-card-label">Evidence Quality</span>
                <strong className="m-card-val m-card-word">{confidenceLevel(selected)}</strong>
                <small className="m-card-hint">{selected.benchmarkCoverage}% covered</small>
              </div>
            </div>

            {/* Facts Breakdown List */}
            <dl className="drawer-facts-table">
              <div className="fact-row">
                <dt>Monitored Samples</dt>
                <dd>{selected.samples.toLocaleString("en-US")} tests</dd>
              </div>
              <div className="fact-row">
                <dt>Detection Rate</dt>
                <dd>{selected.detected}% of samples</dd>
              </div>
              <div className="fact-row">
                <dt>Multi-Residue Rate</dt>
                <dd>{selected.multiple != null ? `${selected.multiple}%` : "Not reported"}</dd>
              </div>
              <div className="fact-row">
                <dt>Latest Monitored Year</dt>
                <dd>{selected.lastYear}</dd>
              </div>
            </dl>

            {/* Top Residues Breakdown (if present) */}
            {selected.topResidues && selected.topResidues.length > 0 ? (
              <div className="drawer-residues-block">
                <h4>Primary Detected Chemicals</h4>
                <div className="residue-pill-list">
                  {selected.topResidues.slice(0, 4).map((r) => (
                    <div className="residue-pill-item" key={r.code}>
                      <span>{r.name}</span>
                      <strong>{r.detected}% detected</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Notice */}
            <p className="drawer-scientific-disclaimer">
              These scores reflect official laboratory monitoring datasets (USDA, EFSA, CFIA). They compare foods relative to each other and do not constitute personal medical diagnosis.
            </p>

            {/* CTA to Full Page */}
            <Link
              className="button button-primary button-full drawer-cta-btn"
              href={`/food/${slugifyFood(selected.name)}`}
            >
              Open Full {selected.name} Detailed Profile →
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
