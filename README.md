# FitBites 🍎🥗

## 📚 Contents

- [🎥 Demo Video](#-demo-video)
- [✨ Introduction](#-introduction)
- [❓ What Problem Does FitBites Solve?](#-what-problem-does-fitbites-solve)
- [🌟 Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🌐 Live Website](#-live-website)
- [⚠️ Disclaimer](#️-disclaimer)

---

# 🎥 Demo Video

🎬 **Click the thumbnail below to watch the complete demo video of FitBites on YouTube.**

[![FitBites Demo](https://github.com/user-attachments/assets/63110cd6-ea64-4dd2-82aa-b7dc61a06d81)](https://www.youtube.com/watch?v=f5BVZJVF8mQ)

---

# ✨ Introduction

FitBites is an AI-powered personalized nutrition and diet web application that helps users make healthier food choices based on their personal profile and health goals.

Using **Google Gemini 3.1 Flash Lite**, FitBites generates personalized meal plans, recipe suggestions, and calorie analysis by understanding each user's profile, dietary preferences, allergies, and nutritional requirements.

The application is designed to make healthy eating simple, personalized, and easy to follow.

---

# ❓ What Problem Does FitBites Solve?

Many people want to eat healthier but often struggle with questions like:

- What should I eat today?
- Which recipe matches my diet?
- How many calories am I eating?
- Is my meal nutritionally balanced?
- Which foods will help me achieve my health goal?

FitBites solves these problems by using Artificial Intelligence to generate personalized nutrition recommendations based on each user's profile and food choices.

---

# 🌟 Features

## 👤 Profile Setup

- Secure authentication using Clerk.
- Users must complete their health profile before accessing the application's AI features.
- Stores important health information including:
  - First Name
  - Last Name
  - Age
  - Gender
  - Height
  - Weight
  - Activity Level
  - Allergies

---

## 🍽️ AI Meal Planner

Generate a personalized one-day meal plan based on:

- Health Goal
- Diet Preference
- Daily Calorie Target
- Food Preferences
- Personal Health Profile
- Allergies

The generated meal plan includes:

- Breakfast
- Morning Snack
- Lunch
- Evening Snack
- Dinner
- Estimated Calories
- Protein
- Carbohydrates
- Fat
- Total Daily Nutrition Summary

If the user enters **"No Idea"** for the calorie target, FitBites automatically estimates an appropriate daily calorie target.

---

## 🍳 AI Recipe Suggestion

Generate a personalized recipe using:

- Meal Type
- Cooking Time
- Ingredients to Include
- Ingredients to Exclude
- Daily Calorie Target
- Personal Health Profile
- Allergies

Each recipe includes:

- Recipe Name
- Preparation Time
- Cooking Time
- Estimated Calories
- Ingredients
- Step-by-step Cooking Instructions
- Protein
- Carbohydrates
- Fat
- Healthy Tips

If the user enters **"No Idea"** for the calorie target, FitBites automatically estimates an appropriate calorie target before generating the recipe.

---

## 🔥 AI Calorie Tracker

Analyze any meal by providing:

- Meal Type
- Foods Eaten
- Portion Size of Each Food
- Approximate Calories
- Approximate Macronutrients

The AI provides:

- Estimated Calories
- Estimated Macronutrients
- Nutritional Analysis
- Healthy Recommendations
- Areas for Improvement
- Personalized Suggestions

If the user enters **"No Idea"** for calories or macronutrients, FitBites estimates them automatically.

---

## 📂 History

Users can view their complete history of:

- Meal Plans
- Recipe Suggestions
- Calorie Tracking

Every history item stores:

- User Inputs
- AI-generated Response
- Date of Creation
- Time of Creation

---

# 🛠️ Technologies Used

### Frontend

- Next.js 16
- React 19
- Tailwind CSS
- ShadCN UI

### Backend

- Next.js Server Actions
- Prisma ORM

### Authentication

- Clerk Authentication

### Database

- Neon PostgreSQL

### Artificial Intelligence

- Google Gemini 3.1 Flash Lite
- Google GenAI SDK

### Deployment

- Vercel

---

# 🌐 Live Website

🔗 **Website:** https://fit-bites-prod.vercel.app/

---

# ⚠️ Disclaimer

FitBites uses **Google Gemini 3.1 Flash Lite** to generate AI-powered meal plans, recipe suggestions, and calorie analysis.

The generated responses are intended for informational purposes only and may not always be completely accurate. They should not be considered professional medical, nutritional, or dietary advice.

Always consult a qualified healthcare professional or registered dietitian before making important health or nutrition decisions.
