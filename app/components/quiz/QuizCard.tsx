import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuizCardProps {
    question: string;
}

export default function QuizCard({ question }: QuizCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.questionText}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 28,
        width: '100%',
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
        lineHeight: 30,
    },
});
