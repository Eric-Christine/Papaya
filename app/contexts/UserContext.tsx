import React, { createContext, useState, ReactNode } from 'react';
import { GardenItem, InventoryItem } from '../types/garden';

type User = {
  name: string;
  email: string;
  avatar: string;
  lessonsCompleted: number;
  seeds: number;
  xp: number;
  fertilizer: number; // Added Fertilizer count
  garden: GardenItem[];
  inventory: InventoryItem[];
};

type UserContextType = {
  user: User;
  addSeeds: (amount: number) => void;
  addXp: (amount: number) => void;
  buyFertilizer: (amount: number, cost: number) => void; // Added buyFertilizer
  fertilizeItem: (id: string) => boolean; // Added fertilizeItem
  incrementLessons: () => void;
  plantItem: (item: GardenItem) => boolean;
  harvestItem: (id: string) => void;
  sellItem: (id: string) => void;
};

export const UserContext = createContext<UserContextType>({
  user: {
    name: '',
    email: '',
    avatar: '',
    lessonsCompleted: 0,
    seeds: 0,
    xp: 0,
    fertilizer: 0, // Initial Fertilizer
    garden: [],
    inventory: [],
  },
  addSeeds: () => { },
  addXp: () => { },
  buyFertilizer: () => { },
  fertilizeItem: () => false,
  incrementLessons: () => { },
  plantItem: () => false,
  harvestItem: () => { },
  sellItem: () => { },
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
    fertilizer: 0, // Initial Fertilizer
    garden: [],
    inventory: [],
  });

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

      // Calculate remaining time
      const elapsed = Date.now() - item.plantedAt;
      const remaining = Math.max(item.harvestDuration - elapsed, 0);

      if (remaining <= 0) return prev; // Don't fertilize if already ready

      // Magic: To "cut remaining time in half", we can virtually increase "elapsed" time
      // or effectively decrease harvestDuration. Let's decrease harvestDuration.
      // But wait, `plantedAt` is fixed.
      // Better approach: Shift `plantedAt` back in time by half the remaining duration.
      // New Remaining = Old Remaining / 2
      // New Elapsed = HarvestDuration - New Remaining
      // Shift = New Elapsed - Old Elapsed = (HarvestDuration - Rem/2) - (HarvestDuration - Rem) = Rem/2

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

  // Return `true` if successfully planted, `false` if garden is full
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;