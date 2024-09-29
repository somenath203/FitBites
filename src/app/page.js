import dynamic from "next/dynamic";

import Faqs from "./_components/landingpage/Faqs";


const Page = () => {

  const HeroSectionDynamicComponent = dynamic(() => import('@/app/_components/landingpage/HeroSection'), { ssr: false });

  const FeaturesDynamicComponent = dynamic(() => import('@/app/_components/landingpage/FeaturesOfApplication'), { ssr: false });
  
  return (

    <>
    
      <HeroSectionDynamicComponent />

      <FeaturesDynamicComponent />

      <Faqs />

    </>

  );
};

export default Page;
