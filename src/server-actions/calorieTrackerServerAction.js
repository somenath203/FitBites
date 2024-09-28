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


        const whatEatTodayNoOfWordsGreaterThanTwenty = rawData?.whatEatToday?.split(' ');

        if(whatEatTodayNoOfWordsGreaterThanTwenty.length > 20) {

            throw new Error("make sure what you wrote in 'What did you eat today?' is lesser than 20 words");

        }


        const todaysMealNoOfWordsGreaterThanTwenty = rawData?.nutiritonAndFitnessProgress?.split(' ');

        if(todaysMealNoOfWordsGreaterThanTwenty.length > 20) {

            throw new Error("make sure what you wrote in 'How is your nutrition and fitness progress going?' is lesser than 20 words");

        }


        const todaysNutritionTakenNoOfWordsGreaterThanTwenty = rawData?.nutrientsTakenToday?.split(' ');

        if(todaysNutritionTakenNoOfWordsGreaterThanTwenty.length > 20) {

            throw new Error("make sure what you wrote in 'What nutrients did you have today?' is lesser than 20 words");

        }
        

        const calorieTrackingPrompt = `
            You are a nutrition assistant that helps users track their calories effectively. 
            A user has provided the following information:

            - Full Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Today's Meals: ${rawData?.whatEatToday}
            - Nutrition and Fitness Progress: ${rawData?.nutiritonAndFitnessProgress}
            - Nutrients Taken Today: ${rawData?.nutrientsTakenToday}

            Based on the above whole information, generate a personalized calorie tracking plan for the user. 
            Include specific recommendations for how they can track their calorie intake effectively, 
            suggest types of foods they can eat, and tips to maintain their dietary goals.

            Please be detailed and ensure that your suggestions align with their personal health goals.

            Generate content in Rich Text Editor Format
        `;


        const responseFromModel = await chatSessionGoogleGemini.sendMessage(calorieTrackingPrompt);

        await primsaClientConfig.trackCalorie.create({
            data: {
                whatEatToday: rawData?.whatEatToday,                            
                nutiritonAndFitnessProgress: rawData?.nutiritonAndFitnessProgress,             
                nutrientsTakenToday: rawData?.nutrientsTakenToday,                     
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id,
                calorieTrackCreatedByTheGeminiModel: responseFromModel?.response?.text()
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

        const allCaloriesCreatedByTheUser = await primsaClientConfig.trackCalorie.findMany({
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