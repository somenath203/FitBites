'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import axios from 'axios';

import primsaClientConfig from '@/prismaClientConfig';
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


        const { data } = await axios.post(`${process.env.BACKEND_FAST_API_BASE_URL}/generateanswer`, {
            textFromNextJSFrontend: mealPlanPrompt
        });


        if(data?.success) {

            const responseFromModel = data?.response_from_model?.content;
        
            await primsaClientConfig.mealPlan.create({
                data: {
                    healthGoal: rawData?.healthGoal || '',
                    dietPreference: rawData?.dietPreference || '',
                    calorieTarget: rawData?.targetCalorie || '',
                    mealPlanCreatedByTheGeminiModel: responseFromModel || '',
                    idOfTheProfileWhoCreatedTheMealPlan: user?.id || '',
                    dateOfCreation: rawData?.dateOfCreation || '',
                    timeOfCreation: rawData?.timeOfCreation || ''
                }
            });
            
        }
        
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
