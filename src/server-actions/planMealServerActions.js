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
            You are a highly skilled nutrition assistant tasked with generating a personalized meal plan for the following user, 
            based on their unique profile and dietary goals:

            **User Profile:**
            - **Full Name:** ${fetchAllDetailsOfUser.firstName || ''} ${fetchAllDetailsOfUser.lastName || ''}
            - **Age:** ${fetchAllDetailsOfUser.age || 0} years
            - **Gender:** ${fetchAllDetailsOfUser.gender || ''}
            - **Height:** ${fetchAllDetailsOfUser.height || 0} cm
            - **Weight:** ${fetchAllDetailsOfUser.weight || 0} kg
            - **Activity Level:** ${fetchAllDetailsOfUser.activityLevel || ''} (e.g., sedentary, light exercise, moderate exercise, etc.)
            - **Allergies:** ${fetchAllDetailsOfUser?.allergies || 'None'} (please avoid any foods that may trigger allergic reactions)

            **Health and Dietary Preferences:**
            - **Health Goal:** ${rawData?.healthGoal || ''} (e.g., weight loss, muscle gain, maintenance)
            - **Dietary Preference:** ${rawData?.dietPreference || ''} (e.g., vegetarian, vegan, gluten-free, etc.)
            - **Daily Calorie Target:** ${rawData?.targetCalorie || ''} kcal per day

            **Task:**
            Based on the user profile and dietary preferences provided above, generate a personalized meal plan for one full day, covering breakfast, lunch, dinner, and snacks. The meal plan should include:
            
            1. **Nutrient-Dense Foods**: Suggest meals that are rich in essential nutrients, tailored to the user’s dietary preference and health goal.
            2. **Macronutrient Breakdown**: Provide detailed macronutrient information (proteins, carbohydrates, and fats) for each meal, ensuring the user meets their calorie and macronutrient targets.
            3. **Meal Timing Suggestions**: Recommend appropriate times to consume the meals (e.g., breakfast at 8:00 AM, lunch at 12:30 PM).
            4. **Variety and Balance**: Incorporate a variety of food options to ensure balance and prevent monotony, and offer any optional ingredients or substitutes based on the user's allergies and preferences.
            5. **Hydration and Additional Tips**: Offer guidance on daily water intake and any relevant tips to help the user achieve their health goal (e.g., portion control, mindful eating).

            **Example Meal Plan Format:**
            ### Breakfast
            - **Meal:** ${'Example meal here (e.g., 1 cup of oatmeal with berries)'}
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}

            ### Mid-Morning Snack
            - **Meal:** ${'Example meal here (e.g., mixed nuts with a piece of fruit)'}
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}

            ### Lunch
            - **Meal:** ${'Example meal here (e.g., grilled chicken salad with quinoa)'}
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}

            ### Afternoon Snack
            - **Meal:** ${'Example meal here (e.g., Greek yogurt with honey and almonds)'}
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}

            ### Dinner
            - **Meal:** ${'Example meal here (e.g., baked salmon with steamed vegetables)'}
            - **Calories:** ${'xxx kcal'}
            - **Proteins:** ${'xxg'}
            - **Carbohydrates:** ${'xxg'}
            - **Fats:** ${'xxg'}

            ### Hydration and Additional Tips
            - **Daily Water Intake Recommendation:** ${'xx liters of water per day'}
            - **Tips:** ${'e.g., include more vegetables in lunch, avoid sugary snacks, etc.'}

            Make sure your suggestions are well-balanced, practical, and aligned with the user’s preferences, health goal, and calorie target. Format the output in markdown.
        `;


        const responseFromModel = await chatSessionGoogleGemini.sendMessage(mealPlanPrompt);
        
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