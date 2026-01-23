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
