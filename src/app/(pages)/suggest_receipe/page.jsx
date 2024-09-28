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
import { Textarea } from "@/components/ui/textarea"
import FormContainer from '@/app/_components/form/FormContainer';
import { createNewReceipeSuggestion } from '@/server-actions/suggestReceipeServerActions';
import SubmitButton from '@/app/_components/all_purpose_component/SubmitButton';


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-5/6">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Receipe Suggestion
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
              min={1}
              className="border border-green-600"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label htmlFor="caloric-target">Daily Caloric Target</Label>

            <Input
              type="number"
              name="dailyCalorieTarget"
              placeholder="Enter your target calories"
              min="1000"
              max="5000"
              className="border border-green-600"
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>Ingredients to Include</Label>

            <Textarea 
              name="ingredientsToInclude"
              placeholder="List ingredients to include (e.g., chicken, spinach)" 
              rows={10} 
              className="!resize-none border border-green-600"
              required
            />

          </div>


          <div className="flex flex-col gap-2">

            <Label>Ingredients to Exclude</Label>

            <Textarea 
              name="ingredientsToExclude"
              placeholder="List ingredients to exclude (e.g., peanuts, dairy)"
              rows={10} 
              className="!resize-none border border-green-600"
              required
            />

          </div>


          <SubmitButton className='py-6 flex items-center gap-1'>

            <span className="text-2xl">✨</span>

            <span>Generate Personalized Receipe Suggestion</span>

          </SubmitButton>


        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
