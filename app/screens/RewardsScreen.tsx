// app/screens/RewardsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const rewardsData = [
  {
    id: '1',
    title: 'Green Badge',
    description: 'Awarded for completing your first sustainability lesson.',
  },
  {
    id: '2',
    title: 'Eco Warrior',
    description: 'Earned after 10 days of consistent sustainable actions.',
  },
  {
    id: '3',
    title: 'Sustainability Star',
    description: 'Given for achieving a perfect score on a sustainability quiz.',
  },
];

export default function RewardsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Rewards</Text>
      {rewardsData.map((reward) => (
        <View key={reward.id} style={styles.rewardItem}>
          <Text style={styles.rewardTitle}>{reward.title}</Text>
          <Text style={styles.rewardDescription}>{reward.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5', // Light background color for visibility
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  rewardItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android elevation
    elevation: 2,
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 16,
    color: '#666',
  },
});
