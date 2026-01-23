import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuizOptionsProps {
    options: string[];
    selectedOption: number | null;
    correctAnswer: number;
    answerChecked: boolean;
    onOptionPress: (index: number) => void;
}

export default function QuizOptions({
    options,
    selectedOption,
    correctAnswer,
    answerChecked,
    onOptionPress,
}: QuizOptionsProps) {
    return (
        <View style={styles.optionsContainer}>
            {options.map((option, index) => {
                let optionStyle: any[] = [styles.optionButton];
                if (answerChecked) {
                    if (index === correctAnswer) {
                        optionStyle.push(styles.optionCorrect);
                    } else if (index === selectedOption && selectedOption !== correctAnswer) {
                        optionStyle.push(styles.optionIncorrect);
                    }
                } else if (selectedOption === index) {
                    optionStyle.push(styles.selectedOption);
                }
                return (
                    <TouchableOpacity
                        key={index}
                        style={optionStyle}
                        onPress={() => onOptionPress(index)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    optionsContainer: {
        width: '100%',
        marginBottom: 24,
        gap: 12,
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E8E8E8',
    },
    selectedOption: {
        backgroundColor: '#F0F7FF',
        borderColor: '#4A90D9',
    },
    optionCorrect: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    optionIncorrect: {
        backgroundColor: '#FFEBEE',
        borderColor: '#EF5350',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        fontWeight: '500',
    },
});
