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
          <Text style={styles.scoreText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Seeds Gathered: {score} 🌱
          </Text>
          <Text style={styles.scoreText}>
            Correct Answers: {correctCount} / {quizQuestions.length}
          </Text>
          <Button title="Finish" onPress={handleFinish} />
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {/* Real-time Seeds Tally */}
          <Text style={styles.xpText}>Seeds: {score} 🌱</Text>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
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
          {answerChecked && feedbackText !== '' && (
            <Text style={isAnswerCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {feedbackText}
            </Text>
          )}
          <View style={styles.nextButtonContainer}>
            <Button
              title={buttonLabel}
              onPress={handleButtonPress}
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
  xpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
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
  optionCorrect: {
    backgroundColor: '#a5d6a7',
    borderColor: '#388E3C',
  },
  optionIncorrect: {
    backgroundColor: '#ef9a9a',
    borderColor: '#d32f2f',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  feedbackCorrect: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginVertical: 15,
  },
  feedbackIncorrect: {
    fontSize: 20,
    fontWeight: '600',
    color: '#d32f2f',
    marginVertical: 15,
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
    textAlign: 'center',
  },
});
