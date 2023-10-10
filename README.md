# Tech quiz app

## Description
Tech quiz app is a Vue.js web application that allows users to solve quizzes with questions that are fetched from the https://quizapi.io/api/v1/questions API. Users can see their final scores upon completing a quiz and review previous quizes. The app uses VueRouter for routing, Pinia store for state management, and local storage for data storage and retrieval.

## Features
- Interactive quiz solving.
- Fetches quiz questions from an external API.
- Stores user progress and settings in local storage.
- Efficient routing with VueRouter.
- Unit testing using vitest.
- End-to-end testing with Playwright.

## Tech Stack
- **Frontend Framework**: Vue.js
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS with Daisy UI library
- **Routing**: VueRouter
- **Data Storage**: Local Storage
- **Testing**: vitest (unit tests), Playwright (end-to-end tests)
- **API**: 'https://quizapi.io/api/v1/questions'

## Run the project on your local machine

### Installation
1. Clone the repository:
   ```
   git clone <repository_url>
   ```

2. Change into the project directory:
   ```
   cd quizzy-app
   ```

3. Install project dependencies:
   ```
   npm install

### Configuration
1. Sign in to generate your private api key at: https://quizapi.io/
2. Create a `.env.local` file in the root directory of the project.
3. Add the following configuration to the `.env.local` file:
   ```
   VITE_API_URL=https://quizapi.io/api/v1/questions
   VITE_API_KEY='YOUR_API_KEY'
   ```

### Build the project
```sh
npm run build
```

### Now you can run the project on your local machine
```sh
npm run preview
```
