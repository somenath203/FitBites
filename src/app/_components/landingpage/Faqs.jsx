"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  const faqContent = [
    {
      id: 1,
      title: "What is FitBites?",
      description:
        "FitBites is an AI-powered nutrition app that helps you create personalized meal plans, get recipe suggestions, and track your daily calorie intake based on your health goals and food preferences.",
    },
    {
      id: 2,
      title: "How do I create a meal plan?",
      description:
        "Simply enter your health goal, diet preference, daily calorie target (or 'No Idea'), and food preferences. FitBites will create a personalized meal plan for you.",
    },
    {
      id: 3,
      title: "How do recipe suggestions work?",
      description:
        "Choose your meal type, cooking time, ingredients to include, and ingredients to avoid. FitBites will suggest a healthy recipe that matches your requirements.",
    },
    {
      id: 4,
      title: "How does calorie tracking work?",
      description:
        "Enter the foods you ate, their portion sizes, and your estimated calories and nutrients (or 'No Idea'). FitBites will analyze your meal and provide helpful nutrition insights.",
    },
    {
      id: 5,
      title:
        "Can I view my previous meal plans, recipes, and calorie analyses?",
      description:
        "Yes. FitBites saves your meal plans, recipe suggestions, and calorie analyses, so you can view them anytime and track your progress over time.",
    },
  ];

  return (
    <div className="mt-24">
      <div className="text-center text-3xl roboto-bold text-green-600 font-extrabold tracking-wider mb-10">
        Frequently Asked Questions
      </div>

      <Accordion type="single" collapsible>
        {faqContent.map((faq) => (
          <AccordionItem value={`item-${faq.id}`} key={faq.id}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>

            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
