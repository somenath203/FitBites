"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

import primsaClientConfig from "@/prismaClientConfig";
import { fetchWholeProfileOfUser } from "./userServerActions";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export const createNewMealPlan = async (prevState, formData) => {
  let createdNewPlanMeal;

  try {
    const user = await currentUser();

    const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

    const rawData = Object.fromEntries(formData);

    if (rawData?.targetCalorie?.length > 10) {
      throw new Error("Maximum characters cannot be greater than 10.");
    }

    const preferences = rawData?.personalPreference
      .split(",")
      .map((preference) => preference.trim())
      .filter((preference) => preference !== "");

    if (preferences?.length > 5) {
      throw new Error("You can enter a maximum of 5 food preferences.");
    }

    const mealPlanPrompt = `
        Generate a personalized meal plan for the following user.

        ## User Profile
        - Name: ${fetchAllDetailsOfUser?.firstName} ${fetchAllDetailsOfUser?.lastName}
        - Age: ${fetchAllDetailsOfUser?.age} years
        - Gender: ${fetchAllDetailsOfUser?.gender}
        - Height: ${fetchAllDetailsOfUser?.height} cm
        - Weight: ${fetchAllDetailsOfUser?.weight} kg
        - Activity Level: ${fetchAllDetailsOfUser?.activityLevel}
        - Allergies: ${fetchAllDetailsOfUser?.allergies}

        ## User Requirements
        - Health Goal: ${rawData?.healthGoal}
        - Diet Preference: ${rawData?.dietPreference}
        - Daily Calorie Target: ${rawData?.targetCalorie}
        - Personal Preferences: ${rawData?.personalPreference}

        ## Instructions
        - Create a meal plan for one full day.
        - Include Breakfast, Morning Snack, Lunch, Evening Snack, and Dinner.
        - Ensure the meal plan supports the user's health goal.
        - Strictly follow the user's diet preference.
        - Respect the user's allergies and food preferences.
        - If the user has entered "No Preference" for food preferences, do not apply any additional food restrictions.
        - If the user has entered "No Idea" for the daily calorie target, estimate an appropriate daily calorie target based on the user's age, gender, height, weight, activity level, and health goal.
        - Suggest balanced, nutrient-dense meals that are practical and easy to prepare.
        - For each meal, include:
        - Meal name
        - Food items
        - Estimated calories
        - Protein
        - Carbohydrates
        - Fat
        - At the end, provide:
        - Total estimated daily calories
        - Total protein
        - Total carbohydrates
        - Total fat
        - Keep the recommendations realistic, healthy, and easy to follow. Do not use tables. Present the meal plan using headings and bullet points only.
    `;

    const model = "gemini-3.1-flash-lite";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Generate a personalized meal plan for the following user.

        ## User Profile
        - Name: Somenath Choudhury
        - Age: 24 years
        - Gender: Male
        - Height: 173 cm
        - Weight: 97 kg
        - Activity Level: No Exercise
        - Allergies: Brinjal, Sea Food

        ## User Requirements
        - Health Goal: Weight Loss
        - Diet Preference: Vegetarian
        - Daily Calorie Target: No Idea
        - Personal Preferences: No Preference

        ## Instructions
        - Create a meal plan for one full day.
        - Include Breakfast, Morning Snack, Lunch, Evening Snack, and Dinner.
        - Ensure the meal plan supports the user's health goal.
        - Strictly follow the user's diet preference.
        - Respect the user's allergies and food preferences.
        - If the user has entered "No Preference" for food preferences, do not apply any additional food restrictions.
        - If the user has entered "No Idea" for the daily calorie target, estimate an appropriate daily calorie target based on the user's age, gender, height, weight, activity level, and health goal.
        - Suggest balanced, nutrient-dense meals that are practical and easy to prepare.
        - For each meal, include:
        - Meal name
        - Food items
        - Estimated calories
        - Protein
        - Carbohydrates
        - Fat
        - At the end, provide:
        - Total estimated daily calories
        - Total protein
        - Total carbohydrates
        - Total fat
        - Keep the recommendations realistic, healthy, and easy to follow. Do not use tables. Present the meal plan using headings and bullet points only.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `To support your weight loss goal, Somenath, we have estimated a daily calorie target of approximately **2,000 calories**. This target creates a moderate caloric deficit based on your profile (Age 24, Height 173 cm, Weight 97 kg, Sedentary) to promote sustainable weight loss.

            All meals below are strictly vegetarian and free from brinjal and seafood.

            ### Breakfast: Oats and Greek Yogurt Bowl
            *   **Food Items:** 40g rolled oats cooked with water, topped with 100g low-fat Greek yogurt, 1 tablespoon of chia seeds, and 1/2 cup of blueberries.
            *   **Estimated Calories:** 350 kcal
            *   **Protein:** 15g
            *   **Carbohydrates:** 55g
            *   **Fat:** 7g

            ### Morning Snack: Apple and Almonds
            *   **Food Items:** 1 medium-sized apple and 10 raw almonds.
            *   **Estimated Calories:** 160 kcal
            *   **Protein:** 3g
            *   **Carbohydrates:** 25g
            *   **Fat:** 6g

            ### Lunch: Paneer and Vegetable Stir-fry with Brown Rice
            *   **Food Items:** 100g paneer cubes sautéed with broccoli, carrots, and bell peppers (using 1 tsp olive oil), served with 1 cup cooked brown rice.
            *   **Estimated Calories:** 600 kcal
            *   **Protein:** 25g
            *   **Carbohydrates:** 70g
            *   **Fat:** 22g

            ### Evening Snack: Roasted Chana (Chickpeas)
            *   **Food Items:** 1 cup of roasted chickpeas (dry roasted).
            *   **Estimated Calories:** 250 kcal
            *   **Protein:** 12g
            *   **Carbohydrates:** 35g
            *   **Fat:** 7g

            ### Dinner: Lentil Soup (Dal) and Multigrain Roti
            *   **Food Items:** 1.5 cups of yellow dal (lentil soup) tempered with spices, 2 small multigrain rotis, and a side of cucumber and tomato salad.
            *   **Estimated Calories:** 640 kcal
            *   **Protein:** 25g
            *   **Carbohydrates:** 95g
            *   **Fat:** 12g

            ***

            ### Daily Totals
            *   **Total Estimated Daily Calories:** 2,000 kcal
            *   **Total Protein:** 80g
            *   **Total Carbohydrates:** 280g
            *   **Total Fat:** 54g`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: mealPlanPrompt,
          },
        ],
      },
    ];

    const res = await ai.models.generateContentStream({
      model,
      contents,
    });

    let markdownResponse = "";

    for await (const chunk of res) {
      if (chunk?.text) {
        markdownResponse += chunk?.text;
      }
    }

    if (markdownResponse) {
      createdNewPlanMeal = await primsaClientConfig.mealPlan.create({
        data: {
          healthGoal: rawData?.healthGoal || "",
          dietPreference: rawData?.dietPreference || "",
          calorieTarget: rawData?.targetCalorie || "",
          calorieTarget: rawData?.targetCalorie || "",
          personalPreference: rawData?.personalPreference || "",
          mealPlanCreatedByTheModel: markdownResponse || "",
          idOfTheProfileWhoCreatedTheMealPlan: user?.id || "",
          dateOfCreation: rawData?.dateOfCreation || "",
          timeOfCreation: rawData?.timeOfCreation || "",
        },
      });
    }
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "there was an error while creating a new meal plan, please try again",
    };
  }

  redirect(`/view_particular_meal/${createdNewPlanMeal?.id}`);
};

export const fetchAllMealsCreatedByTheUser = async () => {
  try {
    const user = await currentUser();

    const allMealsCreatedByTheUser = await primsaClientConfig.mealPlan.findMany(
      {
        where: {
          idOfTheProfileWhoCreatedTheMealPlan: user?.id,
        },
      },
    );

    return allMealsCreatedByTheUser.reverse();
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "There was an error while fetching your recipe suggestions, please try again.",
    };
  }
};

export const fetchParticularMealById = async (mealPlanId) => {
  try {
    return primsaClientConfig.mealPlan.findUnique({
      where: {
        id: mealPlanId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "something went wrong while fetching the meal, please try again",
    };
  }
};
