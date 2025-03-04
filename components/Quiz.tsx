// app/components/Quiz.tsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import * as Haptics from 'expo-haptics';

// Define props interface
interface QuizProps {
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

// Define seed animation interface
interface SeedAnimation {
  id: number;
  amount: number;
  position: { top: number; left: number };
}

// SeedReward animation component
const SeedReward: React.FC<{
  amount: number;
  startPosition: { top: number; left: number };
  onAnimationComplete: () => void;
}> = ({ amount, startPosition, onAnimationComplete }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -200,
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
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => onAnimationComplete());
  }, [onAnimationComplete]);

  return (
    <Animated.View
      style={[
        styles.seedReward,
        {
          transform: [{ translateY }, { scale }],
          opacity,
          top: startPosition.top,
          left: startPosition.left,
        },
      ]}
    >
      <Text style={styles.seedRewardText}>+{amount} 🌱</Text>
    </Animated.View>
  );
};

// FinishSeedAnimation component
const FinishSeedAnimation: React.FC<{
  count: number;
  startPosition: { top: number; left: number };
  onAnimationComplete: () => void;
}> = ({ count, startPosition, onAnimationComplete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const endX = windowWidth - 60; // Adjust based on profile tab position if needed
    const endY = windowHeight - 60;
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
    ]).start(() => onAnimationComplete());
  }, [onAnimationComplete, startPosition]);

  return (
    <Animated.View
      style={[
        styles.finishAnimation,
        {
          top: startPosition.top,
          left: startPosition.left,
          transform: [{ translateX }, { translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.finishAnimationText}>{count} 🌱</Text>
    </Animated.View>
  );
};

// Main Quiz component
export default function Quiz({ quizQuestions }: QuizProps) {
  const navigation = useNavigation();
  const { addSeeds, incrementLessons } = useContext(UserContext);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [seedAnimations, setSeedAnimations] = useState<SeedAnimation[]>([]);
  const [isFinishAnimating, setIsFinishAnimating] = useState(false);
  const animationCount = useRef(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Seed animation management
  const addSeedAnimation = (amount: number, position: { top: number; left: number }) => {
    const id = animationCount.current++;
    setSeedAnimations(prev => [...prev, { id, amount, position }]);
  };

  const removeSeedAnimation = (id: number) => {
    setSeedAnimations(prev => prev.filter(animation => animation.id !== id));
  };

  // Handlers
  const handleOptionPress = (index: number) => {
    if (!answerChecked) {
      setSelectedOption(index);
    }
  };

  const handleButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!answerChecked) {
      setAnswerChecked(true);
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 10);
        addSeeds(10);
        setCorrectCount(prev => prev + 1);
        setFeedbackText(["Great!", "Nice One!"][Math.floor(Math.random() * 2)]);
        setIsAnswerCorrect(true);
        addSeedAnimation(10, { top: 200, left: Dimensions.get('window').width / 2 - 40 });
      } else {
        setScore(prev => prev + 1);
        addSeeds(1);
        setFeedbackText(["Not Quite!", "Incorrect", "Sorry!"][Math.floor(Math.random() * 3)]);
        setIsAnswerCorrect(false);
        addSeedAnimation(1, { top: 200, left: Dimensions.get('window').width / 2 - 40 });
      }
    } else {
      setAnswerChecked(false);
      setFeedbackText('');
      setSelectedOption(null);
      setIsAnswerCorrect(null);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        incrementLessons();
        setQuizCompleted(true);
      }
    }
  };

  const handleFinishPress = () => {
    setIsFinishAnimating(true);
  };

  const onFinishAnimationComplete = () => {
    navigation.goBack();
  };

  const finishAnimationStartPosition = {
    top: 40,
    left: Dimensions.get('window').width / 2 - 50,
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
          {!isFinishAnimating && (
            <View style={styles.finishButton}>
              <Button title="Finish" onPress={handleFinishPress} color="#fff" />
            </View>
          )}
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
          <Text style={styles.xpText}>Seeds: {score} 🌱</Text>
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
                } else if (index === selectedOption && !isCorrect) {
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
          {answerChecked && feedbackText && (
            <Text style={isAnswerCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {feedbackText}
            </Text>
          )}
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleButtonPress}
              disabled={selectedOption === null}
            >
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

// Styles
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
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  optionCorrect: {
    backgroundColor: '#81C784',
    borderColor: '#2E7D32',
  },
  optionIncorrect: {
    backgroundColor: '#EF9A9A',
    borderColor: '#C62828',
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
  },
  feedbackIncorrect: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C62828',
    marginVertical: 4,
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
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
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
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 12,
  },
  finishButton: {
    backgroundColor: '#43A047',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  seedReward: {
    position: 'absolute',
    zIndex: 100,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  seedRewardText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFA000',
  },
  finishAnimation: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 12,
    zIndex: 300,
  },
  finishAnimationText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFA000',
  },
});