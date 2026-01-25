import React, { useState, useEffect, useMemo, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { lessons } from '../data/lessons';
import { Lesson } from '../types/lesson';
import { UserContext } from '../contexts/UserContext';

const COMPLETED_LESSONS_KEY = 'completedLessons';

type CategoryConfig = {
  name: string;
  icon: string;
  color: string;
};

const categoryConfigs: Record<string, CategoryConfig> = {
  'Climate Fundamentals': { name: 'Climate Fundamentals', icon: 'earth', color: '#2E7D32' },
  'Energy': { name: 'Energy', icon: 'flash', color: '#FFA000' },
  'Transportation': { name: 'Transportation', icon: 'car', color: '#1976D2' },
  'Sustainable Living': { name: 'Sustainable Living', icon: 'home-heart', color: '#7B1FA2' },
  'Environment': { name: 'Environment', icon: 'waves', color: '#0097A7' },
  'Policy & Progress': { name: 'Policy & Progress', icon: 'file-document', color: '#5D4037' },
  'Fun Facts': { name: 'Fun Facts', icon: 'lightbulb-on', color: '#FF6F00' },
};

export default function LessonsScreen() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation<any>();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(categoryConfigs)));

  // Load completed lessons from AsyncStorage on mount
  useEffect(() => {
    const loadCompletedLessons = async () => {
      try {
        const stored = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
        if (stored) {
          setCompletedLessons(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading completed lessons:', error);
      }
    };
    loadCompletedLessons();
  }, []);

  // Group lessons by category
  const sections = useMemo(() => {
    const grouped: Record<string, Lesson[]> = {};
    lessons.forEach((lesson) => {
      if (!grouped[lesson.category]) {
        grouped[lesson.category] = [];
      }
      grouped[lesson.category].push(lesson);
    });

    return Object.keys(categoryConfigs).map((category) => ({
      title: category,
      data: expandedCategories.has(category) ? (grouped[category] || []) : [],
      lessonCount: (grouped[category] || []).length,
    }));
  }, [expandedCategories]);

  // Mark a lesson as complete and persist the change
  const markLessonComplete = async (lessonId: string) => {
    try {
      if (!completedLessons.includes(lessonId)) {
        const updated = [...completedLessons, lessonId];
        setCompletedLessons(updated);
        await AsyncStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error marking lesson as complete:', error);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderSectionHeader = ({ section }: { section: { title: string; lessonCount: number } }) => {
    const config = categoryConfigs[section.title];
    const isExpanded = expandedCategories.has(section.title);

    return (
      <TouchableOpacity
        style={[styles.sectionHeader, { borderLeftColor: config.color }]}
        onPress={() => toggleCategory(section.title)}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <MaterialCommunityIcons name={config.icon as any} size={24} color={config.color} />
          <Text style={styles.sectionTitle}>{config.name}</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{section.lessonCount}</Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
    );
  };

  const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
      style={styles.lessonItem}
      onPress={() => {
        if (!completedLessons.includes(item.id)) {
          markLessonComplete(item.id);
        }
        navigation.navigate('LessonDetail', { title: item.title });
      }}
    >
      <MaterialCommunityIcons name={item.icon as any} size={28} color="#2E7D32" style={styles.icon} />
      <View style={styles.lessonContent}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription} numberOfLines={2}>{item.description}</Text>
      </View>
      {!completedLessons.includes(item.id) && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Lessons</Text>
        <View style={styles.streakContainer}>
          <MaterialCommunityIcons name="fire" size={24} color="#FF6F00" />
          <Text style={styles.streakText}>{user.streak}</Text>
        </View>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F7',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00695c',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  countBadge: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginLeft: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  icon: {
    marginRight: 12,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#333',
  },
  lessonDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5252',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
