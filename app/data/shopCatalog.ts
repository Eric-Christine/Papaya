import {
  CropDefinition,
  CropId,
  FarmOrder,
  GrowthStage,
  ShopUpgradeDefinition,
  ShopUpgradeId,
} from '../types/garden';

export const TOTAL_FARM_PLOTS = 9;
export const INITIAL_UNLOCKED_PLOTS = 4;
export const BASE_MAX_WATER_DROPS = 5;
export const RAIN_BARREL_MAX_WATER_DROPS = 10;
export const WATER_RECHARGE_MS = 45_000; // 1 drop every 45s
export const RAIN_BARREL_RECHARGE_MS = 25_000; // faster recharge with Rain Barrel
export const WATER_HYDRATION_DURATION_MS = 180_000; // Soil looks rich & wet for 3 min

export const PLOT_UNLOCK_COSTS: Record<number, number> = {
  4: 250,
  5: 400,
  6: 600,
  7: 850,
  8: 1200,
};

export const WATER_GROWTH_BOOST = 0.15; // Watering skips 15% of a crop's total grow time

export const GOLDEN_BASE_CHANCE = 0.08;
export const SCARECROW_GOLDEN_BONUS = 0.15;
export const GOLDEN_SELL_MULTIPLIER = 3;
export const GOLDEN_XP_MULTIPLIER = 2;

export const FERTILIZER_SINGLE_COST = 50;
export const FERTILIZER_PACK_COUNT = 3;
export const FERTILIZER_PACK_COST = 130;
export const HEART_COST = 100;

export const CROP_CATALOG: CropDefinition[] = [
  {
    id: 'radish',
    title: 'Radish',
    description: 'Crisp ruby radishes that sprout fast for quick harvests.',
    ecoFact: 'Fast-growing radishes naturally aerate compacted soil without heavy tilling.',
    category: 'vegetable',
    rarity: 'common',
    cost: 40,
    baseSellPrice: 70,
    harvestDuration: 45_000, // 45s
    xpReward: 25,
  },
  {
    id: 'carrot',
    title: 'Carrot',
    description: 'Sweet crunchy heirloom carrots with feathery green tops.',
    ecoFact: 'Root crops store carbon underground and require far less water than leafy greens.',
    category: 'vegetable',
    rarity: 'common',
    cost: 75,
    baseSellPrice: 125,
    harvestDuration: 120_000, // 2m
    xpReward: 35,
  },
  {
    id: 'tomato',
    title: 'Tomato',
    description: 'Sun-ripened vine tomatoes bursting with garden flavor.',
    ecoFact: 'Locally grown tomatoes cut food-mile emissions by over 75% compared to winter imports.',
    category: 'vegetable',
    rarity: 'common',
    cost: 110,
    baseSellPrice: 185,
    harvestDuration: 180_000, // 3m
    xpReward: 45,
  },
  {
    id: 'zucchini',
    title: 'Zucchini',
    description: 'A fresh striped zucchini with sprawling emerald leaves.',
    ecoFact: 'Companion planting zucchini with herbs shades soil and locks in moisture.',
    category: 'vegetable',
    rarity: 'common',
    cost: 150,
    baseSellPrice: 235,
    harvestDuration: 300_000, // 5m
    xpReward: 55,
  },
  {
    id: 'broccoli',
    title: 'Broccoli',
    description: 'A hearty, nutritious crown of garden-grown broccoli.',
    ecoFact: 'Eating plant-rich brassicas like broccoli uses a fraction of the land of animal protein.',
    category: 'vegetable',
    rarity: 'uncommon',
    cost: 200,
    baseSellPrice: 320,
    harvestDuration: 600_000, // 10m
    xpReward: 70,
  },
  {
    id: 'pumpkin',
    title: 'Pumpkin',
    description: 'A plump harvest pumpkin on curling autumn vines.',
    ecoFact: 'Zero-waste champions: pumpkin flesh, seeds, and even blossoms are edible!',
    category: 'vegetable',
    rarity: 'uncommon',
    cost: 220,
    baseSellPrice: 375,
    harvestDuration: 900_000, // 15m
    xpReward: 85,
    requiredLevel: 2,
  },
  {
    id: 'blueberry_bush',
    title: 'Blueberry Bush',
    description: 'A thriving berry bush packed with sweet indigo fruit.',
    ecoFact: 'Perennial berry bushes stabilize topsoil and shelter native bee pollinators.',
    category: 'fruit',
    rarity: 'uncommon',
    cost: 250,
    baseSellPrice: 410,
    harvestDuration: 1_800_000, // 30m
    xpReward: 100,
  },
  {
    id: 'rose_bush',
    title: 'Rose Bush',
    description: 'A vibrant crimson rose bush that attracts butterflies.',
    ecoFact: 'Flowering shrubs create urban micro-habitats that cool neighborhoods naturally.',
    category: 'flower',
    rarity: 'rare',
    cost: 300,
    baseSellPrice: 500,
    harvestDuration: 3_600_000, // 1h
    xpReward: 130,
  },
  {
    id: 'orchid',
    title: 'Orchid',
    description: 'An exotic violet orchid unlocked through eco-study.',
    ecoFact: 'Protecting rainforest canopies saves thousands of rare wild orchid species.',
    category: 'flower',
    rarity: 'rare',
    cost: 400,
    baseSellPrice: 700,
    harvestDuration: 7_200_000, // 2h
    xpReward: 180,
    requiredLessons: 5,
  },
  {
    id: 'garden_gnome',
    title: 'Garden Gnome',
    description: 'A legendary pixel gnome who blesses wise eco-farmers.',
    ecoFact: 'Master gardeners compost kitchen scraps to build living, carbon-rich soil.',
    category: 'ornament',
    rarity: 'epic',
    cost: 500,
    baseSellPrice: 920,
    harvestDuration: 10_800_000, // 3h
    xpReward: 240,
    requiredLessons: 10,
  },
];

