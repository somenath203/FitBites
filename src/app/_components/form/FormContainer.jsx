'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';

import { useToast } from '@/hooks/use-toast';


const FormContainer = ({ action, children }) => {

  const initialState = {
    message: ''
  };

  const [ state, formAction ] = useFormState(action, initialState);

  const { toast } = useToast();

  useEffect(() => {

    if(state.message) {

        toast({
            description: state.message
        });
        
    }

  }, [state]);

  return (
    <form className="flex flex-col gap-6 w-full" action={formAction}>

        {children}
        
    </form>
  )
}

export default FormContainer;