'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from '@langchain/core/prompts';

import primsaClientConfig from '@/prismaClientConfig';
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

        if(allPortionSizeOfEachFoodTakenTodayGreaterThanThirty.length > 40) {

            throw new Error("make sure what you wrote in 'Write about the portion size of each food you took today' is lesser tha or equals to 40 words");

        }


        const calorieTrackingPrompt = `
            Below are the information:

            - Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Allergies: ${fetchAllDetailsOfUser.allergies}
            - Meal Type Taken: ${rawData?.mealTypeTakenToday || ''} 
            - Foods consumed in ${rawData?.mealTypeTakenToday}: ${rawData?.foodItemsTakenToday || ''} 
            - Portion Sizes of each food consumed in ${rawData?.mealTypeTakenToday}: ${rawData?.portionSizeOfEachFoodTakenToday || ''}
            - Approximate Total Calorie Intake of each food consumed in ${rawData?.mealTypeTakenToday}: ${rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || ''} kcal
            - Approximate Macronutrient Breakdown of each food consumed in ${rawData?.mealTypeTakenToday}: ${rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || ''} (e.g., grams of proteins, carbohydrates, and fats)

            Now, based on the above information, generate a personalized calorie tracking plan for the user.
        `;


        const llmModel = new ChatGroq({
            model: "Llama3-8b-8192", 
            apiKey: process.env.GROQ_API_KEY,
        });


        const promptTemplate = PromptTemplate.fromTemplate(`
            {text}
        `);
          
        const formattedTemplate = await promptTemplate.format({ text: calorieTrackingPrompt });
        
        const res = await llmModel.invoke(formattedTemplate);


        if(res) {

            const responseFromModel = res?.content;
        
            await primsaClientConfig.trackCalorieOfTheDay.create({
                data: {
                    mealTypeTakenToday: rawData?.mealTypeTakenToday || '',                            
                    foodItemsTakenToday: rawData?.foodItemsTakenToday || '',             
                    portionSizeOfEachFoodTakenToday: rawData?.portionSizeOfEachFoodTakenToday || '',                     
                    approximateTotalCalorieOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday || '',                     
                    approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday: rawData?.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday || '',                     
                    idOfTheProfileWhoCreatedTheTrackCalorie: user?.id || '',
                    calorieTrackCreatedByTheGeminiModel: responseFromModel || '',
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

    redirect('/track_calorie_history')

}


export const fetchAllCalorieTrackingCreatedByTheUser = async () => {
    
    try {

        const user = await currentUser();

        const allCaloriesCreatedByTheUser = await primsaClientConfig.trackCalorieOfTheDay.findMany({
            where: {
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id
            }
        });

        return allCaloriesCreatedByTheUser.reverse();

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
