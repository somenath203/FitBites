'use client';

import { Tilt } from 'react-tilt';
import { GiMeal } from "react-icons/gi";
import { MdOutlineNoMeals } from "react-icons/md";
import { CgPlayTrackNextO } from "react-icons/cg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';


const FeaturesOfApplication = () => {

  const cardContent = [
    {
      id: 1,
      title: 'Plan Meals',
      description:
        'FitBites empowers you to create personalized meal plans tailored to your dietary preferences and health goals. Simply input your restrictions and goals, and let us do the rest!',
      icon: GiMeal 
    },
    {
      id: 2,
      title: 'Suggest Recipes',
      description:
        'Discover a variety of delicious recipes that fit your meal plan. Our intelligent system provides daily recipe suggestions, making healthy eating both enjoyable and effortless.',
      icon: MdOutlineNoMeals 
    },
    {
      id: 3,
      title: 'Track Calories',
      description:
        'Stay on top of your nutrition by tracking your daily caloric intake and macronutrient distribution. FitBites helps you monitor your progress and adjust your meals accordingly.',
      icon: CgPlayTrackNextO 
    },
  ];

  return (
    <div className="mt-24 mb-10 grid grid-cols-3 gap-10">
      {cardContent.map((card) => {

        const IconComponent = card.icon; 

        return (
          <Tilt
            key={card.id}
            options={{ max: 15, scale: 1.05, speed: 300 }} 
          >
            <Card className="flex bg-green-600 flex-col items-center justify-centerbg-green-50 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
              
              <CardHeader>

                <CardTitle className="font-bold text-white text-lg">{card.title}</CardTitle>
              
              </CardHeader>

              <CardContent>
                
                <CardDescription className="flex flex-col items-center justify-center gap-5 text-white">
                 
                  <IconComponent className="w-10 h-10" />
                  
                  <p className='text-center'>{card.description}</p>

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
