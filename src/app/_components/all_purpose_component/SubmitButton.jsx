'use client';

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from 'react-dom';

import { Button } from "@/components/ui/button";

const SubmitButton = ({ className, children }) => {
  const { pending } = useFormStatus();

  return (
    <Button 
        type="submit" 
        disabled={pending} 
        className={`capitalize ${className}`}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          <span className="text-sm sm:text-base">Please wait...</span>
        </>
      ) : (
          <span className="text-sm sm:text-base">{children}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
