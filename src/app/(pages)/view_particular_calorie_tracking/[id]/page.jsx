import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularCalorieTrackerById } from "@/server-actions/calorieTrackerServerAction";
import { formatDate } from "@/utils/formatDate";



const page = async ({ params }) => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const trackCalorie = await fetchParticularCalorieTrackerById(params.id);

  if(!trackCalorie) {
    return (
      <div className="min-h-screen flex justify-center mt-12 capitalize text-xl font-bold text-green-700">No Track Calorie with this ID</div>
    )
  }
  
  return (
    <div className="mt-12 min-h-screen flex flex-col gap-6 text-lg">

      <div className="flex gap-3">

        <span>Meal Type Taken On {formatDate(trackCalorie.createdAt)}: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.mealTypeTakenToday}
        </span>

      </div>


      <div className="flex flex-col gap-2">

        <span>Food Items taken on {formatDate(trackCalorie.createdAt)}: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.foodItemsTakenToday}
        </span>

      </div>

      <div className="flex flex-col gap-2">

        <span>Portion Size of each food taken on {formatDate(trackCalorie.createdAt)}: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.portionSizeOfEachFoodTakenToday}
        </span>

      </div>


      <div className="flex gap-3">

        <span>Approzimate total calorie of all the food taken during {trackCalorie.foodItemsTakenToday} on {formatDate(trackCalorie.createdAt)}: </span>

        <span className="font-bold text-green-700">
          {trackCalorie.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday}
        </span>

      </div>

      <div className="flex gap-3">

        <span>Approximate total calorie of all the food taken during {trackCalorie.mealTypeTakenToday} on {formatDate(trackCalorie.createdAt)}: </span>

        <span className="font-bold text-green-700">
          {trackCalorie.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday} kcal
        </span>

      </div>

      <div className="flex gap-3">

        <span>Approximate total macro nutrients of all the food taken during {trackCalorie.mealTypeTakenToday} on {formatDate(trackCalorie.createdAt)}: </span>

        <span className="font-bold text-green-700">
          {trackCalorie.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday}
        </span>

      </div>


      <div className="mt-5 uppercase text-xl text-green-600 font-bold">
        Your Personalized Receipe Suggestion
      </div>

      <div className="flex flex-col gap-4">
        <MarkdownOfAiResponse mk={trackCalorie.calorieTrackCreatedByTheGeminiModel} />
      </div>

    </div>
  )
}

export default page;