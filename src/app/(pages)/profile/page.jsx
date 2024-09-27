import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { fetchAllMealsCreatedByTheUser } from "@/server-actions/planMealServerActions";
import { fetchWholeProfileOfUser } from "@/server-actions/userServerActions";

const page = async () => {

  
  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }


  const user = await fetchWholeProfileOfUser();


  const allMealsCreatedByTheUser = await fetchAllMealsCreatedByTheUser();

  const latestMealCreatedByUser = allMealsCreatedByTheUser[allMealsCreatedByTheUser?.length - 1];

  console.log(allMealsCreatedByTheUser);
  


  return (
    <div className="px-16 py-10">

      <p className="text-3xl text-center roboto-bold tracking-wider text-green-600 mb-6">
        Profile
      </p>

      <div className="flex flex-col gap-10 mt-10 text-lg">

        <div className="flex justify-center">

          <Image
            src={user?.profileImage}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full border-4 border-green-700 object-cover w-44 h-44 shadow-lg"
          />

        </div>

        <div className="flex flex-col gap-5">


          <div className="flex justify-between">

            <span className="font-semibold">Full Name:</span>

            <span>{user?.firstName} {user?.lastName}</span>


          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Email Address:</span>

            <span>{user?.email || 'Not Available'}</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Age:</span>

            <span>{user?.age} years</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Height:</span>

            <span>{user?.height || 'Not Available'} cm</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Weight:</span>
            
            <span>{user?.weight || 'Not Available'} kg</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Dietary Preferences:</span>

            <span>{latestMealCreatedByUser?.dietPreference || 'Not Available'}</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Activity Level:</span>

            <span>{user?.activityLevel || 'Not Available'}</span>

          </div>


          <div className="flex justify-between">

            <span className="font-semibold">Health Goal:</span>

            <span>{latestMealCreatedByUser?.healthGoal || 'Not Available'}</span>

          </div>


        </div>

      </div>
      
    </div>
  );
}

export default page;
