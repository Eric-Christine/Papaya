# Papaya - Sustainability Education App

**Papaya** is an interactive mobile application built with Expo that provides engaging lessons on sustainability and climate change. Learn about climate fundamentals, renewable energy, sustainable living, environmental conservation, and policy through gamified lessons and quizzes.

## Features

- **19 Interactive Lessons**: Comprehensive coverage across 7 categories including Climate Fundamentals, Energy, Transportation, Sustainable Living, Environment, Policy & Progress, and Fun Facts.
- **Dynamic Quiz System**: Test your knowledge after each lesson with modern, engaging quizzes.
- **Virtual Garden**: Plant and harvest various items in your own sustainability garden.
- **Crafting Kitchen**: Combine harvested ingredients to craft unique items like Green Salad, Floral Bouquet, and Mythical Garden Set.
- **Rewards Shop**: Spend your earned coins on items and upgrades.
- **User Profile**: Track your progress, XP, and achievements.
- **File-Based Navigation**: Clean navigation structure powered by Expo Router.

## Lesson Categories

| Category | Topics |
|----------|--------|
| Climate Fundamentals | Climate Basics, Carbon Footprint |
| Energy | Energy Mix, Solar Power, Renewable Energy, Nuclear Energy |
| Transportation | Electric Vehicles, Public Transport & Urban Living |
| Sustainable Living | Sustainable Living, Fashion, Agriculture, Recycling, Urban Living |
| Environment | Oceans, Rainforests, Deserts & Geo-engineering |
| Policy & Progress | Policy & Environmental Laws, Organizations, Achievements |
| Fun Facts | Amazing Animals |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (optional, but recommended)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd Papaya
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:

```bash
npx expo start
```

You can then:
- Open the app in **Expo Go** on your physical device
- Run on **iOS simulator**: Press `i`
- Run on **Android emulator**: Press `a`
- Run in your **web browser**: Press `w`

## Project Structure

```
app/
├── (tabs)/                    # Tab-based navigation
│   ├── _layout.tsx            # Tab layout configuration
│   └── index.tsx              # Home tab
├── components/
│   ├── crafting/              # Crafting system components
│   └── quiz/                  # Quiz UI components
├── contexts/
│   └── UserContext.tsx        # Global user state management
├── data/
│   ├── contentData.tsx        # Lesson content
│   ├── craftingRecipes.ts     # Crafting recipes
│   ├── lessons.ts             # Lesson definitions
│   └── quizQuestions.ts       # Quiz questions
├── screens/
│   ├── GardenScreen.tsx       # Virtual garden
│   ├── LessonDetailScreen.tsx # Lesson content display
│   ├── LessonsScreen.tsx      # Lesson list
│   ├── ProfileScreen.tsx      # User profile
│   ├── QuizScreen.tsx         # Quiz interface
│   └── RewardsScreen.tsx      # Shop & rewards
└── types/                     # TypeScript definitions
```

## Usage

1. **Explore Lessons**: Browse sustainability topics organized by category.
2. **Learn**: Read detailed content with facts, statistics, and actionable insights.
3. **Take Quizzes**: Test your understanding after each lesson.
4. **Earn Rewards**: Gain XP and coins for completing lessons and quizzes.
5. **Grow Your Garden**: Plant and harvest items in your virtual garden.
6. **Craft Items**: Use harvested ingredients in the Crafting Kitchen.

## Contributing

Contributions are welcome! If you have ideas, bug fixes, or new features to share, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
