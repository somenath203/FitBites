import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import MarkdownOfAiResponse from "@/app/_components/all_purpose_component/MarkdownOfAiResponse";
import { fetchParticularMealById } from "@/server-actions/planMealServerActions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Page = async ({ params }) => {

  const currentLoggedInUser = await currentUser();

  if (!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
    redirect('/complete_profile');
  }

  const meal = await fetchParticularMealById(params.id);

  if (!meal) {
    return (
      <div className="min-h-screen flex justify-center items-start mt-12 capitalize text-xl font-bold text-green-700">
        No Meal found with this ID
      </div>
    );
  }

  const stats = [
    { label: "Goal", value: meal.healthGoal },
    { label: "Diet Preference", value: meal.dietPreference },
    { label: "Calorie Target", value: `${meal.calorieTarget}` },
    { label: "Personal Preference", value: meal.personalPreference }
  ];

  return (
    <div className="min-h-screen max-w-4xl mx-auto mt-12 mb-16 flex flex-col gap-6">

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/plan_meal_history" className="text-slate-500 hover:text-green-700 transition-colors">
              Meal Plan History
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-slate-700">Meal ID: {meal.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border-2 border-green-500 rounded-xl shadow-sm px-5 py-4 flex flex-col gap-1"
          >
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
              {stat.label}
            </span>
            <span className="text-xl font-bold text-green-700">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-green-600 rounded-xl shadow-lg shadow-green-100 p-6 sm:p-10 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full bg-green-600" />
          <h2 className="text-xl font-bold text-green-700 underline decoration-green-600 decoration-2 underline-offset-4">
            {'Your Personalized Meal Plan'.toUpperCase()}
          </h2>
        </div>

        <div className="text-slate-700 text-base leading-relaxed">
          <MarkdownOfAiResponse mk={meal.mealPlanCreatedByTheModel} />
        </div>
      </div>

    </div>
  );
};

export default Page;