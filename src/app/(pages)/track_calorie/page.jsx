import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"
import FormContainer from '@/app/_components/form/FormContainer';
import { createNewCalorieTracking } from '@/server-actions/calorieTrackerServerAction';


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-5/6">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Calorie Tracker
        </p>

        <FormContainer className="flex flex-col gap-6 w-full" action={createNewCalorieTracking}>

          <div className="flex flex-col gap-2">

            <Label>What did you eat today?</Label>

            <Textarea 
              name="whatEatToday"
              placeholder="describe what you eat today in details" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>How is your nutrition and fitness progress going?</Label>

            <Textarea 
              name="nutiritonAndFitnessProgress"
              placeholder="describe briefly your thoughts on your meal plans, energy levels, or weight changes" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>What nutrients did you have today?</Label>

            <Textarea 
              name="nutrientsTakenToday"
              placeholder="briefly list your carbs, proteins, fats, and vitamins" 
              rows={6} 
              className="!resize-none border border-green-600"
            />

          </div>


          <Button type="submit" className="py-6 flex items-center gap-1">

            <span className="text-2xl">✨</span>

            <span>Track my Calorie</span>

          </Button>


        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
