import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import UserContext from '../contexts/UserContext';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const itemsData = [
  {
    id: '1',
    title: 'Zucchini',
    description: 'A fresh zucchini to brighten your garden.',
    cost: 150,
    harvestDuration: 10000, // 10 seconds
  },
  {
    id: '2',
    title: 'Broccoli',
    description: 'A nutritious head of broccoli for a healthy meal.',
    cost: 200,
    harvestDuration: 600000, // 10 minutes
  },
  {
    id: '3',
    title: 'Blueberry Bush',
    description: 'Produces sweet, tangy blueberries.',
    cost: 250,
    harvestDuration: 1800000, // 30 minutes
  },
  {
    id: '4',
    title: 'Rose Bush',
    description: 'A beautiful rose bush to add color to your garden.',
    cost: 300,
    harvestDuration: 3600000, // 1 hour
  },
  {
    id: '5',
    title: 'Orchid',
    description: 'An elegant orchid that only blooms after dedication.',
    cost: 400,
    harvestDuration: 7200000, // 2 hours
    requiredLessons: 5,
  },
  {
    id: '6',
    title: 'Garden Gnome',
    description: 'A magical gnome that rewards your garden wisdom.',
    cost: 500,
    harvestDuration: 10800000, // 3 hours
    requiredLessons: 10,
  },
  {
    id: '7',
    title: 'Heart',
    description: 'Buy a heart (extra life) for quizzes. Each heart costs 100 seeds.',
    cost: 100,
    harvestDuration: 0,
  },
];

const badgesData = [
  {
    id: '1',
    title: 'Sunflower Badge',
    description: 'Awarded for consistent care of your garden.',
  },
  {
    id: '2',
    title: 'Green Thumb Badge',
    description: 'Earned after harvesting your first garden produce.',
  },
  {
    id: '3',
    title: 'Master Gardener Badge',
    description: 'Given for outstanding garden achievements.',
  },
];

const MAX_PLOTS = 4;
const MAX_LIVES = 5;
const LIVES_KEY = 'quizLives';

export default function RewardsScreen() {
  const { user, addSeeds, plantItem } = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item: typeof itemsData[0]) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handlePurchase = async (item: typeof itemsData[0]) => {
    // If the item is not a Heart, check garden capacity first
    if (item.title !== 'Heart' && user.garden.length >= MAX_PLOTS) {
      Alert.alert(
        'Garden Full',
        'Your garden is full. Please harvest existing crops before planting new ones.'
      );
      return;
    }

    // If item is a Heart, handle special logic
    if (item.title === 'Heart') {
      if (user.seeds >= item.cost) {
        const storedLives = await AsyncStorage.getItem(LIVES_KEY);
        let currentLives = storedLives ? parseInt(storedLives, 10) : MAX_LIVES;

        if (currentLives >= MAX_LIVES) {
          Alert.alert('Hearts Full', 'Your hearts are already full.');
          return;
        }
        addSeeds(-item.cost);
        currentLives += 1;
        await AsyncStorage.setItem(LIVES_KEY, currentLives.toString());
        Alert.alert(
          'Purchase Successful',
          `You purchased a heart. You now have ${currentLives} heart(s).`
        );
        setModalVisible(false);
        setSelectedItem(null);
        return;
      } else {
        Alert.alert('Insufficient Seeds', 'You do not have enough seeds to purchase a heart.');
        return;
      }
    }

    // Check lessons requirement
    if (item.requiredLessons && user.lessonsCompleted < item.requiredLessons) {
      Alert.alert(
        'Not Eligible',
        `You must complete at least ${item.requiredLessons} lessons to redeem this item.`
      );
      return;
    }

    // Check if user has enough seeds
    if (user.seeds >= item.cost) {
      // Deduct seeds
      addSeeds(-item.cost);

      // Attempt to plant
      const didPlant = plantItem({
        ...item,
        growth: 'Planted',
        plantedAt: Date.now(),
        id: uuidv4(),
      });

      if (didPlant) {
        Alert.alert('Purchase Successful', `You purchased and planted ${item.title}.`);
      }
      setModalVisible(false);
      setSelectedItem(null);
    } else {
      Alert.alert('Insufficient Seeds', 'You do not have enough seeds to purchase this item.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Garden Shop</Text>
      <Text style={styles.seedCount}>Seeds: {user.seeds}</Text>
      <Text style={styles.lessonCount}>Lessons Completed: {user.lessonsCompleted}</Text>

      {/* Show message if garden is full */}
      {user.garden.length >= MAX_PLOTS && (
        <Text style={styles.fullGardenNotice}>
          Your garden is full. Please harvest existing crops before purchasing new ones.
        </Text>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Items for Purchase</Text>
        {itemsData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              {item.requiredLessons && (
                <Text style={styles.requiredText}>
                  Requires {item.requiredLessons} lessons
                </Text>
              )}
            </View>
            <Text style={styles.itemCost}>{item.cost} seeds</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Badges</Text>
        {badgesData.map(badge => (
          <View key={badge.id} style={styles.badgeCard}>
            <Text style={styles.badgeTitle}>{badge.title}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
                <Text style={styles.modalCost}>Cost: {selectedItem.cost} seeds</Text>
                {selectedItem.requiredLessons && (
                  <Text style={styles.requiredTextModal}>
                    Requires {selectedItem.requiredLessons} lessons completed
                  </Text>
                )}
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setModalVisible(false);
                      setSelectedItem(null);
                    }}
                  />
                  <Button
                    title="Buy"
                    onPress={() => handlePurchase(selectedItem)}
                    disabled={
                      user.seeds < selectedItem.cost ||
                      (selectedItem.requiredLessons &&
                        user.lessonsCompleted < selectedItem.requiredLessons)
                    }
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  seedCount: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  lessonCount: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  fullGardenNotice: {
    fontSize: 16,
    color: '#d9534f',
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemInfo: {
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
    marginRight: 20,
  },
  requiredText: {
    fontSize: 14,
    color: '#d9534f',
    marginTop: 5,
  },
  itemCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  badgeCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  badgeDescription: {
    fontSize: 16,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCost: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  requiredTextModal: {
    fontSize: 14,
    color: '#d9534f',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});