// app/(tabs)/index.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

// Screens
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GardenScreen from '../screens/GardenScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * Custom HapticTab Component
 * This component wraps the default tab bar button and triggers haptic feedback
 * when the user presses the tab.
 */
const HapticTab = ({
  onPress,
  accessibilityState,
  children,
}: {
  onPress: (event: GestureResponderEvent) => void;
  accessibilityState?: { selected: boolean };
  children: React.ReactNode;
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    // Trigger a light haptic impact on press
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(event);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.hapticTabContainer}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hapticTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
        // Use our custom HapticTab for every tab button.
        // This ensures that each time a tab is pressed, haptic feedback is triggered.
        tabBarButton: (props) => <HapticTab {...props} />,
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
        name="Shop"
        component={RewardsScreen}
        options={{
          title: 'Shop',
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
