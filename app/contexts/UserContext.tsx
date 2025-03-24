import React, { createContext, useState, ReactNode } from 'react';

export type GardenItem = {
  id: string;
  title: string;
  description: string;
  growth: string;           // e.g., "Planted", "Ready to Harvest"
  plantedAt: number;        // Timestamp when planted
  harvestDuration: number;  // Duration (in ms) until ready to harvest
  cost: number;             // The purchase cost
};

export type InventoryItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
  sellPrice: number;        // 1.5 x cost (rounded)
  harvestedAt: number;      // Timestamp when harvested
};

type User = {
  name: string;
  email: string;
  avatar: string;
  lessonsCompleted: number;
  seeds: number;
  garden: GardenItem[];
  inventory: InventoryItem[];
};

type UserContextType = {
  user: User;
  addSeeds: (amount: number) => void;
  incrementLessons: () => void;
  plantItem: (item: GardenItem) => boolean;  // <-- Return a boolean
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
    garden: [],
    inventory: [],
  },
  addSeeds: () => {},
  incrementLessons: () => {},
  plantItem: () => false,
  harvestItem: () => {},
  sellItem: () => {},
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
    garden: [],
    inventory: [],
  });

  const addSeeds = (amount: number) => {
    setUser(prev => ({ ...prev, seeds: prev.seeds + amount }));
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