'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faqs = () => {

  const faqContent = [
    {
      id: 1,
      title: 'What is FitBites?',
      description: 'FitBites is an all-in-one nutrition app designed to help users create personalized meal plans, suggest healthy recipes, and track caloric intake based on individual dietary preferences and health goals.'
    },
    {
      id: 2,
      title: 'How do I create a personalized meal plan?',
      description: 'Simply input your dietary restrictions (e.g., vegan, gluten-free), food preferences, and health goals (e.g., weight loss, muscle gain) in the app. FitBites will generate a customized meal plan tailored to your needs.'
    },
    {
      id: 3,
      title: 'How does the recipe suggestion feature work?',
      description: 'Based on your personalized meal plan and dietary needs, FitBites provides daily recipe suggestions that align with your selected meals, ensuring they are both healthy and delicious.'
    },
    {
      id: 4,
      title: 'Can I track my daily caloric intake?',
      description: 'Yes, FitBites allows you to track your daily caloric intake and monitor the breakdown of macronutrients (carbohydrates, proteins, and fats) to help you stay on top of your nutrition goals.'
    },
    {
      id: 5,
      title: 'Is my personal information secure with FitBites?',
      description: 'Absolutely! FitBites prioritizes user privacy and security. Your personal information is stored securely, and we adhere to data protection regulations to ensure your data is safe.'
    },
  ];

  return (
    <div className='mt-24'>
     
      <div className='text-center text-3xl roboto-bold text-green-600 font-extrabold tracking-wider mb-10'>Frequently Asked Questions</div>

      <Accordion type="single" collapsible>

      {faqContent.map((faq) => (
        <AccordionItem value={`item-${faq.id}`} key={faq.id}>

          <AccordionTrigger>{faq.title}</AccordionTrigger>

          <AccordionContent>

            {faq.description}

          </AccordionContent>

        </AccordionItem>
      ))}

      </Accordion>

    </div>
  );
};

export default Faqs;
