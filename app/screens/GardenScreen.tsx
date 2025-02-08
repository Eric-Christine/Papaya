// app/screens/GardenScreen.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import UserContext, { GardenItem } from '../contexts/UserContext';

export default function GardenScreen() {
  const { user, harvestItem, sellItem } = useContext(UserContext);
  const { garden, inventory } = user;
  // This state forces a re-render every second to update progress.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to calculate remaining time (in seconds) until an item is ready to harvest.
  const getRemainingTime = (item: GardenItem) => {
    const elapsed = Date.now() - item.plantedAt;
    const remaining = Math.max(item.harvestDuration - elapsed, 0);
    return Math.ceil(remaining / 1000);
  };

  // Helper to calculate progress percentage (0 to 1)
  const getProgress = (item: GardenItem) => {
    const elapsed = Date.now() - item.plantedAt;
    return Math.min(elapsed / item.harvestDuration, 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Garden</Text>
      
      {/* Garden Items Section */}
      {garden.length === 0 ? (
        <Text style={styles.emptyText}>
          No items planted yet. Purchase items from the Rewards Shop and plant them here!
        </Text>
      ) : (
        garden.map(item => {
          const elapsed = Date.now() - item.plantedAt;
          const ready = elapsed >= item.harvestDuration;
          const progress = getProgress(item); // Value between 0 and 1
          return (
            <View key={item.id} style={styles.plantedItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {ready ? (
                <>
                  <Text style={styles.readyText}>Ready to Harvest!</Text>
                  <Button title="Harvest" onPress={() => harvestItem(item.id)} />
                </>
              ) : (
                <>
                  {/* Progress Bar */}
                  <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                  </View>
                  <Text style={styles.growthText}>
                    Growing... {getRemainingTime(item)}s until harvest
                  </Text>
                </>
              )}
            </View>
          );
        })
      )}

      {/* Inventory Section */}
      <View style={styles.inventorySection}>
        <Text style={styles.sectionHeader}>Inventory</Text>
        {inventory.length === 0 ? (
          <Text style={styles.emptyText}>No harvested items yet.</Text>
        ) : (
          inventory.map(item => (
            <View key={item.id} style={styles.inventoryItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.sellPrice}>Sell Price: {item.sellPrice} seeds</Text>
              <Button
                title="Sell"
                onPress={() => {
                  sellItem(item.id);
                  Alert.alert('Item Sold', `${item.title} sold for ${item.sellPrice} seeds.`);
                }}
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E8F5E9', // A garden-inspired green background
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  plantedItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2E7D32',
  },
  growthText: {
    fontSize: 16,
    color: '#2E7D32',
    marginTop: 5,
  },
  readyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 5,
  },
  inventorySection: {
    width: '100%',
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  inventoryItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sellPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 5,
  },
});
