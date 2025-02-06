// app/screens/QuizScreen.tsx
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

// Revised quiz questions for Sustainable Living lessons based on lesson content
const sustainableLivingQuizQuestions = [
  {
    question: "What does your carbon footprint represent?",
    options: [
      "The total weight of the carbon you breathe daily",
      "The amount of greenhouse gases produced by your activities",
      "How much carbon is stored in your body",
      "The cost of carbon-based products you buy",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which statement best describes a circular economy?",
    options: [
      "An economy based on the 'take-make-waste' model",
      "An economy that minimizes waste by emphasizing repair, reuse, and recycling",
      "An economy that only focuses on increasing production",
      "An economy that ignores environmental impact",
    ],
    correctAnswer: 1,
  },
  {
    question: "Approximately what percentage of global greenhouse gas emissions is linked to household consumption?",
    options: ["50%", "72%", "30%", "90%"],
    correctAnswer: 1,
  },
  {
    question: "How does community engagement contribute to sustainable living?",
    options: [
      "By isolating individual actions",
      "By amplifying the impact of individual efforts through local initiatives",
      "By increasing energy consumption",
      "By focusing solely on personal benefits",
    ],
    correctAnswer: 1,
  },
];

// Quiz questions for Climate Change lessons (unchanged)
const climateQuizQuestions = [
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
  const route = useRoute();
  const navigation = useNavigation();
  const { lesson } = route.params || {};

  // Determine if the current quiz should be for Sustainable Living
  const isSustainableLiving = lesson && lesson.toLowerCase().includes("sustainable living");
  const quizQuestions = isSustainableLiving ? sustainableLivingQuizQuestions : climateQuizQuestions;

  // Get context functions to update Seeds and lessons completed
  const { addSeeds, incrementLessons } = useContext(UserContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  // 'score' now represents the Seeds tally for the current quiz session
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (index: number) => {
    // Prevent changing answer after checking it
    if (!answerChecked) {
      setSelectedOption(index);
    }
  };

  const handleButtonPress = () => {
    if (!answerChecked) {
      // Check the answer
      setAnswerChecked(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        // Award +10 Seeds for a correct answer and update correct count
        setScore(prev => prev + 10);
        addSeeds(10);
        setCorrectCount(prev => prev + 1);
        const messages = ["Great!", "Nice One!"];
        setFeedbackText(messages[Math.floor(Math.random() * messages.length)]);
        setIsAnswerCorrect(true);
      } else {
        // Award +1 Seed for an incorrect answer
        setScore(prev => prev + 1);
        addSeeds(1);
        const messages = ["Not Quite!", "Incorrect", "Sorry!"];
        setFeedbackText(messages[Math.floor(Math.random() * messages.length)]);
        setIsAnswerCorrect(false);
      }
    } else {
      // Move to the next question or complete the quiz
      setAnswerChecked(false);
      setFeedbackText('');
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Mark the lesson as completed and then finish the quiz
        incrementLessons();
        setQuizCompleted(true);
      }
    }
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  const buttonLabel = !answerChecked ? "Check" : "Continue";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizCompleted ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Seeds Gathered: {score} 🌱</Text>
          <Text style={styles.scoreText}>
            Correct Answers: {correctCount} / {quizQuestions.length}
          </Text>
          <View style={styles.finishButton}>
            <Button title="Finish" onPress={handleFinish} color="#fff" />
          </View>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {/* Real-time Seeds Tally */}
          <Text style={styles.xpText}>Seeds: {score} 🌱</Text>
          <View style={styles.card}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              let optionStyle = [styles.optionButton];
              if (answerChecked) {
                if (index === currentQuestion.correctAnswer) {
                  optionStyle.push(styles.optionCorrect);
                } else if (index === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
                  optionStyle.push(styles.optionIncorrect);
                }
              } else if (selectedOption === index) {
                optionStyle.push(styles.selectedOption);
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={optionStyle}
                  onPress={() => handleOptionPress(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {answerChecked && feedbackText !== '' && (
            <Text style={isAnswerCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {feedbackText}
            </Text>
          )}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleButtonPress} disabled={selectedOption === null}>
              <Text style={styles.actionButtonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel Quiz</Text>
            </TouchableOpacity>
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
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContainer: {
    width: '100%',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF8F00',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#E0F2F1',
  },
  optionCorrect: {
    backgroundColor: '#C8E6C9',
    borderColor: '#388E3C',
  },
  optionIncorrect: {
    backgroundColor: '#FFCDD2',
    borderColor: '#D32F2F',
  },
  optionText: {
    fontSize: 16,
    color: '#424242',
  },
  feedbackCorrect: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginVertical: 15,
  },
  feedbackIncorrect: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D32F2F',
    marginVertical: 15,
  },
  nextButtonContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButtonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B0BEC5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
    width: '100%',
  },
  scoreTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 15,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 10,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});

