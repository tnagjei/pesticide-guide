// input: 官方监测数据 JSON 结构
// output: 全站通用的核心 TypeScript 接口与枚举定义
// pos: 类型系统核心基础，定义果蔬、市场、农残化合物与快照结构（更新规则：文件变更需同步本注释与所属目录 README）

export type EvidenceLevel = "High" | "Moderate" | "Limited";

export interface Residue {
  code: string;
  name: string;
  detected: number;
  benchmarkType: string;
  benchmarkUse: number;
}

export interface SourceRef {
  id: string;
  role: "score" | "context";
  samples: number;
  years: number[];
  flagged?: number;
}

export interface Source {
  id: string;
  name: string;
  country: string;
  url: string;
}

export interface MarketFood {
  score: number;
  benchmarkUse: number;
  benchmarkType: string;
  benchmarkCoverage: number;
  samples: number;
  detected: number;
  multiple: number | null;
  violations: number;
  averageDetections: number;
  firstYear: number;
  lastYear: number;
  sampledYears: number[];
  topResidues: Residue[];
  sources: SourceRef[];
}

export interface Food extends MarketFood {
  code: string;
  name: string;
  emoji: string;
  category: "fruit" | "vegetable" | "legume";
  healthSourceScore: number;
  healthSourceCode: string;
  healthSourceItem: string;
  healthMatchType: "exact" | "proxy";
  marketData: Record<string, MarketFood>;
}

export interface Market {
  id: string;
  emoji: string;
  label: string;
  country: string;
  productionModes?: {
    id: string;
    emoji?: string;
    label: string;
    dataKey: string;
  }[];
}

export interface Snapshot {
  meta: {
    generatedAt: string;
    capturedAt: string;
    foodCount: number;
    sampleCount: number;
    contextSampleCount: number;
    benchmarkCoverage: number;
    servingGrams: number;
    bodyWeightKilograms: number;
    percentile: number;
    markets: Market[];
    seedUrl: string;
    seedSha256: string;
  };
  sources: Source[];
  foods: Food[];
}

export interface FoodPoint {
  food: Food;
  x: number;
  y: number;
}

