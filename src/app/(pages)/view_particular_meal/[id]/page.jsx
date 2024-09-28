import MarkdownPreview from "@/app/_components/all_purpose_component/RichTextEditor";
import RichTextEditor from "@/app/_components/all_purpose_component/RichTextEditor";
import { fetchParticularPropertyMealById } from "@/server-actions/planMealServerActions";

const page = async ({ params }) => {

  const meal = await fetchParticularPropertyMealById(params.id);
  
  return (
    <div className="mt-12 min-h-screen flex flex-col gap-6">


      <div className="flex gap-5 text-2xl">

        <span>Goal: </span> 

        <span className="font-bold text-green-700">
          {meal.healthGoal}
        </span>

      </div>


      <div className="flex gap-5 text-2xl">

        <span>Diet Preference: </span> 

        <span className="font-bold text-green-700">
          {meal.dietPreference}
        </span>

      </div>


      <div className="flex gap-5 text-2xl">

        <span>Calorie Target: </span> 

        <span className="font-bold text-green-700">
          {meal.calorieTarget}
        </span>

      </div>

      <div className="mt-5">

        <MarkdownPreview mk={meal.mealPlanCreatedByTheGeminiModel} />

      </div>


    </div>
  )
}

export default page;