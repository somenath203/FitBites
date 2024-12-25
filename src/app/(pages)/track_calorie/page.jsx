import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
import FormContainer from '@/app/_components/form/FormContainer';
import { createNewCalorieTracking } from '@/server-actions/calorieTrackerServerAction';
import SubmitButton from '@/app/_components/all_purpose_component/SubmitButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import DateTimeComponent from '@/app/_components/all_purpose_component/DateTimeComponent';


const page = async () => {


  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-11/12 lg:w-5/6">

        <p className="text-lg lg:text-2xl text-center roboto-bold tracking-wider text-green-600">

          Calorie Tracker Analysis

        </p>

        <FormContainer className="flex flex-col gap-6 w-full" action={createNewCalorieTracking}>

          <div className="flex flex-col gap-2">

            <Label>Select the Meal Type</Label>

              <Select name='mealTypeTakenToday' required>
                <SelectTrigger
                  className="border border-green-600"
                >
                  <SelectValue placeholder="Please select your meal type for today" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Lunch">Lunch</SelectItem>
                  <SelectItem value="Dinner">Dinner</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                </SelectContent>

              </Select>

          </div>


          <div className="flex flex-col gap-2">

            <Label>Write all the foods you took in the selected meal type (max 20 words)</Label>

            <Textarea 
              name="foodItemsTakenToday"
              placeholder="write about all the foods you took in the selected meal type" 
              rows={6} 
              className="!resize-none border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Write about the portion size of each food you took today (max 40 words)</Label>

            <Textarea 
              name="portionSizeOfEachFoodTakenToday"
              placeholder="briefly list your carbs, proteins, fats, and vitamins" 
              rows={6} 
              className="!resize-none border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Approximate Total Calorie of all the Foods for today</Label>

            <Input
              type="number"
              name="approximateTotalCalorieOfAllTheFoodsTogetherTakenToday"
              placeholder="enter approximate total calorie of all the foods taken together"
              min={1}
              className="border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Approximate Total Macronutrients of all the Foods taken today</Label>

            <Input
              type="number"
              name="approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday"
              placeholder="enter approximate total macronutrients of all the foods taken together"
              min={1}
              className="border border-green-600"
              required
            />

          </div>

          <DateTimeComponent />


          <SubmitButton className='py-5 lg:py-7'>
            Track today's Calorie
          </SubmitButton>


        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
