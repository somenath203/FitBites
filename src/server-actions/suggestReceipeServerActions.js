'use server';

import { currentUser } from '@clerk/nextjs/server';

import primsaClientConfig from '@/prismaClientConfig';
import { chatSessionGoogleGemini } from '@/googleGeminiModelConfig';
import { fetchWholeProfileOfUser } from './userServerActions';


export const createNewReceipeSuggestion = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const fetchAllDetailsOfUser = await fetchWholeProfileOfUser();

        const rawData = Object.fromEntries(formData);

        const recipeSuggestionPrompt = `
            Generate personalized recipe suggestions for a user based on the following details:

            - Name: ${fetchAllDetailsOfUser.firstName} ${fetchAllDetailsOfUser.lastName}
            - Age: ${fetchAllDetailsOfUser.age} years
            - Gender: ${fetchAllDetailsOfUser.gender}
            - Height: ${fetchAllDetailsOfUser.height} cm
            - Weight: ${fetchAllDetailsOfUser.weight} kg
            - Activity Level: ${fetchAllDetailsOfUser.activityLevel}
            - Meal Type: ${rawData?.mealType}
            - Time Available for Cooking (in minutes): ${rawData?.timeThatCanBeGivenToCooking}
            - Daily Calorie Target: ${rawData?.dailyCalorieTarget} kcal
            - Ingredients to Include: ${rawData?.ingredientsToInclude}
            - Ingredients to Exclude: ${rawData?.ingredientsToExclude}

            Based on the above information, create a list of personalized recipe suggestions that the user can prepare. Each recipe should include:
            - Recipe name
            - Ingredients
            - Preparation instructions
            - Nutritional information (calories, proteins, carbohydrates, fats)

            Ensure the recipes align with the user’s dietary preferences, cooking time, and calorie target. Present the information in markdown format.

            Generate content in Rich Text Editor Format
        `;

        const responseFromModel = await chatSessionGoogleGemini.sendMessage(recipeSuggestionPrompt);
        
        await primsaClientConfig.suggestReceipe.create({
            data: {
                mealType: rawData?.mealType,
                timeThatCanBeGivenToCooking: rawData?.timeThatCanBeGivenToCooking,
                dailyCalorieTarget: rawData?.dailyCalorieTarget, 
                ingredientsToInclude: rawData?.ingredientsToInclude,   
                ingredientsToExclude: rawData?.ingredientsToExclude, 
                receipeSuggestCreatedByTheGeminiModel: responseFromModel?.response?.text(),        
                idOfTheProfileWhoCreatedTheSuggestReceipe: user?.id
            }
        });
        
        return {
            message: 'your new receipe suggestion has been generated successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating the new receipe suggestion, please try again'
        }

    }

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
