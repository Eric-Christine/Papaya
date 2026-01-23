import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import UserContext from '../../contexts/UserContext';
import { craftingRecipes } from '../../data/craftingRecipes';
import * as Haptics from 'expo-haptics';

export default function CraftingArea() {
    const { user, startCraft, claimCraft } = useContext(UserContext);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCraft = (recipeId: string) => {
        const success = startCraft(recipeId);
        if (success) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Crafting Started', 'Your item is being prepared!');
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            Alert.alert('Missing Ingredients', 'You do not have the required items to craft this.');
        }
    };

    const handleClaim = (craftId: string) => {
        claimCraft(craftId);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Craft Claimed!', 'You sold the crafted item for a high price!');
    };

    // Helper to count inventory items
    const getInventoryCount = (title: string) => {
        return user.inventory.filter(i => i.title === title).length;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Crafting Kitchen 🍳</Text>

            {/* Active Crafts Section */}
            {user.activeCrafts.length > 0 && (
                <View style={styles.activeCraftsContainer}>
                    <Text style={styles.subHeader}>Cooking...</Text>
                    {user.activeCrafts.map(craft => {
                        const recipe = craftingRecipes.find(r => r.id === craft.recipeId);
                        if (!recipe) return null;

                        const remaining = Math.max(0, Math.ceil((craft.readyAt - Date.now()) / 1000));
                        const isReady = remaining === 0;

                        return (
                            <View key={craft.id} style={styles.activeCraftCard}>
                                <Text style={styles.craftTitle}>{recipe.title}</Text>
                                {isReady ? (
                                    <TouchableOpacity
                                        style={styles.claimButton}
                                        onPress={() => handleClaim(craft.id)}
                                    >
                                        <Text style={styles.claimButtonText}>Claim & Sell ({recipe.sellPrice} seeds)</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={styles.timerText}>Ready in {remaining}s</Text>
                                )}
                            </View>
                        );
                    })}
                </View>
            )}

            {/* Recipes Section */}
            <Text style={styles.subHeader}>Recipes</Text>
            {craftingRecipes.map(recipe => {
                // Check if user has ingredients
                const ingredientsStatus = recipe.ingredients.map(ing => {
                    const owned = getInventoryCount(ing.itemTitle);
                    return {
                        ...ing,
                        owned,
                        hasEnough: owned >= ing.quantity
                    };
                });

                const canCraft = ingredientsStatus.every(i => i.hasEnough);

                return (
                    <View key={recipe.id} style={styles.recipeCard}>
                        <View style={styles.recipeHeader}>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                            <Text style={styles.recipePrice}>{recipe.sellPrice} seeds</Text>
                        </View>
                        <Text style={styles.recipeDesc}>{recipe.description}</Text>

                        <View style={styles.ingredientsContainer}>
                            {ingredientsStatus.map((ing, idx) => (
                                <Text key={idx} style={[styles.ingredientText, ing.hasEnough ? styles.textGreen : styles.textRed]}>
                                    • {ing.itemTitle}: {ing.owned}/{ing.quantity}
                                </Text>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.craftButton, !canCraft && styles.disabledButton]}
                            onPress={() => handleCraft(recipe.id)}
                            disabled={!canCraft}
                        >
                            <Text style={styles.craftButtonText}>{canCraft ? 'Cook' : 'Missing Items'}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#CCC',
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E65100',
        marginBottom: 15,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
    },
    activeCraftsContainer: {
        marginBottom: 20,
    },
    activeCraftCard: {
        backgroundColor: '#FFF3E0',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FFB74D',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    craftTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E65100',
    },
    timerText: {
        fontSize: 16,
        color: '#E65100',
        fontWeight: '600',
    },
    claimButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    claimButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    recipeCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    recipeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    recipePrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2E7D32',
    },
    recipeDesc: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    ingredientsContainer: {
        marginBottom: 12,
        backgroundColor: '#F9F9F9',
        padding: 8,
        borderRadius: 8,
    },
    ingredientText: {
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '500',
    },
    textGreen: {
        color: '#2E7D32',
    },
    textRed: {
        color: '#D32F2F',
    },
    craftButton: {
        backgroundColor: '#FF9800',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
    },
    craftButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
