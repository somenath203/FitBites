import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { fetchAllCalorieTrackingCreatedByTheUser } from '@/server-actions/calorieTrackerServerAction';
import { fetchAllMealsCreatedByTheUser } from '@/server-actions/planMealServerActions';
import { fetchAllReceipeSuggestionsCreatedByTheUser } from '@/server-actions/suggestReceipeServerActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const allMealsByTheCurrentlyLoggedInUser = await fetchAllMealsCreatedByTheUser();

  const allReceipeSuggestionsByTheCurrentlyLoggedInUser = await fetchAllReceipeSuggestionsCreatedByTheUser();

  const allCalorieTrackingByTheCurrentlyLoggedInUser = await fetchAllCalorieTrackingCreatedByTheUser();

  return (
    <div className='mt-14'>
      
      <div className='min-h-screen flex flex-col gap-7 items-center'>

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Dashboard
        </p>

        <div className='grid grid-cols-3 gap-4 w-11/12'>

          {!allMealsByTheCurrentlyLoggedInUser.length < 1 && <Card className='bg-green-700 text-white'>

            <CardHeader>

              <CardTitle>Meals</CardTitle>

            </CardHeader>

            <CardContent>
              
              <div className='text-lg flex flex-col gap-1'>

                <span className='font-bold'>Total Meal Suggestions Created:</span> 

                <span className='font-bold'>{allMealsByTheCurrentlyLoggedInUser.length}</span>

              </div>
            
            </CardContent>

          </Card>}

          {!allReceipeSuggestionsByTheCurrentlyLoggedInUser.length < 1 && <Card className='bg-green-700 text-white'>

            <CardHeader>

              <CardTitle>Receipe Suggestions</CardTitle>

              <CardDescription className='text-white'></CardDescription>

            </CardHeader>

            <CardContent>
              
              <div className='text-lg flex flex-col gap-1'>

                <span className='font-bold'>Total Receipe Suggestions Created:</span> 

                <span className='font-bold'>{allReceipeSuggestionsByTheCurrentlyLoggedInUser.length}</span>
              
              </div>
            
            </CardContent>

          </Card>}

          {!allCalorieTrackingByTheCurrentlyLoggedInUser.length < 1 && <Card className='bg-green-700 text-white'>

            <CardHeader>

              <CardTitle>Track Calorie</CardTitle>

              <CardDescription className='text-white'></CardDescription>

            </CardHeader>

            <CardContent>
              
              <div className='text-lg flex flex-col gap-1'>

                <span className='font-bold'>Total Calorie Tracking Created:</span> 

                <span className='font-bold'>{allCalorieTrackingByTheCurrentlyLoggedInUser.length}</span>

              </div>

            </CardContent>

          </Card>}

        </div>

      </div>

    </div>
  );
};

export default page;
