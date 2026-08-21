// input: food (Pick<Food, "name" | "emoji">), size?: number, className?: string
// output: 自适应果蔬视觉图标（优先渲染高清透明插画 PNG，无插画时回退至原生 Emoji）
// pos: 全站通用的果蔬图标渲染组件，消除纯色圆点和重复图标混淆（更新规则：文件变更需同步本注释与所属目录 README）

import { slugifyFood } from "@/lib/food";

const ARTWORK_SLUGS = new Set([
  "apricots",
  "asparagus",
  "beets",
  "black-beans",
  "blackberries",
  "brussels-sprouts",
  "cabbage",
  "cantaloupe",
  "cauliflower",
  "celery",
  "cherry-tomatoes",
  "chickpeas",
  "cilantro",
  "collard-greens",
  "cranberries",
  "grapefruit",
  "green-beans",
  "green-onions",
  "green-peas",
  "kale",
  "lentils",
  "limes",
  "mustard-greens",
  "nectarines",
  "okra",
  "papaya",
  "pinto-beans",
  "plums",
  "prunes",
  "radishes",
  "raisins",
  "raspberries",
  "snap-peas",
  "soybeans",
  "spinach",
  "tangerines",
  "tomatillos",
  "zucchini",
]);

interface FoodVisualProps {
  name: string;
  emoji: string;
  className?: string;
  size?: number;
}

export function FoodVisual({ name, emoji, className, size = 32 }: FoodVisualProps) {
  const slug = slugifyFood(name);
  const hasArtwork = ARTWORK_SLUGS.has(slug);

  if (hasArtwork) {
    return (
      <img
        alt=""
        aria-hidden="true"
        className={`food-artwork-img ${className ?? ""}`}
        draggable={false}
        height={size}
        loading="lazy"
        src={`/food-emoji/${slug}.png`}
        width={size}
      />
    );
  }

  return (
    <span aria-hidden="true" className={`food-emoji-symbol ${className ?? ""}`}>
      {emoji}
    </span>
  );
}

