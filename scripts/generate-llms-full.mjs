// input: src/data/foods.json 快照数据
// output: 生成 public/llms-full.txt 全量大模型知识库文本文件
// pos: 自动化生成工具，在构建前或数据更新时执行（更新规则：文件变更需同步所属目录 README）

import fs from 'node:fs';
import path from 'node:path';

const dataPath = path.resolve('src/data/foods.json');
const outputPath = path.resolve('public/llms-full.txt');
const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function buyingVerdict(food) {
  if (food.score >= 70) {
    return {
      badge: 'PRIORITIZE ORGANIC',
      recommendation: 'Prioritize organic due to thin skin and higher detection risk.',
      reason: 'Thin skin or high surface absorption makes pesticide residues difficult to wash off completely.',
    };
  }
  if (food.score >= 40) {
    return {
      badge: 'CONVENTIONAL WITH WASHING',
      recommendation: 'Conventional is acceptable; wash with baking soda to lower residue.',
      reason: 'Moderate residue penetration. A 1% baking soda soak significantly reduces chemical exposure.',
    };
  }
  return {
    badge: 'BUY CONVENTIONAL',
    recommendation: 'Conventional is safe; thick skin minimizes residue exposure.',
    reason: 'Thick peel or outer husk naturally blocks chemical absorption.',
  };
}

let out = '';
out += '# Pesticide Guide - Complete Knowledge Base\n';
out += '> Full data export and guide comparing official pesticide monitoring records (USDA PDP, EFSA, CFIA) and Food Compass 2.0 nutrition scores for 69 fruits, vegetables, and legumes across 9 international markets.\n\n';
out += '## Methodology Overview\n';
out += '- Total Lab Tests: 184,077 official government chemical monitoring samples.\n';
out += '- Pesticide Load Score (0-100): Relative score based on detection rate, multiple residue counts, and EPA chronic/acute benchmarks. Lower score means cleaner produce.\n';
out += '- Food Compass Score (0-100): Tufts University nutrient profiling system evaluating 54 nutrient attributes across 9 health domains. Higher score indicates richer nutrient density.\n';
out += '- Evidence Quality Index: High (>=80% coverage and >=100 samples), Moderate (>=60% coverage and >=40 samples), Limited (<40 samples).\n';
out += '- Washing Protocol: 1% baking soda (sodium bicarbonate) solution (1 tsp per 2 cups water) soaked for 12-15 minutes degrades 80-96% of surface residues, outperforming tap water.\n\n';

out += '## Produce Profiles Index (69 Foods)\n\n';

for (const food of d.foods) {
  const v = buyingVerdict(food);
  const slug = food.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  out += `### ${food.name} (${food.category})\n`;
  out += `- URL: https://pesticideguide.online/food/${slug}\n`;
  out += `- Pesticide Load Score: ${food.score}/100\n`;
  out += `- Food Compass 2.0 Score: ${food.healthSourceScore}/100 (${food.healthMatchType} match)\n`;
  out += `- Total Tested Samples: ${food.samples.toLocaleString('en-US')} tests (${food.firstYear}-${food.lastYear})\n`;
  out += `- Benchmark Coverage: ${food.benchmarkCoverage}%\n`;
  out += `- Buying Recommendation: ${v.badge} - ${v.recommendation}\n`;
  out += `- Reason: ${v.reason}\n`;
  if (food.topResidues && food.topResidues.length > 0) {
    const resList = food.topResidues.map(r => `${r.name} (detected in ${r.detected}% of samples)`).join(', ');
    out += `- Top Chemical Residues: ${resList}\n`;
  }
  out += '\n';
}

out += '## Official Data Sources\n';
for (const s of d.sources) {
  out += `- [${s.country}] ${s.name}: ${s.url}\n`;
}
out += '\n## Contact & Attribution\n';
out += '- Project Website: https://pesticideguide.online\n';
out += '- Contact Email: contact@pesticideguide.online\n';
out += '- License: https://pesticideguide.online/terms#data-license\n';

fs.writeFileSync(outputPath, out, 'utf8');
console.log(`Successfully generated ${outputPath} (${out.length} bytes)`);
