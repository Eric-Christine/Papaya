import React, { useRef, useEffect } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';

interface SeedRewardProps {
    amount: number;
    startPosition: { top: number; left: number };
    onAnimationComplete: () => void;
}

export const SeedReward: React.FC<SeedRewardProps> = ({ amount, startPosition, onAnimationComplete }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -200, // Moves the reward upward by 200 units
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            onAnimationComplete();
        });
    }, []);

    return (
        <Animated.View
            style={[
                styles.seedReward,
                {
                    transform: [{ translateY }, { scale }],
                    opacity,
                    ...startPosition,
                },
            ]}
        >
            <Text style={styles.seedRewardText}>+{amount} 🌱</Text>
        </Animated.View>
    );
};

interface FinishSeedAnimationProps {
    count: number;
    startPosition: { top: number; left: number };
    onAnimationComplete: () => void;
}

export const FinishSeedAnimation: React.FC<FinishSeedAnimationProps> = ({ count, startPosition, onAnimationComplete }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        // Define the end position (adjust these offsets to match your profile tab)
        const endX = windowWidth - 60;
        const endY = windowHeight - 60;
        // Calculate differences from the starting point
        const dx = endX - startPosition.left;
        const dy = endY - startPosition.top;
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: dx,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: dy,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onAnimationComplete();
        });
    }, []);

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    top: startPosition.top,
                    left: startPosition.left,
                    transform: [{ translateX }, { translateY }],
                    opacity,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: 8,
                    borderRadius: 12,
                    zIndex: 300,
                },
            ]}
        >
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFA000' }}>
                {count} 🌱
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    seedReward: {
        position: 'absolute',
        zIndex: 100,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    seedRewardText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4CAF50',
    },
});
