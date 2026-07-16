"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

import primsaClientConfig from "@/prismaClientConfig";
import { fetchWholeProfileOfUser } from "./userServerActions";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY });

export const createNewReceipeSuggestion = async (prevState, formData) => {
  let createdNewReceipeSuggestion;

  try {
    const user = await currentUser();

    const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

    const rawData = Object.fromEntries(formData);


    const ingredientsToIncludeInReceipe = rawData?.ingredientsToInclude?.split(",").map((ingredient) => ingredient.trim()).filter((ingredient) => ingredient !== "");

    if (ingredientsToIncludeInReceipe?.length > 5) {
      throw new Error("You can enter a maximum of 5 ingredients that you want to include.");
    }


    const ingredientsToExcludeInReceipe = rawData?.ingredientsToExclude?.split(",").map((ingredient) => ingredient.trim()).filter((ingredient) => ingredient !== "");

    if (ingredientsToExcludeInReceipe?.length > 5) {
      throw new Error("You can enter a maximum of 5 ingredients that you want to exclude.");
    }

    const receipeSuggestionPrompt = `
      Generate a personalized recipe suggestion for the following user.

      ## User Profile
      - Name: ${fetchAllDetailsOfUser?.firstName} ${fetchAllDetailsOfUser?.lastName}
      - Age: ${fetchAllDetailsOfUser?.age} years
      - Gender: ${fetchAllDetailsOfUser?.gender}
      - Height: ${fetchAllDetailsOfUser?.height} cm
      - Weight: ${fetchAllDetailsOfUser?.weight} kg
      - Activity Level: ${fetchAllDetailsOfUser?.activityLevel}
      - Allergies: ${fetchAllDetailsOfUser?.allergies}

      ## User Requirements
      - Meal Type: ${rawData?.mealType}
      - Time Available for Cooking: ${rawData?.timeThatCanBeGivenToCooking} minutes
      - Daily Calorie Target: ${rawData?.dailyCalorieTarget}
      - Ingredients to Include: ${rawData?.ingredientsToInclude}
      - Ingredients to Exclude: ${rawData?.ingredientsToExclude}

      ## Instructions
      - Suggest one personalized recipe that best matches the user's requirements.
      - Ensure the recipe matches the selected meal type.
      - Respect the user's allergies at all times.
      - Include all of the ingredients listed under "Ingredients to Include" whenever possible.
      - Do not use any of the ingredients listed under "Ingredients to Exclude".
      - If the user has entered "No Idea" for the daily calorie target, estimate an appropriate calorie target based on the user's age, gender, height, weight, and activity level, and ensure the recipe fits within that target.
      - Ensure the recipe can be prepared within the specified cooking time.
      - Use healthy, practical, and easily available ingredients.
      - Include the following sections:
        - Recipe Name
        - Estimated Preparation Time
        - Estimated Cooking Time
        - Estimated Total Calories
        - Ingredients
        - Step-by-step Cooking Instructions
        - Estimated Protein
        - Estimated Carbohydrates
        - Estimated Fat
        - Tips or Healthy Alternatives (if applicable)
      - Keep the recipe realistic, healthy, easy to prepare, and suitable for everyday cooking.
      - Present the recipe in Markdown using headings and bullet points only. Do not use Markdown tables or any other type of table.
    `;

    const model = "gemini-3.1-flash-lite";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Generate a personalized recipe suggestion for the following user.

      ## User Profile
      - Name: No Way
      - Age: 24 years
      - Gender: Male
      - Height: 173 cm
      - Weight: 96 kg
      - Activity Level: No Exercise
      - Allergies: No allergies

      ## User Requirements
      - Meal Type: Lunch
      - Time Available for Cooking: 35 minutes
      - Daily Calorie Target: No Idea
      - Ingredients to Include: Chicken, Rice
      - Ingredients to Exclude: Mutton

      ## Instructions
      - Suggest one personalized recipe that best matches the user's requirements.
      - Ensure the recipe matches the selected meal type.
      - Respect the user's allergies at all times.
      - Include all of the ingredients listed under "Ingredients to Include" whenever possible.
      - Do not use any of the ingredients listed under "Ingredients to Exclude".
      - If the user has entered "No Idea" for the daily calorie target, estimate an appropriate calorie target based on the user's age, gender, height, weight, and activity level, and ensure the recipe fits within that target.
      - Ensure the recipe can be prepared within the specified cooking time.
      - Use healthy, practical, and easily available ingredients.
      - Include the following sections:
        - Recipe Name
        - Estimated Preparation Time
        - Estimated Cooking Time
        - Estimated Total Calories
        - Ingredients
        - Step-by-step Cooking Instructions
        - Estimated Protein
        - Estimated Carbohydrates
        - Estimated Fat
        - Tips or Healthy Alternatives (if applicable)
      - Keep the recipe realistic, healthy, easy to prepare, and suitable for everyday cooking.
      - Present the recipe in Markdown using headings and bullet points only. Do not use Markdown tables or any other type of table.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `### Personalized Nutrition Estimate
          Based on your profile (24 years old, 173 cm, 96 kg, sedentary activity level), your estimated maintenance calorie intake is approximately 2,200–2,300 calories per day. To support a healthy weight management goal while providing satiety, this lunch recipe is designed to be approximately **600–650 calories**.

          ---

          ### Recipe Name
          One-Pan Lemon Herb Chicken and Vegetable Rice Bowl

          ### Estimated Preparation Time
          10 minutes

          ### Estimated Cooking Time
          20 minutes

          ### Estimated Total Calories
          620 kcal

          ### Ingredients
          *   150g Chicken breast, cut into bite-sized pieces
          *   1 cup Cooked white or brown rice (pre-cooked or quick-cook)
          *   1 cup Broccoli florets
          *   1/2 Red bell pepper, sliced
          *   1 tbsp Olive oil
          *   1 clove Garlic, minced
          *   1 tsp Dried oregano or Italian seasoning
          *   1/2 Lemon (juice and zest)
          *   Salt and black pepper to taste
          *   Optional: Fresh parsley for garnish

          ### Step-by-step Cooking Instructions
          *   Heat the olive oil in a large skillet or pan over medium-high heat.
          *   Add the chicken breast pieces to the pan. Season with salt, pepper, and dried oregano. Cook for 5–7 minutes until golden brown and cooked through.
          *   Add the broccoli florets and sliced red bell pepper to the pan. Stir-fry for 4–5 minutes until the vegetables are tender-crisp.
          *   Stir in the minced garlic and cook for another minute until fragrant.
          *   Add the pre-cooked rice to the pan. Toss everything together to heat the rice through, allowing it to absorb the flavors from the chicken and vegetables.
          *   Remove from heat. Squeeze the fresh lemon juice over the mixture and sprinkle with lemon zest.
          *   Garnish with fresh parsley if desired and serve immediately.

          ### Estimated Protein
          40g

          ### Estimated Carbohydrates
          75g

          ### Estimated Fat
          18g

          ### Tips or Healthy Alternatives
          *   **Brown Rice Swap:** Use brown rice or quinoa instead of white rice for added fiber, which helps keep you fuller for longer.
          *   **Veggie Boost:** Feel free to add other easy-to-cook vegetables like zucchini, frozen peas, or spinach to increase the volume of the meal without adding many calories.
          *   **Spice it Up:** If you prefer heat, add a pinch of red chili flakes during the cooking process.
          *   **Batch Prep:** If you have time, cook a larger batch of rice at the start of the week to make this lunch even faster to assemble.`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: receipeSuggestionPrompt,
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

      createdNewReceipeSuggestion =
        await primsaClientConfig.suggestReceipe.create({
          data: {
            mealType: rawData?.mealType || "",
            timeThatCanBeGivenToCooking: rawData?.timeThatCanBeGivenToCooking || "",
            dailyCalorieTarget: rawData?.dailyCalorieTarget || "",
            ingredientsToInclude: rawData?.ingredientsToInclude || "",
            ingredientsToExclude: rawData?.ingredientsToExclude || "",
            receipeSuggestCreatedByTheModel: markdownResponse || "",
            idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id || "",
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
        "there was an error while creating the new receipe suggestion, please try again",
    };
  }

  redirect(
    `/view_particular_receipe_suggestions/${createdNewReceipeSuggestion?.id}`,
  );
};

export const fetchAllReceipeSuggestionsCreatedByTheUser = async () => {
  try {
    const user = await currentUser();

    const allReceipeSuggestionsCreatedByTheUser =
      await primsaClientConfig.suggestReceipe.findMany({
        where: {
          idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id,
        },
      });

    return allReceipeSuggestionsCreatedByTheUser.reverse();
  } catch (error) {
    console.log(error);

    return {
      message:
        error?.message ||
        "There was an error while fetching your recipe suggestions, please try again.",
    };
  }
};

export const fetchParticularReceipeSuggestionById = async (
  receipeSuggestionId,
) => {
  try {
    return primsaClientConfig.suggestReceipe.findUnique({
      where: {
        id: receipeSuggestionId,
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
