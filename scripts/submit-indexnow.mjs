// input: src/data/foods.json 快照与静态路由列表
// output: 将全站 83 个 URL 批量推送到 IndexNow (Bing / Yandex / Seznam) 索引接口
// pos: 搜索引擎即时索引提交脚本（更新规则：文件变更需同步所属目录 README）

import fs from 'node:fs';
import path from 'node:path';

const HOST = 'pesticideguide.online';
const BASE_URL = `https://${HOST}`;
const KEY = '21827c2c7616f2183a10dd7e52102ede';
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;

const dataPath = path.resolve('src/data/foods.json');
const d = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const staticRoutes = [
  '',
  '/methodology',
  '/sources',
  '/about',
  '/disclaimer',
  '/privacy',
  '/terms',
  '/contact',
];

const foodRoutes = d.foods.map(
  food => `/food/${food.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
);

const urlList = [...staticRoutes, ...foodRoutes].map(route => `${BASE_URL}${route}`);

async function submitIndexNow() {
  console.log(`Preparing to submit ${urlList.length} URLs to IndexNow for ${HOST}...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) {
    console.log('[Dry Run] Payload:', JSON.stringify(payload, null, 2));
    return;
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow API Response Status: ${res.status} ${res.statusText}`);
    if (res.status === 200 || res.status === 202) {
      console.log('IndexNow submission successful!');
    } else {
      const text = await res.text();
      console.log('IndexNow response body:', text);
    }
  } catch (error) {
    console.error('Failed to submit to IndexNow:', error.message);
  }
}

submitIndexNow();
