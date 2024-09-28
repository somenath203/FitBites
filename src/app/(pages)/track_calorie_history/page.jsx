import Link from "next/link";

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

          <TableCaption>A list of your recent meal plan</TableCaption>

          <TableHeader>

            <TableRow>

              <TableHead>What Eat Today</TableHead>
              <TableHead>Nutiriton and Fitness Progress</TableHead>
              <TableHead>Nutrition Taken Today</TableHead>
              <TableHead>View Calorie Tracking</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>
            {allCalorieTrackingCreatedByTheCurrentlyLoggedInUser.map((calorie) => {


              return <TableRow key={calorie.id}>

                <TableCell>
                  {calorie.whatEatToday}
                </TableCell>

                <TableCell>
                  {calorie.nutiritonAndFitnessProgress}
                </TableCell>

                <TableCell>
                  {calorie.nutrientsTakenToday}
                </TableCell>

                <TableCell>

                  <Link href={`view_particular_calorie_tracking/${calorie.id}`}>
                    <Button>View Calorie Tracking</Button>
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