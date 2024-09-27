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


export const createNewMealPlan = async (prevState, formData) => {

    try {

        const user = await getAuthenticatedUser();

        const rawData = Object.fromEntries(formData);

        
        await primsaClientConfig.mealPlan.create({
            data: {
                healthGoal: rawData?.healthGoal,
                dietPreference: rawData?.dietPreference,
                calorieTarget: rawData?.targetCalorie,
                idOfTheProfileWhoCreatedTheMealPlan: user?.id
            }
        });
        
        return {
            message: 'your meal plan has been generated successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new meal plan, please try again'
        }

    }

}