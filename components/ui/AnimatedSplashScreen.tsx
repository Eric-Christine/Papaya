import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import PapayaSplashLogo from './PapayaSplashLogo';

interface AnimatedSplashScreenProps {
    onAnimationFinish: () => void;
}

export default function AnimatedSplashScreen({
    onAnimationFinish,
}: AnimatedSplashScreenProps) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        // 1. Hide the native splash screen immediately when this component mounts
        //    because this component IS the splash screen.
        const hideNativeSplash = async () => {
            try {
                await SplashScreen.hideAsync();
            } catch (e) {
                // Ignore error if splash screen is already hidden
            }
        };
        hideNativeSplash();

        // 2. Start the exit animation after a short delay to let the user see the logo
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500, // 500ms fade out
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 2, // Scale up slightly while fading out
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // 3. Notify parent that animation is finished
                onAnimationFinish();
            });
        }, 1500); // Show logo for 1.5 seconds

        return () => clearTimeout(timer);
    }, [fadeAnim, scaleAnim, onAnimationFinish]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.imageContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <PapayaSplashLogo width={150} height={150} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ffffff', // Match native splash background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure it sits on top of everything
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
