'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";


const SubmitButton = ({ className, size='lg', children }) => {
  

  const { pending } = useFormStatus();

  return (
    <Button 
        size={size}
        type="submit" 
        disabled={pending} 
        className={`capitalize ${className}`}
    >{pending ? <>

        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />

        <span>please wait...</span>
        
    </> : children}</Button>
  )
}

export default SubmitButton;