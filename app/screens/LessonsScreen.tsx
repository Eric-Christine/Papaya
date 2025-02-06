// app/screens/LessonsScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Sample lessons data with descriptions
const lessons = [
  {
    id: '1',
    title: 'Climate Basics',
    description: 'Understand the greenhouse effect and how climate change works.',
    icon: 'earth',
  },
  {
    id: '2',
    title: 'Sustainable Living',
    description: 'Discover simple tips for reducing waste and living green.',
    icon: 'leaf',
  },
  {
    id: '3',
    title: 'Energy Mix',
    description: 'Learn about how we use solar, wind, energy storage alongside our current energy mix.',
    icon: 'solar-power',
  },
  {
    id: '4',
    title: 'Carbon Footprint',
    description: 'Find out how to calculate and reduce your carbon footprint.',
    icon: 'foot-print',
  },
];

export default function LessonsScreen() {
  const navigation = useNavigation();

  const renderLesson = ({ item }: { item: typeof lessons[0] }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => navigation.navigate('LessonDetail', { title: item.title })}
    >
      <MaterialCommunityIcons name={item.icon} size={32} color="#2E7D32" style={styles.icon} />
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sustainability Lessons</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background to avoid a black screen
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2E7D32',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  lessonItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    // Shadows for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 3,
  },
  icon: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
  },
});
