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


        if(allFoodsEatenTodayGreaterThanThirty.length > 20) {

            throw new Error("make sure what you wrote in 'Write all the foods you took today (max 20 words)' is lesser than or equals to 20 words");

        }


        const allPortionSizeOfEachFoodTakenTodayGreaterThanThirty = rawData?.portionSizeOfEachFoodTakenToday?.split(' ');

        if(allPortionSizeOfEachFoodTakenTodayGreaterThanThirty.length > 20) {

            throw new Error("make sure what you wrote in 'Write about the portion size of each food you took today' is lesser tha or equals to 20 words");

        }


        const calorieTrackingPrompt = `
            Generate a personalized meal plan for a user based on the following details:

            - Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Allergies: ${fetchAllDetailsOfUser.allergies}
            - Meal Type Taken Today: ${rawData?.mealTypeTakenToday || ''} 
            - Foods Consumed Today: ${rawData?.foodItemsTakenToday || ''} 
            - Portion Sizes: ${rawData?.portionSizeOfEachFoodTakenToday || ''}
            - Approximate Total Calorie Intake: ${rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || ''} kcal
            - Approximate Macronutrient Breakdown: ${rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || ''} (e.g., grams of proteins, carbohydrates, and fats)

            Based on this information, generate a personalized calorie tracking plan for the user.
        `;


        const responseFromModel = await chatSessionGoogleGemini.sendMessage(calorieTrackingPrompt);

        if(!responseFromModel) {

            console.log("something went wrong");
            

            throw new Error("SOMETHING WENT WRONG OR THE GOOGLE GEMINI MODEL IS OVERLOADED AND IS NOT ABLE TO TAKE ANY RESPONSES RIGHT NOW. PLEASE TRY AGAIN LATER AFTER SOMETIME");

        }

        await primsaClientConfig.trackCalorieOfTheDay.create({
            data: {
                mealTypeTakenToday: rawData?.mealTypeTakenToday || '',                            
                foodItemsTakenToday: rawData?.foodItemsTakenToday || '',             
                portionSizeOfEachFoodTakenToday: rawData?.portionSizeOfEachFoodTakenToday || '',                     
                approximateTotalCalorieOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || '',                     
                approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || '',                     
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id || '',
                calorieTrackCreatedByTheGeminiModel: responseFromModel?.response?.text() || '',
                dateOfCreation: rawData?.dateOfCreation || '',
                timeOfCreation: rawData?.timeOfCreation || ''
            }
        });


        return {
            message: 'personalized calorie tracking analysis created successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new meal plan, please try again'
        }

    }

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