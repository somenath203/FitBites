import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularReceipeSuggestionById } from "@/server-actions/suggestReceipeServerActions";



const page = async ({ params }) => {

  const receipeSuggestion = await fetchParticularReceipeSuggestionById(params.id);

  if(!receipeSuggestion) {
    return (
      <div className="min-h-screen flex justify-center mt-12 capitalize text-xl font-bold text-green-700">No Receipe Suggestion found with this ID</div>
    )
  }
  
  return (
    <div className="mt-12 min-h-screen flex flex-col gap-4 text-lg">


      <div className="flex gap-3">

        <span>Meal Type: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.mealType}
        </span>

      </div>


      <div className="flex gap-3">

        <span>Time can be given for cooking: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.timeThatCanBeGivenToCooking} minutes
        </span>

      </div>


      <div className="flex gap-3">

        <span>Daily Calorie Target: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.dailyCalorieTarget} cal
        </span>

      </div>

      <div className="flex flex-col gap-2">

        <span>Ingredients to include: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.ingredientsToInclude} 
        </span>

      </div>

      <div className="flex flex-col gap-2">

        <span>Ingredients to Exclude: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.ingredientsToExclude} 
        </span>

      </div>

      <div className="mt-5 uppercase text-xl text-green-600 font-bold">
        Your Personalized Receipe Suggestion
      </div>

      <div>
        <MarkdownOfAiResponse mk={receipeSuggestion.receipeSuggestCreatedByTheGeminiModel} />
      </div>

    </div>
  )
}

export default page;