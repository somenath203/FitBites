"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

import primsaClientConfig from "@/prismaClientConfig";
import { fetchWholeProfileOfUser } from "./userServerActions";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export const createNewCalorieTracking = async (prevState, formData) => {
  let createdTracking;

  try {
    const user = await currentUser();

    const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

    const rawData = Object.fromEntries(formData);

    const allFoodsEatenToday = rawData?.foodItemsTakenToday
      ?.split(",")
      .map((food) => food.trim())
      .filter((food) => food !== "");

    if (allFoodsEatenToday?.length > 8) {
      throw new Error("You can enter a maximum of 8 foods.");
    }

    for (const food of allFoodsEatenToday) {
      if (food.length > 25) {
        throw new Error("Each food cannot be longer than 25 characters.");
      }
    }

    const allPortionSizeOfEachFoodTakenToday =
      rawData?.portionSizeOfEachFoodTakenToday
        ?.split(",")
        .map((food) => food.trim())
        .filter((food) => food !== "");

    if (allPortionSizeOfEachFoodTakenToday?.length > 8) {
      throw new Error("You can enter portion sizes for a maximum of 8 foods.");
    }

    for (const portionSize of allPortionSizeOfEachFoodTakenToday) {
      if (portionSize.length > 25) {
        throw new Error(
          "Each portion size cannot be longer than 25 characters.",
        );
      }
    }

    if (rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday?.trim().length > 15) {
      throw new Error(
        "Approximate total calories cannot be longer than 15 characters.",
      );
    }

    if (rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday?.trim().length > 30) {
      throw new Error(
        "Approximate total macronutrients cannot be longer than 30 characters.",
      );
    }

    const calorieTrackingPrompt = `
            Generate a personalized calorie and nutrition analysis for the following user.

            ## User Profile
            - Name: ${fetchAllDetailsOfUser?.firstName} ${fetchAllDetailsOfUser?.lastName}
            - Age: ${fetchAllDetailsOfUser?.age} years
            - Gender: ${fetchAllDetailsOfUser?.gender}
            - Height: ${fetchAllDetailsOfUser?.height} cm
            - Weight: ${fetchAllDetailsOfUser?.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser?.activityLevel}
            - Allergies: ${fetchAllDetailsOfUser?.allergies}

            ## Meal Details
            - Meal Type: ${rawData?.mealTypeTakenToday}
            - Foods Consumed: ${rawData?.foodItemsTakenToday}
            - Portion Sizes: ${rawData?.portionSizeOfEachFoodTakenToday}
            - Approximate Total Calories: ${rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday}
            - Approximate Total Macronutrients: ${rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday}

            ## Instructions
            - Analyze the user's selected meal based on the provided information.
            - Respect the user's allergies while analyzing the meal.
            - If the user has entered "No Idea" for the approximate total calories, estimate the total calories based on the foods and portion sizes provided.
            - If the user has entered "No Idea" for the approximate total macronutrients, estimate the total protein, carbohydrates, and fat based on the foods and portion sizes provided.
            - Include the following sections:
            - Estimated Total Calories
            - Estimated Protein
            - Estimated Carbohydrates
            - Estimated Fat
            - Nutritional Analysis
            - Positive Aspects of the Meal
            - Areas for Improvement
            - Healthier Alternatives or Suggestions (if applicable)
            - Personalized Recommendations
            - Keep the analysis realistic, practical, easy to understand, and personalized to the user's profile.
            - Present the analysis in Markdown using headings and bullet points only. Do not use Markdown tables or any other type of table.
        `;

    const model = "gemini-3.1-flash-lite";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Generate a personalized calorie and nutrition analysis for the following user.

            ## User Profile
            - Name: No Way
            - Age: 24 years
            - Gender: Male
            - Height: 173 cm
            - Weight: 96 kg
            - Activity Level: No Exercise
            - Allergies: No allergies

            ## Meal Details
            - Meal Type: Lunch
            - Foods Consumed: Chicken Curry, Rice
            - Portion Sizes: 6 piece of chicken curry, 1 full plate of rice
            - Approximate Total Calories: No Idea
            - Approximate Total Macronutrients: No Idea

            ## Instructions
            - Analyze the user's selected meal based on the provided information.
            - Respect the user's allergies while analyzing the meal.
            - If the user has entered "No Idea" for the approximate total calories, estimate the total calories based on the foods and portion sizes provided.
            - If the user has entered "No Idea" for the approximate total macronutrients, estimate the total protein, carbohydrates, and fat based on the foods and portion sizes provided.
            - Include the following sections:
            - Estimated Total Calories
            - Estimated Protein
            - Estimated Carbohydrates
            - Estimated Fat
            - Nutritional Analysis
            - Positive Aspects of the Meal
            - Areas for Improvement
            - Healthier Alternatives or Suggestions (if applicable)
            - Personalized Recommendations
            - Keep the analysis realistic, practical, easy to understand, and personalized to the user's profile.
            - Present the analysis in Markdown using headings and bullet points only. Do not use Markdown tables or any other type of table.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `### Personalized Nutrition Analysis for No Way

            #### Estimated Total Calories
            *   **Total Estimate:** Approximately 950 - 1,100 calories.
                *   6 pieces of chicken curry (assuming medium pieces with gravy): ~500–600 calories.
                *   1 full plate of rice (approx. 2.5–3 cups cooked): ~450–500 calories.

            #### Estimated Protein
            *   **Total Estimate:** 45 - 55 grams.
                *   The chicken provides a significant source of protein, which is beneficial for muscle maintenance.

            #### Estimated Carbohydrates
            *   **Total Estimate:** 110 - 130 grams.
                *   The majority of these carbohydrates come from the large portion of white rice.

            #### Estimated Fat
            *   **Total Estimate:** 35 - 45 grams.
                *   Fat content depends heavily on how the curry was prepared (amount of oil, coconut milk, or cream used).

            #### Nutritional Analysis
            *   This meal is calorie-dense and high in carbohydrates.
            *   While it provides a good amount of protein from the chicken, the portion of rice is likely excessive for a sedentary activity level.
            *   The meal lacks dietary fiber and micronutrients (vitamins and minerals) because it is missing vegetables.

            #### Positive Aspects of the Meal
            *   **Protein Content:** The chicken provides high-quality protein, which helps with satiety and muscle health.
            *   **Energy Density:** This meal provides a substantial amount of energy, which would be sufficient for someone with a very high activity level.
            *   **Simplicity:** It is a balanced base (protein + starch) that is easily adaptable for healthier modifications.

            #### Areas for Improvement
            *   **Portion Control:** A "full plate" of rice often exceeds the recommended serving size, leading to a surplus of calories that can contribute to weight gain.
            *   **Lack of Vegetables:** There is no fiber-rich component, which is essential for digestion, blood sugar regulation, and long-term health.
            *   **Calorie Surplus:** Given your current weight and sedentary activity level, this single meal may account for a very large percentage of your total daily energy needs.

            #### Healthier Alternatives or Suggestions
            *   **Adjust Rice Ratio:** Reduce the rice portion to 1 cup and fill the remaining space on your plate with green vegetables or a side salad.
            *   **Choose Leaner Preparation:** If cooking at home, use less oil, choose chicken breast instead of skin-on pieces, and opt for tomato-based curries rather than heavy cream or coconut milk-based sauces.
            *   **Add Fiber:** Incorporate stir-fried vegetables, cucumber slices, or a side of steamed broccoli to add volume without excessive calories.

            #### Personalized Recommendations
            *   **Mindful Portions:** Since you are currently sedentary, try to prioritize protein and vegetables, and limit refined carbohydrates like white rice. Consider using a smaller plate to naturally control portion sizes.
            *   **Increase Activity:** Even light movement, such as a 20–30 minute brisk walk daily, can help improve your metabolic health and assist with weight management.
            *   **Hydration:** Ensure you are drinking plenty of water throughout the day. Sometimes thirst is mistaken for hunger, leading to larger portion sizes.
            *   **Consistency:** Focus on smaller, consistent changes rather than drastic restrictions. Aim to add one serving of vegetables to your lunch and dinner consistently starting this week.`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: calorieTrackingPrompt,
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
      createdTracking = await primsaClientConfig.trackCalorieOfTheDay.create({
        data: {
          mealTypeTakenToday: rawData?.mealTypeTakenToday || "",
          foodItemsTakenToday: rawData?.foodItemsTakenToday || "",
          portionSizeOfEachFoodTakenToday:
            rawData?.portionSizeOfEachFoodTakenToday || "",
          approximateTotalCalorieOfAllTheFoodsTogetherTakenToday:
            rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday ||
            "",
          approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday:
            rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday ||
            "",
          idOfTheProfileWhoCreatedTheTrackCalorie: user?.id || "",
          calorieTrackCreatedByTheModel: markdownResponse || "",
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

  redirect(`/view_particular_calorie_tracking/${createdTracking.id}`);
};

export const fetchAllCalorieTrackingCreatedByTheUser = async () => {
  try {
    const user = await currentUser();

    const allCaloriesCreatedByTheUser =
      await primsaClientConfig.trackCalorieOfTheDay.findMany({
        where: {
          idOfTheProfileWhoCreatedTheTrackCalorie: user?.id,
        },
      });

    return allCaloriesCreatedByTheUser.reverse();
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "There was an error while fetching your calorie trackings, please try again.",
    };
  }
};

export const fetchParticularCalorieTrackerById = async (trackCalorieId) => {
  try {
    return primsaClientConfig.trackCalorieOfTheDay.findUnique({
      where: {
        id: trackCalorieId,
      },
    });
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "something went wrong while fetching the calorie tracking, please try again",
    };
  }
};
