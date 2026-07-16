import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
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
                  id="meal-type-taken-today"
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

            <Label>
              Foods You Ate in This Meal (Up to 8 foods, separated by commas.)
            </Label>

            <Input
              name="foodItemsTakenToday"
              placeholder="e.g., Chicken Butter Masala, Rice, Salad"
              id="food-item-taken-today"
              className="border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>
              Portion Size for Each Food Listed Above (Up to 8, separated by commas.)
            </Label>

            <Input
              name="portionSizeOfEachFoodTakenToday"
              placeholder="e.g., Chicken: 2 pieces, Rice: 1 plate, Salad: 1 bowl"
              id="portion-size"
              className="border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Approximate Total Calories for This Meal (Type "No Idea" if you don't know.)</Label>

            <Input
              type="text"
              name="approximateTotalCalorieOfAllTheFoodsTogetherTakenToday"
              placeholder="enter approximate total calorie of all the foods taken together"
              id="total-calories"
              className="border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Approximate Total Macronutrients for This Meal (Type "No Idea" if you don't know.)</Label>

            <Input
              type="text"
              name="approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday"
              placeholder="enter approximate total macronutrients of all the foods taken together"
              id="total-macronutrient"
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
