# EcoLearn - Sustainability Education App

**EcoLearn** is an interactive mobile application built with Expo that provides engaging lessons on sustainability and climate change. Learn about climate basics, greenhouse gases, human impact, consequences, and solutions, and test your knowledge with integrated quizzes. The app leverages file-based routing with Expo Router and features a gamified learning experience to encourage users to explore and improve their environmental knowledge.

## Features

- **Interactive Lessons:** Dive into detailed lessons covering key sustainability topics.
- **Dynamic Quiz System:** Take quizzes after lessons to test your knowledge.
- **Reward System:** Earn rewards for completing lessons and quizzes.
- **User Profile:** Track your progress and view your achievements.
- **File-Based Navigation:** Clean navigation structure powered by Expo Router.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (optional, but recommended) installed globally:
  ```bash
  npm install -g expo-cli
Git
Installation
Clone the Repository

bash
Copy
git clone <your-repo-url>
cd <your-repo-folder>
Install Dependencies

bash
Copy
npm install
Running the App
Start the Expo development server:

bash
Copy
npx expo start
You can then:

Open the app in Expo Go on your physical device,
Use an Android emulator,
Use an iOS simulator, or
Run the app in your web browser.
Project Structure
The project is organized as follows:

bash
Copy
/app
├── (tabs)/
│   ├── _layout.tsx           # Custom tab layout with navigation
│   ├── explore.tsx           # Explore tab screen
│   └── index.tsx             # Home tab screen
├── screens/
│   ├── LessonsScreen.tsx     # List of sustainability lessons
│   ├── LessonDetailScreen.tsx# Detailed lesson content with quiz navigation
│   ├── QuizScreen.tsx        # Quiz screen for lesson subtopics
│   ├── RewardsScreen.tsx     # Rewards screen for user achievements
│   └── ProfileScreen.tsx     # User profile screen
├── _layout.tsx               # Global layout configuration (includes NavigationContainer)
├── +not-found.tsx            # 404 Not Found screen
└── Rewards.tsx               # (Optional) Legacy rewards screen re-exporting RewardsScreen
Usage
Explore Lessons: Navigate to the Lessons tab to browse sustainability topics.
Detailed Content: Tap on a lesson to read detailed content and follow the sequence (e.g., Climate Basics → Greenhouse Gases → Human Impact → Consequences → Solutions).
Take Quizzes: After completing a lesson, navigate to a quiz to test your understanding.
Earn Rewards: Check out the Rewards tab to view your progress and earn badges.
Manage Your Profile: View and update your profile details in the Profile tab.
Contributing
Contributions are welcome! If you have ideas, bug fixes, or new features to share, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Resources
Expo Documentation
React Navigation Documentation
Expo Router Documentation
Community
Join our community of developers and environmental enthusiasts:
