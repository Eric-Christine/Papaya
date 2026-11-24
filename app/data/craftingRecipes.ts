import { CraftingRecipe } from '../types/crafting';

export const craftingRecipes: CraftingRecipe[] = [
    {
        id: 'recipe_harvest_soup',
        title: 'Garden Harvest Soup',
        description: 'Warm, slow-simmered soup made from fresh root crops and vine tomatoes.',
        ingredients: [
            { itemId: 'Carrot', itemTitle: 'Carrot', quantity: 1 },
            { itemId: 'Tomato', itemTitle: 'Tomato', quantity: 1 },
        ],
        duration: 120000, // 2 minutes
        sellPrice: 520,
    },
    {
        id: 'recipe_salad',
        title: 'Green Salad',
        description: 'A healthy mix of fresh greens.',
        ingredients: [
            { itemId: 'Zucchini', itemTitle: 'Zucchini', quantity: 1 },
            { itemId: 'Broccoli', itemTitle: 'Broccoli', quantity: 1 },
        ],
        duration: 300000, // 5 minutes
        sellPrice: 1050, // (150 + 200) * 3 = 1050
    },
    {
        id: 'recipe_autumn_roast',
        title: 'Autumn Harvest Bake',
        description: 'Sweet roasted pumpkin paired with zesty glazed radishes.',
        ingredients: [
            { itemId: 'Pumpkin', itemTitle: 'Pumpkin', quantity: 1 },
            { itemId: 'Radish', itemTitle: 'Radish', quantity: 2 },
        ],
        duration: 420000, // 7 minutes
        sellPrice: 1200,
    },
    {
        id: 'recipe_bouquet',
        title: 'Floral Bouquet',
        description: 'A stunning arrangement of garden flowers.',
        ingredients: [
            { itemId: 'Rose Bush', itemTitle: 'Rose Bush', quantity: 1 },
            { itemId: 'Orchid', itemTitle: 'Orchid', quantity: 1 },
        ],
        duration: 600000, // 10 minutes
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
        duration: 900000, // 15 minutes
        sellPrice: 2250, // (500 + 250) * 3 = 2250
    },
];
