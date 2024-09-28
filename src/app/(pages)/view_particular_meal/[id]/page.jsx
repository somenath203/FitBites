import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularMealById } from "@/server-actions/planMealServerActions";


const page = async ({ params }) => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const meal = await fetchParticularMealById(params.id);

  if(!meal) {
    return (
      <div className="min-h-screen flex justify-center mt-12 capitalize text-xl font-bold text-green-700">No Meal found with this ID</div>
    )
  }
  
  return (
    <div className="mt-12 min-h-screen flex flex-col gap-4 text-lg">


      <div className="flex gap-3">

        <span>Goal: </span> 

        <span className="font-bold text-green-700">
          {meal.healthGoal}
        </span>

      </div>


      <div className="flex gap-3">

        <span>Diet Preference: </span> 

        <span className="font-bold text-green-700">
          {meal.dietPreference}
        </span>

      </div>


      <div className="flex gap-3">

        <span>Calorie Target: </span> 

        <span className="font-bold text-green-700">
          {meal.calorieTarget} cal
        </span>

      </div>

      <div className="mt-5 uppercase text-xl text-green-600 font-bold">
        Your Personalized Meal Plan
      </div>

      <div className="flex flex-col gap-4">
        <MarkdownOfAiResponse mk={meal.mealPlanCreatedByTheGeminiModel} />
      </div>

    </div>
  )
}

export default page;