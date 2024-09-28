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
import { fetchAllReceipeSuggestionsCreatedByTheUser } from "@/server-actions/suggestReceipeServerActions";
import { Button } from "@/components/ui/button";

const page = async () => {

  const allReceipesCreatedByTheCurrentlyLoggedInUser = await fetchAllReceipeSuggestionsCreatedByTheUser();

  if(allReceipesCreatedByTheCurrentlyLoggedInUser?.length < 1) {
    return (
      <div className="min-h-screen flex justify-center text-center mt-36">
        
        <p className="text-2xl tracking-wider text-green-700 font-bold">No Receipe Suggestions Found. Please Create One.</p>

      </div>
    )
  }
  
  return (
    <div className="mt-14">

      <div className="min-h-screen flex flex-col m-auto items-center gap-10">

        <p className="text-2xl roboto-bold tracking-wider text-green-600">
          Receipe Suggestion History
        </p>

        <Table>

          <TableCaption>A list of your recent receipe suggestions</TableCaption>

          <TableHeader>

            <TableRow>

              <TableHead>Meal Type</TableHead>
              <TableHead>Time required for Cooking</TableHead>
              <TableHead>Daily Calorie Target</TableHead>
              <TableHead>Ingredients to Include</TableHead>
              <TableHead>Ingredients to Exclude</TableHead>
              <TableHead>View Receipe Suggestion</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>
            {allReceipesCreatedByTheCurrentlyLoggedInUser.map((receipe) => {


              return <TableRow key={receipe.id}>

                <TableCell>
                  {receipe.mealType}
                </TableCell>

                <TableCell>
                  {receipe.timeThatCanBeGivenToCooking}
                </TableCell>

                <TableCell>
                  {receipe.dailyCalorieTarget}
                </TableCell>

                <TableCell>
                  {receipe.ingredientsToInclude}
                </TableCell>

                <TableCell>
                  {receipe.ingredientsToExclude}
                </TableCell>

                <TableCell>

                  <Link href={`view_particular_receipe_suggestions/${receipe.id}`}>
                    <Button>View Receipe Suggestion</Button>
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