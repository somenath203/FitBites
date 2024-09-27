import Link from 'next/link';
import Image from 'next/image';
import { IoFitnessSharp } from 'react-icons/io5';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignOutLink from './SignOutLink';

const Navbar = async () => {

  const user = await currentUser();

  return (
    <nav className="border-b roboto-mono">

      <div className="py-6 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">

          <IoFitnessSharp size={70} className="text-green-500 font-bold" />

          <span className="text-4xl tracking-widest roboto-bold">FitBites</span>

        </Link>

        <SignedIn>

          <div className="flex text-lg items-center justify-center gap-10">

            <Link href="/plan_meal">Plan Meal</Link>

            <Link href="/suggest_receipe">Suggest Receipe</Link>

            <Link href="/track_calorie">Track Calorie</Link>

          </div>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <Image
                src={user?.imageUrl}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                width={100}
                height={100}
              />

            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" sideOffSet={10}>

              <DropdownMenuItem>

                <Link href="/dashboard" className="capitalize w-full">
                  Dashboard
                </Link>

              </DropdownMenuItem>

              <DropdownMenuItem>

                <Link href="/profile" className="capitalize w-full">
                  Profile
                </Link>

              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <SignOutLink />
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center gap-4">

            <SignInButton mode="modal">
              <Button className="p-5">SignIn</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="p-5">SignUp</Button>
            </SignUpButton>

          </div>

        </SignedOut>

      </div>

    </nav>
  );
};

export default Navbar;
