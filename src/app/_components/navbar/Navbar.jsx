import Link from 'next/link';
import Image from 'next/image';
import { IoFitnessSharp } from 'react-icons/io5';
import { GiHamburgerMenu } from "react-icons/gi";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SignOutLink from './SignOutLink';


const Navbar = async () => {

  const user = await currentUser();

  return (
    <nav className="border-b roboto-mono">

      <div className="py-6 flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between">

        <Link href="/" className="flex items-center gap-2">

          <IoFitnessSharp size={70} className="text-green-500 font-bold" />

          <span className="text-4xl tracking-widest roboto-bold">FitBites</span>

        </Link>

        <SignedIn>

          <div className="hidden lg:flex text-lg items-center justify-center gap-10">

            <Link href="/plan_meal">Plan Meal</Link>

            <Link href="/suggest_receipe">Suggest Receipe</Link>

            <Link href="/track_calorie">Track Calorie</Link>

          </div>

          <div className='flex items-center gap-4'>

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

                  <Link href="/profile" className="capitalize w-full">
                    Profile
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuItem>

                  <Link href="/plan_meal_history" className="capitalize w-full">
                    Plan Meal History
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuItem>

                  <Link href="/suggest_receipe_history" className="capitalize w-full">
                    Suggest Receipe History
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuItem>

                  <Link href="/track_calorie_history" className="capitalize w-full">
                    Track Calorie History
                  </Link>

                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <SignOutLink />
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

            <div className='block lg:hidden'> 

              <Sheet>

                <SheetTrigger>

                  <GiHamburgerMenu size={30} />

                </SheetTrigger>

                <SheetContent className='flex justify-center'>

                  <SheetHeader>

                    <SheetDescription>

                      <div className='flex flex-col items-center gap-8 mt-52 text-xl tracking-wider'>

                        <Link href="/plan_meal">Plan Meal</Link>

                        <Link href="/suggest_receipe">Suggest Receipe</Link>

                        <Link href="/track_calorie">Track Calorie</Link>

                      </div>

                    </SheetDescription>

                  </SheetHeader>

                </SheetContent>

              </Sheet>

            </div>

          </div>

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
