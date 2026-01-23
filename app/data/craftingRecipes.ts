import { CraftingRecipe } from '../types/crafting';

export const craftingRecipes: CraftingRecipe[] = [
    {
        id: 'recipe_salad',
        title: 'Green Salad',
        description: 'A healthy mix of fresh greens.',
        ingredients: [
            { itemId: 'Zucchini', itemTitle: 'Zucchini', quantity: 1 },
            { itemId: 'Broccoli', itemTitle: 'Broccoli', quantity: 1 },
        ],
        duration: 10000, // 10 seconds for testing (real: maybe 5 mins?)
        sellPrice: 1050, // (150 + 200) * 3 = 1050
    },
    {
        id: 'recipe_bouquet',
        title: 'Floral Bouquet',
        description: 'A stunning arrangement of garden flowers.',
        ingredients: [
            { itemId: 'Rose Bush', itemTitle: 'Rose Bush', quantity: 1 },
            { itemId: 'Orchid', itemTitle: 'Orchid', quantity: 1 },
        ],
        duration: 20000, // 20 seconds
        sellPrice: 2100, // (300 + 400) * 3 = 2100
    },
    {
        id: 'recipe_mythical',
        title: 'Mythical Garden Set',
        description: 'A magical combination for the ultimate garden.',
        ingredients: [
            { itemId: 'Garden Gnome', itemTitle: 'Garden Gnome', quantity: 1 },
            { itemId: 'Blueberry Bush', itemTitle: 'Blueberry Bush', quantity: 1 },
        ],
        duration: 30000, // 30 seconds
        sellPrice: 2250, // (500 + 250) * 3 = 2250
    },
];
