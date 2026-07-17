# FitBites 🍎🥗

> ### 🥗 Your All-in-One Nutrition Hub

---

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

FitBites is an **AI-powered personalized nutrition and diet web application** that helps users make healthier food choices based on their **personal profile, dietary preferences, and health goals**.

Powered by **Google Gemini 3.1 Flash Lite**, FitBites generates **personalized meal plans**, **recipe suggestions**, and **calorie analysis** by understanding each user's health profile and nutritional requirements.

> 💡 **The application is designed to make healthy eating simple, personalized, and easy to follow.**

---

# ❓ What Problem Does FitBites Solve?

Many people want to eat healthier but often struggle with questions like:

- 🥗 What should I eat today?
- 🍳 Which recipe matches my diet?
- 🔥 How many calories am I eating?
- ⚖️ Is my meal nutritionally balanced?
- 🎯 Which foods will help me achieve my health goal?

**FitBites solves these problems by using Artificial Intelligence to generate personalized nutrition recommendations based on each user's health profile and food choices.**

---

# 🌟 Features

## 👤 Profile Setup

> **Complete your health profile to unlock all AI-powered features.**

- Secure authentication using **Clerk**.
- Users must complete their health profile before accessing the application's AI features.
- Stores important health information, including:
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

> **Generate a personalized one-day meal plan tailored to your health profile.**

Generate a personalized one-day meal plan using:

### 👤 User Profile

- Name
- Age
- Gender
- Height
- Weight
- Activity Level
- Allergies

### 🎯 User Requirements

- Health Goal
- Diet Preference
- Daily Calorie Target
- Food Preferences

The generated meal plan includes:

- 🍳 Breakfast
- 🍎 Morning Snack
- 🍛 Lunch
- 🥜 Evening Snack
- 🍽️ Dinner
- 🔥 Estimated Calories
- 💪 Estimated Protein
- 🌾 Estimated Carbohydrates
- 🥑 Estimated Fat
- 📊 Total Daily Nutrition Summary

**Additional features**

- Automatically estimates an appropriate daily calorie target if the user enters **"No Idea"**.
- Respects the user's allergies and food preferences.
- Generates practical, balanced meals that are easy to prepare.
- Presents the meal plan using headings and bullet points for better readability.

---

## 🍳 AI Recipe Suggestion

> **Receive personalized recipes that match your dietary needs and cooking preferences.**

Generate a personalized recipe using:

### 👤 User Profile

- Name
- Age
- Gender
- Height
- Weight
- Activity Level
- Allergies

### 🎯 User Requirements

- Meal Type
- Time Available for Cooking
- Daily Calorie Target
- Ingredients to Include
- Ingredients to Exclude

Each generated recipe includes:

- 🍽️ Recipe Name
- ⏱️ Estimated Preparation Time
- 👨‍🍳 Estimated Cooking Time
- 🔥 Estimated Total Calories
- 🥦 Ingredients
- 📖 Step-by-step Cooking Instructions
- 💪 Estimated Protein
- 🌾 Estimated Carbohydrates
- 🥑 Estimated Fat
- 💡 Healthy Tips or Alternatives

**Additional features**

- Automatically estimates an appropriate calorie target if the user enters **"No Idea"**.
- Ensures recipes respect allergies and excluded ingredients.
- Generates recipes that fit within the selected cooking time.
- Presents recipes using headings and bullet points without tables.

---

## 🔥 AI Calorie Tracker

> **Analyze your meals and receive personalized nutritional feedback.**

Analyze a meal using:

### 👤 User Profile

- Name
- Age
- Gender
- Height
- Weight
- Activity Level
- Allergies

### 🍽️ User Meal Information

- Meal Type
- Foods Eaten
- Portion Size of Each Food
- Approximate Total Calories
- Approximate Total Macronutrients

The AI provides:

- 🔥 Estimated Total Calories
- 💪 Estimated Total Macronutrients
- 📊 Nutritional Analysis
- ✅ Healthy Recommendations
- 📈 Areas for Improvement
- 🎯 Personalized Suggestions

**Additional features**

- Automatically estimates calories and macronutrients if the user enters **"No Idea"**.
- Uses the user's complete health profile to generate personalized nutritional feedback.
- Provides practical suggestions to help improve future meals.

---

## ✅ Input Validation

> **Every user input is validated before being sent to the AI model.**

FitBites validates user inputs before sending them to the AI model.

Some of the validations include:

- Limits on the number of food preferences and ingredients.
- Character limits to keep prompts concise and meaningful.
- Validation for food count and portion sizes.
- Automatic handling of **"No Idea"** inputs for calorie and macronutrient estimation.
- Server-side validation using Next.js Server Actions.

---

## 📂 History

> **Never lose track of your previous AI-generated nutrition records.**

Users can view the complete history of their:

- Meal Plans
- Recipe Suggestions
- Calorie Tracking

Every history entry stores:

| 📁 Feature           | 📌 Saved Information                                     |
| :------------------- | :------------------------------------------------------- |
| 🍽️ Meal Planner      | User Inputs, AI-generated Response                       |
| 🍳 Recipe Suggestion | User Inputs, AI-generated Response                       |
| 🔥 Calorie Tracker   | User Inputs, AI-generated Response, Creation Date & Time |

This allows users to revisit previous analyses and monitor their nutrition journey over time.

---

# 🛠️ Technologies Used

| Category                       | Technologies                                                                 |
| :----------------------------- | :--------------------------------------------------------------------------- |
| 🎨 **Frontend**                | Next.js 16, React 19, Tailwind CSS, ShadCN UI                                |
| ⚙️ **Backend**                 | Next.js Server Actions, Prisma ORM                                           |
| 🔐 **Authentication**          | Clerk Authentication                                                         |
| 🗄️ **Database**                | Neon PostgreSQL                                                              |
| 🤖 **Artificial Intelligence** | Google Gemini 3.1 Flash Lite, Google GenAI SDK                               |
| ☁️ **Deployment**              | Vercel                                                                       |

---

# 🌐 Live Website

🚀 **Try FitBites here:**

🔗 **https://fit-bites-prod.vercel.app/**

---

# ⚠️ Disclaimer

> **Important**

FitBites uses **Google Gemini 3.1 Flash Lite** to generate AI-powered meal plans, recipe suggestions, and calorie analysis.

The generated responses are intended for **informational purposes only** and may not always be completely accurate. They should **not** be considered professional medical, nutritional, or dietary advice.

While FitBites provides the prompts and user inputs to the AI model, the generated content is produced by **Google Gemini**. The creator of this project has **no control** over the responses generated by the AI model and cannot guarantee the accuracy, completeness, or suitability of every response.

**Always consult a qualified healthcare professional or registered dietitian before making important health or nutrition decisions.**
