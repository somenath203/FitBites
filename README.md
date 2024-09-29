# FitBites

## Demo video of the overall project

![Screenshot (712)](https://github.com/user-attachments/assets/63110cd6-ea64-4dd2-82aa-b7dc61a06d81)

https://www.youtube.com/watch?v=Mn0L4Ph6tXs

## Introduction

FitBites is a personalized nutrition and diet web app that helps users plan meals, suggest recipes, and track their daily calorie intake. Powered by Google Gemini API, FitBites generates customized meal plans and recipe suggestions based on user preferences and tracks detailed caloric progress to support health goals.

## Features

### 1. **Profile Setup**
   - After successful authentication, users must complete their profile by entering details such as height, weight, activity level, and allergies (if any).
   - Until the profile is completed, users can only access the landing page and cannot use other features.

### 2. **Plan Meal**
   - Users can generate personalized meal plans based on their health goals, preferences, and dietary needs.

### 3. **Suggest Recipe**
   - Get personalized recipe suggestions tailored to the time of day, meal type, and available ingredients.
   - Recipes are customized to match user input and dietary preferences.

### 4. **Track Calorie**
   - Users can track their daily calorie intake and monitor their nutritional progress with a detailed breakdown.
   - The calorie tracker dynamically adjusts based on meals and recipes created using the app.

### 5. **Profile and History View**
   - Users can view their complete profile at any time, showing all personal details.
   - A history section allows users to view all previously created meals, recipes, and calorie tracking logs.
   - Each history entry includes full details, from user input to the response generated by the Google Gemini model.

## Technologies Used

- **Next.js**: A powerful React-based framework for building server-rendered web applications with ease.
- **Google Gemini API**: The AI model responsible for generating personalized meal plans, recipe suggestions, and calorie analysis.
- **ShadCN UI**: Component library for building the user interface efficiently.
- **Tailwind CSS**: A utility-first CSS framework used to style the application for a clean and responsive design.
- **Prisma ORM**: Database ORM used to interact with the Neon PostgreSQL database seamlessly.
- **Neon PostgreSQL**: A cloud-based PostgreSQL database used for storing user data, meal plans, recipes, and calorie logs.
