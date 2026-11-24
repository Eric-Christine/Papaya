export type CropId =
  | 'radish'
  | 'carrot'
  | 'tomato'
  | 'zucchini'
  | 'broccoli'
  | 'pumpkin'
  | 'blueberry_bush'
  | 'rose_bush'
  | 'orchid'
  | 'garden_gnome';

export type GrowthStage = 'seed' | 'sprout' | 'growing' | 'budding' | 'ripe';

export type CropCategory = 'vegetable' | 'fruit' | 'flower' | 'ornament';

export type CropRarity = 'common' | 'uncommon' | 'rare' | 'epic';

export type ShopUpgradeId = 'golden_trowel' | 'rain_barrel' | 'scarecrow';

export type GardenTool = 'smart' | 'plow' | 'plant' | 'water' | 'fertilize' | 'harvest';

export type CropDefinition = {
  id: CropId;
  title: string;
  description: string;
  ecoFact: string;
  category: CropCategory;
  rarity: CropRarity;
  cost: number;
  baseSellPrice: number;
  harvestDuration: number; // ms
  xpReward: number;
  requiredLessons?: number;
  requiredLevel?: number;
};

export type ShopUpgradeDefinition = {
  id: ShopUpgradeId;
  title: string;
  description: string;
  effectText: string;
  cost: number;
  requiredLevel?: number;
};

export type FarmOrderRequirement = {
  cropId: CropId;
  title: string;
  quantity: number;
};

export type FarmOrder = {
  id: string;
  title: string;
  customerName: string;
  requirements: FarmOrderRequirement[];
  rewardSeeds: number;
  rewardXp: number;
  rewardFertilizer: number;
};

export type GardenItem = {
  id: string;
  cropId?: CropId;
  plotIndex?: number; // 0..8 on the 3x3 farm grid
  title: string;
  description: string;
  growth: string; // e.g., "Planted", "Ready to Harvest"
  plantedAt: number; // Timestamp when planted
  harvestDuration: number; // Effective duration (in ms) until ready to harvest
  cost: number; // Purchase cost
  baseSellPrice?: number;
  xpReward?: number;
  wateredAt?: number; // Last timestamp watered
  waterCount?: number; // Times watered during this growth cycle
  fertilizedCount?: number; // Times fertilized during this growth cycle
};

export type InventoryItem = {
  id: string;
  cropId?: CropId;
  title: string;
  description: string;
  cost: number;
  sellPrice: number; // Includes mastery / golden / daily bonus
  harvestedAt: number; // Timestamp when harvested
  isGolden?: boolean;
  masteryStars?: number;
};

export type HarvestResult = {
  item: InventoryItem;
  xpEarned: number;
  isGolden: boolean;
  harvestCount: number;
  masteryStars: number;
  unlockedNewStar: boolean;
};
