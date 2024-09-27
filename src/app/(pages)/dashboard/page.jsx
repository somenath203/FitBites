'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const page = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    height: 180,
    weight: 75,
    activityLevel: 'Moderately Active',
  });

  const [mealPlans, setMealPlans] = useState([
    { id: 1, name: 'Weight Loss Plan', date: '2024-09-15' },
    { id: 2, name: 'Muscle Gain Plan', date: '2024-08-30' },
  ]);

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Grilled Chicken Salad', date: '2024-09-20' },
    { id: 2, name: 'Quinoa & Veggie Bowl', date: '2024-09-19' },
  ]);

  const [calorieEntries, setCalorieEntries] = useState([
    {
      id: 1,
      date: '2024-09-21',
      calories: 2200,
      carbs: 200,
      proteins: 100,
      fats: 50,
    },
    {
      id: 2,
      date: '2024-09-20',
      calories: 2100,
      carbs: 190,
      proteins: 110,
      fats: 55,
    },
  ]);

  const [currentGoal, setCurrentGoal] = useState({
    goal: 'Weight Loss',
    progress: '60%',
  });

  return (
    <div className="mt-14 flex flex-col gap-5 w-11/12 m-auto">

      {/* Recipe Suggestions */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl text-green-600 roboto-bold">
          Recipe Suggestions
        </h2>
        <Card className="p-6 border border-green-600">
          <p>
            <strong>last Recorded Recipe:</strong> {recipes[recipes.length - 1].name}
          </p>
          <p>
            <strong>Date:</strong> {recipes[0].date}
          </p>
          <div className="flex flex-col mt-4">
            <h4>Recent Recipes:</h4>
            {recipes.slice(1).map((recipe) => (
              <p key={recipe.id}>
                {recipe.name} (Date: {recipe.date})
              </p>
            ))}
          </div>
          <Button className="mt-4">Generate New Recipe Suggestion</Button>
        </Card>
      </div>

      <Separator />

      {/* Calorie Tracker */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl text-green-600 roboto-bold">Calorie Tracker</h2>
        <Card className="p-6 border border-green-600">
          <p>
            <strong>Last Recorded Calorie Tracking:</strong> {calorieEntries[calorieEntries.length - 1].calories} kcal
          </p>
          <p>
            <strong>Nutrient Breakdown:</strong> {calorieEntries[0].carbs}g
            Carbs, {calorieEntries[0].proteins}g Proteins,{' '}
            {calorieEntries[0].fats}g Fats
          </p>
          <div className="flex flex-col mt-4">
            <h4>Recent Calorie Logs:</h4>
            {calorieEntries.slice(1).map((entry) => (
              <p key={entry.id}>
                Date: {entry.date} | {entry.calories} kcal
              </p>
            ))}
          </div>
          <Button className="mt-4">Add New Calorie Log</Button>
        </Card>
      </div>

      <Separator />

      {/* Health Goals */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl text-green-600 roboto-bold">Health Goals</h2>
        <Card className="p-6 border border-green-600">
          <p>
            <strong>Last Tracked Calorie Entry:</strong> {currentGoal.goal}
          </p>
          <Button className="mt-4">Update Goal</Button>
        </Card>
      </div>
    </div>
  );
};

export default page;
