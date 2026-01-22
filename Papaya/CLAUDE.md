# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EcoLearn is a React Native mobile application built with Expo that provides interactive sustainability education through lessons, quizzes, and a gamified garden system. The app uses TypeScript, Expo Router for file-based navigation, and React Context for state management.

## Development Commands

### Running the App
- `npm start` or `npx expo start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser

### Testing and Quality
- `npm test` - Run Jest tests in watch mode
- `npm run lint` - Run Expo's linter

### Utilities
- `npm run reset-project` - Reset project to initial state

## Architecture

### Navigation Structure
The app uses **Expo Router** with file-based routing. The navigation hierarchy:
- `app/_layout.tsx` - Root layout wrapping the entire app with `UserProvider` and theme configuration
- `app/(tabs)/` - Tab-based navigation for main screens
- `app/screens/` - Individual screen components (Lessons, Quiz, Garden, Rewards, Profile, etc.)

### State Management
Global state is managed through **React Context** (`app/contexts/UserContext.tsx`):
- **User data**: name, email, avatar, lessonsCompleted, seeds (in-game currency)
- **Garden system**: manages planted items (max 4 plots), growth timers, and harvest mechanics
- **Inventory system**: stores harvested items with sell prices
- **State methods**: `addSeeds()`, `incrementLessons()`, `plantItem()`, `harvestItem()`, `sellItem()`

### Core Features

#### 1. Lesson System
- Lessons are defined in `app/screens/LessonsScreen.tsx` with metadata (title, description, icon)
- Lesson content stored in `app/data/contentData.tsx` as a key-value object
- Completion tracking via AsyncStorage (`completedLessons` key)
- "New" badges displayed for uncompleted lessons

#### 2. Quiz System (`app/screens/QuizScreen.tsx`)
- Quiz questions mapped to lesson types via switch statement
- **Lives system**: Users have 5 hearts that reset every 24 hours (stored in AsyncStorage)
- **Rewards**: +10 seeds for correct answers, +1 seed for incorrect answers
- **Bonus**: Double seeds if all answers are correct
- **Animated feedback**: Seed rewards animate upward on answer, final seeds animate to profile corner
- Question explanations shown inline for incorrect answers

#### 3. Garden/Gamification System
- **Garden plots**: Max 4 simultaneous plants (enforced in `UserContext.tsx`)
- **Growth mechanics**: Each item has a `harvestDuration` (in milliseconds) and shows real-time progress
- **Harvest flow**: Planted items → Garden (growth timer) → Inventory (ready to sell) → Sell for seeds
- **XP and leveling**: Local state in `GardenScreen.tsx` (not persisted to context)
- Items purchasable from Rewards Shop require certain lesson completion counts

#### 4. Rewards Shop (`app/screens/RewardsScreen.tsx`)
- **Purchasable items**: Plants, decorations, and extra quiz hearts
- **Lesson requirements**: Advanced items locked until user completes N lessons
- **Garden capacity checks**: Prevents purchasing if garden is full (except hearts)
- **Heart purchases**: Add quiz lives (up to max of 5) for 100 seeds each

### Data Flow
1. User completes lessons → `lessonsCompleted` increments
2. User takes quizzes → earns seeds, loses hearts on wrong answers
3. User spends seeds in Rewards Shop → items planted in Garden
4. Garden items grow over time → harvest to Inventory → sell for seeds
5. Cycle repeats with more lessons/quizzes unlocking higher-tier items

### Key Technical Details

- **TypeScript paths**: `@/*` resolves to project root (configured in `tsconfig.json`)
- **Persistence**: AsyncStorage used for completed lessons and quiz lives
- **Animations**: React Native Animated API for quiz feedback and seed rewards
- **Haptic feedback**: Expo Haptics for tactile responses on interactions
- **Icons**: MaterialCommunityIcons from `@expo/vector-icons`

### File Organization
```
app/
├── (tabs)/           # Tab navigation screens
├── screens/          # Main feature screens (Lessons, Quiz, Garden, Rewards, Profile)
├── contexts/         # React Context providers (UserContext)
├── data/             # Static content data (lesson content)
├── components/       # Reusable UI components
└── _layout.tsx       # Root layout with providers
```

## Important Patterns

### Adding New Lessons
1. Add lesson metadata to `lessons` array in `LessonsScreen.tsx`
2. Add lesson content to `lessonContents` object in `contentData.tsx` (key must match title)
3. Add quiz questions to `QuizScreen.tsx` and update the `getQuizQuestions()` switch statement

### Working with User State
- Always use `useContext(UserContext)` to access/modify global state
- Call `addSeeds(amount)` to modify seed count (use negative values to deduct)
- Check `user.garden.length >= 4` before allowing new plantings
- Use `plantItem()` return value to confirm successful planting

### AsyncStorage Keys
- `completedLessons` - Array of lesson IDs marked as completed
- `quizLives` - Current number of quiz hearts (integer)
- `quizLivesReset` - Timestamp for 24-hour lives reset logic

### Garden Item Structure
```typescript
{
  id: string           // Unique ID (use uuidv4)
  title: string
  description: string
  growth: string       // e.g., "Planted", "Ready to Harvest"
  plantedAt: number    // Timestamp
  harvestDuration: number  // Milliseconds until harvest
  cost: number         // Purchase price in seeds
}
```
