import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";

const SOURCE_URL = "https://pesticide-guide.vercel.app/";
const html = await fetch(SOURCE_URL).then((response) => {
  if (!response.ok) throw new Error(`Source returned ${response.status}`);
  return response.text();
});

const payload = [...html.matchAll(
  /self\.__next_f\.push\(\[1,"((?:\\.|[^"])*)"\]\)<\/script>/g,
)][0];

if (!payload) throw new Error("Next.js data payload was not found");

const decoded = JSON.parse(`"${payload[1]}"`);
const start = decoded.indexOf('{"meta":');

if (start < 0) throw new Error("Food data object was not found");

let depth = 0;
let inString = false;
let escaped = false;
let end = -1;

for (let index = start; index < decoded.length; index += 1) {
  const character = decoded[index];

  if (inString) {
    if (escaped) escaped = false;
    else if (character === "\\") escaped = true;
    else if (character === '"') inString = false;
    continue;
  }

  if (character === '"') inString = true;
  else if (character === "{") depth += 1;
  else if (character === "}" && --depth === 0) {
    end = index + 1;
    break;
  }
}

if (end < 0) throw new Error("Food data object was incomplete");

const sourceData = JSON.parse(decoded.slice(start, end));
const sourceCatalog = new Map();

function sourceRef(source) {
  sourceCatalog.set(source.id, {
    id: source.id,
    name: source.name,
    country: source.country,
    url: source.url,
  });

  return {
    id: source.id,
    role: source.role,
    samples: source.samples,
    years: source.years,
    ...(source.flagged == null ? {} : { flagged: source.flagged }),
  };
}

function cleanMarket(market) {
  return {
    score: market.score,
    benchmarkUse: market.benchmarkUse,
    benchmarkType: market.benchmarkType,
    benchmarkCoverage: market.benchmarkCoverage,
    samples: market.samples,
    detected: market.detected,
    multiple: market.multiple,
    violations: market.violations,
    averageDetections: market.averageDetections,
    firstYear: market.firstYear,
    lastYear: market.lastYear,
    sampledYears: market.sampledYears,
    topResidues: market.topResidues,
    sources: market.sources.map(sourceRef),
  };
}

const foods = sourceData.foods.map((food) => ({
  code: food.code,
  name: food.name,
  emoji: food.emoji,
  category: food.category,
  score: food.score,
  healthSourceScore: food.healthSourceScore,
  healthSourceCode: food.healthSourceCode,
  healthSourceItem: food.healthSourceItem,
  healthMatchType: food.healthMatchType,
  benchmarkUse: food.benchmarkUse,
  benchmarkType: food.benchmarkType,
  benchmarkCoverage: food.benchmarkCoverage,
  samples: food.samples,
  detected: food.detected,
  multiple: food.multiple,
  violations: food.violations,
  averageDetections: food.averageDetections,
  firstYear: food.firstYear,
  lastYear: food.lastYear,
  sampledYears: food.sampledYears,
  topResidues: food.topResidues,
  sources: food.sources.map(sourceRef),
  marketData: Object.fromEntries(
    Object.entries(food.marketData).map(([key, market]) => [key, cleanMarket(market)]),
  ),
}));

const rawJson = JSON.stringify(sourceData);
const snapshot = {
  meta: {
    generatedAt: sourceData.meta.generatedAt,
    capturedAt: new Date().toISOString(),
    foodCount: foods.length,
    sampleCount: sourceData.meta.sampleCount,
    contextSampleCount: sourceData.meta.contextSampleCount,
    benchmarkCoverage: sourceData.meta.benchmarkCoverage,
    servingGrams: sourceData.meta.servingGrams,
    bodyWeightKilograms: sourceData.meta.bodyWeightKilograms,
    percentile: sourceData.meta.percentile,
    markets: sourceData.meta.markets,
    seedUrl: SOURCE_URL,
    seedSha256: createHash("sha256").update(rawJson).digest("hex"),
  },
  sources: [...sourceCatalog.values()].sort((a, b) => a.country.localeCompare(b.country)),
  foods,
};

await mkdir("src/data", { recursive: true });
await writeFile("src/data/foods.json", `${JSON.stringify(snapshot)}\n`);
console.log(
  JSON.stringify({
    foods: foods.length,
    sources: snapshot.sources.length,
    bytes: Buffer.byteLength(JSON.stringify(snapshot)),
    seedSha256: snapshot.meta.seedSha256,
  }),
);
