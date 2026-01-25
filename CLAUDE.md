# Claude Project Notes

This file is for tracking Claude-related tasks, prompts, and documentation for the Papaya project. Use this file to pick up context between sessions.

## Current State (Jan 24, 2026)
- **App Status**: Functional Expo app with 19 sustainability lessons, gamification (garden, crafting, rewards), and quiz system.
- **Tech Stack**: Expo, React Native, TypeScript, Expo Router (file-based routing)

## Key Features
- **Lessons**: 19 interactive lessons across 7 categories covering climate, energy, transportation, sustainable living, environment, policy, and fun facts.
- **Quiz System**: Post-lesson quizzes with modern UI, XP rewards, and progress tracking.
- **Garden**: Virtual garden where users plant and harvest items.
- **Crafting Kitchen**: Combine harvested ingredients to craft items for coins.
- **Rewards Shop**: Spend earned coins on items and upgrades.

## Project Structure
```
app/
├── components/         # Reusable UI components
│   ├── crafting/       # CraftingArea.tsx
│   └── quiz/           # QuizCard, QuizOptions, SeedAnimations
├── contexts/
│   └── UserContext.tsx # Global user state (seeds, XP, inventory)
├── data/
│   ├── contentData.tsx # All lesson text content
│   ├── craftingRecipes.ts
│   ├── lessons.ts      # 19 lesson definitions
│   └── quizQuestions.ts
├── screens/            # Main app screens
│   ├── GardenScreen.tsx
│   ├── GlobalEnergyMixScreen.tsx
│   ├── LessonDetailScreen.tsx
│   ├── LessonsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── QuizScreen.tsx
│   ├── RewardsScreen.tsx
│   └── SustainableLivingScreen.tsx
└── types/              # TypeScript type definitions
    ├── crafting.ts, garden.ts, lesson.ts, quiz.ts
```

## Lesson Categories (19 Total)
| Category | Lessons |
|----------|---------|
| Climate Fundamentals | Climate Basics, Carbon Footprint |
| Energy | Energy Mix, Solar Power, Renewable Energy, Nuclear Energy |
| Transportation | Electric Vehicles, Public Transport & Urban Living |
| Sustainable Living | Sustainable Living, Fashion, Agriculture, Recycling, Urban Living |
| Environment | Oceans, Rainforests, Deserts & Geo-engineering |
| Policy & Progress | Policy & Environmental Laws, Organizations, Achievements |
| Fun Facts | Amazing Animals |

## Commands
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
```

## Notes
- Data files are in `app/data/` - edit `lessons.ts` for lesson metadata and `contentData.tsx` for lesson text
- Quiz questions are in `quizQuestions.ts` keyed by lesson title
- User state managed via React Context in `UserContext.tsx`
