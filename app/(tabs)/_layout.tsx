// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}
    >
      {/* Define each screen without children */}
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home' }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ title: 'Explore' }} 
      />
      {/* If Rewards is a tab route, add it here */}
      <Tabs.Screen 
        name="rewards" 
        options={{ title: 'Rewards' }} 
      />
    </Tabs>
  );
}
