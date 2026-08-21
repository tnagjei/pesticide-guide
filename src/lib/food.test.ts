// input: food.ts 中的算法函数与测试样本
// output: 农残清洁度、相对长寿分、购买决策与布局算法自动化单元测试套件
// pos: 算法质量保障与回归验证（更新规则：文件变更需同步本注释与所属目录 README）

import { describe, expect, it } from "vitest";
import {
  buyingVerdict,
  cleanlinessScore,
  confidenceLevel,
  filterFoods,
  foodDescription,
  getRankings,
  layoutFoods,
  longevityScore,
  slugifyFood,
} from "./food";
import type { Food } from "./types";

const foods = [
  {
    code: "AP",
    name: "Apples",
    emoji: "🍎",
    category: "fruit",
    score: 66,
    healthSourceScore: 94,
    benchmarkCoverage: 85.8,
    samples: 7174,
    marketData: { us: { score: 73 } },
  },
  {
    code: "AV",
    name: "Avocado",
    emoji: "🥑",
    category: "fruit",
    score: 8,
    healthSourceScore: 100,
    benchmarkCoverage: 55,
    samples: 28,
    marketData: {},
  },
  {
    code: "ST",
    name: "Strawberries",
    emoji: "🍓",
    category: "fruit",
    score: 94,
    healthSourceScore: 88,
    benchmarkCoverage: 90,
    samples: 4500,
    marketData: {},
  },
] as Food[];

describe("food helpers", () => {
  it("creates stable food slugs", () => {
    expect(slugifyFood("Bell Peppers")).toBe("bell-peppers");
  });

  it("turns pesticide load into a cleanliness score", () => {
    expect(cleanlinessScore(foods[0])).toBe(34);
  });

  it("calculates calibrated produce longevity scores", () => {
    expect(longevityScore({ name: "Broccoli", healthSourceScore: 100 })).toBe(100);
    expect(longevityScore({ name: "Potatoes", healthSourceScore: 57 })).toBe(12);
  });

  it("labels evidence without hiding sparse data", () => {
    expect(confidenceLevel(foods[0])).toBe("High");
    expect(confidenceLevel(foods[1])).toBe("Limited");
  });

  it("provides clear buying verdicts based on pesticide score", () => {
    expect(buyingVerdict(foods[1]).tone).toBe("good");
    expect(buyingVerdict(foods[0]).tone).toBe("moderate");
    expect(buyingVerdict(foods[2]).tone).toBe("warning");
  });

  it("calculates dirty dozen and clean fifteen rankings", () => {
    const { dirtyDozen, cleanFifteen } = getRankings(foods, "all");
    expect(dirtyDozen[0].name).toBe("Strawberries");
    expect(cleanFifteen[0].name).toBe("Avocado");
  });

  it("filters by search and available market", () => {
    expect(filterFoods(foods, "app", "all")).toHaveLength(1);
    expect(filterFoods(foods, "", "us")).toEqual([foods[0]]);
  });

  it("lays out every food inside the chart across quadrants", () => {
    const points = layoutFoods(foods);
    expect(points).toHaveLength(3);
    expect(points.every(({ x, y }) => x >= 6 && x <= 94 && y >= 8 && y <= 92)).toBe(true);
  });

  it("writes an original factual search description", () => {
    expect(foodDescription(foods[0])).toBe(
      "Apples has a pesticide load score of 66 and a Food Compass 2.0 score of 94, based on 7,174 monitoring samples.",
    );
  });
});

