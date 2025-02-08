import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Button, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

// -----------------------------------------------------------------------------
// Quiz Questions
// -----------------------------------------------------------------------------
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

const energyQuizQuestions = [
  {
    question: "What does the term 'energy mix' refer to?",
    options: [
      "The exclusive use of fossil fuels for energy",
      "A combination of various energy sources used to generate power",
      "Only renewable energy sources such as solar and wind",
      "Energy produced solely from nuclear power",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which factor most influences a country's energy mix?",
    options: [
      "Geographical location and the availability of natural resources",
      "The country's internet infrastructure",
      "Global fashion trends",
      "The number of automobiles on the road",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is one of the primary benefits of diversifying a nation's energy mix?",
    options: [
      "Reducing dependency on a single energy source",
      "Increasing the risk of power outages",
      "Raising overall energy costs significantly",
      "Limiting the development of renewable energy technology",
    ],
    correctAnswer: 0,
  },{
    question: "Which energy storage technology is most commonly used in both electric vehicles and grid-scale systems?",
    options: [
      "Pumped Hydro Storage",
      "Thermal Storage",
      "Battery Storage",
      "Flywheel Storage",
    ],
    correctAnswer: 2,
  }
  
];




// -----------------------------------------------------------------------------
// SeedReward Animation Component (for individual answer feedback)
// -----------------------------------------------------------------------------
interface SeedRewardProps {
  amount: number;
  startPosition: { top: number; left: number };
  onAnimationComplete: () => void;
}

const SeedReward: React.FC<SeedRewardProps> = ({ amount, startPosition, onAnimationComplete }) => {
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

// -----------------------------------------------------------------------------
// FinishSeedAnimation Component (for finishing the quiz)
// This component animates the total seed count from its current position
// to the bottom right corner (profile tab area).
// -----------------------------------------------------------------------------
interface FinishSeedAnimationProps {
  count: number;
  startPosition: { top: number; left: number };
  onAnimationComplete: () => void;
}

const FinishSeedAnimation: React.FC<FinishSeedAnimationProps> = ({ count, startPosition, onAnimationComplete }) => {
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

// -----------------------------------------------------------------------------
// QuizScreen Component
// -----------------------------------------------------------------------------
interface SeedAnimation {
  id: number;
  amount: number;
  position: { top: number; left: number };
}

export default function QuizScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { lesson } = route.params || {};

  // Choose quiz questions based on lesson type

// Create a lowercase version of the lesson for easier comparisons.
const lessonLower = lesson?.toLowerCase() || "";

// Choose the correct quiz questions based on lesson keywords.
const quizQuestions = lessonLower.includes("sustainable living")
  ? sustainableLivingQuizQuestions
  : lessonLower.includes("energy storage")
    ? energyQuizQuestions
    : climateQuizQuestions;

  
  // Context functions to update seeds and lesson completion
  const { addSeeds, incrementLessons } = useContext(UserContext);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0); // Total Seeds for this quiz session
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // State for seed animations (for answer feedback)
  const [seedAnimations, setSeedAnimations] = useState<SeedAnimation[]>([]);
  const animationCount = useRef(0);

  // State to trigger finish animation (for total seeds)
  const [isFinishAnimating, setIsFinishAnimating] = useState(false);

  const addSeedAnimation = (amount: number, position: { top: number; left: number }) => {
    const id = animationCount.current++;
    setSeedAnimations(prev => [...prev, { id, amount, position }]);
  };

  const removeSeedAnimation = (id: number) => {
    setSeedAnimations(prev => prev.filter(animation => animation.id !== id));
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionPress = (index: number) => {
    if (!answerChecked) {
      setSelectedOption(index);
    }
  };

  const handleButtonPress = () => {
    if (!answerChecked) {
      // Check the answer
      setAnswerChecked(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        // Correct answer: award +10 Seeds
        setScore(prev => prev + 10);
        addSeeds(10);
        setCorrectCount(prev => prev + 1);
        const messages = ["Great!", "Nice One!"];
        setFeedbackText(messages[Math.floor(Math.random() * messages.length)]);
        setIsAnswerCorrect(true);
        // Trigger seed animation for correct answer
        addSeedAnimation(10, { top: 200, left: Dimensions.get('window').width / 2 - 40 });
      } else {
        // Incorrect answer: award +1 Seed
        setScore(prev => prev + 1);
        addSeeds(1);
        const messages = ["Not Quite!", "Incorrect", "Sorry!"];
        setFeedbackText(messages[Math.floor(Math.random() * messages.length)]);
        setIsAnswerCorrect(false);
        // Trigger seed animation for incorrect answer
        addSeedAnimation(1, { top: 200, left: Dimensions.get('window').width / 2 - 40 });
      }
    } else {
      // Reset state for next question or finish quiz
      setAnswerChecked(false);
      setFeedbackText('');
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Mark the lesson as complete and finish the quiz
        incrementLessons();
        setQuizCompleted(true);
      }
    }
  };

  // Instead of immediately navigating when the finish button is pressed,
  // trigger the finish animation.
  const handleFinishPress = () => {
    setIsFinishAnimating(true);
  };

  // Once finish animation completes, navigate away.
  const onFinishAnimationComplete = () => {
    navigation.goBack();
  };

  // Define the starting position for the finish animation.
  // This example assumes the seed tally is displayed centered near the top.
  const finishAnimationStartPosition = {
    top: 40,
    left: Dimensions.get('window').width / 2 - 50,
  };

  const buttonLabel = !answerChecked ? "Check" : "Continue";

  return (
    // Ensure the container is positioned relatively so the animated elements (absolute) overlay correctly.
    <ScrollView contentContainerStyle={[styles.container, { position: 'relative' }]}>
      {quizCompleted ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Seeds Gathered: {score} 🌱</Text>
          <Text style={styles.scoreText}>
            Correct Answers: {correctCount} / {quizQuestions.length}
          </Text>
          {/* If finish animation hasn't been triggered, show the Finish button */}
          {!isFinishAnimating && (
            <View style={styles.finishButton}>
              <Button title="Finish" onPress={handleFinishPress} color="#fff" />
            </View>
          )}
          {/* Render finish animation overlay when triggered */}
          {isFinishAnimating && (
            <FinishSeedAnimation
              count={score}
              startPosition={finishAnimationStartPosition}
              onAnimationComplete={onFinishAnimationComplete}
            />
          )}
        </View>
      ) : (
        <View style={styles.quizContainer}>
          {/* Real-time Seeds Tally */}
          <Text style={styles.xpText}>Seeds: {score} 🌱</Text>
          {/* Render individual seed animations */}
          {seedAnimations.map(animation => (
            <SeedReward
              key={animation.id}
              amount={animation.amount}
              startPosition={animation.position}
              onAnimationComplete={() => removeSeedAnimation(animation.id)}
            />
          ))}
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

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContainer: {
    width: '100%',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFA000',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    marginBottom: 24,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 50, 0.1)',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B5E20',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    transform: [{ scale: 1 }],
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionCorrect: {
    backgroundColor: '#81C784',
    borderColor: '#2E7D32',
    // transform: [{ scale: 1.02 }],
  },
  optionIncorrect: {
    backgroundColor: '#EF9A9A',
    borderColor: '#C62828',
    // transform: [{ scale: 0.98 }],
  },
  optionText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 20,
    fontWeight: '500',
  },
  feedbackCorrect: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginVertical: 16,
    textShadowColor: 'rgba(46, 125, 50, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  feedbackIncorrect: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C62828',
    marginVertical: 4,
    opacity: 0.9,
  },
  nextButtonContainer: {
    width: '100%',
    marginVertical: 12,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B5E20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cancelButtonContainer: {
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B0BEC5',
  },
  cancelButtonText: {
    color: '#546E7A',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  scoreTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(46, 125, 50, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  finishButton: {
    backgroundColor: '#43A047',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  seedReward: {
    position: 'absolute',
    zIndex: 100,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  seedRewardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFA000',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
