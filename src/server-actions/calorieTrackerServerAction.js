'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import primsaClientConfig from '@/prismaClientConfig';



export const createNewCalorieTracking = async (prevState, formData) => {

    try {

        const user = await currentUser();

        const rawData = Object.fromEntries(formData);

        
        await primsaClientConfig.trackCalorie.create({
            data: {
                whatEatToday: rawData?.whatEatToday,                            
                nutiritonAndFitnessProgress: rawData?.nutiritonAndFitnessProgress,             
                nutrientsTakenToday: rawData?.nutrientsTakenToday,                     
                idOfTheProfileWhoCreatedTheTrackCalorie: user?.id
            }
        });
        
        return {
            message: 'your calorie has been tracked successfully'
        }

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating a new meal plan, please try again'
        }

    }

}