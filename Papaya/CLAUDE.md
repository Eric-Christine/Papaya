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
- **User data**: name, email, avatar, lessonsCompleted, seeds (in-game currency), xp (experience points), fertilizer (consumable item count)
- **Garden system**: manages planted items (max 4 plots), growth timers, and harvest mechanics
- **Inventory system**: stores harvested items with sell prices
- **State methods**: `addSeeds()`, `addXp()`, `buyFertilizer()`, `fertilizeItem()`, `incrementLessons()`, `plantItem()`, `harvestItem()`, `sellItem()`

### Core Features

#### 1. Lesson System
- Lessons are defined in `app/screens/LessonsScreen.tsx` with metadata (title, description, icon)
- Lesson content stored in `app/data/contentData.tsx` as a key-value object
- Completion tracking via AsyncStorage (`completedLessons` key)
- "New" badges displayed for uncompleted lessons
- **Text formatting**: Key terms are bolded throughout lesson content for emphasis and readability

#### 2. Quiz System (`app/screens/QuizScreen.tsx`)
- Quiz questions mapped to lesson types via switch statement
- **Lives system**: Users have 5 hearts that reset every 24 hours (stored in AsyncStorage)
- **Rewards**: +10 seeds for correct answers, +1 seed for incorrect answers
- **Bonus**: Double seeds if all answers are correct
- **Animated feedback**: Seed rewards animate upward on answer, final seeds animate to profile corner
- Question explanations shown inline for incorrect answers

#### 3. Garden/Gamification System
- **Garden plots**: Max 4 simultaneous plants (enforced in `UserContext.tsx`)
- **Growth mechanics**: Each item has a `harvestDuration` (in milliseconds) and shows real-time progress with animated growth scaling
- **Harvest flow**: Planted items → Garden (growth timer) → Inventory (ready to sell) → Sell for seeds
- **XP and leveling**: Global XP stored in `UserContext.tsx`, level calculated as `Math.floor(xp / 100) + 1`
- **Fertilizer system**: Consumable item that halves remaining growth time when applied to a planted item
- **Plant animations**: SVG plants sway gently and scale from 50% to 100% as they grow
- Items purchasable from Rewards Shop require certain lesson completion counts

#### 4. Rewards Shop (`app/screens/RewardsScreen.tsx`)
- **Purchasable items**: Plants, decorations, fertilizer, and extra quiz hearts
- **Lesson requirements**: Advanced items locked until user completes N lessons
- **Garden capacity checks**: Prevents purchasing if garden is full (except hearts and fertilizer)
- **Heart purchases**: Add quiz lives (up to max of 10) for 100 seeds each
- **Fertilizer purchases**: Buy fertilizer for 50 seeds to speed up plant growth
- **Visual icons**: All shop items display custom SVG icons from `components/plants/`, `components/items/`, and `components/ui/`

#### 5. Badges System
- **Badge display**: Badges shown in Rewards Shop with custom SVG icons (`components/badges/BadgeIcons.tsx`)
- **Badge types**: Sunflower Badge, Green Thumb Badge, Master Gardener Badge, Level 2 Gardener, Level 5 Master
- **Visual states**: Locked badges appear greyed out with a lock icon overlay
- **Unlock criteria**: Badges unlock based on garden achievements and level progression

#### 6. Inventory System
- **Visual inventory**: Harvested items displayed with SVG icons instead of text descriptions
- **Sell mechanism**: Items can be sold from inventory for seeds
- **Icon components**: Custom SVG icons for each harvestable item (carrots, pumpkins, etc.) in `assets/svg/garden/`

### Data Flow
1. User completes lessons → `lessonsCompleted` increments
2. User takes quizzes → earns seeds, loses hearts on wrong answers
3. User spends seeds in Rewards Shop → items planted in Garden (or purchases fertilizer/hearts)
4. Garden items grow over time → optionally use fertilizer to halve growth time → harvest to Inventory → sell for seeds
5. Harvesting awards XP → level up unlocks new items and badges
6. Cycle repeats with more lessons/quizzes unlocking higher-tier items

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
└── _layout.tsx       # Root layout with providers

