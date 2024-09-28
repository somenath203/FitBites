-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profileImage" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "activityLevel" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "healthGoal" TEXT NOT NULL,
    "dietPreference" TEXT NOT NULL,
    "calorieTarget" TEXT NOT NULL,
    "mealPlanCreatedByTheGeminiModel" TEXT NOT NULL,
    "idOfTheProfileWhoCreatedTheMealPlan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackCalorieOfTheDay" (
    "id" TEXT NOT NULL,
    "mealTypeTakenToday" TEXT NOT NULL,
    "foodItemsTakenToday" TEXT NOT NULL,
    "PortionSizeOfEachFoodTakenToday" TEXT NOT NULL,
    "approximateCalorieOfAllTheFoodsTogetherTakenToday" TEXT NOT NULL,
    "macroNutrientBreakdownOfAllTheFoodsTogetherTakenToday" TEXT NOT NULL,
    "calorieTrackCreatedByTheGeminiModel" TEXT NOT NULL,
    "idOfTheProfileWhoCreatedTheTrackCalorie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackCalorieOfTheDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestReceipe" (
    "id" TEXT NOT NULL,
    "mealType" TEXT NOT NULL,
    "timeThatCanBeGivenToCooking" TEXT NOT NULL,
    "dailyCalorieTarget" TEXT NOT NULL,
    "ingredientsToInclude" TEXT NOT NULL,
    "ingredientsToExclude" TEXT NOT NULL,
    "receipeSuggestCreatedByTheGeminiModel" TEXT NOT NULL,
    "idOfTheProfileWhoCreatedTheSuggestReceipe" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuggestReceipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_clerkId_key" ON "Profile"("clerkId");

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_idOfTheProfileWhoCreatedTheMealPlan_fkey" FOREIGN KEY ("idOfTheProfileWhoCreatedTheMealPlan") REFERENCES "Profile"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackCalorieOfTheDay" ADD CONSTRAINT "TrackCalorieOfTheDay_idOfTheProfileWhoCreatedTheTrackCalor_fkey" FOREIGN KEY ("idOfTheProfileWhoCreatedTheTrackCalorie") REFERENCES "Profile"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestReceipe" ADD CONSTRAINT "SuggestReceipe_idOfTheProfileWhoCreatedTheSuggestReceipe_fkey" FOREIGN KEY ("idOfTheProfileWhoCreatedTheSuggestReceipe") REFERENCES "Profile"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
