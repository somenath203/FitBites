import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import FormContainer from '@/app/_components/form/FormContainer';
import { createNewMealPlan } from '@/server-actions/planMealServerActions';

const page = () => {
  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-5/6">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Plan your Meal
        </p>

        <FormContainer className="flex flex-col gap-6 w-full" action={createNewMealPlan}>

          <div className="flex flex-col gap-2">

            <Label>Your Health Goal</Label>

            <Select name='healthGoal'>
              <SelectTrigger
                id="health-goal"
                className="border border-green-600"
              >
                <SelectValue placeholder="Select your health goal" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="weight_loss">Weight Loss</SelectItem>
                <SelectItem value="weight_gain">Weight Gain</SelectItem>
                <SelectItem value="muscle_building">Muscle Building</SelectItem>
                <SelectItem value="maintain_weight">
                  Maintain Current Weight
                </SelectItem>
                <SelectItem value="increase_energy">
                  Increase Energy Levels
                </SelectItem>
                <SelectItem value="improve_health">
                  Improve General Health & Well-being
                </SelectItem>
                <SelectItem value="heart_health">
                  Improve Heart Health
                </SelectItem>
                <SelectItem value="digestive_health">
                  Improve Digestive Health
                </SelectItem>
                <SelectItem value="support_immunity">
                  Support Immunity
                </SelectItem>
                <SelectItem value="better_sleep">Better Sleep</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <div className="flex flex-col gap-2">

            <Label>Diet Preference</Label>

            <Select name='dietPreference'>
              <SelectTrigger
                id="diet-preference"
                className="border border-green-600"
              >
                <SelectValue placeholder="select your diet preference" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="gluten_free">Gluten-Free</SelectItem>
                <SelectItem value="dairy_free">Dairy-Free</SelectItem>
                <SelectItem value="nut_free">Nut-Free</SelectItem>
                <SelectItem value="low_carb">Low Carb</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="halal">Halal</SelectItem>
                <SelectItem value="kosher">Kosher</SelectItem>
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
            />

          </div>

          <Button type="submit" className="py-6 flex items-center gap-1">

            <span className="text-2xl">✨</span>

            <span>Generate Personalized Plan For Your Meal</span>

          </Button>

        </FormContainer>

      </div>
      
    </div>
  );
};

export default page;