components/
├── plants/           # SVG plant components (Zucchini, Broccoli, BlueberryBush, etc.)
├── items/            # SVG item components (Fertilizer, etc.)
├── badges/           # Badge icon components (BadgeIcons.tsx)
├── ui/               # UI components (Heart, IconSymbol, etc.)
└── ...               # Other reusable components

assets/
└── svg/
    ├── garden/       # Garden-related SVG assets (harvested items, plant growth stages)
    ├── sustainable/  # Sustainability-themed SVG assets
    ├── ui-elements-svg.svg
    └── weather-elements-svg.svg
```

## Important Patterns

### Adding New Lessons
1. Add lesson metadata to `lessons` array in `LessonsScreen.tsx`
2. Add lesson content to `lessonContents` object in `contentData.tsx` (key must match title)
3. Add quiz questions to `QuizScreen.tsx` and update the `getQuizQuestions()` switch statement

### Working with User State
- Always use `useContext(UserContext)` to access/modify global state
- Call `addSeeds(amount)` to modify seed count (use negative values to deduct)
- Call `addXp(amount)` to award experience points (e.g., 50 XP per harvest)
- Call `buyFertilizer(amount, cost)` to purchase fertilizer items
- Call `fertilizeItem(id)` to apply fertilizer to a planted item (returns boolean for success)
- Check `user.garden.length >= 4` before allowing new plantings
- Use `plantItem()` return value to confirm successful planting
- Check `user.fertilizer > 0` before allowing fertilization

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

## Recent Features (Latest Commit)

### Fertilizer System
- **Purchase**: Available in Rewards Shop for 50 seeds
- **Storage**: Fertilizer count stored in `user.fertilizer`
- **Usage**: Apply to planted items to halve remaining growth time
- **Mechanism**: `fertilizeItem(id)` shifts `plantedAt` timestamp backward by half the remaining time
- **UI**: Fertilizer count displayed in GardenScreen header with ⚡️ icon
- **Icon**: Custom SVG component in `components/items/Fertilizer.tsx`

### Badge Visual Enhancements
- **SVG Icons**: All badges now have custom SVG icon components exported from `components/badges/BadgeIcons.tsx`
- **Lock State**: Locked badges display with grey overlay and lock icon
- **Text Wrapping**: Fixed text wrapping issues in badge descriptions
- **New Badges**: Added Level 2 Gardener and Level 5 Master badges for level progression

### Inventory Visual Improvements
- **SVG Icons**: Harvested items display with custom SVG icons instead of text-only descriptions
- **Icon Assets**: SVG files stored in `assets/svg/garden/` (e.g., `harvested-items-svg.svg`)
- **Better UX**: Visual representation makes inventory more intuitive and appealing

### Lesson Content Formatting
- **Bold Terms**: Key sustainability terms bolded throughout all lesson content for emphasis
- **Readability**: Improves scanning and retention of important concepts
- **Implementation**: Applied across all lessons in `app/data/contentData.tsx`

### Plant Animation System
- **Swaying Animation**: SVG plants gently sway using React Native Animated API
- **Growth Scaling**: Plants scale from 50% (just planted) to 100% (fully grown) based on growth progress
- **Component**: `SwayingPlant` wrapper component in `GardenScreen.tsx`
- **Rotation**: Interpolated rotation between -5deg and +5deg for natural movement
- **Loop**: Continuous animation using `Animated.loop()` with easing

### Updated Constants
- **MAX_LIVES**: Increased from 5 to 10 for quiz hearts
- **XP Storage**: Moved from local state to global UserContext for persistence
- **Haptic Feedback**: Added to purchase actions and harvesting for tactile response