export const SHOP_UPGRADES: ShopUpgradeDefinition[] = [
  {
    id: 'rain_barrel',
    title: 'Rainwater Barrel',
    description: 'Harvests rainwater so your watering can holds 10 drops and refills almost 2x faster.',
    effectText: 'Max 10 Water Drops • Faster Refill',
    cost: 350,
  },
  {
    id: 'golden_trowel',
    title: 'Golden Trowel',
    description: 'Aerates every plot cleanly, reducing crop grow time by 15% across your entire farm.',
    effectText: '-15% Grow Time Everywhere',
    cost: 550,
    requiredLevel: 2,
  },
  {
    id: 'scarecrow',
    title: 'Pixel Scarecrow',
    description: 'Watches over your crops and boosts Golden Harvest luck by +15% on every plot!',
    effectText: '+15% Golden Crop Chance',
    cost: 750,
    requiredLevel: 3,
  },
];

export function getCropById(id?: string): CropDefinition | undefined {
  if (!id) return undefined;
  return CROP_CATALOG.find(c => c.id === id);
}

export function getCropByTitle(title?: string): CropDefinition | undefined {
  if (!title) return undefined;
  const normalized = title.trim().toLowerCase();
  return CROP_CATALOG.find(c => c.title.toLowerCase() === normalized);
}

export function resolveCropId(cropId?: CropId, title?: string): CropId {
  if (cropId && getCropById(cropId)) return cropId;
  const match = getCropByTitle(title);
  return match ? match.id : 'zucchini';
}

export function getGrowthStage(progress: number): GrowthStage {
  if (progress >= 1) return 'ripe';
  if (progress >= 0.72) return 'budding';
  if (progress >= 0.42) return 'growing';
  if (progress >= 0.16) return 'sprout';
  return 'seed';
}

export function getGrowthStageLabel(stage: GrowthStage): string {
  switch (stage) {
    case 'seed':
      return 'Seeded';
    case 'sprout':
      return 'Sprouting';
    case 'growing':
      return 'Growing';
    case 'budding':
      return 'Budding';
    case 'ripe':
      return 'Ripe!';
  }
}

export const MASTERY_THRESHOLDS = [3, 8, 15] as const;

export function getMasteryInfo(harvestCount: number) {
  const count = Math.max(0, harvestCount || 0);
  let stars: 0 | 1 | 2 | 3 = 0;
  let nextThreshold: number | null = MASTERY_THRESHOLDS[0];
  let sellMultiplier = 1;
  let speedMultiplier = 1;
  let goldenBonus = 0;

  if (count >= MASTERY_THRESHOLDS[2]) {
    stars = 3;
    nextThreshold = null;
    sellMultiplier = 1.35;
    speedMultiplier = 0.85;
    goldenBonus = 0.15;
  } else if (count >= MASTERY_THRESHOLDS[1]) {
    stars = 2;
    nextThreshold = MASTERY_THRESHOLDS[2];
    sellMultiplier = 1.2;
    speedMultiplier = 0.9;
    goldenBonus = 0.08;
  } else if (count >= MASTERY_THRESHOLDS[0]) {
    stars = 1;
    nextThreshold = MASTERY_THRESHOLDS[1];
    sellMultiplier = 1.1;
    speedMultiplier = 0.95;
    goldenBonus = 0.04;
  }

  return {
    count,
    stars,
    nextThreshold,
    sellMultiplier,
    speedMultiplier,
    goldenBonus,
  };
}

export function getWaterState(
  storedDrops: number,
  updatedAt: number,
  upgrades: ShopUpgradeId[],
  now: number = Date.now()
): { drops: number; max: number; msToNext: number; anchor: number } {
  const hasBarrel = upgrades.includes('rain_barrel');
  const max = hasBarrel ? RAIN_BARREL_MAX_WATER_DROPS : BASE_MAX_WATER_DROPS;
  const recharge = hasBarrel ? RAIN_BARREL_RECHARGE_MS : WATER_RECHARGE_MS;
  if (storedDrops >= max) {
    return { drops: max, max, msToNext: 0, anchor: now };
  }
  const gained = Math.max(0, Math.floor((now - updatedAt) / recharge));
  const drops = Math.min(max, storedDrops + gained);
  if (drops >= max) {
    return { drops, max, msToNext: 0, anchor: now };
  }
  // anchor is when the next drop started recharging
  const anchor = updatedAt + gained * recharge;
  return { drops, max, msToNext: recharge - (now - anchor), anchor };
}

