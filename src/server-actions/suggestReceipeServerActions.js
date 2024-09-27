'use server';

import { currentUser } from '@clerk/nextjs/server';

import primsaClientConfig from '@/prismaClientConfig';


export const createNewReceipeSuggestion = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const rawData = Object.fromEntries(formData);

        
        await primsaClientConfig.suggestReceipe.create({
            data: {
                mealType: rawData?.mealType,
                timeThatCanBeGivenToCooking: rawData?.timeThatCanBeGivenToCooking,
                dailyCalorieTarget: rawData?.dailyCalorieTarget, 
                ingredientsToInclude: rawData?.ingredientsToInclude,   
                ingredientsToExclude: rawData?.ingredientsToExclude,        
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
