// app/(tabs)/index.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-get-random-values';


// Screens
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GardenScreen from '../screens/GardenScreen'; // GardenScreen import

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Create a stack navigator for Lessons (with LessonDetail and Quiz screens)
const LessonsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{ title: 'Lessons' }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ title: 'Lesson Detail' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />
    </Stack.Navigator>
  );
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="LessonsStack"
        component={LessonsStackNavigator}
        options={{
          title: 'Lessons',
          headerShown: false, // Hide the inner stack header in the tab navigator
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-variant"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gift" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Garden"
        component={GardenScreen}
        options={{
          title: 'Garden',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tree" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
