'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import primsaClientConfig from '@/prismaClientConfig';


const getAuthenticatedUser = async () => {

    try {
        
        const user = await currentUser();


        if (!user) {
            throw new Error('you must be authenticated in order to access this route');
        }

        if(!user?.privateMetadata?.hasCompletedProfile) {
            redirect('/complete_profile');
        }


        return user;


    } catch (error) {

        console.log(error);

        return {
            message: error?.message 
        }

    }

}


export const createNewReceipeSuggestion = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

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