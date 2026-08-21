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
    return {
      food,
      x: clamp(
        8 + (cleanlinessScore(food) / 100) * 84 + ((seed & 255) / 255 - 0.5) * 1.8,
        6,
        94,
      ),
      y: clamp(
        92 - (food.healthSourceScore / 100) * 84 + (((seed >> 8) & 255) / 255 - 0.5) * 1.8,
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

