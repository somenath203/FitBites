'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import primsaClientConfig from '@/prismaClientConfig';
import { chatSessionGoogleGemini } from '@/googleGeminiModelConfig';
import { fetchWholeProfileOfUser } from './userServerActions';


export const createNewMealPlan = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

        const rawData = Object.fromEntries(formData);

        const mealPlanPrompt = `
            Generate a personalized meal plan for a user based on the following details:

            - Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Allergies: ${fetchAllDetailsOfUser.allergies}

             Create a personalized meal plan for a full day (breakfast, lunch, dinner, and snacks), ensuring it aligns with the user's calorie target, dietary preferences, and health goal. Suggest nutrient-dense foods and include macronutrient breakdown for each meal (proteins, carbohydrates, fats).
        `;


        const responseFromModel = await chatSessionGoogleGemini.sendMessage(mealPlanPrompt);

        if(!responseFromModel) {

            console.log("something went wrong");

            throw new Error("SOMETHING WENT WRONG OR THE GOOGLE GEMINI MODEL IS OVERLOADED AND IS NOT ABLE TO TAKE ANY RESPONSES RIGHT NOW. PLEASE TRY AGAIN LATER AFTER SOMETIME");

        }
        
        await primsaClientConfig.mealPlan.create({
            data: {
                healthGoal: rawData?.healthGoal || '',
                dietPreference: rawData?.dietPreference || '',
                calorieTarget: rawData?.targetCalorie || '',
                mealPlanCreatedByTheGeminiModel: responseFromModel?.response?.text() || '',
                idOfTheProfileWhoCreatedTheMealPlan: user?.id || '',
                dateOfCreation: rawData?.dateOfCreation || '',
                timeOfCreation: rawData?.timeOfCreation || ''
            }
        });
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new meal plan, please try again'
        }

    }

    redirect('/plan_meal_history');

}


export const fetchAllMealsCreatedByTheUser = async () => {
    
    try {

        const user = await currentUser();

        const allMealsCreatedByTheUser = await primsaClientConfig.mealPlan.findMany({
            where: {
                idOfTheProfileWhoCreatedTheMealPlan: user?.id
            }
        });

        return allMealsCreatedByTheUser;

    } catch (error) {

        console.log(error);

        return {
            message: error?.message || 'There was an error while fetching your recipe suggestions, please try again.'
        };

    }

};


export const fetchParticularMealById = async (mealPlanId) => {

    try {

        return primsaClientConfig.mealPlan.findUnique({
            where: {
                id: mealPlanId
            }
        });
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the meal, please try again'
        }

    }

}