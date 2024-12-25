/*
  Warnings:

  - You are about to drop the column `PortionSizeOfEachFoodTakenToday` on the `TrackCalorieOfTheDay` table. All the data in the column will be lost.
  - You are about to drop the column `approximateCalorieOfAllTheFoodsTogetherTakenToday` on the `TrackCalorieOfTheDay` table. All the data in the column will be lost.
  - You are about to drop the column `macroNutrientBreakdownOfAllTheFoodsTogetherTakenToday` on the `TrackCalorieOfTheDay` table. All the data in the column will be lost.
  - Added the required column `dateOfCreation` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfCreation` to the `MealPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfCreation` to the `SuggestReceipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfCreation` to the `SuggestReceipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approximateTotalCalorieOfAllTheFoodsTogetherTakenToday` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfCreation` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portionSizeOfEachFoodTakenToday` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfCreation` to the `TrackCalorieOfTheDay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPlan" ADD COLUMN     "dateOfCreation" TEXT NOT NULL,
ADD COLUMN     "timeOfCreation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SuggestReceipe" ADD COLUMN     "dateOfCreation" TEXT NOT NULL,
ADD COLUMN     "timeOfCreation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrackCalorieOfTheDay" DROP COLUMN "PortionSizeOfEachFoodTakenToday",
DROP COLUMN "approximateCalorieOfAllTheFoodsTogetherTakenToday",
DROP COLUMN "macroNutrientBreakdownOfAllTheFoodsTogetherTakenToday",
ADD COLUMN     "approximateTotalCalorieOfAllTheFoodsTogetherTakenToday" TEXT NOT NULL,
ADD COLUMN     "approximateTotalMacroNutrientsOfAllTheFoodsTogetherTakenToday" TEXT NOT NULL,
ADD COLUMN     "dateOfCreation" TEXT NOT NULL,
ADD COLUMN     "portionSizeOfEachFoodTakenToday" TEXT NOT NULL,
ADD COLUMN     "timeOfCreation" TEXT NOT NULL;
