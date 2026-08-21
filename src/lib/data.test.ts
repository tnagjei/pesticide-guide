import { describe, expect, it } from "vitest";
import {
  getAllFoods,
  getExplorerFoods,
  getFoodBySlug,
  getSourceGroups,
} from "./data";

describe("pesticide data snapshot", () => {
  it("loads the verified 69-food snapshot", () => {
    const foods = getAllFoods();
    expect(foods).toHaveLength(69);
    expect(new Set(foods.map((food) => food.code)).size).toBe(69);
  });

  it("resolves food detail pages by slug", () => {
    const apple = getFoodBySlug("apples");
    expect(apple?.name).toBe("Apples");
    expect(apple?.samples).toBe(7174);
  });

  it("retains official source URLs", () => {
    const sources = getSourceGroups();
    expect(sources.length).toBeGreaterThanOrEqual(9);
    expect(sources.every((source) => source.url.startsWith("https://"))).toBe(true);
  });

  it("keeps the homepage payload free of repeated evidence arrays", () => {
    const foods = getExplorerFoods();
    expect(foods[0].topResidues).toEqual([]);
    expect(foods[0].sources).toEqual([]);
    expect(Object.values(foods[0].marketData)[0].sources).toEqual([]);
  });
});