export function getPlotUnlockCost(plotIndex: number): number {
  return PLOT_UNLOCK_COSTS[plotIndex] ?? 1500;
}

export function getDailyFeaturedCropId(level: number, now: number = Date.now()): CropId {
  // Deterministic daily rotation among crops the player can already grow
  const pool = CROP_CATALOG.filter(
    c => !c.requiredLessons && c.category !== 'flower' && (c.requiredLevel ?? 1) <= level
  ).map(c => c.id);
  const dayIndex = Math.floor(now / (24 * 60 * 60 * 1000));
  return pool.length ? pool[dayIndex % pool.length] : 'radish';
}

export function getEffectiveSeedCost(crop: CropDefinition, level: number, now: number = Date.now()): number {
  const isFeatured = getDailyFeaturedCropId(level, now) === crop.id;
  return isFeatured ? Math.round(crop.cost * 0.75) : crop.cost;
}

export function getEffectiveGrowDuration(
  crop: CropDefinition,
  masteryCount: number,
  upgrades: ShopUpgradeId[]
): number {
  const mastery = getMasteryInfo(masteryCount);
  const trowelMultiplier = upgrades.includes('golden_trowel') ? 0.85 : 1;
  return Math.max(15_000, Math.round(crop.harvestDuration * mastery.speedMultiplier * trowelMultiplier));
}

export function getGardenLevel(xp: number): {
  level: number;
  xpInLevel: number;
  xpForNextLevel: number;
  progress: number;
} {
  // Keep 100 XP per level for clean compatibility with existing badges
  const level = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  return {
    level,
    xpInLevel,
    xpForNextLevel: 100,
    progress: xpInLevel / 100,
  };
}

type OrderTemplate = {
  title: string;
  customerName: string;
  requirements: { cropId: CropId; quantity: number }[];
  bonusMultiplier: number;
  rewardXp: number;
  rewardFertilizer: number;
  minLevel?: number;
};

const ORDER_TEMPLATES: OrderTemplate[] = [
  {
    title: 'Crisp Farmers Basket',
    customerName: 'Chef Maya',
    requirements: [
      { cropId: 'radish', quantity: 2 },
      { cropId: 'carrot', quantity: 1 },
    ],
    bonusMultiplier: 1.65,
    rewardXp: 75,
    rewardFertilizer: 1,
  },
  {
    title: 'Sunny Salsa Crate',
    customerName: 'Verde Café',
    requirements: [
      { cropId: 'tomato', quantity: 2 },
      { cropId: 'radish', quantity: 1 },
    ],
    bonusMultiplier: 1.65,
    rewardXp: 90,
    rewardFertilizer: 1,
  },
  {
    title: 'Garden Harvest Box',
    customerName: 'Eco Co-op',
    requirements: [
      { cropId: 'carrot', quantity: 2 },
      { cropId: 'zucchini', quantity: 1 },
    ],
    bonusMultiplier: 1.7,
    rewardXp: 110,
    rewardFertilizer: 1,
  },
  {
    title: 'Green Veggie Medley',
    customerName: 'School Kitchen',
    requirements: [
      { cropId: 'zucchini', quantity: 1 },
      { cropId: 'broccoli', quantity: 1 },
    ],
    bonusMultiplier: 1.75,
    rewardXp: 125,
    rewardFertilizer: 2,
  },
  {
    title: 'Autumn Soup Delivery',
    customerName: 'Bistro Sprout',
    requirements: [
      { cropId: 'pumpkin', quantity: 1 },
      { cropId: 'carrot', quantity: 2 },
    ],
    bonusMultiplier: 1.8,
    rewardXp: 150,
    rewardFertilizer: 2,
    minLevel: 2,
  },
  {
    title: 'Berry & Greens Share',
    customerName: 'Community CSA',
    requirements: [
      { cropId: 'blueberry_bush', quantity: 1 },
      { cropId: 'tomato', quantity: 2 },
    ],
    bonusMultiplier: 1.8,
    rewardXp: 160,
    rewardFertilizer: 2,
  },
];

export function generateFarmOrder(level: number, orderNumber: number): FarmOrder {
  const eligible = ORDER_TEMPLATES.filter(t => !t.minLevel || level >= t.minLevel);
  const template = eligible[orderNumber % eligible.length] ?? ORDER_TEMPLATES[0];

  let baseTotal = 0;
  const requirements = template.requirements.map(req => {
    const crop = getCropById(req.cropId)!;
    baseTotal += crop.baseSellPrice * req.quantity;
    return {
      cropId: req.cropId,
      title: crop.title,
      quantity: req.quantity,
    };
  });

  return {
    id: `order_${orderNumber}_${template.title.toLowerCase().replace(/\s+/g, '_')}`,
    title: template.title,
    customerName: template.customerName,
    requirements,
    rewardSeeds: Math.round(baseTotal * template.bonusMultiplier),
    rewardXp: template.rewardXp,
    rewardFertilizer: template.rewardFertilizer,
  };
}
