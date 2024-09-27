'use client';

import { SignOutButton } from "@clerk/nextjs";


const SignOutLink = () => {

  return (
    <SignOutButton redirectUrl="/">

      <button className="w-full text-left">
        Logout
      </button>

    </SignOutButton>
  )
}

export default SignOutLink;