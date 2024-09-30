import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularCalorieTrackerById } from "@/server-actions/calorieTrackerServerAction";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


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

      <Breadcrumb className='mb-2'>

        <BreadcrumbList>

          <BreadcrumbItem>

            <Link href='/track_calorie_history'>Calorie History</Link>

          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Calorie Tracking ID: {trackCalorie.id}</BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>

      </Breadcrumb>


      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Date at which the calorie tracking analysis was created: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.dateOfCreation}
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Time at which the calorie tracking analysis was created: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.timeOfCreation}
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Meal Type Taken: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.mealTypeTakenToday}
        </span>

      </div>


      <div className="flex flex-col gap-2">

        <span>Food Items taken: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.foodItemsTakenToday}
        </span>

      </div>

      <div className="flex flex-col gap-2">

        <span>Portion Size of each food taken: </span> 

        <span className="font-bold text-green-700">
          {trackCalorie.portionSizeOfEachFoodTakenToday}
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Approximate total calorie of all the food taken during {trackCalorie.mealTypeTakenToday}: </span>

        <span className="font-bold text-green-700">
          {trackCalorie.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday} kcal
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Approximate total macro nutrients of all the food taken during {trackCalorie.mealTypeTakenToday}: </span>

        <span className="font-bold text-green-700">
          {trackCalorie.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday}
        </span>

      </div>


      <div className="mt-5 uppercase text-xl text-green-600 font-bold">
        Your Personalized Calorie Tracking Analysis
      </div>

      <div className="flex flex-col gap-4">
        <MarkdownOfAiResponse mk={trackCalorie.calorieTrackCreatedByTheGeminiModel} />
      </div>

    </div>
  )
}

export default page;
