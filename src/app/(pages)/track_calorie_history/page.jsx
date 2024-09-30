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
import { fetchAllCalorieTrackingCreatedByTheUser } from "@/server-actions/calorieTrackerServerAction";
import { Button } from "@/components/ui/button";


const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  const allCalorieTrackingCreatedByTheCurrentlyLoggedInUser = await fetchAllCalorieTrackingCreatedByTheUser();


  if(allCalorieTrackingCreatedByTheCurrentlyLoggedInUser?.length < 1) {
    return (
      <div className="min-h-screen flex justify-center text-center mt-36">
        
        <p className="text-2xl tracking-wider text-green-700 font-bold">No Calorie Tracking Found. Please Create One.</p>

      </div>
    )
  }
  
  return (
    <div className="mt-14">

      <div className="min-h-screen flex flex-col m-auto items-center gap-10">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Calorie Tracking History
        </p>

        <Table>

          <TableCaption>A list of your recent calorie tracking</TableCaption>

          <TableHeader>

            <TableRow>

              <TableHead>Meal Type</TableHead>
              <TableHead>Food Items Taken</TableHead>
              <TableHead>Portion Size</TableHead>
              <TableHead>Total Calorie</TableHead>
              <TableHead>Total Macro Nutrients</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Creation Time</TableHead>
              <TableHead>View Details</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>
            {allCalorieTrackingCreatedByTheCurrentlyLoggedInUser.map((calorie) => {


              return <TableRow key={calorie.id}>

                <TableCell>
                  {calorie. mealTypeTakenToday}
                </TableCell>

                <TableCell>
                  {calorie.foodItemsTakenToday.split(' ').length <= 3 ? calorie.foodItemsTakenToday : calorie.foodItemsTakenToday.split(' ').slice(0, 3).join(' ') + ' ...'}
                </TableCell>

                <TableCell>
                  {calorie.portionSizeOfEachFoodTakenToday.split(' ').length <= 3 ? calorie.portionSizeOfEachFoodTakenToday : calorie.portionSizeOfEachFoodTakenToday.split(' ').slice(0, 3).join(' ') + ' ...'}
                </TableCell>

                <TableCell>
                  {calorie.approximateTotalCalorieOfAllTheFoodsTogetherTakenToday}
                </TableCell>

                <TableCell>
                  {calorie.approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday}
                </TableCell>

                <TableCell>
                  {calorie.dateOfCreation}
                </TableCell>

                <TableCell>
                  {calorie.timeOfCreation}
                </TableCell>

                <TableCell>

                  <Link href={`view_particular_calorie_tracking/${calorie.id}`}>
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