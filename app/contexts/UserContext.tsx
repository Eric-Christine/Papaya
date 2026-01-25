import React, { createContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { GardenItem, InventoryItem } from '../types/garden';
import { ActiveCraft } from '../types/crafting';
import { craftingRecipes } from '../data/craftingRecipes';
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
};

type UserContextType = {
  user: User;
  addSeeds: (amount: number) => void;
  addXp: (amount: number) => void;
  buyFertilizer: (amount: number, cost: number) => void;
  fertilizeItem: (id: string) => boolean;
  incrementLessons: () => void;
  plantItem: (item: GardenItem) => boolean;
  harvestItem: (id: string) => void;
  sellItem: (id: string) => void;
  startCraft: (recipeId: string) => boolean;
  claimCraft: (craftId: string) => void;
  updateStreak: () => { started: boolean; incremented: boolean; reset: boolean };
};

export const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    email: '',
    avatar: '',
    lessonsCompleted: 0,
    seeds: 0,
    xp: 0,
    fertilizer: 0,
    garden: [],
    inventory: [],
    activeCrafts: [],
    streak: 0,
    lastStreakUpdate: 0,
  },
  addSeeds: () => { },
  addXp: () => { },
  buyFertilizer: () => { },
  fertilizeItem: () => false,
  incrementLessons: () => { },
  plantItem: () => false,
  harvestItem: () => { },
  sellItem: () => { },
  startCraft: () => false,
  claimCraft: () => { },
  updateStreak: () => ({ started: false, incremented: false, reset: false }),
});

const MAX_PLOTS = 4;

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Rachelle',
    email: 'rjl@gmail.com',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/papaya-b8db9.firebasestorage.app/o/Untitled%20design.png?alt=media&token=b8fbba65-86ff-41f4-bec5-ae128d77e39d',
    lessonsCompleted: 0,
    seeds: 1000,
    xp: 0,
    fertilizer: 0,
    garden: [],
    inventory: [],
    activeCrafts: [],
    streak: 0,
    lastStreakUpdate: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);

  // Load user data on mount
  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user_profile');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
    setUser(prev => ({ ...prev, seeds: prev.seeds + amount }));
  };

  const addXp = (amount: number) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const buyFertilizer = (amount: number, cost: number) => {
    setUser(prev => ({
      ...prev,
      seeds: prev.seeds - cost,
      fertilizer: prev.fertilizer + amount
    }));
  };

  const fertilizeItem = (id: string): boolean => {
    let success = false;
    setUser(prev => {
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
      };

      success = true;
      return { ...prev, garden: updatedGarden, fertilizer: prev.fertilizer - 1 };
    });
    return success;
  };

  const incrementLessons = () => {
    setUser(prev => ({ ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }));
  };

  const plantItem = (item: GardenItem): boolean => {
    let didPlant = false;
    setUser(prev => {
      if (prev.garden.length >= MAX_PLOTS) {
        console.warn('Cannot plant item: Garden is full (maximum 4 plots).');
        return prev;
      }
      didPlant = true;
      return { ...prev, garden: [...prev.garden, item] };
    });
    return didPlant;
  };

  const harvestItem = (id: string) => {
    setUser(prev => {
      const itemToHarvest = prev.garden.find(item => item.id === id);
      if (!itemToHarvest) return prev;
      const updatedGarden = prev.garden.filter(item => item.id !== id);
      const inventoryItem: InventoryItem = {
        id: itemToHarvest.id,
        title: itemToHarvest.title,
        description: itemToHarvest.description,
        cost: itemToHarvest.cost,
        sellPrice: Math.round(itemToHarvest.cost * 1.5),
        harvestedAt: Date.now(),
      };
      return { ...prev, garden: updatedGarden, inventory: [...prev.inventory, inventoryItem] };
    });
  };

  const sellItem = (id: string) => {
    setUser(prev => {
      const itemToSell = prev.inventory.find(item => item.id === id);
      if (!itemToSell) return prev;
      const updatedInventory = prev.inventory.filter(item => item.id !== id);
      return { ...prev, inventory: updatedInventory, seeds: prev.seeds + itemToSell.sellPrice };
    });
  };

  const startCraft = (recipeId: string): boolean => {
    let success = false;
    setUser(prev => {
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
    setUser(prev => {
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

    setUser(prev => {
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
        plantItem,
        harvestItem,
        sellItem,
        startCraft,
        claimCraft,
        updateStreak,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;