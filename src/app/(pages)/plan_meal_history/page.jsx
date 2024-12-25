import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchAllMealsCreatedByTheUser } from "@/server-actions/planMealServerActions";
import { Button } from "@/components/ui/button";


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const allMealsCreatedByTheCurrentlyLoggedInUser = await fetchAllMealsCreatedByTheUser();

  if(allMealsCreatedByTheCurrentlyLoggedInUser?.length < 1) {
    return (
      <div className="min-h-screen flex justify-center text-center mt-36">
        
        <p className="text-2xl tracking-wider text-green-700 font-bold">No Meals Found. Please Create One.</p>

      </div>
    )
  }
  
  return (
    <div className="mt-14">

      <div className="min-h-screen flex flex-col m-auto items-center gap-10">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Meal Plan History
        </p>

        <Table>

          <TableCaption>A list of your recent meal plan</TableCaption>

          <TableHeader>

            <TableRow>

              <TableHead>Health Goal</TableHead>
              <TableHead>Diet Preference</TableHead>
              <TableHead>Calorie Target</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Creatation Time</TableHead>
              <TableHead>View Details</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>
            {allMealsCreatedByTheCurrentlyLoggedInUser.map((meal) => {


              return <TableRow key={meal.id}>

                <TableCell>
                  {meal.healthGoal}
                </TableCell>

                <TableCell>
                  {meal.dietPreference}
                </TableCell>

                <TableCell>
                  {meal.calorieTarget}
                </TableCell>

                <TableCell>
                  {meal.dateOfCreation}
                </TableCell>

                <TableCell>
                  {meal.timeOfCreation}
                </TableCell>

                <TableCell>

                  <Link href={`view_particular_meal/${meal.id}`}>
                    <Button>View Details</Button>
                  </Link>

                </TableCell>


              </TableRow>
            
            })}
          </TableBody>

        </Table>

      </div>

    </div>
  )
}

export default page;