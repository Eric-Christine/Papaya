// app/screens/QuizScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const quizQuestions = [
  {
    question: "What is the primary greenhouse gas responsible for global warming?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
    correctAnswer: 0,
  },
  {
    question: "Which human activity significantly contributes to climate change?",
    options: ["Reading", "Burning fossil fuels", "Sleeping", "Walking"],
    correctAnswer: 1,
  },
  {
    question: "What is a common consequence of climate change?",
    options: ["Rising sea levels", "Decreased temperatures", "More snowfall", "Less extreme weather"],
    correctAnswer: 0,
  },
  {
    question: "Which solution is most effective in mitigating climate change?",
    options: ["Using renewable energy", "Increasing fossil fuel use", "Deforestation", "Overfishing"],
    correctAnswer: 0,
  },
];

export default function QuizScreen() {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextPress = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizCompleted ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your Score: {score} / {quizQuestions.length}</Text>
          <Button title="Finish" onPress={handleFinish} />
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>
            {currentQuestion.question}
          </Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() => handleOptionPress(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.nextButtonContainer}>
            <Button
              title={currentQuestionIndex === quizQuestions.length - 1 ? "Submit" : "Next"}
              onPress={handleNextPress}
              disabled={selectedOption === null}
            />
          </View>
          <View style={styles.cancelButtonContainer}>
            <Button title="Cancel Quiz" onPress={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContainer: {
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#cdeac0',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  nextButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
  cancelButtonContainer: {
    marginTop: 10,
    width: '100%',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E7D32',
  },
});
