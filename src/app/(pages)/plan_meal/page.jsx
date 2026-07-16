import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormContainer from "@/app/_components/form/FormContainer";
import { createNewMealPlan } from "@/server-actions/planMealServerActions";
import SubmitButton from "@/app/_components/all_purpose_component/SubmitButton";
import DateTimeComponent from "@/app/_components/all_purpose_component/DateTimeComponent";

const page = async () => {
  const currentLoggedInUser = await currentUser();

  if (!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
    redirect("/complete_profile");
  }

  return (
    <div className="mt-14">
      <div className="flex flex-col m-auto items-center gap-5 w-11/12 lg:w-5/6">
        <p className="text-xl lg:text-2xl text-center roboto-bold tracking-wider text-green-600">
          Plan your Meal
        </p>

        <FormContainer
          className="flex flex-col gap-6 w-full"
          action={createNewMealPlan}
        >
          <div className="flex flex-col gap-2">
            <Label>Your Health Goal</Label>

            <Select name="healthGoal" required>
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

            <Select name="dietPreference" required>

              <SelectTrigger
                id="diet-preference"
                className="border border-green-600"
              >
                <SelectValue placeholder="Select your diet preference" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                
                <SelectItem value="Vegetarian Without Onion and Garlic">
                  Vegetarian (No Onion & Garlic)
                </SelectItem>

                <SelectItem value="Non-Vegetarian">
                  Non-Vegetarian
                </SelectItem>

                <SelectItem value="Vegan">
                  Vegan (No animal products)
                </SelectItem>

                <SelectItem value="Gluten Free">
                  Gluten-Free (No wheat or gluten)
                </SelectItem>

                <SelectItem value="Dairy Free">
                  Dairy-Free (No milk or dairy)
                </SelectItem>

                <SelectItem value="Nut Free">Nut-Free (No nuts)</SelectItem>

                <SelectItem value="Low Carb">
                  Low Carb (Fewer carbohydrates)
                </SelectItem>

                <SelectItem value="Keto">Keto (Very low carbs)</SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="flex flex-col gap-2">
            
            <Label htmlFor="caloric-target">
              Daily Calorie Target (Enter "No Idea" if you don't know your daily calorie target. Maximum 10 characters.)
            </Label>

            <Input
              name="targetCalorie"
              type="text"
              id="caloric-target"
              placeholder="Enter your target calories"
              className="w-full border border-green-600"
              required
            />
            
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="personal-preference">
              Any food preferences? (Up to 5 preferences, separated by commas. Enter "No Preference" if none.)
            </Label>

            <Input
              name="personalPreference"
              type="text"
              id="personal-preference"
              placeholder="e.g., Prefer chicken, Avoid fish, Love eggs'"
              className="w-full border border-green-600"
              required
            />
          </div>

          <DateTimeComponent />

          <SubmitButton className="py-5 lg:py-7">
            Generate Meal Plan
          </SubmitButton>
        </FormContainer>
      </div>
    </div>
  );
};

export default page;
