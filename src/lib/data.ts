// input: src/data/foods.json 快照文件
// output: 数据获取与查询助手函数（getAllFoods, getExplorerFoods, getFoodBySlug 等）
// pos: 数据访问层，隔离底层静态 JSON 与上层业务视图（更新规则：文件变更需同步本注释与所属目录 README）

import snapshotJson from "../data/foods.json";
import { slugifyFood } from "./food";
import type { Snapshot } from "./types";

const snapshot = snapshotJson as Snapshot;

export function getSnapshot() {
  return snapshot;
}

export function getAllFoods() {
  return snapshot.foods;
}

export function getExplorerFoods() {
  return snapshot.foods.map((food) => ({
    ...food,
    topResidues: [],
    sources: [],
    marketData: Object.fromEntries(
      Object.entries(food.marketData).map(([key, market]) => [
        key,
        { ...market, topResidues: [], sources: [] },
      ]),
    ),
  }));
}

export function getFoodBySlug(slug: string) {
  return snapshot.foods.find((food) => slugifyFood(food.name) === slug);
}

export function getSourceGroups() {
  return snapshot.sources;
}

export function getSource(id: string) {
  return snapshot.sources.find((source) => source.id === id);
}

