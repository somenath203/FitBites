'use client';

import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";


const SignOutLink = () => {

  const { toast } = useToast();

  const router = useRouter()

  const handleLogoutUserToast = () => {

    toast({
      description: 'you have been logged out successfully'
    });

    router.push('/');

  }

  return (
    <SignOutButton redirectUrl="/">

      <button className="w-full text-left" onClick={handleLogoutUserToast}>
        Logout
      </button>

    </SignOutButton>
  )
}

export default SignOutLink;