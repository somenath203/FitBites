import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { fetchWholeProfileOfUser } from "@/server-actions/userServerActions";
import { Button } from "@/components/ui/button";


const page = async () => {

  
  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }


  const user = await fetchWholeProfileOfUser();


  return (
    <div className="px-16 py-10">

      <p className="text-3xl text-center roboto-bold tracking-wider text-green-600 mb-6">
        Profile
      </p>

      <div className="flex flex-col gap-3 lg:gap-10 mt-10 text-lg">

        <div className="flex justify-center">

          <Image
            src={user?.profileImage}
            alt="profile image"
            width={100}
            height={100}
            className="rounded-full border-4 border-green-700 object-cover w-44 h-44 shadow-lg"
          />

        </div>

        <div className="flex flex-col gap-8 lg:gap-5 text-lg lg:text-xl">


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Full Name:</span>

            <span>{user?.firstName} {user?.lastName}</span>


          </div>


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Email Address:</span>

            <span className="break-words">{user?.email || 'Not Available'}</span>

          </div>


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Age:</span>

            <span>{user?.age} years</span>

          </div>


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Gender:</span>

            <span>{user?.gender}</span>

          </div>


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Height:</span>

            <span>{user?.height || 'Not Available'} cm</span>

          </div>


          <div className="text-center flex flex-col gap-2 lg:flex-row lg:gap-0 lg:justify-between">

            <span className="font-semibold">Weight:</span>
            
            <span>{user?.weight || 'Not Available'} kg</span>

          </div>

        </div>

        <Link href={`/profile/edit/${user.id}`} className="w-full mt-4 lg:mt-0">
          <Button className='py-8 lg:py-7 capitalize w-full'>Edit Profile</Button>
        </Link>

      </div>
      
    </div>
  );
}

export default page;
