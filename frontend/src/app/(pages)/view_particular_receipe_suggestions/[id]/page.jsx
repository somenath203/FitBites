import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularReceipeSuggestionById } from "@/server-actions/suggestReceipeServerActions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


const page = async ({ params }) => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const receipeSuggestion = await fetchParticularReceipeSuggestionById(params.id);

  if(!receipeSuggestion) {
    return (
      <div className="min-h-screen flex justify-center mt-12 capitalize text-xl font-bold text-green-700">No Receipe Suggestion found with this ID</div>
    )
  }
  
  return (
    <div className="mt-12 min-h-screen flex flex-col gap-4 text-lg">

      <Breadcrumb className='mb-2'>

        <BreadcrumbList>

          <BreadcrumbItem>
            
            <Link href="/suggest_receipe_history">Receipe Suggestion History</Link>

          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Receipe Suggestion ID: {receipeSuggestion.id}</BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>

      </Breadcrumb>

      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Meal Type: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.mealType}
        </span>

      </div>


      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

        <span>Time can be given for cooking: </span> 

        <span className="font-bold text-green-700">
          {receipeSuggestion.timeThatCanBeGivenToCooking} minutes
        </span>

      </div>


      <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">

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

      <div className="flex flex-col gap-3 lg:gap-4">
        <MarkdownOfAiResponse mk={receipeSuggestion.receipeSuggestCreatedByTheGeminiModel} />
      </div>

    </div>
  )
}

export default page;