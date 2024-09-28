'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import primsaClientConfig from '@/prismaClientConfig';
import { chatSessionGoogleGemini } from '@/googleGeminiModelConfig';
import { fetchWholeProfileOfUser } from './userServerActions';


export const createNewReceipeSuggestion = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

        const rawData = Object.fromEntries(formData);


        const ingredientsToIncludeNoOfWordsGreaterThanTwenty = rawData?.ingredientsToInclude?.split(' ');

        if(ingredientsToIncludeNoOfWordsGreaterThanTwenty.length > 20) {

            throw new Error("make sure what you wrote in 'Ingredients to Include' is lesser than 20 words");

        }


        const ingredientsToExcludeNoOfWordsGreaterThanTwenty = rawData?.ingredientsToExclude?.split(' ');

        if(ingredientsToExcludeNoOfWordsGreaterThanTwenty.length > 20) {

            throw new Error("make sure what you wrote in 'Ingredients to Exclude' is lesser than 20 words");

        }


        const recipeSuggestionPrompt = `
            You are an expert nutrition assistant responsible for generating personalized recipe suggestions for a user based on their unique profile and preferences:
        
            **User Profile:**
            - **Full Name:** ${fetchAllDetailsOfUser.firstName || ''} ${fetchAllDetailsOfUser.lastName || ''}
            - **Age:** ${fetchAllDetailsOfUser.age || 0} years
            - **Gender:** ${fetchAllDetailsOfUser.gender || ''}
            - **Height:** ${fetchAllDetailsOfUser.height || 0} cm
            - **Weight:** ${fetchAllDetailsOfUser.weight || 0} kg
            - **Activity Level:** ${fetchAllDetailsOfUser.activityLevel || ''} (e.g., sedentary, moderately active, active)
            - **Allergies:** ${fetchAllDetailsOfUser.allergies || 'None'} (avoid ingredients that may cause an allergic reaction)
        
            **Dietary and Cooking Preferences:**
            - **Meal Type:** ${rawData?.mealType || ''} (e.g., breakfast, lunch, dinner, snacks)
            - **Time Available for Cooking:** ${rawData?.timeThatCanBeGivenToCooking || 'No time constraint'} minutes
            - **Daily Calorie Target:** ${rawData?.dailyCalorieTarget || ''} kcal
            - **Ingredients to Include:** ${rawData?.ingredientsToInclude || 'None specified'}
            - **Ingredients to Exclude:** ${rawData?.ingredientsToExclude || 'None specified'}
        
            **Task:**
            Based on the user's profile and preferences, provide a list of personalized recipe suggestions. Each recipe should adhere to the user's dietary needs, calorie target, available cooking time, and ingredient preferences. For each recipe, include:
        
            1. **Recipe Name**: The name of the dish.
            2. **Ingredients List**: Only include ingredients that align with the user’s preferences and exclude allergens or ingredients they wish to avoid.
            3. **Preparation Instructions**: Ensure the instructions are simple and time-conscious, considering the time available for cooking.
            4. **Nutritional Information**: Provide a detailed breakdown including total calories, proteins, carbohydrates, and fats for each recipe.
            5. **Cooking Time**: Indicate how long the recipe takes to prepare and cook.
        
            **Example Recipe Format:**
            ### Recipe: ${'Example Recipe Name'}
            **Ingredients:**
            - ${'List of ingredients here'}
        
            **Instructions:**
            - Step 1: ${'Example step-by-step instructions'}
            - Step 2: ${'Additional steps as needed'}
        
            **Nutritional Information (per serving):**
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}
        
            **Cooking Time:** ${'xx minutes'}
        
            Please ensure that the recipes are varied, nutritious, and align with the user’s specific dietary preferences, goals, and available time. Present all information in markdown format.
        `;
    
        const responseFromModel = await chatSessionGoogleGemini.sendMessage(recipeSuggestionPrompt);
        
        await primsaClientConfig.suggestReceipe.create({
            data: {
                mealType: rawData?.mealType || '',
                timeThatCanBeGivenToCooking: rawData?.timeThatCanBeGivenToCooking || '',
                dailyCalorieTarget: rawData?.dailyCalorieTarget || '', 
                ingredientsToInclude: rawData?.ingredientsToInclude || '',   
                ingredientsToExclude: rawData?.ingredientsToExclude || '', 
                receipeSuggestCreatedByTheGeminiModel: responseFromModel?.response?.text() || '',        
                idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id || ''
            }
        });

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating the new receipe suggestion, please try again'
        }

    }

    redirect('/suggest_receipe_history');

}


export const fetchAllReceipeSuggestionsCreatedByTheUser = async () => {
    
    try {

        const user = await currentUser();

        const allReceipeSuggestionsCreatedByTheUser = await primsaClientConfig.suggestReceipe.findMany({
            where: {
                idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id
            }
        });

        return allReceipeSuggestionsCreatedByTheUser;

    } catch (error) {

        console.log(error);

        return {
            message: error?.message || 'There was an error while fetching your recipe suggestions, please try again.'
        };

    }

};


export const fetchParticularReceipeSuggestionById = async (receipeSuggestionId) => {

    try {

        return primsaClientConfig.suggestReceipe.findUnique({
            where: {
                id: receipeSuggestionId
            }
        });
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the calorie tracking, please try again'
        }

    }

}