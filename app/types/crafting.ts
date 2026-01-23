export type Ingredient = {
    itemId: string; // references InventoryItem id (or title, but id is safer if we had static ids)
    itemTitle: string; // Using title for now since items in inventory have unique titles for grouping
    quantity: number;
};

export type CraftingRecipe = {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    duration: number; // in ms
    sellPrice: number;
};

export type ActiveCraft = {
    id: string; // unique instance id
    recipeId: string;
    startTime: number;
    readyAt: number;
};
