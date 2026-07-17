"use client";

import { Tilt } from "react-tilt";
import { GiMeal } from "react-icons/gi";
import { MdOutlineNoMeals } from "react-icons/md";
import { CgPlayTrackNextO } from "react-icons/cg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeaturesOfApplication = () => {
  const cardContent = [
    {
      id: 1,
      title: "Plan Meals",
      description:
        "Create personalized meal plans based on your health goals, diet, and food preferences. FitBites helps you plan healthy meals with ease.",
      icon: GiMeal,
    },
    {
      id: 2,
      title: "Suggest Recipes",
      description:
        "Get recipe suggestions based on your meal type, cooking time, and favorite ingredients. Find healthy recipes that are easy to make.",
      icon: MdOutlineNoMeals,
    },
    {
      id: 3,
      title: "Track Calories",
      description:
        "Track your daily calories and nutrition with AI-powered analysis. Understand your meals and make better food choices every day.",
      icon: CgPlayTrackNextO,
    },
  ];

  return (
    <div className="mt-24 mb-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {cardContent.map((card) => {
        const IconComponent = card.icon;

        return (
          <Tilt key={card.id} options={{ max: 15, scale: 1.05, speed: 300 }}>
            <Card className="flex bg-green-600 flex-col items-center justify-centerbg-green-50 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              <CardHeader>
                <CardTitle className="font-bold text-white text-lg">
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="flex flex-col items-center justify-center gap-5 text-white">
                  <IconComponent className="w-10 h-10" />

                  <p className="text-center">{card.description}</p>
                </CardDescription>
              </CardContent>
            </Card>
          </Tilt>
        );
      })}
    </div>
  );
};

export default FeaturesOfApplication;
