import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FormContainer from '@/app/_components/form/FormContainer';
import { createNewReceipeSuggestion } from '@/server-actions/suggestReceipeServerActions';
import SubmitButton from '@/app/_components/all_purpose_component/SubmitButton';
import DateTimeComponent from '@/app/_components/all_purpose_component/DateTimeComponent';


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-11/12 lg:w-5/6">

        <p className="text-xl lg:text-2xl text-center roboto-bold tracking-wider text-green-600">
          Recipe Suggestion
        </p>

        <FormContainer className="flex flex-col gap-6 w-full" action={createNewReceipeSuggestion}>

          <div className="flex flex-col gap-2">

            <Label>Your Meal Type</Label>

            <Select name='mealType' required>
              <SelectTrigger
                id="meal-type"
                className="border border-green-600"
              >
                <SelectValue placeholder="Select your meal type" />
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

            <Label>How much time can you give for cooking?</Label>

            <Input
              type="number"
              name="timeThatCanBeGivenToCooking"
              placeholder="Enter time in minutes"
              id="cooking-time"
              min={1}
              className="border border-green-600"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label htmlFor="caloric-target">Daily Calorie Target (Enter "No Idea" if you don't know your daily calorie target.)</Label>

            <Input
              type="text"
              name="dailyCalorieTarget"
              placeholder="Enter your target calories"
              id="daily-caloric-target"
              className="border border-green-600"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>
              Ingredients You Want to Include (Up to 5 ingredients. Enter "None" if there are no specific ingredients.)
            </Label>

            <Input
              type="text"
              name="ingredientsToInclude"
              placeholder="e.g., Chicken, Rice, Spinach"
              id="ingredients-to-include"
              className="border border-green-600"
              required
            />
          </div>


          <div className="flex flex-col gap-2">

            <Label>
              Ingredients You Want to Exclude (Up to 5 ingredients. Enter "None" if there are no specific ingredients.)
            </Label>

            <Input
              type="text"
              name="ingredientsToExclude"
              placeholder="e.g., Peanuts, Dairy, Mushrooms"
              id="ingredients-to-exclude"
              className="!resize-none border border-green-600"
              required
            />
          </div>

          <DateTimeComponent />


          <SubmitButton className='py-5 lg:py-7'>
            Suggest Recipe
          </SubmitButton>


        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
