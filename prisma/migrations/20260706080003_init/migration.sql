/*
  Warnings:

  - You are about to drop the column `mealPlanCreatedByTheGeminiModel` on the `MealPlan` table. All the data in the column will be lost.
  - You are about to drop the column `receipeSuggestCreatedByTheGeminiModel` on the `SuggestReceipe` table. All the data in the column will be lost.
  - You are about to drop the column `calorieTrackCreatedByTheGeminiModel` on the `TrackCalorieOfTheDay` table. All the data in the column will be lost.
  - Added the required column `mealPlanCreatedByTheModel` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receipeSuggestCreatedByTheModel` to the `SuggestReceipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calorieTrackCreatedByTheModel` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPlan" DROP COLUMN "mealPlanCreatedByTheGeminiModel",
ADD COLUMN     "mealPlanCreatedByTheModel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuggestReceipe" DROP COLUMN "receipeSuggestCreatedByTheGeminiModel",
ADD COLUMN     "receipeSuggestCreatedByTheModel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrackCalorieOfTheDay" DROP COLUMN "calorieTrackCreatedByTheGeminiModel",
ADD COLUMN     "calorieTrackCreatedByTheModel" TEXT NOT NULL;
