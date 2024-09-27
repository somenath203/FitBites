'use server';

import { currentUser, clerkClient } from '@clerk/nextjs/server';
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


export const createProfileServerAction = async (prevState, formData) => {

    try {


        const currentLoggedInUser = await currentUser();


        if(!currentLoggedInUser) {
            throw new Error('Please authenticate yourself first before creating the profile');
        }

        const rawData = Object.fromEntries(formData);
        

        await primsaClientConfig.profile.create({
            data: {
                clerkId: currentLoggedInUser?.id, 
                firstName: currentLoggedInUser?.firstName,
                lastName: currentLoggedInUser?.lastName,
                email: currentLoggedInUser?.primaryEmailAddress?.emailAddress,      
                profileImage: currentLoggedInUser?.imageUrl,
                age: Number(rawData.age),
                gender: rawData.gender,
                height: Number(rawData.height),
                weight: Number(rawData.weight)
            }
        });

    
        await clerkClient.users.updateUserMetadata(currentLoggedInUser?.id, {
            privateMetadata: {
                hasCompletedProfile: true,
            }
        });

        
    } catch (error) {
        
        console.log(error);

        return {
            message: error?.message || 'there was an error while creating your profile, please try again'
        }
        
    }

    redirect('/profile'); 

};