import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const page = async () => {

  const currentLoggedInUser = await currentUser();

  if(!currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
    redirect('/complete_profile');
      
  }

  return (
    <div>
      page
    </div>
  );
};

export default page;
