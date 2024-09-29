import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { editUserProfile, fetchWholeProfileOfUser } from '@/server-actions/userServerActions';
import FormContainer from '@/app/_components/form/FormContainer';
import SubmitButton from '@/app/_components/all_purpose_component/SubmitButton';
import { fetchAllMealsCreatedByTheUser } from '@/server-actions/planMealServerActions';


const page = async ({ params }) => {


    const currentLoggedInUser = await currentUser();


    if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {

      redirect('/complete_profile');

    }


    const user = await fetchWholeProfileOfUser();


    if(user.id !== params.id) {
      return (
        <div className="min-h-screen flex justify-center text-center mt-36">
            
          <p className="text-2xl tracking-wider text-green-700 font-bold">No User found with this ID.</p>
    
        </div>
      )
    }


    const allMealsCreatedByTheUser = await fetchAllMealsCreatedByTheUser();


    const latestMealCreatedByUser = allMealsCreatedByTheUser[allMealsCreatedByTheUser?.length - 1];
    

  return (
    <div className="mt-14">

      <div className="flex flex-col m-auto items-center gap-5 w-11/12 lg:w-5/6">

        <p className="text-xl lg:text-2xl roboto-bold tracking-wider text-green-600">
          Edit your Profile
        </p>

        <FormContainer action={editUserProfile}>

        <div className="flex flex-col lg:flex-row items-center gap-7 lg:gap-5 w-full">

            <input type="hidden" name='mealId' defaultValue={latestMealCreatedByUser.id} />

            <div className="w-full flex flex-col gap-2">

              <Label>First Name</Label>

              <Input
                name="firstName"
                type="text"
                placeholder="enter your first name"
                className="border border-green-600"
                required
                defaultValue={user.firstName}
              />

            </div>

            <div className="w-full flex flex-col gap-2">

              <Label>Last Name</Label>

              <Input
                name="lastName"
                type="text"
                placeholder="enter your last name"
                className="border border-green-600"
                defaultValue={user.lastName}
                required
              />
              
            </div>

          </div>

          <div className="flex flex-col gap-2">

            <Label>Email Address</Label>

            <Input
              type="email"
              name="email"
              placeholder="enter your email address"
              className="bg-gray-200 border border-green-600"
              defaultValue={user.email}
              readOnly
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>Age</Label>

            <Input
              type="number"
              name="age"
              placeholder="enter your age"
              className="border border-green-600"
              defaultValue={user.age}
              required
            />

          </div>

          <div className="flex flex-col gap-2">

            <Label>Gender</Label>

            <Select name="gender" required defaultValue={user.gender}>
              <SelectTrigger className="border border-green-600">
                <SelectValue placeholder="select your gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-7 lg:gap-5 w-full">
            <div className="w-full flex flex-col gap-2">

              <Label>Height(in cms)</Label>

              <Input
                name="height"
                type="number"
                placeholder="enter your height (in cms)"
                className="border border-green-600"
                defaultValue={user.height}
                required
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <Label>Weight(in kgs)</Label>

              <Input
                name="weight"
                type="number"
                placeholder="enter your weight (in kgs)"
                className="border border-green-600"
                defaultValue={user.weight}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">

            <Label>Activity Level</Label>

            <Select name="activityLevel" required defaultValue={user.activityLevel}>
              <SelectTrigger className="border border-green-600">
                <SelectValue placeholder="select your activity level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="No Exercise">
                  Sedentary (no exercise)
                </SelectItem>
                <SelectItem value="Light Exercise">
                  Lightly Active (light exercise)
                </SelectItem>
                <SelectItem value="Moderate Exercise">
                  Moderately Active (modetate exercise)
                </SelectItem>
                <SelectItem value="Hard Exercise">
                  Very Active (hard exercise)
                </SelectItem>
                <SelectItem value="Very Hard Exercise">
                  Super Active (very hard exercise)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Briefly mention the allergies you have (max 20 words (write "no
              allergies" in case you have no allegies))
            </Label>

            <Textarea
              name="allergies"
              placeholder="briefly mention your allergies(write 'not applicable' in case you don't have any allergy)"
              rows={6}
              className="!resize-none border border-green-600"
              defaultValue={user.allergies}
              required
            />
          </div>

          <div className="flex flex-col gap-2">

                <Label>Your Health Goal</Label>

                <Select name='healthGoal' defaultValue={latestMealCreatedByUser?.healthGoal} required>
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

                <Select name='dietPreference' defaultValue={latestMealCreatedByUser?.dietPreference} required>
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

          <SubmitButton className="py-5 lg:py-7">Edit Profile</SubmitButton>

        </FormContainer>

      </div>

    </div>
  );
};

export default page;
