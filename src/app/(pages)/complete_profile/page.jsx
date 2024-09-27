import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { createProfileServerAction } from '@/server-actions/userServerActions';
import FormContainer from '@/app/_components/form/FormContainer';

const page = async () => {
    
    const currentLoggedInUser = await currentUser();

    if(currentLoggedInUser?.privateMetadata?.hasCompletedProfile) {
  
      redirect('/');
      
    }

  return (
    <div className="mt-14">

        <div className="flex flex-col m-auto items-center gap-5 w-5/6">

            <p className="text-2xl roboto-bold tracking-wider text-green-600">
                Complete your Profile
            </p>

            <FormContainer action={createProfileServerAction}>

                <div className='flex flex-col gap-2'>

                    <Label>Age</Label>

                    <Input 
                        type="number" 
                        name="age"
                        placeholder="enter your age" 
                        className='border border-green-600'
                        min={5}
                        max={100}
                    />

                </div>

                <div className='flex flex-col gap-2'>

                    <Label>Gender</Label>

                    <Select name='gender'>

                        <SelectTrigger className='border border-green-600'>
                            <SelectValue placeholder="select your gender" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectContent>

                    </Select>

                </div>


                <div className="flex items-center gap-5 w-full">

                    <div className='w-full flex flex-col gap-2'>

                        <Label>Height(in cms)</Label>

                        <Input 
                            name="height"
                            type="number" 
                            placeholder="enter your height (in cms)" 
                            className='border border-green-600'
                        />

                    </div>

                    <div className='w-full flex flex-col gap-2'>

                        <Label>Weight(in kgs)</Label>

                        <Input 
                            name="weight"
                            type="number" 
                            placeholder="enter your weight (in kgs)" 
                            className='border border-green-600'
                        />

                    </div>

                </div>

                <div className='flex flex-col gap-2'>

                    <Label>Activity Level</Label>

                    <Select name='activityLevel'>

                        <SelectTrigger className='border border-green-600'>
                            <SelectValue placeholder="select your activity level" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="no exercise">Sedentary (no exercise)</SelectItem>
                            <SelectItem value="light exercise">Lightly Active (light exercise)</SelectItem>
                            <SelectItem value="moderate exercise">Moderately Active (modetate exercise)</SelectItem>
                            <SelectItem value="hard exercise">Very Active (hard exercise)</SelectItem>
                            <SelectItem value="very hard exercise">Super Active (very hard exercise)</SelectItem>
                        </SelectContent>

                    </Select>

                </div>

                <Button type="submit" className='py-6'>Create Profile</Button>

            </FormContainer>

        </div>

        </div>
  );
};

export default page;
