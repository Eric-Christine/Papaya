import React, { createContext, useState, useRef, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import {
  CropId,
  GardenItem,
  HarvestResult,
  InventoryItem,
  ShopUpgradeId,
} from '../types/garden';
import { ActiveCraft } from '../types/crafting';
import { craftingRecipes } from '../data/craftingRecipes';
import {
  GOLDEN_BASE_CHANCE,
  GOLDEN_SELL_MULTIPLIER,
  GOLDEN_XP_MULTIPLIER,
  INITIAL_UNLOCKED_PLOTS,
  SCARECROW_GOLDEN_BONUS,
  SHOP_UPGRADES,
  TOTAL_FARM_PLOTS,
  WATER_GROWTH_BOOST,
  WATER_HYDRATION_DURATION_MS,
  BASE_MAX_WATER_DROPS,
  generateFarmOrder,
  getCropById,
  getEffectiveGrowDuration,
  getEffectiveSeedCost,
  getGardenLevel,
  getMasteryInfo,
  getPlotUnlockCost,
  getWaterState,
  resolveCropId,
} from '../data/shopCatalog';
import { v4 as uuidv4 } from 'uuid';

type User = {
  name: string;
  email: string;
  avatar: string;
  lessonsCompleted: number;
  seeds: number;
  xp: number;
  fertilizer: number;
  garden: GardenItem[];
  inventory: InventoryItem[];
  activeCrafts: ActiveCraft[];
  streak: number;
  lastStreakUpdate: number;
  // Farm
  unlockedPlots: number;
  tilledPlots: number[];
  seedBag: Partial<Record<CropId, number>>;
  waterDrops: number;
  waterUpdatedAt: number;
  upgrades: ShopUpgradeId[];
  harvestCounts: Partial<Record<CropId, number>>;
  orderNumber: number;
};

// ok: true, or ok: false with a reason that can be shown to the player
export type ActionResult = { ok: true } | { ok: false; reason: string };

type UserContextType = {
  user: User;
  addSeeds: (amount: number) => void;
  addXp: (amount: number) => void;
  buyFertilizer: (amount: number, cost: number) => void;
  fertilizeItem: (id: string) => boolean;
  incrementLessons: () => void;
  sellItem: (id: string) => void;
  startCraft: (recipeId: string) => boolean;
  claimCraft: (craftId: string) => void;
  updateStreak: () => { started: boolean; incremented: boolean; reset: boolean };
  buySeeds: (cropId: CropId, quantity: number) => ActionResult;
  plowPlot: (plotIndex: number) => ActionResult;
  plantCrop: (plotIndex: number, cropId: CropId) => ActionResult;
  waterPlot: (plotIndex: number) => ActionResult;
  harvestPlot: (plotIndex: number) => HarvestResult | null;
  unlockPlot: () => ActionResult;
  buyUpgrade: (upgradeId: ShopUpgradeId) => ActionResult;
  deliverOrder: () => ActionResult;
  skipOrder: () => void;
};

const DEFAULT_USER: User = {
  name: 'Gardener',
  email: '',
  avatar: '',
  lessonsCompleted: 0,
  seeds: 1000,
  xp: 0,
  fertilizer: 0,
  garden: [],
  inventory: [],
  activeCrafts: [],
  streak: 0,
  lastStreakUpdate: 0,
  unlockedPlots: INITIAL_UNLOCKED_PLOTS,
  tilledPlots: [],
  seedBag: { radish: 2, carrot: 1 },
  waterDrops: BASE_MAX_WATER_DROPS,
  waterUpdatedAt: 0,
  upgrades: [],
  harvestCounts: {},
  orderNumber: 0,
};

export const UserContext = createContext<UserContextType>({
  user: DEFAULT_USER,
  addSeeds: () => { },
  addXp: () => { },
  buyFertilizer: () => { },
  fertilizeItem: () => false,
  incrementLessons: () => { },
  sellItem: () => { },
  startCraft: () => false,
  claimCraft: () => { },
  updateStreak: () => ({ started: false, incremented: false, reset: false }),
  buySeeds: () => ({ ok: false, reason: '' }),
  plowPlot: () => ({ ok: false, reason: '' }),
  plantCrop: () => ({ ok: false, reason: '' }),
  waterPlot: () => ({ ok: false, reason: '' }),
  harvestPlot: () => null,
  unlockPlot: () => ({ ok: false, reason: '' }),
  buyUpgrade: () => ({ ok: false, reason: '' }),
  deliverOrder: () => ({ ok: false, reason: '' }),
  skipOrder: () => { },
});

// Profiles saved before the pixel farm have crops without a plot or crop id.
// Give each one a plot so it shows up on the farm grid.
const migrateUser = (stored: Partial<User>): User => {
  const merged: User = { ...DEFAULT_USER, ...stored };
  const taken = new Set<number>();
  merged.garden.forEach(item => {
    if (item.plotIndex !== undefined) taken.add(item.plotIndex);
  });
  let nextFree = 0;
  const garden = merged.garden.map(item => {
    let plotIndex = item.plotIndex;
    if (plotIndex === undefined) {
      while (taken.has(nextFree)) nextFree++;
      plotIndex = nextFree;
      taken.add(plotIndex);
    }
    return { ...item, plotIndex, cropId: resolveCropId(item.cropId, item.title) };
  });
  const highestPlot = Math.max(-1, ...garden.map(g => g.plotIndex ?? 0));
  return {
    ...merged,
    garden,
    unlockedPlots: Math.min(TOTAL_FARM_PLOTS, Math.max(merged.unlockedPlots, highestPlot + 1)),
  };
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  // Mirrors the latest user state so actions can read it and return results synchronously.
  // React may defer setState updater functions, so values computed inside them are not
  // reliably available to the caller.
  const userRef = useRef<User>(user);

  const update = (updater: (prev: User) => User) => {
    const next = updater(userRef.current);
    if (next !== userRef.current) {
      userRef.current = next;
      setUser(next);
    }
  };

  // Runs a farm action: the step returns the next user, or a reason string to refuse.
  const attempt = (step: (prev: User) => User | string): ActionResult => {
    let result: ActionResult = { ok: true };
    update(prev => {
      const next = step(prev);
      if (typeof next === 'string') {
        result = { ok: false, reason: next };
        return prev;
      }
      return next;
    });
    return result;
  };

  const [isLoading, setIsLoading] = React.useState(true);

  // Load user data on mount
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user_profile');
        if (storedUser) {
          // Merge over defaults so profiles saved by older versions keep working
          const loaded = migrateUser(JSON.parse(storedUser));
          userRef.current = loaded;
          setUser(loaded);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Save user data whenever it changes
  React.useEffect(() => {
    if (!isLoading) {
      const saveUserData = async () => {
        try {
          await AsyncStorage.setItem('user_profile', JSON.stringify(user));
        } catch (error) {
          console.error('Failed to save user data:', error);
        }
      };
      saveUserData();
    }
  }, [user, isLoading]);

  const addSeeds = (amount: number) => {
    update(prev => ({ ...prev, seeds: prev.seeds + amount }));
  };

  const addXp = (amount: number) => {
    update(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const buyFertilizer = (amount: number, cost: number) => {
    update(prev => ({
      ...prev,
      seeds: prev.seeds - cost,
      fertilizer: prev.fertilizer + amount
    }));
  };

  const fertilizeItem = (id: string): boolean => {
    let success = false;
    update(prev => {
      if (prev.fertilizer <= 0) return prev;

      const itemIndex = prev.garden.findIndex(item => item.id === id);
      if (itemIndex === -1) return prev;

      const updatedGarden = [...prev.garden];
      const item = updatedGarden[itemIndex];

      const elapsed = Date.now() - item.plantedAt;
      const remaining = Math.max(item.harvestDuration - elapsed, 0);

      if (remaining <= 0) return prev;

      const timeToSkip = Math.floor(remaining / 2);
      updatedGarden[itemIndex] = {
        ...item,
        plantedAt: item.plantedAt - timeToSkip,
        fertilizedCount: (item.fertilizedCount ?? 0) + 1,
      };

      success = true;
      return { ...prev, garden: updatedGarden, fertilizer: prev.fertilizer - 1 };
    });
    return success;
  };

  const incrementLessons = () => {
    update(prev => ({ ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }));
  };

  const sellItem = (id: string) => {
    update(prev => {
      const itemToSell = prev.inventory.find(item => item.id === id);
      if (!itemToSell) return prev;
      const updatedInventory = prev.inventory.filter(item => item.id !== id);
      return { ...prev, inventory: updatedInventory, seeds: prev.seeds + itemToSell.sellPrice };
    });
  };

  const buySeeds = (cropId: CropId, quantity: number): ActionResult =>
    attempt(prev => {
      const crop = getCropById(cropId);
      if (!crop) return 'Unknown seed.';
      const { level } = getGardenLevel(prev.xp);
      if (crop.requiredLevel && level < crop.requiredLevel) {
        return `Reach Farm Level ${crop.requiredLevel} to grow ${crop.title}.`;
      }
      if (crop.requiredLessons && prev.lessonsCompleted < crop.requiredLessons) {
        return `Complete ${crop.requiredLessons} lessons to unlock ${crop.title}.`;
      }
      const total = getEffectiveSeedCost(crop, level) * quantity;
      if (prev.seeds < total) return `You need ${total - prev.seeds} more seeds.`;
      return {
        ...prev,
        seeds: prev.seeds - total,
        seedBag: { ...prev.seedBag, [cropId]: (prev.seedBag[cropId] ?? 0) + quantity },
      };
    });

  const plowPlot = (plotIndex: number): ActionResult =>
    attempt(prev => {
      if (plotIndex >= prev.unlockedPlots) return 'Expand your land first.';
      if (prev.garden.some(g => g.plotIndex === plotIndex)) return 'Something is growing here.';
      if (prev.tilledPlots.includes(plotIndex)) return 'Already plowed.';
      return { ...prev, tilledPlots: [...prev.tilledPlots, plotIndex], xp: prev.xp + 1 };
    });

  const plantCrop = (plotIndex: number, cropId: CropId): ActionResult =>
    attempt(prev => {
      const crop = getCropById(cropId);
      if (!crop) return 'Unknown seed.';
      if (prev.garden.some(g => g.plotIndex === plotIndex)) return 'Something is growing here.';
      if (!prev.tilledPlots.includes(plotIndex)) return 'Plow the soil first.';
      const owned = prev.seedBag[cropId] ?? 0;
      if (owned <= 0) return `No ${crop.title} seeds left.`;

      const now = Date.now();
      const item: GardenItem = {
        id: uuidv4(),
        cropId,
        plotIndex,
        title: crop.title,
        description: crop.description,
        growth: 'Planted',
        plantedAt: now,
        harvestDuration: getEffectiveGrowDuration(crop, prev.harvestCounts[cropId] ?? 0, prev.upgrades),
        cost: crop.cost,
        baseSellPrice: crop.baseSellPrice,
        xpReward: crop.xpReward,
        waterCount: 0,
        fertilizedCount: 0,
      };
      return {
        ...prev,
        garden: [...prev.garden, item],
        tilledPlots: prev.tilledPlots.filter(p => p !== plotIndex),
        seedBag: { ...prev.seedBag, [cropId]: owned - 1 },
      };
    });

  const waterPlot = (plotIndex: number): ActionResult =>
    attempt(prev => {
      const now = Date.now();
      const index = prev.garden.findIndex(g => g.plotIndex === plotIndex);
      if (index === -1) return 'Nothing to water here.';
      const item = prev.garden[index];
      const remaining = item.harvestDuration - (now - item.plantedAt);
      if (remaining <= 0) return 'Ready to harvest!';
      if (item.wateredAt && now - item.wateredAt < WATER_HYDRATION_DURATION_MS) {
        return 'Soil is still wet.';
      }
      const water = getWaterState(prev.waterDrops, prev.waterUpdatedAt, prev.upgrades, now);
      if (water.drops <= 0) return 'Watering can is empty.';

      const boost = Math.min(remaining, Math.round(item.harvestDuration * WATER_GROWTH_BOOST));
      const garden = [...prev.garden];
      garden[index] = {
        ...item,
        plantedAt: item.plantedAt - boost,
        wateredAt: now,
        waterCount: (item.waterCount ?? 0) + 1,
      };
      return { ...prev, garden, waterDrops: water.drops - 1, waterUpdatedAt: water.anchor };
    });

  const harvestPlot = (plotIndex: number): HarvestResult | null => {
    let result: HarvestResult | null = null;
    update(prev => {
      const now = Date.now();
      const item = prev.garden.find(g => g.plotIndex === plotIndex);
      if (!item || now - item.plantedAt < item.harvestDuration) return prev;

      const cropId = resolveCropId(item.cropId, item.title);
      const crop = getCropById(cropId)!;
      const harvestCount = (prev.harvestCounts[cropId] ?? 0) + 1;
      const before = getMasteryInfo(harvestCount - 1);
      const after = getMasteryInfo(harvestCount);
      const goldenChance =
        GOLDEN_BASE_CHANCE +
        before.goldenBonus +
        (prev.upgrades.includes('scarecrow') ? SCARECROW_GOLDEN_BONUS : 0);
      const isGolden = Math.random() < goldenChance;
      const baseSell = item.baseSellPrice ?? crop.baseSellPrice;
      const xpEarned = (item.xpReward ?? crop.xpReward) * (isGolden ? GOLDEN_XP_MULTIPLIER : 1);

      const harvested: InventoryItem = {
        id: item.id,
        cropId,
        title: crop.title,
        description: crop.description,
        cost: item.cost,
        sellPrice: Math.round(baseSell * after.sellMultiplier * (isGolden ? GOLDEN_SELL_MULTIPLIER : 1)),
        harvestedAt: now,
        isGolden,
        masteryStars: after.stars,
      };
      result = {
        item: harvested,
        xpEarned,
        isGolden,
        harvestCount,
        masteryStars: after.stars,
        unlockedNewStar: after.stars > before.stars,
      };
      return {
        ...prev,
        garden: prev.garden.filter(g => g.id !== item.id),
        // Harvested soil stays plowed, ready for the next seed
        tilledPlots: [...prev.tilledPlots, plotIndex],
        inventory: [...prev.inventory, harvested],
        xp: prev.xp + xpEarned,
        harvestCounts: { ...prev.harvestCounts, [cropId]: harvestCount },
      };
    });
    return result;
  };

  const unlockPlot = (): ActionResult =>
    attempt(prev => {
      if (prev.unlockedPlots >= TOTAL_FARM_PLOTS) return 'Your farm is fully expanded.';
      const cost = getPlotUnlockCost(prev.unlockedPlots);
      if (prev.seeds < cost) return `You need ${cost - prev.seeds} more seeds.`;
      return { ...prev, seeds: prev.seeds - cost, unlockedPlots: prev.unlockedPlots + 1 };
    });

  const buyUpgrade = (upgradeId: ShopUpgradeId): ActionResult =>
    attempt(prev => {
      const upgrade = SHOP_UPGRADES.find(u => u.id === upgradeId);
      if (!upgrade) return 'Unknown upgrade.';
      if (prev.upgrades.includes(upgradeId)) return 'You already own this.';
      const { level } = getGardenLevel(prev.xp);
      if (upgrade.requiredLevel && level < upgrade.requiredLevel) {
        return `Reach Farm Level ${upgrade.requiredLevel} first.`;
      }
      if (prev.seeds < upgrade.cost) return `You need ${upgrade.cost - prev.seeds} more seeds.`;
      return { ...prev, seeds: prev.seeds - upgrade.cost, upgrades: [...prev.upgrades, upgradeId] };
    });

  const deliverOrder = (): ActionResult =>
    attempt(prev => {
      const order = generateFarmOrder(getGardenLevel(prev.xp).level, prev.orderNumber);
      const used = new Set<string>();
      for (const req of order.requirements) {
        // Deliver regular crops before golden ones, which sell for more
        const matches = prev.inventory
          .filter(i => resolveCropId(i.cropId, i.title) === req.cropId && !used.has(i.id))
          .sort((a, b) => Number(Boolean(a.isGolden)) - Number(Boolean(b.isGolden)));
        if (matches.length < req.quantity) {
          return `Need ${req.quantity - matches.length} more ${req.title}.`;
        }
        matches.slice(0, req.quantity).forEach(i => used.add(i.id));
      }
      return {
        ...prev,
        inventory: prev.inventory.filter(i => !used.has(i.id)),
        seeds: prev.seeds + order.rewardSeeds,
        xp: prev.xp + order.rewardXp,
        fertilizer: prev.fertilizer + order.rewardFertilizer,
        orderNumber: prev.orderNumber + 1,
      };
    });

  const skipOrder = () => {
    update(prev => ({ ...prev, orderNumber: prev.orderNumber + 1 }));
  };

  const startCraft = (recipeId: string): boolean => {
    let success = false;
    update(prev => {
      const recipe = craftingRecipes.find(r => r.id === recipeId);
      if (!recipe) return prev;

      // Check ingredients
      const currentInventory = [...prev.inventory];
      const ingredientsToRemove: string[] = [];

      for (const ingredient of recipe.ingredients) {
        // Find matching items in inventory
        // We match by title since we don't have stable IDs for item types in inventory
        const matchingItems = currentInventory.filter(
          (item, index) => item.title === ingredient.itemTitle && !ingredientsToRemove.includes(item.id)
        );

        if (matchingItems.length < ingredient.quantity) {
          // Missing ingredients
          return prev;
        }

        // Mark items for removal
        for (let i = 0; i < ingredient.quantity; i++) {
          ingredientsToRemove.push(matchingItems[i].id);
        }
      }

      // If we got here, we have all ingredients. Remove them.
      const updatedInventory = prev.inventory.filter(item => !ingredientsToRemove.includes(item.id));

      const newCraft: ActiveCraft = {
        id: uuidv4(),
        recipeId: recipe.id,
        startTime: Date.now(),
        readyAt: Date.now() + recipe.duration,
      };

      success = true;
      return { ...prev, inventory: updatedInventory, activeCrafts: [...prev.activeCrafts, newCraft] };
    });
    return success;
  };

  const claimCraft = (craftId: string) => {
    update(prev => {
      const craft = prev.activeCrafts.find(c => c.id === craftId);
      if (!craft) return prev;

      // Check if ready
      if (Date.now() < craft.readyAt) return prev;

      const recipe = craftingRecipes.find(r => r.id === craft.recipeId);
      if (!recipe) return prev;

      // Remove craft and add seeds
      const updatedCrafts = prev.activeCrafts.filter(c => c.id !== craftId);

      return {
        ...prev,
        activeCrafts: updatedCrafts,
        seeds: prev.seeds + recipe.sellPrice
      };
    });
  };

  const updateStreak = () => {
    const now = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const twoDaysInMs = 48 * 60 * 60 * 1000;
    let result = { started: false, incremented: false, reset: false };

    update(prev => {
      const lastUpdate = prev.lastStreakUpdate;
      const timeDiff = now - lastUpdate;

      if (lastUpdate === 0) {
        // First streak
        result.started = true;
        return { ...prev, streak: 1, lastStreakUpdate: now };
      }

      if (timeDiff >= oneDayInMs && timeDiff < twoDaysInMs) {
        // Within the 24-48h window, increment streak
        result.incremented = true;
        return { ...prev, streak: prev.streak + 1, lastStreakUpdate: now };
      } else if (timeDiff >= twoDaysInMs) {
        // More than 48h passed, reset streak
        result.reset = true;
        return { ...prev, streak: 1, lastStreakUpdate: now };
      }

      // If less than 24h, do nothing
      return prev;
    });

    if (result.started || result.incremented) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (result.reset) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }

    return result;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        addSeeds,
        addXp,
        buyFertilizer,
        fertilizeItem,
        incrementLessons,
        sellItem,
        startCraft,
        claimCraft,
        updateStreak,
        buySeeds,
        plowPlot,
        plantCrop,
        waterPlot,
        harvestPlot,
        unlockPlot,
        buyUpgrade,
        deliverOrder,
        skipOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
