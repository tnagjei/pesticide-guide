// input: 69 种果蔬数据、搜索关键词、市场代码与农残评分
// output: 农残清洁度、相对长寿营养分、四象限物理坐标布局与购买决策建议
// pos: 核心计算与布局逻辑层，为 2D 食物罗盘与详情页提供坐标及算法支撑（更新规则：文件变更需同步本注释与所属目录 README）

import type { EvidenceLevel, Food, FoodPoint, MarketFood } from "./types";

export function slugifyFood(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface BuyingVerdict {
  badge: string;
  recommendation: string;
  tone: "good" | "moderate" | "warning";
}

export function buyingVerdict(food: Pick<Food, "score">): BuyingVerdict {
  if (food.score <= 33) {
    return {
      badge: "Clean produce",
      recommendation: "Conventional is fine. Low pesticide residue detected.",
      tone: "good",
    };
  }
  if (food.score <= 66) {
    return {
      badge: "Moderate load",
      recommendation: "Wash thoroughly. Moderate residue detected across samples.",
      tone: "moderate",
    };
  }
  return {
    badge: "High pesticide load",
    recommendation: "Strongly recommend buying organic. High residue detected.",
    tone: "warning",
  };
}

export function getRankings(foods: Food[], dataKey: string) {
  const mapped = foods
    .map((f) => marketFood(f, dataKey))
    .filter((f): f is Food => Boolean(f));
  return {
    dirtyDozen: [...mapped].sort((a, b) => b.score - a.score).slice(0, 12),
    cleanFifteen: [...mapped].sort((a, b) => a.score - b.score).slice(0, 15),
  };
}

export function cleanlinessScore(food: Pick<Food, "score">) {
  return Math.max(0, Math.min(100, 100 - food.score));
}

// Produce-relative longevity calibration map
// Calibrates raw Food Compass 2.0 (which clusters 57-100 across whole produce) into a produce-only comparative scale
const PRODUCE_LONGEVITY_MAP: Record<string, number> = {
  // Top tier superfoods & cruciferous / dark leafy greens (85 - 100)
  "Broccoli": 100, "Kale": 100, "Spinach": 98, "Blueberries": 96, "Blackberries": 96,
  "Brussels Sprouts": 95, "Collard Greens": 95, "Mustard Greens": 94, "Asparagus": 92,
  "Avocado": 92, "Garlic": 90, "Raspberries": 90, "Cabbage": 88, "Cauliflower": 88,
  "Strawberries": 88, "Basil": 86, "Cilantro": 86,

  // Mid-High tier nutrient-dense staples (65 - 84)
  "Bell Peppers": 82, "Hot Peppers": 82, "Cherry Tomatoes": 82, "Tomatoes": 80,
  "Carrots": 78, "Cranberries": 78, "Apples": 75, "Apricots": 75, "Grapefruit": 74,
  "Oranges": 73, "Tangerines": 72, "Kiwi": 72, "Lemons": 70, "Limes": 70,
  "Mushrooms": 68, "Eggplant": 68, "Zucchini": 68, "Cucumbers": 66, "Green Beans": 66,
  "Snap Peas": 66, "Celery": 65, "Green Onions": 65, "Okra": 65,

  // Mid-Low tier sweeter or moderate density produce (40 - 64)
  "Peaches": 62, "Nectarines": 62, "Pears": 60, "Plums": 60, "Cherries": 58,
  "Beets": 56, "Mangoes": 54, "Papaya": 54, "Pineapple": 52, "Watermelon": 50,
  "Cantaloupe": 50, "Radishes": 48, "Tomatillos": 48, "Green Peas": 46, "Onions": 44,
  "Grapes": 42, "Bananas": 40,

  // Lower longevity in produce set (Starch/Sugar/Dried/Legumes: 12 - 38)
  "Black Beans": 38, "Kidney Beans": 36, "Chickpeas": 34, "Lentils": 32, "Soybeans": 30,
  "Pinto Beans": 28, "Sweet Potatoes": 26, "Prunes": 24, "Raisins": 22,
  "Corn": 18, "Potatoes": 12,
};

export function longevityScore(food: Pick<Food, "name" | "healthSourceScore">): number {
  return PRODUCE_LONGEVITY_MAP[food.name] ?? food.healthSourceScore;
}

export function confidenceLevel(
  food: Pick<Food, "benchmarkCoverage" | "samples">,
): EvidenceLevel {
  if (food.benchmarkCoverage >= 80 && food.samples >= 100) return "High";
  if (food.benchmarkCoverage >= 60 && food.samples >= 40) return "Moderate";
  return "Limited";
}

export function marketFood(food: Food, dataKey: string): Food | null {
  if (dataKey === "all") return food;
  const market = food.marketData[dataKey];
  return market ? { ...food, ...market } : null;
}

export function filterFoods(foods: Food[], query: string, dataKey: string) {
  const normalized = query.trim().toLowerCase();
  return foods.filter((food) => {
    const available = dataKey === "all" || Boolean(food.marketData[dataKey]);
    return available && (!normalized || food.name.toLowerCase().includes(normalized));
  });
}

function hash(value: string) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function layoutFoods(foods: Food[]): FoodPoint[] {
  const points = foods.map((food) => {
    const seed = hash(food.code);
    const yScore = longevityScore(food);
    return {
      food,
      x: clamp(
        8 + (cleanlinessScore(food) / 100) * 84 + ((seed & 255) / 255 - 0.5) * 1.8,
        6,
        94,
      ),
      y: clamp(
        92 - (yScore / 100) * 84 + (((seed >> 8) & 255) / 255 - 0.5) * 1.8,
        8,
        92,
      ),
    };
  });

  // ponytail: O(n²) is fine for 69 foods; use spatial indexing above 500 points.
  for (let pass = 0; pass < 80; pass += 1) {
    for (let left = 0; left < points.length; left += 1) {
      for (let right = left + 1; right < points.length; right += 1) {
        const a = points[left];
        const b = points[right];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let distance = Math.hypot(dx, dy);

        if (distance >= 4.2) continue;
        if (distance < 0.01) {
          dx = 0.01;
          dy = 0.01;
          distance = Math.hypot(dx, dy);
        }

        const movement = (4.2 - distance) * 0.08;
        const moveX = (dx / distance) * movement;
        const moveY = (dy / distance) * movement;
        a.x = clamp(a.x - moveX, 6, 94);
        a.y = clamp(a.y - moveY, 8, 92);
        b.x = clamp(b.x + moveX, 6, 94);
        b.y = clamp(b.y + moveY, 8, 92);
      }
    }
  }

  return points;
}

export function pesticideLabel(food: Pick<MarketFood, "score">) {
  if (food.score <= 33) return "Low load";
  if (food.score <= 66) return "Moderate load";
  return "Higher load";
}

export function foodDescription(
  food: Pick<Food, "name" | "score" | "healthSourceScore" | "samples">,
) {
  return `${food.name} has a pesticide load score of ${food.score} and a Food Compass 2.0 score of ${food.healthSourceScore}, based on ${food.samples.toLocaleString("en-US")} monitoring samples.`;
}

