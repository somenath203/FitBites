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
import { createNewMealPlan } from '@/server-actions/planMealServerActions';
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
          Plan your Meal
        </p>

        <FormContainer className="flex flex-col gap-6 w-full" action={createNewMealPlan}>

          <div className="flex flex-col gap-2">

            <Label>Your Health Goal</Label>

            <Select name='healthGoal' required>
              <SelectTrigger
                id="health-goal"
                className="border border-green-600"
              >
                <SelectValue placeholder="Select your health goal" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                <SelectItem value="Weight Gain">Weight Gain</SelectItem>
                <SelectItem value="Muscle Building">Muscle Building</SelectItem>
                <SelectItem value="Maintain Current Weight">
                  Maintain Current Weight
                </SelectItem>
                <SelectItem value="Increase Energy Levels">
                  Increase Energy Levels
                </SelectItem>
                <SelectItem value="Improve General Health & Well-being">
                  Improve General Health & Well-being
                </SelectItem>
                <SelectItem value="Improve Heart Health">
                  Improve Heart Health
                </SelectItem>
                <SelectItem value="Improve Digestive Health">
                  Improve Digestive Health
                </SelectItem>
                <SelectItem value="Support Immunity">
                  Support Immunity
                </SelectItem>
                <SelectItem value="Better Sleep">Better Sleep</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label>Diet Preference</Label>

            <Select name='dietPreference' required>
              <SelectTrigger
                id="diet-preference"
                className="border border-green-600"
              >
                <SelectValue placeholder="Select your diet preference" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Gluten Free">Gluten-Free</SelectItem>
                <SelectItem value="Dairy Free">Dairy-Free</SelectItem>
                <SelectItem value="Nut Free">Nut-Free</SelectItem>
                <SelectItem value="Low Carb">Low Carb</SelectItem>
                <SelectItem value="Paleo">Paleo</SelectItem>
                <SelectItem value="Keto">Keto</SelectItem>
                <SelectItem value="Halal">Halal</SelectItem>
                <SelectItem value="Kosher">Kosher</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label htmlFor="caloric-target">Daily Caloric Target</Label>

            <Input
              name='targetCalorie'
              type="number"
              id="caloric-target"
              placeholder="Enter your target calories"
              min="1000"
              max="5000"
              className="w-full border border-green-600"
              required
            />

          </div>

          <DateTimeComponent />

          <SubmitButton className='py-5 lg:py-7'>
            Generate Meal Plan
          </SubmitButton>

        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
