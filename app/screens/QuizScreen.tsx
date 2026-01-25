// app/screens/QuizScreen.tsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Question } from '../types/quiz';
import * as quizData from '../data/quizQuestions';

import QuizCard from '../components/quiz/QuizCard';
import QuizOptions from '../components/quiz/QuizOptions';
import { SeedReward, FinishSeedAnimation } from '../components/quiz/SeedAnimations';

interface SeedAnimation {
  id: number;
  amount: number;
  position: { top: number; left: number };
}

export default function QuizScreen() {
  const LIVES_KEY = 'quizLives';
  const LIVES_RESET_KEY = 'quizLivesReset';
  const MAX_LIVES = 10;
  const RESET_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in ms

  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [livesResetTime, setLivesResetTime] = useState<number>(Date.now());

  const route = useRoute();
  const navigation = useNavigation();
  const { lesson } = (route.params as any) || {};

  // Choose quiz questions based on lesson type
  const lessonLower = lesson?.toLowerCase() || "";

  const getQuizQuestions = (lessonType: string): Question[] => {
    switch (true) {
      case lessonType.includes("sustainable living"):
        return quizData.sustainableLivingQuizQuestions;
      case lessonType.includes("energy storage"):
        return quizData.energyMixQuestions;
      case lessonType.includes("carbon footprint"):
        return quizData.carbonFootprintQuestions;
      case lessonType.includes("solar power"):
        return quizData.solarPowerQuestions;
      case lessonType.includes("organizations"):
        return quizData.organizationsQuizQuestions;
      case lessonType.includes("energy mix"):
        return quizData.energyMixQuestions;
      case lessonType.includes("recycling"):
        return quizData.recyclingQuizQuestions;
      case lessonType.includes("ocean"):
        return quizData.oceanQuizQuestions;
      case lessonType.includes("agriculture"):
        return quizData.agricultureQuizQuestions;
      case lessonType.includes("electric vehicles"):
        return quizData.electricVehiclesQuizQuestions;
      case lessonType.includes("fashion"):
        return quizData.fashionQuizQuestions;
      case lessonType.includes("renewable energy"):
        return quizData.renewableEnergyQuizQuestions;
      case lessonType.includes("policy"):
      case lessonType.includes("environmental laws"):
        return quizData.policyLawsQuizQuestions;
      case lessonType.includes("public transport"):
        return quizData.publicTransportQuizQuestions;
      case lessonType.includes("rainforest"):
        return quizData.rainforestQuizQuestions;
      case lessonType.includes("urban living"):
        return quizData.urbanLivingQuizQuestions;
      case lessonType.includes("amazing animals"):
        return quizData.amazingAnimalsQuizQuestions;
      case lessonType.includes("nuclear energy"):
        return quizData.nuclearEnergyQuizQuestions;
      case lessonType.includes("deserts"):
        return quizData.desertGeoengineeringQuizQuestions;
      default:
        return quizData.climateQuizQuestions;
    }
  };

  const quizQuestions = getQuizQuestions(lessonLower);

  const { addSeeds, incrementLessons, updateStreak, user } = useContext(UserContext);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0); // Total Seeds for this quiz session
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [streakResult, setStreakResult] = useState<{ started: boolean; incremented: boolean; reset: boolean } | null>(null);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [bonusAwarded, setBonusAwarded] = useState(false); // New state for bonus feedback

  // State for seed animations (for answer feedback)
  const [seedAnimations, setSeedAnimations] = useState<SeedAnimation[]>([]);
  useEffect(() => {
    const initializeLives = async () => {
      try {
        const storedLives = await AsyncStorage.getItem(LIVES_KEY);
        const storedReset = await AsyncStorage.getItem(LIVES_RESET_KEY);
        const now = Date.now();
        if (storedLives !== null && storedReset !== null) {
          const lastReset = parseInt(storedReset, 10);
          if (now - lastReset >= RESET_INTERVAL) {
            // Reset lives if 24 hours have passed
            setLives(MAX_LIVES);
            setLivesResetTime(now);
            await AsyncStorage.setItem(LIVES_KEY, MAX_LIVES.toString());
            await AsyncStorage.setItem(LIVES_RESET_KEY, now.toString());
          } else {
            setLives(parseInt(storedLives, 10));
            setLivesResetTime(lastReset);
          }
        } else {
          // No stored lives, initialize
          setLives(MAX_LIVES);
          setLivesResetTime(now);
          await AsyncStorage.setItem(LIVES_KEY, MAX_LIVES.toString());
          await AsyncStorage.setItem(LIVES_RESET_KEY, now.toString());
        }
      } catch (e) {
        console.error(e);
      }
    };

    initializeLives();

    const interval = setInterval(async () => {
      const now = Date.now();
      if (now - livesResetTime >= RESET_INTERVAL) {
        setLives(MAX_LIVES);
        setLivesResetTime(now);
        await AsyncStorage.setItem(LIVES_KEY, MAX_LIVES.toString());
        await AsyncStorage.setItem(LIVES_RESET_KEY, now.toString());
      }
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [livesResetTime]);
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSelectedOption(index);
    }
  };

  const handleButtonPress = async () => {
    if (!answerChecked) {
      // Check the answer
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setAnswerChecked(true);
      if (selectedOption === currentQuestion.correctAnswer) {
        // Correct answer: award +10 Seeds
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setScore(prev => prev + 1);
        addSeeds(1);
        const messages = ["Not Quite!", "Incorrect", "Sorry!"];
        setFeedbackText(messages[Math.floor(Math.random() * messages.length)]);
        setIsAnswerCorrect(false);
        const newLives = lives - 1;
        setLives(newLives);
        await AsyncStorage.setItem(LIVES_KEY, newLives.toString());
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
        // Final question answered: if all answers are correct, double the seeds.
        if (correctCount === quizQuestions.length) {
          const bonus = score; // bonus equals current score
          setScore(score + bonus);
          addSeeds(bonus);
          setBonusAwarded(true);
        }
        const params = route.params as any;
        if (params?.lesson) {
          try {
            const lessonTitle = params.lesson;
            const completedMapJson = await AsyncStorage.getItem('completedLessonsMap');
            const completedMap = completedMapJson ? JSON.parse(completedMapJson) : {};
            completedMap[lessonTitle] = true;
            await AsyncStorage.setItem('completedLessonsMap', JSON.stringify(completedMap));
          } catch (e) {
            console.error('Failed to save completed lesson:', e);
          }
        }
        incrementLessons();
        const result = updateStreak();
        setStreakResult(result);
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
  const finishAnimationStartPosition = {
    top: 40,
    left: Dimensions.get('window').width / 2 - 50,
  };

  const buttonLabel = !answerChecked ? "Check" : "Continue";

  if (lives === 0 && !quizCompleted) {
    return (
      <View style={styles.lockedContainer}>
        <Text style={styles.lockedText}>
          You have used all your lives. Please wait 24 hours to take another quiz.
        </Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    // Ensure the container is positioned relatively so the animated elements overlay correctly.
    <ScrollView contentContainerStyle={[styles.container, { position: 'relative' }]}>
      {quizCompleted ? (
        <View style={styles.scoreContainer}>
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fallSpeed={2500} fadeOut={true} autoStart={true} />
          <Text style={styles.scoreTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Seeds Gathered: {score} 🌱</Text>
          <Text style={styles.scoreText}>
            Correct Answers: {correctCount} / {quizQuestions.length}
          </Text>
          {bonusAwarded && (
            <Text style={styles.bonusFeedback}>
              Amazing! All correct answers - your seeds have been doubled!
            </Text>
          )}

          {streakResult && (streakResult.started || streakResult.incremented) && (
            <View style={styles.streakAddedContainer}>
              <MaterialCommunityIcons name="fire" size={32} color="#FF6F00" />
              <Text style={styles.streakAddedText}>
                {streakResult.started ? "Streak Started!" : "Streak Continued!"}
              </Text>
              <Text style={styles.streakCountText}>{user.streak} Days</Text>
            </View>
          )}

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
          <View style={styles.livesContainer}>
            <Text style={styles.heartsIndicatorText}>{'❤️'.repeat(lives)}</Text>
          </View>
          <Text style={styles.xpText}>Seeds: {score} 🌱</Text>
          {seedAnimations.map(animation => (
            <SeedReward
              key={animation.id}
              amount={animation.amount}
              startPosition={animation.position}
              onAnimationComplete={() => removeSeedAnimation(animation.id)}
            />
          ))}

          <QuizCard question={currentQuestion.question} />

          <QuizOptions
            options={currentQuestion.options}
            selectedOption={selectedOption}
            correctAnswer={currentQuestion.correctAnswer}
            answerChecked={answerChecked}
            onOptionPress={handleOptionPress}
          />

          {answerChecked && feedbackText !== '' && (
            <Text style={isAnswerCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}>
              {feedbackText}
            </Text>
          )}
          {/* Inline explanation for incorrect answers */}
          {answerChecked && isAnswerCorrect === false && currentQuestion.explanation && (
            <Text style={styles.explanationText}>
              Correct Answer: {currentQuestion.options[currentQuestion.correctAnswer]} - {currentQuestion.explanation}
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
    padding: 24,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  quizContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
  },
  xpText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
    marginBottom: 24,
  },
  feedbackCorrect: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  feedbackIncorrect: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF5350',
    marginBottom: 8,
    textAlign: 'center',
  },
  explanationText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  bonusFeedback: {
    fontSize: 17,
    color: '#4CAF50',
    fontWeight: '600',
    marginVertical: 12,
    textAlign: 'center',
  },
  nextButtonContainer: {
    width: '100%',
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#4A90D9',
    paddingVertical: 18,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cancelButtonContainer: {
    width: '100%',
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 15,
    fontWeight: '500',
  },
  scoreContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 36,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  scoreTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 16,
    width: '100%',
    marginTop: 28,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  lockedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  lockedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF5350',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  livesContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 4,
  },
  heartsIndicatorText: {
    fontSize: 18,
    letterSpacing: 2,
  },
  streakAddedContainer: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#FFE0B2',
    width: '100%',
  },
  streakAddedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
    marginTop: 8,
  },
  streakCountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginTop: 4,
  },
});