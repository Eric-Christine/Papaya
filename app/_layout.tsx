import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from './contexts/UserContext';
import AnimatedSplashScreen from '../components/ui/AnimatedSplashScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Trigger a light haptic impact when the app finishes loading
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="screens/GlobalEnergyMixScreen" options={{ title: 'Global Energy Mix', headerBackTitle: 'Back' }} />
        </Stack>
        <StatusBar style="auto" />
        {isSplashVisible && (
          <AnimatedSplashScreen
            onAnimationFinish={() => setIsSplashVisible(false)}
          />
        )}
      </ThemeProvider>
    </UserProvider>
  );
}
