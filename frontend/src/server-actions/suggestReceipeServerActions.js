'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import axios from 'axios';

import primsaClientConfig from '@/prismaClientConfig';
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

            throw new Error("make sure what you wrote in 'Ingredients to Exclude' is lesser than or equals to 20 words");

        }


        const recipeSuggestionPrompt = `
            Generate a personalized receipe suggestion for a user based on the following details:

            - Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Allergies: ${fetchAllDetailsOfUser.allergies}
            - Meal Type: ${rawData?.mealType || ''} 
            - Time Available for Cooking: ${rawData?.timeThatCanBeGivenToCooking || 'No time constraint'} minutes
            - Daily Calorie Target: ${rawData?.dailyCalorieTarget || ''} kcal
            - Ingredients to Include: ${rawData?.ingredientsToInclude || 'None specified'}
            - Ingredients to Exclude: ${rawData?.ingredientsToExclude || 'None specified'}

             Based on the above information, create a personalized recipe suggestions that the user can prepare.
        `;

        const { data } = await axios.post(`${process.env.BACKEND_FAST_API_BASE_URL}/generateanswer`, {
            textFromNextJSFrontend: recipeSuggestionPrompt
        });


        if(data?.success) {

            const responseFromModel = data?.response_from_model?.content;
        
            await primsaClientConfig.suggestReceipe.create({
                data: {
                    mealType: rawData?.mealType || '',
                    timeThatCanBeGivenToCooking: rawData?.timeThatCanBeGivenToCooking || '',
                    dailyCalorieTarget: rawData?.dailyCalorieTarget || '', 
                    ingredientsToInclude: rawData?.ingredientsToInclude || '',   
                    ingredientsToExclude: rawData?.ingredientsToExclude || '', 
                    receipeSuggestCreatedByTheGeminiModel: responseFromModel || '',        
                    idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id || '',
                    dateOfCreation: rawData?.dateOfCreation || '',
                    timeOfCreation: rawData?.timeOfCreation || ''
                }
            });
            
        }

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
