// app/screens/GardenScreen.tsx
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Animated, Easing, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import UserContext, { GardenItem } from '../contexts/UserContext';
import Zucchini from '../../components/plants/Zucchini';
import Broccoli from '../../components/plants/Broccoli';
import BlueberryBush from '../../components/plants/BlueberryBush';
import RoseBush from '../../components/plants/RoseBush';
import Orchid from '../../components/plants/Orchid';
import GardenGnome from '../../components/plants/GardenGnome';

// -----------------------------------------------------------------------------
// SwayingPlant Component
// Wraps a plant SVG and applies a gentle swaying animation + growth scaling.
// -----------------------------------------------------------------------------
const SwayingPlant = ({ children, progress }: { children: React.ReactNode; progress: number }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // gentle sway animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: -1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Map 0 -> 1 to -5deg -> 5deg
  const spin = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  // Scale from 0.5 (just planted) to 1.0 (fully grown)
  // Ensure we don't scale down to 0 invisible
  const scale = 0.5 + (Math.max(0, Math.min(progress, 1)) * 0.5);

  return (
    <Animated.View style={{ transform: [{ rotate: spin }, { scale }] }}>
      {children}
    </Animated.View>
  );
};

export default function GardenScreen() {
  const { user, harvestItem, sellItem, addXp, fertilizeItem } = useContext(UserContext);
  const { garden, inventory, xp, fertilizer } = user; // Get xp and fertilizer from user context
  const [tick, setTick] = useState(0);
  const MAX_PLOTS = 4;

  // Gamification: Level and Progress derived from global XP
  const level = Math.floor(xp / 100) + 1;
  const xpProgress = xp % 100;
  const progressPercent = xpProgress / 100;

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (item: GardenItem) => {
    const elapsed = Date.now() - item.plantedAt;
    const remaining = Math.max(item.harvestDuration - elapsed, 0);
    return Math.ceil(remaining / 1000);
  };

  const getProgress = (item: GardenItem) => {
    const elapsed = Date.now() - item.plantedAt;
    return Math.min(elapsed / item.harvestDuration, 1);
  };

  const handleHarvest = (item: GardenItem) => {
    harvestItem(item.id);
    addXp(50); // Award 50 XP per harvest
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Harvested!', `${item.title} harvested! +50 XP`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Garden</Text>
      <View style={styles.gamificationHeader}>
        <View style={styles.levelRow}>
          <Text style={styles.gamificationText}>Garden Level {level}</Text>
          <Text style={styles.xpText}>{xpProgress}/100 XP</Text>
        </View>
        <Text style={styles.fertilizerText}>⚡️ Fertilizer: {fertilizer}</Text>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBarFill, { width: `${progressPercent * 100}%` }]} />
        </View>
      </View>

      {garden.length === 0 ? (
        <Text style={styles.emptyText}>
          No crops planted yet. Please visit the Rewards Shop to plant new crops.
        </Text>
      ) : (
        garden.map(item => {
          const elapsed = Date.now() - item.plantedAt;
          const ready = elapsed >= item.harvestDuration;
          const progress = getProgress(item);
          return (
            <View key={item.id} style={styles.plantedItem}>
              <View style={styles.itemHeader}>
                {item.title === 'Zucchini' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <Zucchini width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                {item.title === 'Broccoli' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <Broccoli width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                {item.title === 'Blueberry Bush' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <BlueberryBush width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                {item.title === 'Rose Bush' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <RoseBush width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                {item.title === 'Orchid' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <Orchid width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                {item.title === 'Garden Gnome' && (
                  <View style={styles.iconContainer}>
                    <SwayingPlant progress={progress}>
                      <GardenGnome width={60} height={60} />
                    </SwayingPlant>
                  </View>
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </View>
              {ready ? (
                <>
                  <Text style={styles.readyText}>Ready to Harvest!</Text>
                  <Button title="Harvest" onPress={() => handleHarvest(item)} />
                </>
              ) : (
                <>
                  <View style={styles.progressBarBackground}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                  </View>
                  <Text style={styles.growthText}>
                    Growing... {getRemainingTime(item)}s until harvest
                  </Text>
                  {fertilizer > 0 && (
                    <TouchableOpacity
                      style={styles.fertilizerButton}
                      onPress={() => {
                        const success = fertilizeItem(item.id);
                        if (success) {
                          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                          Alert.alert('Fertilized!', 'Growth time cut in half!');
                        }
                      }}
                    >
                      <Text style={styles.fertilizerButtonText}>Use Fertilizer ⚡️</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          );
        })
      )}

      {/* Show empty plot placeholders if garden is not full */}
      {garden.length < MAX_PLOTS && (
        <View style={styles.emptyPlotsContainer}>
          {[...Array(MAX_PLOTS - garden.length)].map((_, index) => (
            <View key={`empty-${index}`} style={styles.emptyPlot}>
              <Text style={styles.emptyPlotText}>Empty Plot</Text>
            </View>
          ))}
          <Text style={styles.infoText}>
            To plant new crops, please use the Rewards Shop.
          </Text>
        </View>
      )}

      <View style={styles.inventorySection}>
        <Text style={styles.sectionHeader}>Inventory</Text>
        {inventory.length === 0 ? (
          <Text style={styles.emptyText}>No harvested items yet.</Text>
        ) : (
          inventory.map(item => (
            <View key={item.id} style={styles.inventoryItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>

              <View style={{ marginVertical: 10 }}>
                {item.title === 'Zucchini' && <Zucchini width={60} height={60} />}
                {item.title === 'Broccoli' && <Broccoli width={60} height={60} />}
                {item.title === 'Blueberry Bush' && <BlueberryBush width={60} height={60} />}
                {item.title === 'Rose Bush' && <RoseBush width={60} height={60} />}
                {item.title === 'Orchid' && <Orchid width={60} height={60} />}
                {item.title === 'Garden Gnome' && <GardenGnome width={60} height={60} />}
              </View>

              <Text style={styles.sellPrice}>Sell Price: {item.sellPrice} seeds</Text>
              <Button
                title="Sell"
                onPress={() => {
                  sellItem(item.id);
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
    backgroundColor: '#E8F5E9',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  gamificationHeader: {
    backgroundColor: '#C8E6C9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  gamificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  xpText: {
    fontSize: 14,
    color: '#388E3C',
    fontWeight: '600',
  },
  xpBarContainer: {
    height: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
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
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    width: '100%',
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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
  emptyPlotsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyPlot: {
    backgroundColor: '#F1F8E9',
    borderWidth: 2,
    borderColor: '#C5E1A5',
    borderStyle: 'dashed',
    padding: 20,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  emptyPlotText: {
    fontSize: 16,
    color: '#888',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
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
  fertilizerText: {
    fontSize: 16,
    color: '#F9A825',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fertilizerButton: {
    marginTop: 10,
    backgroundColor: '#FFF9C4',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FBC02D',
  },
  fertilizerButtonText: {
    color: '#F57F17',
    fontWeight: 'bold',
  },
});