'use server';

import { currentUser } from '@clerk/nextjs/server';
import primsaClientConfig from '@/prismaClientConfig';



export const createNewMealPlan = async (prevState, formData) => {

    try {

        const user = await currentUser();

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