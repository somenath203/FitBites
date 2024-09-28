'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import primsaClientConfig from '@/prismaClientConfig';
import { chatSessionGoogleGemini } from '@/googleGeminiModelConfig';
import { fetchWholeProfileOfUser } from './userServerActions';


export const createNewCalorieTracking = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

        const rawData = Object.fromEntries(formData);


        const allFoodsEatenTodayGreaterThanThirty = rawData?.foodItemsTakenToday?.split(' ');


        if(allFoodsEatenTodayGreaterThanThirty.length > 30) {

            throw new Error("make sure what you wrote in 'Write all the foods you took today (max 30 words)' is lesser than 30 words");

        }


        const allPortionSizeOfEachFoodTakenTodayGreaterThanThirty = rawData?.portionSizeOfEachFoodTakenToday?.split(' ');

        if(allPortionSizeOfEachFoodTakenTodayGreaterThanThirty.length > 40) {

            throw new Error("make sure what you wrote in 'Write about the portion size of each food you took today' is lesser than 40 words");

        }

        const calorieTrackingPrompt = `
            You are a highly experienced nutrition assistant who specializes in helping users track and optimize their daily calorie intake. 
            A user has provided the following details about their health, meals, and nutrition for today:
        
            - **Full Name:** ${fetchAllDetailsOfUser.firstName || ''} ${fetchAllDetailsOfUser.lastName || ''}
            - **Age:** ${fetchAllDetailsOfUser.age || 0} years
            - **Gender:** ${fetchAllDetailsOfUser.gender || ''}
            - **Height:** ${fetchAllDetailsOfUser.height || 0} cm
            - **Weight:** ${fetchAllDetailsOfUser.weight || 0} kg
            - **Activity Level:** ${fetchAllDetailsOfUser.activityLevel || ''} (e.g., sedentary, light exercise, moderate exercise, etc.)
            
            **Meal Information for Today:**
            - **Meal Type(s):** ${rawData?.mealTypeTakenToday || ''} (e.g., breakfast, lunch, dinner, snacks)
            - **Foods Consumed Today:** ${rawData?.foodItemsTakenToday || ''} (list of food items consumed throughout the day)
            - **Portion Sizes:** ${rawData?.portionSizeOfEachFoodTakenToday || ''} (e.g., 1 cup, 150 grams, etc.)
            - **Approximate Total Calorie Intake:** ${rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || ''} kcal
            - **Approximate Macronutrient Breakdown:** ${rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || ''} (e.g., grams of proteins, carbohydrates, and fats)
        
            Using the provided information, generate a personalized calorie tracking and optimization plan for the user. 
            The plan should include:
            
            1. **Detailed analysis** of today's calorie intake, compared to the recommended intake for someone of their profile (age, weight, activity level, etc.).
            2. **Suggestions for calorie balance** to meet their health goals (whether it's weight loss, maintenance, or gain).
            3. **Food recommendations** to improve nutrient intake, such as incorporating more proteins, healthy fats, or reducing excess carbs/fats.
            4. **Tips for better calorie tracking**, including methods for accurately estimating portion sizes and nutritional information.
            5. **Suggestions for long-term dietary strategies**, such as healthier food swaps, meal planning tips, and mindful eating practices.
        
            Ensure your recommendations are specific, actionable, and tailored to the user’s individual needs, dietary goals, and preferences.
        `;
    


        const responseFromModel = await chatSessionGoogleGemini.sendMessage(calorieTrackingPrompt);

        await primsaClientConfig.trackCalorieOfTheDay.create({
            data: {
                mealTypeTakenToday: rawData?.mealTypeTakenToday || '',                            
                foodItemsTakenToday: rawData?.foodItemsTakenToday || '',             
                portionSizeOfEachFoodTakenToday: rawData?.portionSizeOfEachFoodTakenToday || '',                     
                approximateTotalCalorieOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || '',                     
                approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || '',                     
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id || '',
                calorieTrackCreatedByTheGeminiModel: responseFromModel?.response?.text() || ''
            }
        });

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new meal plan, please try again'
        }

    }

    redirect('/track_calorie_history');

}


export const fetchAllCalorieTrackingCreatedByTheUser = async () => {
    
    try {

        const user = await currentUser();

        const allCaloriesCreatedByTheUser = await primsaClientConfig.trackCalorieOfTheDay.findMany({
            where: {
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id
            }
        });

        return allCaloriesCreatedByTheUser;

    } catch (error) {

        console.log(error);

        return {
            message: error?.message || 'There was an error while fetching your calorie trackings, please try again.'
        };

    }

};


export const fetchParticularCalorieTrackerById = async (trackCalorieId) => {

    try {

        return primsaClientConfig.trackCalorieOfTheDay.findUnique({
            where: {
                id: trackCalorieId
            }
        });
        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'something went wrong while fetching the calorie tracking, please try again'
        }

    }

}