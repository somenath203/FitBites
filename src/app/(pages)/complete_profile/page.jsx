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
import { createProfileServerAction } from '@/server-actions/userServerActions';
import FormContainer from '@/app/_components/form/FormContainer';
import SubmitButton from '@/app/_components/all_purpose_component/SubmitButton';

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
                        required
                    />

                </div>

                <div className='flex flex-col gap-2'>

                    <Label>Gender</Label>

                    <Select name='gender'>

                        <SelectTrigger className='border border-green-600'>
                            <SelectValue placeholder="select your gender" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
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
                            required
                            min={5}
                            max={100}
                        />

                    </div>

                    <div className='w-full flex flex-col gap-2'>

                        <Label>Weight(in kgs)</Label>

                        <Input 
                            name="weight"
                            type="number" 
                            placeholder="enter your weight (in kgs)" 
                            className='border border-green-600'
                            required
                            min={20}
                        />

                    </div>

                </div>

                <div className='flex flex-col gap-2'>

                    <Label>Activity Level</Label>

                    <Select name='activityLevel' required>

                        <SelectTrigger className='border border-green-600'>
                            <SelectValue placeholder="select your activity level" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="No Exercise">Sedentary (no exercise)</SelectItem>
                            <SelectItem value="Light Exercise">Lightly Active (light exercise)</SelectItem>
                            <SelectItem value="Moderate Exercise">Moderately Active (modetate exercise)</SelectItem>
                            <SelectItem value="Hard Exercise">Very Active (hard exercise)</SelectItem>
                            <SelectItem value="Very Hard Exercise">Super Active (very hard exercise)</SelectItem>
                        </SelectContent>

                    </Select>

                </div>

                <SubmitButton className='py-6'>
                    Create Profile
                </SubmitButton>

            </FormContainer>

        </div>

        </div>
  );
};

export default page;
