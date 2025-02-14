import Image from "next/image";
import Link from "next/link";
import { currentUser } from '@clerk/nextjs/server';
import { SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";


const HeroSection = async () => {

  const user = await currentUser();

  return (
    <section className="text-gray-600 body-font">
    
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">

        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">

          <p className="text-gray-500 text-base lg:text-lg mb-4 flex flex-col lg:flex-row items-center gap-2 lg:gap-3">Your All-in-One Nutrition Hub <span className="text-lg lg:text-2xl">🥑</span> </p>

          <h1 className="text-6xl lg:text-7xl mb-4 font-bold tracking-widest text-green-500 roboto-bold">
            FitBites
          </h1>

          <p className="mb-8 leading-7 text-base lg:text-xl">
            FitBites is your ultimate nutrition partner, designed to create
            personalized meal plans tailored to your dietary preferences and
            health goals. With intelligent recipe suggestions and comprehensive
            caloric tracking, FitBites makes healthy eating effortless and
            enjoyable. Join us on a journey towards better nutrition and discover
            the joy of eating right!
          </p>

          {user ? (
            <Link href='/plan_meal'>
              <Button className='px-8 py-8 text-lg flex items-center gap-2'>Get Started <span className="text-2xl">🚀</span> </Button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <Button className='px-8 py-8 text-lg flex items-center gap-2'>Get Started <span className="text-2xl">🚀</span> </Button>
            </SignInButton>
          )}

        </div>

        <div className="lg:max-w-xl lg:w-full md:w-1/2 w-5/6">
          <Image
            className="object-cover object-center rounded-xl shadow-xl"
            src="/landing_page_image.jpeg"
            alt="FitBites Hero"
            width={720}
            height={600}
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
